fetch("./json/relic.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (relic) {
    init(relic);
    relicPrint("all");
  });

let relicJson = "";
function init(relicdata) {
  relicJson = relicdata.data;
}

// 출력 컨텐츠 최대치를 잡아야 하기 때문에 forEach보다는 for문이 나을듯
// 이부분은 masonry에 있었던것 같음 확인하고 할것
function relicPrint(category = "") {
  const RELICCONTENT = document.querySelector(".relic-container");
  let relicPrintData = "";
  if (category == "all") {
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
        <div class="relic-popup">
          <div class="del">X</div>
          <div class="popup-img-wrap">
            <img src=${relicJson[i].src}>
          </div>
        </div>
      </div>
      `;
    }
  } else {
    let count = 0;
    relicJson.forEach(function (vv, kk) {
      if (vv.categoryen == category) {
        if (count < 12) {
          relicPrintData += `
          <div class="grid-item">
            <a href=${vv.href}>
              <figure>
                <div class="img-wrap">
                  <span>자세히 알아보기</span>
                  <img src=${vv.src}>
                </div>
                <figcaption>
                  <p>${vv.category}</p>
                  <span>${vv.title}</span>
                </figcaption>
              </figure>
            </a>

            <div class="relic-popup">
              <div class="del">X</div>
              <div class="popup-img-wrap">
                <img src=${vv.src}>
              </div>
            </div>
          </div>
          `;
        }
        count++;
      }
    });
  }
  RELICCONTENT.innerHTML = relicPrintData;

  const target = document.querySelectorAll(".relic-popup");
  const POPUP = document.querySelectorAll(".grid-item");
  const POPUPDOWN = document.querySelectorAll(".del");
  const HEADER = this.document.querySelector("header");

  POPUP.forEach(function (btn, key) {
    btn.addEventListener(
      "click",
      function () {
        target[key].classList.add("on");
        HEADER.classList.add("popup-disable");
      },
      true
    );
  });
  POPUPDOWN.forEach(function (value, key) {
    value.addEventListener(
      "click",
      function () {
        target[key].classList.remove("on");
        HEADER.classList.remove("popup-disable");
      },
      false
    );
  });

  // 프린트 후에 settimeout, (delay)ms 후에 masonry정렬이 들어가게 한다.
  // main에서는 한차례만 정렬하면 괜찮지만 여기서는 json 이용해서 데이터만 바꾸기 때문에
  // onload가 아니라 setTimeout으로 처리한다.
  setTimeout(() => {
    masonryfunc();
  }, 200);
}

// 버튼 입력시 id값 전송해서 출력
const categoryBTN = document.querySelectorAll(".category");
categoryBTN.forEach(function (btn) {
  btn.addEventListener("click", function () {
    relicPrint(btn.id);
  });
});

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

// window.addEventListener("load", function () {
//   const target = document.querySelectorAll(".relic-popup");
//   const POPUP = document.querySelectorAll(".grid-item");
//   const POPUPDOWN = document.querySelectorAll(".del");
//   const HEADER = this.document.querySelector("header");

//   POPUP.forEach(function (btn, key) {
//     btn.addEventListener(
//       "click",
//       function () {
//         target[key].classList.add("on");
//         HEADER.classList.add("popup-disable");
//       },
//       true
//     );
//   });
//   POPUPDOWN.forEach(function (value, key) {
//     value.addEventListener(
//       "click",
//       function () {
//         target[key].classList.remove("on");
//         HEADER.classList.remove("popup-disable");
//       },
//       false
//     );
//   });
// });
