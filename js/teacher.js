document.getElementById('modal-class-body').innerHTML = `
  <div class="row g-2 align-items-center mb-3">
    <div class="col-3">
      <label for="class-name" class="col-form-label">Class
        Name</label>
    </div>
    <div class="col-9">
      <input type="text" id="class-name" class="form-control"
        autocomplete="off" placeholder="Required" />
    </div>
  </div>

  <div class="row g-2 align-items-center mb-3">
    <div class="col-3">
      <label for="class-description"
        class="col-form-label">Description</label>
    </div>
    <div class="col-9">
      <input type="text" id="class-description" class="form-control"
        autocomplete="off" placeholder="Optional" />
    </div>
  </div>

  <div class="row g-2 align-items-center">
    <div class="col-3">
      <label for="class-students" class="col-form-label">Add
        Students</label>
    </div>
    <div class="col-9">
      <textarea name="" cols="30" rows="10" type="text"
        id="class-students" class="form-control"
        placeholder="Comma-sperated emails (Optional)"
        autocomplete="off"></textarea>
    </div>
  </div>
  `;

//Bind modal elements
const className = document.getElementById('class-name');
const classDescription = document.getElementById('class-description');
const classStudents = document.getElementById('class-students');
const modalEl = document.getElementById('staticBackdrop');

//If modal is dismissed clear input fields
modalEl.addEventListener('hide.bs.modal', () => {
  className.classList.remove('is-invalid');
  className.value = '';
  classDescription.value = '';
  classStudents.value = '';
});

//Create new class
document.getElementById('confirm-class').addEventListener('click', () => {
  const modal = bootstrap.Modal.getInstance(modalEl);

  if (!className.value.trim()) {
    className.classList.add('is-invalid');
  } else {
    //Remove white space
    let classStudentsVal = classStudents.value;
    classStudentsVal = classStudentsVal.trim();
    classStudentsVal = classStudentsVal.replaceAll(' ', '');
    classStudentsVal = classStudentsVal.replaceAll('\n', '');

    //Create request
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);

        //Create alert
        const wrapper = document.createElement('div');
        alertElement = [
          '<div class="alert alert-secondary alert-dismissible" role="alert">',
          `   <div>${response.message}</div>`,
        ];
        if (response.emails) {
          for (let i = 0; i < response.emails.length; i++) {
            alertElement.push(
              `<div ${
                response.emails[i].added
                  ? 'class="text-success"> Added'
                  : 'class="text-danger"> Failed to add'
              }: ${response.emails[i].email}</div>`
            );
          }
        }
        alertElement.push(
          '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">',
          '</button>',
          '</div>'
        );
        wrapper.innerHTML = alertElement.join('');
        document.getElementById('liveAlertPlaceholder').append(wrapper);
        loadClasses();
      }
    };
    xmlhttp.open('POST', 'api/addClass.php', true);
    xmlhttp.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );
    xmlhttp.send(
      `className=${className.value}&classDescription=${classDescription.value}&classStudents=${classStudentsVal}`
    );
    //confirm clicked --> close modal
    modal.hide();
  }
});

function addPeopleForm(code) {
  const form = document.createElement('div');

  form.innerHTML = `
    <div class="h4" id="class-page-container">Add people</div>
    <textarea 
      class="form-control mb-2" 
      style="height: 75px;"
      placeholder="Comma-separated Emails" 
      id="peopleEmails"></textarea>
    <input id="submitPeopleEmails" type="submit" class="btn btn-primary px-4" value="Confirm">
    <span id="" class="text-danger"></span>
  `;
  document
    .getElementById('class-page-body')
    .prepend(document.createElement('hr'));
  document.getElementById('class-page-body').prepend(form);

  document
    .getElementById('submitPeopleEmails')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const peopleEmails = document.getElementById('peopleEmails');
      let peopleEmailsVal = peopleEmails.value;
      peopleEmailsVal = peopleEmailsVal.trim();
      peopleEmailsVal = peopleEmailsVal.replaceAll(' ', '');
      peopleEmailsVal = peopleEmailsVal.replaceAll('\n', '');

      let xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          loadClassPeoplePage(code);
        }
      };
      xmlhttp.open('POST', 'api/addPeople.php', true);
      xmlhttp.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      );
      xmlhttp.send(`code=${code}&people=${peopleEmailsVal}`);
    });
}

let formType;
document.querySelectorAll('.new-form').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById('modal-new-form');
    let modalTitle = modal.querySelector('.modal-title');
    if (btn.id === 'new-assignment') {
      modalTitle.innerText = 'New Assignment';
      formType = 'assignment';
    } else if (btn.id === 'new-test') {
      modalTitle.innerText = 'New Test';
      formType = 'test';
    }
    //select class
    const body = modal.querySelector('.modal-form-body');
    body.innerHTML = `
      <select class="form-select mb-3" id="select-class">
        <option selected disabled hidden value>Select Class</option>
      </select>
      <input type="text" class="form-control mb-3" placeholder="Title" id="form-title"/>
      <div class="row mb-3 align-items-center">
        <div class="col-3 text-center">
            <label for="start-date">Start Date</label>
        </div>
        <div class="col-9">
            <input type="date" class="form-control" id="start-date"/>
        </div>
        </div>
        <div class="row mb-3 align-items-center">
            <div class="col-3 text-center">
                <label for="start-time">Start Time</label>
            </div>
            <div class="col-9">
                <input type="time" class="form-control" id="start-time"/>
            </div>
        </div>
        <div class="row mb-3 align-items-center">
            <div class="col-3 text-center">
                <label for="end-date">End Date</label>
            </div>
            <div class="col-9">
                <input type="date" class="form-control" id="end-date"/>
            </div>
        </div>
        <div class="row mb-3 align-items-center">
            <div class="col-3 text-center">
                <label for="end-time">End Time</label>
            </div>
            <div class="col-9">
                <input type="time" class="form-control" id="end-time"/>
            </div>
        </div>
    `;
    CLASSES.forEach((c) => {
      const option = document.createElement('option');
      option.innerText = c.class;
      option.value = c.code;
      body.querySelector('.form-select').append(option);
    });

    const createBtn = modal.querySelector('#create-form');
    if (createBtn.getAttribute('listener') !== 'true') {
      createBtn.addEventListener('click', (event) => {
        createBtn.setAttribute('listener', 'true');
        //FORM VALIDATION
        let error = false;
        let datesError = false;

        const selectClass = modal.querySelector('#select-class');
        const classCode = selectClass.value;
        if (classCode.trim().length !== 13) {
          formValid(selectClass, false);
          error = true;
        } else formValid(selectClass, true);

        const titleEl = modal.querySelector('#form-title');
        const title = titleEl.value;
        if (title.trim().length == 0) {
          formValid(titleEl, false);
          error = true;
        } else formValid(titleEl, true);

        const startDateEl = modal.querySelector('#start-date');
        const startDate = startDateEl.value;
        if (startDate.trim().length == 0) {
          formValid(startDateEl, false);
          datesError = true;
        } else formValid(startDateEl, true);

        const startTimeEl = modal.querySelector('#start-time');
        const startTime = startTimeEl.value;
        if (startTime.trim().length == 0) {
          formValid(startTimeEl, false);
          datesError = true;
        } else formValid(startTimeEl, true);

        const endDateEl = modal.querySelector('#end-date');
        const endDate = endDateEl.value;
        if (endDate.trim().length == 0) {
          formValid(endDateEl, false);
          datesError = true;
        } else formValid(endDateEl, true);

        const endTimeEl = modal.querySelector('#end-time');
        const endTime = endTimeEl.value;
        if (endTime.trim().length == 0) {
          formValid(endTimeEl, false);
          datesError = true;
        } else formValid(endTimeEl, true);

        const start = new Date(`${startDate} ${startTime}`);
        const end = new Date(`${endDate} ${endTime}`);
        const dateElements = [startDateEl, startTimeEl, endDateEl, endTimeEl];

        // if date fields are valid compare dates
        if (!datesError) {
          if (start >= end) {
            formValid(dateElements, false);
            error = true;
          } else {
            formValid(dateElements, true);
          }
        }

        if (!error) {
          window.location.href = `
            ./create_form.php?title=${title}&code=${classCode}&type=${formType}&start_d=${startDate}&start_t=${startTime}&end_d=${endDate}&end_t=${endTime}
          `;
          bootstrap.Modal.getInstance(modal).toggle();
        }
      });
    }
  });
});

function loadForm(id, type, name) {
  const parent = document.getElementById(`${type}-page-container`);
  //hide header
  parent.querySelector('.content-title').classList.add('d-none');
  parent.querySelector(`#new-${type.slice(0, -1)}`).classList.add('d-none');
  //hide hr
  parent.children[1].classList.add('d-none');
  //hide subtitle
  parent.children[2].classList.add('d-none');
  //remove children
  document.getElementById(`${type}-container`).replaceChildren();

  const form = document.createElement('div');
  form.id = 'form-container';
  form.innerHTML = `
    <nav class="navbar navbar-expand-md navbar-dark bg-primary" style="margin-inline: -1rem;">
      <div class="container-fluid">
        <div class="navbar-brand mb-0 h1 fs-2 fw-normal">
          ${name}
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarForm"
          aria-controls="navbarForm"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarForm">
          <ul class="navbar-nav fs-5">
            <li class="nav-item">
              <a id="form-submissions" class="nav-link me-3 active" href="javascript:void(0)">
                Submissions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
  //TODO: GET SUBMISSION DATA
  fetch(`api/getSubmissions.php?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      const table = document.createElement('table');
      table.classList.add('table');
      const thead = document.createElement('thead');
      thead.innerHTML = [
        '<tr>',
        '<th scope="col">#</th>',
        '<th scope="col">First</th>',
        '<th scope="col">Last</th>',
        '<th scope="col">Email</th>',
        '<th scope="col">Grade</th>',
        '<th scope="col">Submit Time</th>',
        '</tr>',
      ].join('');
      const tbody = document.createElement('tbody');
      for (let row in res) {
        tbody.innerHTML += [
          '<tr>',
          `<th scope="row">${parseInt(row) + 1}</th>`,
          `<td>${res[row]['fname']}</td>`,
          `<td>${res[row]['lname']}</td>`,
          `<td>${res[row]['email']}</td>`,
          `<td>${res[row]['grade']}</td>`,
          `<td>${res[row]['date_time']}</td>`,
          '</tr>',
        ].join('');
      }
      table.appendChild(thead);
      table.appendChild(tbody);

      form.appendChild(table);
    });

  parent.appendChild(form);
}

function addSubmitCount(type) {
  document.querySelectorAll(`[data-form-${type}]`).forEach((el) => {
    let id;
    if (type === 'assignments') {
      id = el.dataset.formAssignments;
    } else if (type === 'tests') {
      id = el.dataset.formTests;
    }
    fetch(`api/getSubmissions.php?id=${id}&count`)
      .then((res) => res.text())
      .then((res) => {
        const span = document.createElement('span');
        span.classList.add('badge', 'text-bg-secondary', 'p-2');
        span.innerText = 'Submissions: ' + res;
        el.querySelector('.card-body').appendChild(span);
      });
  });
}
