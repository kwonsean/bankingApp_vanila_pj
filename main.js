// range관련 시작 
// input 태그를 긁어 오기
const inputs = document.querySelectorAll('input[type="range"]')
const inputPage1 = inputs[0];
const inputPage2 = inputs[1];
let style = document.querySelector('[data="test"]');

function setData(x){
  style.innerHTML = "input.range::-webkit-slider-thumb { left: " + (x-50) + "%;} .set_budget input.range::-webkit-slider-thumb {left:0px !important;}";
}
// 실행할 내용
function inputUpdate () {
  // 넘어오는 이벤트 주체의 값 (range의 경우이므로 0~100(%) 중 하나의 값)
  const perVal = this.value
  setData(this.value)
 
  // slider-thumb(컨트롤 하는 버튼)의 값을 기준으로 전후 그라디언트
  // input의 배경색을 그라디언트로 해서 버튼을 기준으로 오른쪽은 색 왼쪽은 색 X 
  this.style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${perVal}%, #C4C4C4 ${perVal}%, #C4C4C4 100%)`
  inputPage1.style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${perVal}%, #C4C4C4 ${perVal}%, #C4C4C4 100%)`
  // 오른쪽부터 #FFDB4C(노랑색) 0%부터 현재 버튼의 (사실은 마우스 or 터치한 부분)의 위치%만큼 채우고 그 위치부터 배경색인 #C4C4C4(회색)을 끝까지 채운다.
}

inputPage2.addEventListener('change', inputUpdate);
inputPage2.addEventListener('mousemove', inputUpdate);
inputPage2.addEventListener('touchmove', inputUpdate);

// range에 초기값 지정
(function firstset(){
  inputPage1.style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C 50%, #C4C4C4 50%, #C4C4C4 100%)`
  inputPage2.style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C 50%, #C4C4C4 50%, #C4C4C4 100%)`
}());

// range관련 끝


// 상세내역 확장 
const dragBtn = document.querySelector('.drag_btn');
const history = document.querySelector('.bank_use_history');
const detail = document.querySelector('.use_history_detail');

// drag 시도했는데 쉽지 않네..
// function updateDrag(){
//   console.log('it\'s drag!')
// }
// function dragOn(){
//   console.log(dragBtn.style.color)
// }
// dragBtn.addEventListener('dragstart', updateDrag);
// dragBtn.addEventListener('drag', dragOn);

function clicked(){
  history.classList.toggle('long')
  
  if(detail.classList.contains('long')){
    setTimeout( function(){
      detail.classList.remove('long')
      },1000);  
  } else{
    detail.classList.add('long')
  }
  
}
dragBtn.addEventListener('click', clicked);
// 상세내역 확장 일단은 버튼으로 끝

// JSON으로 자료 가져오기 use_history_detail부분 
let today = new Date();
let todayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2,'0')}-${today.getDate().toString().padStart(2,'0')}`
// console.log(todayDate) 
let list = [];
let day = Number(todayDate.slice(-2))

const url = 'https://syoon0624.github.io/json/test.json';
const reqObj = new XMLHttpRequest();
reqObj.open('GET', url);
reqObj.responseType = 'json';
reqObj.send();
reqObj.addEventListener('load', work);

function work() {
  const tabData = reqObj.response.bankList;
  for(let i=0; i<tabData.length; i++){
    if (day <Number(tabData[i].date.slice(-2))) {
      break
    }
    list.push(tabData[i])
  }
  // console.log(list)
  listPop(list)
}

function  listPop(list){
  let listLength = list.length;
  let dayList = [];
  for(let i=listLength-1; i >= 0; i--){
    if (day === Number(list[i].date.slice(-2))){
      dayList.push(list[i])  
      if(day === 1 && i === 0) creatDay(dayList)
    // console.log(list[i].date)
    } else{
      creatDay(dayList)
      dayList =[];
      day--;
      i+=1;
      // console.log('-----------')
    }
  }
}
function creatDay(dayList){
  if(dayList.length === 0) return false;

  // console.log(dayList)
  let total = 0;
  const detailList = document.querySelector('.detail_list')
  const detailList_li = document.querySelector('.detail_list > li')
  const divElem = document.createElement('div')
  const spanDay = document.createElement('span')
  const spanTotal = document.createElement('span')
  const innerUl =document.createElement('ul')
  innerUl.classList.add('innerUl')
  spanDay.classList.add('day')
  // 오늘만 오늘로 표시 이후는 날짜로.. 너무 복잡합니다.  ++ 년도는 안보이게 
  if(dayList[0].date === todayDate)  spanDay.innerText = '오늘'
  else spanDay.innerText = dayList[0].date.slice(-5)

  divElem.appendChild(spanDay)
  detailList_li.appendChild(divElem)
  detailList.appendChild(detailList_li)

  for(let i =0; i<dayList.length; i++){
    const spanList = document.createElement('span')
    const innerUl_li =document.createElement('li')
    spanList.classList.add('list');
    spanList.innerText = dayList[i].history;
    innerUl_li.appendChild(spanList);
    if (dayList[i].income === 'out'){
      const spanOut = document.createElement('span')
      spanOut.classList.add('out')
      spanOut.innerText = (dayList[i].price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      innerUl_li.appendChild(spanOut)
      innerUl.appendChild(innerUl_li)
      total += Number(dayList[i].price)
    } else {
      const spanIn = document.createElement('span')
      spanIn.classList.add('in')
      spanIn.innerText = '+' + (dayList[i].price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      innerUl_li.appendChild(spanIn);
      innerUl.appendChild(innerUl_li)
    }
    detailList_li.appendChild(innerUl)
    detailList.appendChild(detailList_li)
  }
  spanTotal.classList.add('total')
  total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  spanTotal.innerText = `${total}원 지출`
  divElem.appendChild(spanTotal)
}




// 2페이지 나타내기
const chartBtn = document.querySelector('.chart')
const closeBtn = document.querySelector('.close_btn')
const page2 = document.querySelector('.scroll')

function clickChartBtn(){
  page2.classList.add('focus')
}
function clickCloseBtn(){
  page2.classList.remove('focus')
}
chartBtn.addEventListener('click', clickChartBtn)
closeBtn.addEventListener('click', clickCloseBtn)
// 2페이지 나타내기 끝


// 막대그래프 시작
const data = {
  labels: [
  '02',
  '04',
  '06',
  '08',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
  '24',
  '26',
  '28',
  '30',
  ],
  datasets: [{
    type: 'bar',
    label: 'Bar Dataset',
    data: [70000, 90000, 60000, 85000, 68000, 70000, 90000, 60000, 85000, 68000, 70000, 90000, 60000, 85000, 68000],
    barThickness: 5,
    backgroundColor:'rgba(56, 201, 118, 0.9)',
    borderRadius: 10,
  }, {
    type: 'line',
    label: 'Line Dataset',
    borderDash: [5, 5],
    data: [60000, 62000, 63000, 64000,60000, 62000, 63000, 64000,60000, 62000, 63000, 64000, 62000, 63000, 64000],
    fill: false,
    borderColor: '#FF5F00',
  }]
};
const config = {
  type: 'scatter',
  data: data,
  options: {
    plugins: {
      legend: {
        display: false,
      }
    },
    radius: 0,
    responsive:false,
    scales:{
      y:{
        grid: {
          borderDash: [8, 4],
          color: '#ECF0F4',
          drawBorder: false
        },
        min:20000,
        max:100000,
        ticks: {
          stepSize: 20000
        }
      },
       x: {
        grid: {
          display: false,
        },
        min: 2,
        max: 30,
        ticks: {
          stepSize: 2
        }
      },
      
    },
    ticks:{
      font:{  size: 12,
        lineHeight: 1.2, 
      }
    }
  }
};
let myChart = new Chart(
  document.querySelector('.bar_graph'),
  config
);


// 도넛시작
const data2 = {
  labels: [
    '주유비',
    '건강관리비',
    '외식비',
    '장보기',
    '상점',
    
    ],
    datasets: [{
    data: [50000, 80000, 233000, 390000, 46000],
    backgroundColor: [
      'RGB(219, 48, 105)',
      'RGB(245, 143, 41)',
      'RGB(255, 75, 62) ',
      'RGB(35, 87, 137)',
      'RGB(155, 197, 61)',
     
    ],
    hoverOffset: 1,
    borderWidth:0
  }]
};

const config2 = {
  type: 'doughnut',
  data: data2,
  options: {
    maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      // 도넛 굵기 조절 
      cutout: '77%',
  },
};

let myChart2 = new Chart(
  document.querySelector('.donut_graph'),
  config2
);
