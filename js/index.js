// 공지사항 json 불러오기
let noticeJson = "";
fetch("./json/notice.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (notice) {
    noticeinit(notice.data);
  });
// 뉴스 json 불러오기
let newsJson = "";
fetch("./json/news.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (news) {
    newsinit(news.data);
  });
function newsinit(data) {
  newsJson = data;
  newsPrint();
}
// 유물 json 불러오기
let relicJson = "";
fetch("./json/relic.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (relic) {
    relicinit(relic.data);
    relicPrint();
  });
function relicinit(relicdata) {
  relicJson = relicdata;
}

// 공지사항 정렬후 출력
let mainNotice = [];
function noticeinit(data) {
  data.forEach(function (value, key) {
    if (value.number == "공지") {
      mainNotice.push(value);
    }
  });
  noticesorting();
  noticePrint();
}

function noticesorting() {
  mainNotice.sort(function (a, b) {
    if (a.date < b.date) return -1;
    if (a.date > a.date) return 1;
  });
}

let noticewrap = "";
function noticePrint() {
  const noticeContainer = document.querySelector(".notice-slide");

  mainNotice.forEach(function (value) {
    noticewrap += `
    <div class="notice-text-wrap">
    <p>${value.date}</p>
    <p>${value.title}</p>
    </div>
    `;
  });
  noticeContainer.innerHTML = noticewrap;
}

// 공지사항 로테이션
function noticeRoll() {
  let runtime = 2000;
  const noticeContainer = document.querySelector(".notice-slide");
  const noticeContent = document.querySelectorAll(".notice-text-wrap");
  // 이걸 못잡는 이유가 뭘까 VV
  noticeContainer.innerHTML += `<div class="notice-text-wrap">${noticeContent[0].innerHTML}</div>`;
  // count가 1인 이유는 기본 translate값이 0이기 때문에
  // interval delay가 선적용되므로 바로 1로 넘어갈 수 있도록
  let count = 1;
  setInterval(() => {
    noticeContainer.classList.add("slideTransition");
    noticeContainer.style = `transform: translateY(-${100 * count}%);`;
    count++;
    if (count > noticeContent.length) {
      count = 1;
    }
  }, runtime);
  // transition만큼 setTimeout을 주고 setInterval을 실행한다
  // interval은 runtime * length
  setTimeout(() => {
    setInterval(() => {
      noticeContainer.classList.remove("slideTransition");
      noticeContainer.style = "transform: translateY(0)";
    }, runtime * noticeContent.length);
  }, 300);
}

// 스와이퍼
const SWIPERWRAP = document.querySelector(".swiper-wrapper");

function newsPrint() {
  let newsdata = "";
  newsJson.forEach(function (value, key) {
    newsdata += `
        <div class="swiper-slide">
          <a href="#">
            <div class="news-imgwrap">
              <img src="${value.src}" />
              <span class="badge">${value.badge}</span>
            <div class="hide-more">
              <span>자세히 알아보기</span>
            </div>
            </div>
              <div class="news-textwrap">
                <span class="news-date">${value.startdate} - ${value.enddate}</span>
                <span class="news-title">${value.title}</span>
              </div>
            </a>
          </div>
        `;
  });
  SWIPERWRAP.innerHTML = newsdata;
}

function swiper() {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      360: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

//유물 masonry
function relicPrint() {
  const RELICCONTENT = document.querySelector(".relic-container");
  let relicPrintData = "";
  for (var i = 0; i < 12; i++) {
    relicPrintData += `
    <div class="grid-item">
      <a href=${relicJson[i].href}>
        <figure>
          <div class="img-wrap">
            <span>자세히 알아보기</span>
            <img src=${relicJson[i].src}>
          </div>
          <figcaption>
            <p>${relicJson[i].category}</p>
            <span>${relicJson[i].title}</span>
          </figcaption>
        </figure>
      </a>
    </div>
    `;
  }
  RELICCONTENT.innerHTML = relicPrintData;
}

function masonryfunc() {
  var elem = document.querySelector(".grid");
  var msnry = new Masonry(elem, {
    // options
    itemSelector: ".grid-item",
    columnWidth: ".grid-sizer",
    horizontalOrder: false,
  });

  // element argument can be a selector string
  //   for an individual element
  var msnry = new Masonry(".grid", {
    // options
  });
}

function parallax() {
  const FIRSTPARALLAX = document.querySelector(".first-parallax");
  const SECONDPARALLAX = document.querySelector(".second-parallax");
  window.addEventListener("scroll", function () {
    FIRSTPARALLAX.style = `left: ${window.pageYOffset * 0.4 - 400}px`;
    SECONDPARALLAX.style = `left: ${1400 - window.pageYOffset * 0.4}px`;
  });
}

//onload
window.addEventListener("load", function () {
  swiper();
  parallax();
  masonryfunc();
  noticeRoll();
});
