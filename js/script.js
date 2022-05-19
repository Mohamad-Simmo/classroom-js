//Change active links on sidebar
let currentActive;
let title = document.getElementById("content-title");
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.classList.contains("active")) {
    currentActive = link;
  }
  link.addEventListener("click", () => {
    if (link.classList.contains("active")) {
      link.classList.toggle("active");
      currentActive.classList.toggle("active");
      currentActive = link;
    } else {
      link.classList.add("active");
      currentActive.classList.toggle("active");
      currentActive = link;
    }
  });
});

//Create new class
document.getElementById("confirm-class").addEventListener("click", () => {
  let className = document.getElementById("class-name").value;
  let classDescription = document.getElementById("class-description").value;
  let classStudents = document.getElementById("class-students").value;
  console.log(className + " " + classDescription + " " + classStudents);
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

/* document.getElementById("new-class-btn").addEventListener("click", () => {
  console.log("clicked");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xmlhttp.open("POST", "testAjax.php");
  xmlhttp.send();
}); */
