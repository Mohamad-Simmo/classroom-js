const containerGrades = document.getElementById('grades-page-container');
const sidebarGrades = document.getElementById('sidebar-btn-grades');
containers.push(containerGrades);
navs.push(sidebarGrades);

sidebarGrades.addEventListener('click', () => {
  loadPage(sidebarGrades, containerGrades);
});

document.getElementById('modal-class-body').innerHTML = `
<div class="row g-2 align-items-center mb-3">
  <div class="col-3">
    <label for="class-code" class="col-form-label">Class Code</label>
  </div>
  <div class="col-9">
    <input type="text" id="class-code" class="form-control"
      autocomplete="off" placeholder="Required" />
  </div>
</div>
`;

let modalEl = document.getElementById('staticBackdrop');
const classCode = document.getElementById('class-code');
//If modal is dismissed clear input fields
modalEl.addEventListener('hide.bs.modal', () => {
  classCode.classList.remove('is-invalid');
  classCode.value = '';
});

document.getElementById('join-class').addEventListener('click', () => {
  let modal = bootstrap.Modal.getInstance(modalEl);

  if (!classCode.value.trim()) {
    classCode.classList.add('is-invalid');
  } else {
    //Create request
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        loadClasses();
      }
    };
    xmlhttp.open('POST', 'api/joinClass.php', true);
    xmlhttp.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );
    xmlhttp.send(`classCode=${classCode.value}`);
    modal.hide();
  }
});

function loadForm(id, type, name, className) {
  window.location.href = `./form.php?id=${id}&type=${type}&title=${name}&class=${className}`;
}

function loadGrades() {
  if (containerGrades.children[1]) {
    containerGrades.children[1].remove();
  }
  const table = document.createElement('table');
  table.classList.add('table');
  const thead = document.createElement('thead');
  thead.innerHTML = [
    '<th scope="col">Class</th>',
    '<th scope="col">Title</th>',
    '<th scope="col">Grade</th>',
  ].join('');
  const tbody = document.createElement('tbody');
  fetch('api/getGrades.php')
    .then((res) => res.json())
    .then((res) => {
      for (let index in res) {
        tbody.innerHTML += [
          `<td scope="row">${res[index]['name']}</td>`,
          `<td scope="row">${res[index]['title']}</td>`,
          `<td scope="row">${res[index]['grade']}</td>`,
        ].join('');
      }
      table.appendChild(thead);
      table.appendChild(tbody);
      containerGrades.appendChild(table);
    });
}
