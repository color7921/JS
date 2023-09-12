//변수 설정
let juso; //전체주소 : juso2023.json
let si;
let gu;
let dong;



//시설유형
let equptype = {
    "노인시설": "001",
    "복지회관": "002",
    "마을회관": "003",
    "보건소": "004",
    "주민센터": "005",
    "면동사모소": "006",
    "종교시설": "007",
    "금융기관": "008",
    "정자": "009",
    "공원": "010",
    "정자 파고라": "011",
    "공원": "012",
    "교량하부": "013",
    "나무그늘": "014",
    "하천둔치": "015",
    "기타": "099"
}

//select박스 내용 지우기
const removeOption = (s,s1) => {
    while (s.hasChildNodes()){
        s.removeChild(s.firstChild);
    }
    const option = document.createElement("option");
    option.value = "";
    option.text = s1;
    s.appendChild(option);

}

//함수 설정
const addOption = (d, s) => {
    for (let [k, v] of Object.entries(d)) {
        console.log(k, v)
        const option = document.createElement("option");
        option.value = v;
        option.text = k;
        s.appendChild(option);
    }
}

//select 박스 채우기
//d : data, s : select box


//주소 정보 가져오기
//async를 써야 await 사용 가능
const getJuso1 = async (sel1) => {
    const resp = await fetch("juso2023.json");
    const data = await resp.json();
    juso = data;

    si = {};

    juso.forEach(element => {

        let { 시도명칭, 시도코드 } = element;
        if (!si[시도명칭]) {
            si[시도명칭] = 시도코드;
        }

    });
    console.log(si);
    addOption(si, sel1);
}

const getJuso2 = (sv1, sel2) => {
    gu = {};

    juso.filter(item => item.시도코드 == sv1)
    .map(item => {
        let {시군구명칭, 시군구코드} = item;
        if (!gu[시군구명칭]) gu[시군구명칭] = 시군구코드;
            
    });
    removeOption(sel2, "--구선택--");
    removeOption(sel3, "--동선택--");
    addOption(gu, sel2);
}

const getJuso3 = (sv1,  sv2, sel3) => {
    dong = {};

    juso.filter(item => item.시도코드 == sv1 &&item.시군구코드 == sv2)
    .map(item => {
        let {읍면동명칭, 읍면동코드} = item;
        if (!dong[읍면동명칭]) dong[읍면동명칭] = 읍면동코드;
            
    });
  
    
    removeOption(sel3, "--동선택--");
    addOption(dong, sel3);
}
document.addEventListener("DOMContentLoaded", () => {
    //컴포넌트 가져오기
    const sel1 = document.querySelector("#sel1");
    const sel2 = document.querySelector("#sel2");
    const sel3 = document.querySelector("#sel3");
    const sel4 = document.querySelector("#sel4");
    const bt = document.querySelector("#bt");
    const h2 = document.querySelector("h2");
    addOption(equptype,sel4);
    //시 정보
    getJuso1(sel1);
    sel1.addEventListener("change", () => {
        //구 정보
        getJuso2(sel1.value, sel2);
        
    
    });
    
    sel2.addEventListener("change", () => {
        getJuso3(sel1.value, sel2.value, sel3);})

    //확인버튼
    bt.addEventListener("click", (e) => {
        //form 기본 이벤트 처리 안함
        e.preventDefault();

    let conTag = "<table>";
    conTag = conTag + `<thead>
        <tr>
            <th scope ="col">쉼터명</th>
            <th scope ="col">주소</th>
            <th scope ="col">인원수</th>
            <th scope ="col">선풍기</th>
            <th scope ="col">에어컨</th>
        </tr>
    </thead>`;

    conTag = conTag + '<tbody>';
    for(let item of row) {
        conTag = conTag + ''
    }
        if(sel1.value ==""){
            h2.innerHTML = `<span class='h2Sel1'>시를 선택해 주세요.</span>`;
            return;
        }

        if(sel2.value ==""){
            h2.innerHTML = `<span class='h2Sel1'>구를 선택해 주세요.</span>`;
            return;
        }

        if(sel3.value ==""){
            h2.innerHTML = `<span class='h2Sel1'>동를 선택해 주세요.</span>`;
            return;
        }
        if(sel4.value ==""){
            h2.innerHTML = `<span class='h2Sel1'>시설 유형을 선택해 주세요.</span>`;
            return;
        }

        //지역코드
        let areaCd = `${sel1.value}${sel2.value}${sel3.value}00`;
        let equpName ;
        for(let [k, v] of Object.entries(equptype)){
            if (v == sel4.value){
                equpName = k;
                break;
            }
        }
        h2.innerHTML = `<span class='h2Sel2'>지역코드 (행정동코드):${areaCd}, 시설유형</span>`;
    })

});
