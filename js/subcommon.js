function subFixedFunc() {
  const MAINHEADER = document.querySelector(".common-header");
  const SUBHEADER = document.querySelector(".sub-header");
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > MAINHEADER.offsetHeight) {
      SUBHEADER.style = "position: fixed; top:0;";
    } else {
      SUBHEADER.style = "position: absolute;";
    }
  });
}

onload = function () {
  subFixedFunc();
};
