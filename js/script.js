//Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

//Bind modal elements
let className = document.getElementById('class-name');
let classDescription = document.getElementById('class-description');
let classStudents = document.getElementById('class-students');
let modalEl = document.getElementById('staticBackdrop');

//If modal is dismissed clear input fields
modalEl.addEventListener('hide.bs.modal', () => {
  className.classList.remove('is-invalid');
  className.value = '';
  classDescription.value = '';
  classStudents.value = '';
});

//Create new class
document.getElementById('confirm-class').addEventListener('click', () => {
  let modal = bootstrap.Modal.getInstance(modalEl);

  if (!className.value.trim()) {
    className.classList.add('is-invalid');
  } else {
    //Remove white space
    classStudentsVal = classStudents.value;
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

function loadClasses() {
  //remove old container
  if ((el = document.getElementById('classes-container'))) {
    el.remove();
  }
  if ((el = document.getElementById('class-container'))) {
    el.remove();
  }
  document.getElementById('content-title').innerText = 'Classes';
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      const wrapper = document.createElement('div');
      wrapper.id = 'classes-container';
      wrapper.classList.add('row', 'g-3');
      for (let row in response) {
        console.log(response[row]);
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-md-6', 'col-lg-4');
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = [
          '<ul class="list-group list-group-flush">',
          ` <li class="list-group-item">${response[row].name}</li>`,
          ` <li class="list-group-item">${
            response[row].description ? response[row].description : '-'
          }</li>`,
          ` <li class="list-group-item">People: ${response[row].num_people}</li>`,
          '</ul>',
        ].join('');

        card.setAttribute('data-code', response[row].code);
        card.setAttribute('data-name', response[row].name);
        if ((desc = response[row].description))
          card.setAttribute('data-description', desc);
        card.style = 'cursor: pointer';

        card.addEventListener('click', () =>
          loadClass(
            card.dataset.code,
            card.dataset.name,
            card.dataset.description
          )
        );
        div.appendChild(card);
        wrapper.appendChild(div);
      }
      document.getElementById('classes-page-container').appendChild(wrapper);
    }
  };
  xmlhttp.open('GET', 'api/getClasses.php', true);
  xmlhttp.send();
}

function loadClass(code, name, description = '') {
  //hide classes header
  document.getElementById('new-class-btn').classList.add('d-none');
  document.getElementById('content-title').classList.add('d-none');
  //remove classes element
  if ((el = document.getElementById('classes-container'))) {
    el.remove();
  }

  //create the class element
  classContainer = document.createElement('div');
  classContainer.id = 'class-container';
  document.getElementById('classes-page-container').appendChild(classContainer);
  classContainer.innerHTML = `
    <nav class="navbar navbar-expand-md bg-warning" style="margin:-2rem -1rem 0 -1rem">
      <div class="container-fluid">
        <div class="navbar-brand mb-0 h1 fs-2 fw-normal">
          ${name}
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul class="navbar-nav fs-5">
            <li class="nav-item">
              <a id="class-nav-announcements" class="nav-link me-3 active" href="#">Announcements</a>
            </li>
            <li class="nav-item">
              <a id="class-nav-people" class="nav-link me-3" href="#">People</a>
            </li>
            <li class="nav-item">
              <a id="class-nav-info" class="nav-link me-3" href="#">Info</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="p-3" id="class-page-body">
    
    </div>
  `;
  //default load this page
  loadClassAnnouncementsPage();

  //get class nav links
  classNavAnnouncements = document.getElementById('class-nav-announcements');
  classNavPeople = document.getElementById('class-nav-people');
  classNavInfo = document.getElementById('class-nav-info');
  //Announcements page
  document
    .getElementById('class-nav-announcements')
    .addEventListener('click', () => {
      classNavAnnouncements.classList.add('active');
      classNavPeople.classList.remove('active');
      classNavInfo.classList.remove('active');
      loadClassAnnouncementsPage();
    });

  classNavPeople.addEventListener('click', () => {
    classNavAnnouncements.classList.remove('active');
    classNavPeople.classList.add('active');
    classNavInfo.classList.remove('active');
    document.getElementById('class-page-body').innerHTML = 'people';
  });

  //Info page
  document.getElementById('class-nav-info').addEventListener('click', () => {
    classNavAnnouncements.classList.remove('active');
    classNavPeople.classList.remove('active');
    classNavInfo.classList.add('active');
    document.getElementById('class-page-body').innerHTML = 'INFO';
  });
}

function loadClassAnnouncementsPage() {
  document.getElementById('class-page-body').innerHTML = `
        <form action="#" >
          <div class="h4" id="class-page-container">Post an announcement</div>
          <input type="text" class="form-control mb-2" placeholder="Title" id="announcement-title">
          <textarea class="form-control mb-2" style="height: 75px;" placeholder="Announcement" id="announcement-body"></textarea>
          <input id="post-announcement" type="submit" class="btn btn-primary px-4" value="Post">
          <span id="post-error" class="text-danger"></span>
        </form>
        <hr>
        <div class="h4">Announcements</div>
        <div id="announcements-container"></div>
        `;
  document
    .getElementById('post-announcement')
    .addEventListener('click', (event) => {
      postClassAnnouncement(event);
    });
}

function postClassAnnouncement(event) {
  //prevent page refresh
  event.preventDefault();
  let title = document.getElementById('announcement-title');
  let body = document.getElementById('announcement-body');
  //TODO: if both are empty invalid
  if (!title.value && !body.value) {
    title.classList.add('is-invalid');
    body.classList.add('is-invalid');
    document.getElementById('post-error').innerText =
      'Enter a title or a body.';
  } else {
    //send post request
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      }
    };
    xmlhttp.open('POST', 'api/addAnnouncement.php', true);
    xmlhttp.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );
    xmlhttp.send(
      `announcementTitle=${title.value}&announcementBody=${body.value}`
    );
  }
}

function loadClassPeoplePage() {}

function loadClassInfoPage() {}
