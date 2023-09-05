document.addEventListener("DOMContentLoaded", () => {
//     const bts = document.querySelectorAll("button") ;
//     //버튼 가져오기
//     bts.forEach((item) =>{
//         item.addEventListener("click", ()=>{
//             dice2(parseInt(item.textContent));
//         });
//     });
//     //각 버튼에 이벤트 달기


//     document.querySelector("#bt1")
// //돔 완성되면 호출

const bt = document.querySelector("button");
const radios = document.querySelectorAll("input[type=radio]");
bt.addEventListener("click", ()=>{
    for(let item of radios) {
        if (item.checked){
            console.log(item.value);
            dice2(parseInt(item.value));
            //문자를 숫자로 변환
            break;
            //foreach는 break 안됨
        }
    }
    //console.log(radios)
    //console.log(item)
    
});
//확인 버튼 가져오기




});
//주사위 보기
const dice = () => {
    const adiv = document.querySelector(".adiv");
    
    let n = Math.floor(Math.random()*6)+1;
    console.log(n) ;
    console.log(`<img src='./image/${n}.png'>`)

    // if(n === 1) adiv.innerHTML = "<img src = './img/1.png'>";
    // else if( n === 2) adiv.innerHTML = "<img src = './img/2.png'>";
    // else if( n === 3) adiv.innerHTML = "<img src = './img/3.png'>";
    // else if( n === 4) adiv.innerHTML = "<img src = './img/4.png'>";
    // else if( n === 5) adiv.innerHTML = "<img src = './img/5.png'>";
    // else if( n === 6) adiv.innerHTML = "<img src = './img/6.png'>";

    adiv.innerHTML = `<img src='./image/${n}.png'>`;
}

// 버튼 클릭시 주사위 보기
const dice2 = (seln) => {
    //함수 할당, 화살표 함수 == function() {} <<<--- 익명함수
    //주사위 숫자 1~6
    let n = Math.floor(Math.random() * 6) + 1;
    
    //주사위 이미지 넣을 위치
    //const adiv = document.getElementById("adiv");
    const adiv = document.querySelector("#adiv");
    adiv.innerHTML = `<img src='./image/${n}.png'>`;
    //변수를 집어 넣어서 

    
    const h2 = document.querySelector("hgroup > h2");
    h2.style.color = "red";
    //결과 출력을 위한 위치
    if ( n === seln) h2.textContent = "win";
    
    else h2.textContent = "lose";
} 





