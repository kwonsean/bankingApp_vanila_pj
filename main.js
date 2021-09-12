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
