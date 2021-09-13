// range관련 시작 
// input 태그를 긁어 오기
const inputs = document.querySelectorAll('input[type="range"]')
const input = document.querySelector('.range_wrap > input')


// 실행할 내용
function inputUpdate () {
  // 넘어오는 이벤트 주체의 값 (range의 경우이므로 0~100(%) 중 하나의 값)
  const perVal = this.value
  // console.log(perVal)
 
  // slider-thumb(컨트롤 하는 버튼)의 값을 기준으로 전후 그라디언트
  // input의 배경색을 그라디언트로 해서 버튼을 기준으로 오른쪽은 색 왼쪽은 색 X 
  this.style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C ${perVal}%, #C4C4C4 ${perVal}%, #C4C4C4 100%)`
  // 오른쪽부터 #FFDB4C(노랑색) 0%부터 현재 버튼의 (사실은 마우스 or 터치한 부분)의 위치%만큼 채우고 그 위치부터 배경색인 #C4C4C4(회색)을 끝까지 채운다.
}

// 공통
inputs.forEach(input => input.addEventListener('change', inputUpdate))
// 웹
inputs.forEach(input => input.addEventListener('mousemove', inputUpdate))
// 모바일
inputs.forEach(input => input.addEventListener('touchmove', inputUpdate))

// range에 초기값 지정
function fristSet(){
  input.style.background = `linear-gradient(to right, #FFDB4C 0%, #FFDB4C 50%, #C4C4C4 50%, #C4C4C4 100%)`
}
fristSet();

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
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor:'rgba(8, 227, 11, 0.55)',
    // '#38C976'
    borderWidth: 0,
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
    
    radius: 0,
    responsive:false,
    scales:{
      y:{
        min:20000,
        max:100000
      }
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
    datasets: [{
    data: [11, 20, 20, 18, 21],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(255, 205, 200)',
      'rgb(100, 205, 86)',
    ],
    // hoverOffset: 4
  }]
};

const config2 = {
  type: 'doughnut',
  data: data2,
};

let myChart2 = new Chart(
  document.querySelector('.donut_graph'),
  config2
);