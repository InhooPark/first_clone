let jsonData = "";
fetch("./json/education.json")
    .then(function (res) {
        return res.json();
    })
    .then(function (edu) {
        init(edu.data);
    });

function init(data) {
    jsonData = data;
    inputdata();
}

const EDUCONWRAPPER = document.querySelector(".edu-contents-wrapper");
let EDUCONTENTSARRAY = "";

let DATAARR = {
    전체보기: [],
    어린이: [],
    청소년: [],
    성인: [],
    사회복지: [],
    동호회: [],
    문화행사: [],
};
function inputdata() {
    jsonData.forEach(function (jsonvalue) {
        Object.keys(DATAARR).forEach(function (datavalue) {
            if (datavalue == jsonvalue.badge) {
                DATAARR[datavalue].push(jsonvalue);
            }
        });
        DATAARR["전체보기"].push(jsonvalue);
    });
    dataPrint(0);
}
const CATEGORY = document.querySelectorAll(".main-inner .category ul li");

CATEGORY.forEach(function (value, key) {
  value.addEventListener("click", function () {
    EDUCONTENTSARRAY = "";
    dataPrint(key);
  });
});
let prekey=0;
function dataPrint(ctg) {
  //한 페이지 컨텐츠 갯수제한 만들어보기
  //pagecount를 만들어서 pagecount = n;
  //for(var i=n*(pageindex-1); i<n*pageindex ; i++) 이런식으로해서
  //pageindex 최대치는 value.length / pagecount 해서 올림해가지고
  CATEGORY[prekey].classList.remove('this');
  prekey=ctg;
  CATEGORY[prekey].classList.add('this');


  let DATA = DATAARR[Object.keys(DATAARR)[ctg]];
  if(DATA.length == 0) EDUCONTENTSARRAY = `<div class="edu-content" style="display: flex; justify-content: center; margin: 50px 0;">진행중인 교육이 없습니다.</div>`
  else{
    DATA.forEach(function(value, key){
      EDUCONTENTSARRAY += `
        <div class="edu-content">
          <a href="#">
            <figure class="edu-img-wrap">
              <img src= ${value.src}>
            </figure>
            <figcaption calss="edu-text-wrap">
              <span class="badge">${value.badge}</span>
              <h6>${value.title}</h6>
              <p>
                ${value.content}
              </p>
              <div class="edu-info">
                <ul>
                  <li>
                    <dl>
                      <dt>기간</dt>
                      <dd>${value.dateStart} ~ ${value.dateEnd}</dd>
                    </dl>
                  </li>
                  <li>
                    <dl>
                      <dt>장소</dt>
                      <dd>${value.location}</dd>
                    </dl>
                  </li>
                  <li>
                    <dl>
                      <dt>대상</dt>
                      <dd>${value.target}</dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </figcaption>
          </a>
        </div>
        `;
    })
  }
  EDUCONWRAPPER.innerHTML = EDUCONTENTSARRAY;
}
