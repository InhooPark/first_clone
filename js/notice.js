let jsonData = "";
fetch("./json/notice.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (notice) {
    init(notice.data);
  });

let tableData = "";
let keyword;
const NOTICECONTENT = document.querySelector(".search-content-table table tbody");

function init(data) {
  jsonData = data;
  dateSorting();
  jsonPrint();
}

function dateSorting() {
  let count = 1;
  jsonData.sort(function (a, b) {
    if (a.date > b.date) return 1;
    if (a.date < b.date) return -1;
  });
  jsonData.forEach(function (value, key) {
    if (value.number == "") {
      value.number = count;
      count++;
    }
  });
  jsonData.sort(function (a, b) {
    if (a.number == "공지") return -1;
    if (a.number > b.number) return -1;
    if (a.number < b.number) return 1;
  });
}

function jsonPrint(target = "") {
  jsonData.forEach(function (value) {
    if (target == "") {
      tableData += `
      <tr class="search-content">
        <td>${value.number}</td>
        <td class="border-title">${value.title}</td>
        <td>${value.date}</td>
        <td>${value.count}</td>
      </tr>
      `;
    } else {
      if (value.title.includes(target)) {
        tableData += `
        <tr class="search-content">
          <td>${value.number}</td>
          <td class="border-title">${value.title}</td>
          <td>${value.date}</td>
          <td>${value.count}</td>
        </tr>
        `;
      }
    }
  });
  dateSorting();

  NOTICECONTENT.innerHTML = tableData;
  tableData = "";
}
window.addEventListener("load", () => {
  keyword = document.querySelectorAll(".border-title");
  const SEARCHBUTTON = document.querySelector(".searchicon-wrap");
  let search_query = document.getElementById("search-box");
  SEARCHBUTTON.addEventListener("click", function () {
    jsonPrint(search_query.value);
  });
});

// 공지 칠하는거가 문제임 이거 해결해야함
/* function noticePaint(){
  const noticeBack = document.querySelectorAll(".search-content");
  console.log(noticeBack);
  jsonData.forEach(function (value, key) {
    if (value.number == "공지") {
      noticeBack[key].style = "background-color: #e0e0e0";
    }
  });
} */
