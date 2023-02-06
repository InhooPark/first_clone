$("body").prepend("<header>");
$("body").append("<footer>");
//head callback 함수는 서브메뉴 페이지로 넘어갔을때 class 추가해서 가시성 높이는 용도 추후 제작
$("header").load("./inc.html header>div", FOOTERLOAD);
function FOOTERLOAD() {
  $("footer").load("./inc.html footer>div", COMMONLOAD);
}

//메일
function mailCheckFunc() {
  const mailBtn = document.querySelector(".email-btn");
  const mailCheckText = document.querySelector(".email-check");
  mailCheckText.textContent = "　";
  mailBtn.addEventListener("mouseup", function () {
    const mailCheck = document.querySelector(".email-text").value;
    check = /\S+@+\S+.+\S/;
    if (check.test(mailCheck)) {
      mailCheckText.textContent = `입력하신 이메일 주소(${mailCheck})로 확인 메일을 보내드렸습니다.`;
    } else if (mailCheck == "") {
      mailCheckText.textContent = `이메일 주소를 입력하세요.`;
    } else {
      mailCheckText.textContent = `잘못된 이메일 주소입니다.`;
    }
  });
}

// 뻐거
function burgerFunc() {
  const BURGER = document.querySelector(".burger-wrap");
  const BURGERMENU = document.querySelector(".burger-open");
  const BURGERANIMATION = document.querySelectorAll(".burger-wrap span");
  BURGER.addEventListener("click", function () {
    BURGERMENU.classList.toggle("on");
    BURGERANIMATION.forEach(function (value) {
      value.classList.toggle("on");
    });
  });
}

//메뉴 온오프
function menuOnOff() {
  const target = document.querySelectorAll(".gnb >ul >li");
  const targetOn = document.querySelectorAll(".menu-minor");
  target.forEach(function (value, key) {
    value.addEventListener("mouseover", function () {
      targetOn[key].classList.add("on");

      setTimeout(() => {
        targetOn[key].classList.add("opct");
      }, 1);
    });
    value.addEventListener("mouseout", function () {
      targetOn[key].classList.remove("on");
      // transition delay 중간에 옮기면 opct가 remove 되지 않는다. 해결방안은?
      targetOn[key].classList.remove("opct");
    });
  });
}
function categoryColor() {
  let URLTEXT = window.location.href.split("/")[3].split(".")[0];
  const ALLCATEGORY = document.querySelectorAll(".gnb >ul >li");

  if (URLTEXT.toLowerCase() == "guide") {
    ALLCATEGORY[0].classList.add("this");
  } else if (URLTEXT.toLowerCase() == "exhibition") {
    ALLCATEGORY[1].classList.add("this");
  } else if (URLTEXT.toLowerCase() == "education") {
    ALLCATEGORY[2].classList.add("this");
  } else if (URLTEXT.toLowerCase() == "notice") {
    ALLCATEGORY[3].classList.add("this");
  } else if (URLTEXT.toLowerCase() == "relic") {
    ALLCATEGORY[4].classList.add("this");
  } else if (URLTEXT.toLowerCase() == "museum") {
    ALLCATEGORY[5].classList.add("this");
  }
}

// upBTN
function scrollFunc() {
  const UPBTN = document.querySelector(".upbtn");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      UPBTN.classList.add("on");
    } else {
      UPBTN.classList.remove("on");
    }
  });
}
function upbtnClick() {
  const UPBTN = document.querySelector(".upbtn");
  UPBTN.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// mobile burger
function mobileBurger() {
  let prekey = 0;
  const MAJOR = document.querySelectorAll(".major-ctg");

  MAJOR.forEach((value, key) => {
    value.addEventListener("click", () => {
      if (value.classList.contains("minor-open")) {
        value.classList.remove("minor-open");
      } else {
        MAJOR[prekey].classList.remove("minor-open");
        MAJOR[key].classList.add("minor-open");
        prekey = key;
      }
    });
  });
}

function COMMONLOAD() {
  mailCheckFunc();
  burgerFunc();
  menuOnOff();
  categoryColor();
  scrollFunc();
  upbtnClick();
  mobileBurger();
}
