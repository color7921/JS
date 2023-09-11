const show = (cd) => {
    let url2 = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=${cd}`;
    
    const divDetail = document.querySelector(".detail");
      // <div class="detail">영화 설명</div> 여기로 divdetail을 만들어줌

    fetch(url2)
    .then(resp=> resp.json())
    .then(data => {
        let detailTag = "";
        let movieInfo = data.movieInfoResult.movieInfo;
        detailTag = detailTag + `<span class ='title'>코드</span>`
        detailTag = detailTag + `<span class ='con'>${movieInfo.movieCd}</span>`
        detailTag = detailTag + `<span class ='title'>영화명</span>`
        detailTag = detailTag + `<span class ='con'>${movieInfo.movieNm}</span>`
        detailTag = detailTag + `<span class ='title'>제작 상태</span>`
        detailTag = detailTag + `<span class ='con'>${movieInfo.prdtStatNm}</span>`
        divDetail.innerHTML = detailTag;
    })
    //divDetail 호출 
  
    .catch(err => console.log(err));


}

const getData = (dt, divCon, sel1) => {






    //데이터가져오기(영화진흥위원회 API)
    let apikey = "f5eef3421c602c6cb7ea224104795888";
    let tDt = dt.value.replaceAll("-", "");
    console.log(tDt);
    let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
    url = url + `?key=${apikey}`;
    url = url + `&targetDt=${tDt}`;
    console.log(url)
    //공식

    
    if (sel1.value !== 'T') {
        url = url + `&multiMovieYn=${sel1.value}`;
    }

        

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
            let conTag = "<table>";
            conTag = conTag + `<thead>
        
            <tr>

              <th scope="col">순위</th>
              <th scope="co1">순위변동</th>
              <th scope="col">영화명</th>
              <th scope="col">개봉일</th>
              <th scope="col">매출액</th>
              
              <th scope="col">누적매출액</th>
              <th scope="col">관객수</th>
              
              <th scope="col">누적관객수</th>
              <th scope="col">스크린수</th>
              <th scope="col">상영횟수</th>
              
            </tr>
          </thead>`;



            conTag = conTag + '<tbody>';
            for (let item of dailyBoxOfficeList) {
                conTag = conTag + '<tr>';
                conTag = conTag + `<td>${item.rank}</td>`;
                conTag = conTag + `<td>`;
                conTag = conTag + `<span class = "inten">`;
                if (parseInt(item.rankInten) === 0) {
                    conTag = conTag + `<span class = "inten0">-`;
                } else if (parseInt(item.rankInten) > 0) {
                    conTag = conTag + `<span class = "inten1">▲${Math.abs(item.rankInten)}`;

                }
                else {
                    conTag = conTag + `<span class = "inten2">▼${Math.abs(item.rankInten)}`;
                }

                
                conTag = conTag + `<td><a href="#" onclick="show(${item.movieCd})">${item.movieNm}</a></td>`;
                conTag = conTag + `<td>${item.openDt}</td>`;
                conTag = conTag + `<td><span class = "numtd">${parseInt(item.salesAmt).toLocaleString('ko-KR')}</span></td>`;
                conTag = conTag + `<td><span class = "numtd">${parseInt(item.salesAcc).toLocaleString('ko-KR')}</span></td>`;
                conTag = conTag + `<td><span class = "numtd">${parseInt(item.audiCnt).toLocaleString('ko-KR')}</span></td>`;
                conTag = conTag + `<td><span class = "numtd">${parseInt(item.audiAcc).toLocaleString('ko-KR')}</span></td>`;
                conTag = conTag + `<td><span class = "numtd">${parseInt(item.scrnCnt).toLocaleString('ko-KR')}</span></td>`;
                conTag = conTag + `<td><span class = "numtd">${parseInt(item.showCnt).toLocaleString('ko-KR')}</span></td>`;
                conTag = conTag + `</tr>`;

            }

            conTag = conTag + "</tbody></table>";
            divCon.innerHTML = conTag;

        })
        .catch((err) => console.log(err));

}
document.addEventListener("DOMContentLoaded", () => {
    const dt = document.querySelector("#dt1");
    const divCon = document.querySelector("#divCon");
    const sel1 = document.querySelector("#sel1");

    //날짜 변경시 날짜 가져오기
    dt.addEventListener("change", () => {
        getData(dt, divCon, sel1);


        //영화구분
        sel1.addEventListener("change", () => {
            if (!dt.value) {
                getData(dt, divCon, sel1);
            }
        });
    })
});

// movie cd 가져오기
// api 호출
// 