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

//bind modal elements
let className = document.getElementById("class-name");
let classDescription = document.getElementById("class-description");
let classStudents = document.getElementById("class-students");
let modalEl = document.getElementById("staticBackdrop");

//when modal is dismissed clear input fields
modalEl.addEventListener("hide.bs.modal", () => {
  className.classList.remove("is-invalid");
  className.value = "";
  classDescription.value = "";
  classStudents.value = "";
});

//Create new class
document.getElementById("confirm-class").addEventListener("click", () => {
  let modal = bootstrap.Modal.getInstance(modalEl);

  if (!className.value.trim()) {
    className.classList.add("is-invalid");
  } else {
    //Remove white space
    classStudentsVal = classStudents.value;
    classStudentsVal = classStudentsVal.trim();
    classStudentsVal = classStudentsVal.replaceAll(" ", "");
    classStudentsVal = classStudentsVal.replaceAll("\n", "");

    //Create request
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //TODO: show response
        console.log(this.responseText);
      }
    };
    xmlhttp.open("POST", "newClass.php", true);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send(
      `className=${className.value}&classDescription=${classDescription.value}&classStudents=${classStudentsVal}`
    );
    //confirm clicked --> close modal
    modal.hide();
  }
});

//Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
