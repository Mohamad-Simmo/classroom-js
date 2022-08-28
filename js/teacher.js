//TODO: Add teacher buttons (Edit, Delete, etc.)
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
        //TODO: show response
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
        <option selected disabled hidden>Select Class</option>
      </select>
      <input type="text" class="form-control" placeholder="Title" id="form-title"/>
    `;
    CLASSES.forEach((c) => {
      const option = document.createElement('option');
      option.innerText = c.class;
      option.value = c.code;
      body.querySelector('.form-select').append(option);
    });
    modal.querySelector('#create-form').addEventListener('click', () => {
      const selectEl = modal.querySelector('#select-class');
      const classCode = selectEl.value;
      const title = modal.querySelector('#form-title').value;
      window.open(
        `./create_form.php?title=${title}&code=${classCode}&type=${formType}`,
        '_blank'
      );
      bootstrap.Modal.getInstance(modal).hide();
    });
  });
});
