//Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

let CLASSES = [];
function loadClasses() {
  //remove old container
  if ((el = document.getElementById('classes-container'))) {
    el.remove();
  }
  //bootstrap alert
  if ((el = document.getElementById('class-container'))) {
    el.remove();
  }
  const parent = document.getElementById('classes-page-container');
  document.getElementById('new-class-btn').classList.remove('d-none');
  parent.querySelector('.content-title').classList.remove('d-none');

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      CLASSES = [];
      let response = JSON.parse(this.responseText);
      const wrapper = document.createElement('div');
      wrapper.id = 'classes-container';
      wrapper.classList.add('row', 'g-3');
      for (let row in response) {
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
          ` <li class="list-group-item">${
            response[row].fname + ' ' + response[row].lname
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

        CLASSES.push({
          class: response[row].name,
          code: response[row].code,
          id: response[row].id,
        });
      }
      document.getElementById('classes-page-container').appendChild(wrapper);
    }
  };
  xmlhttp.open('GET', 'api/getClasses.php', true);
  xmlhttp.send();
}

function loadClass(code, name, description = '') {
  //hide classes header
  const parent = document.getElementById('classes-page-container');
  document.getElementById('new-class-btn').classList.add('d-none');
  parent.querySelector('.content-title').classList.add('d-none');
  //if there is an alert remove it
  document.getElementById('liveAlertPlaceholder').innerHTML = '';
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
              <a id="class-nav-announcements" class="nav-link me-3 active" href="javascript:void(0)">Announcements</a>
            </li>
            <li class="nav-item">
              <a id="class-nav-people" class="nav-link me-3" href="javascript:void(0)">People</a>
            </li>
            <li class="nav-item">
              <a id="class-nav-info" class="nav-link me-3" href="javascript:void(0)">Info</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="p-3" id="class-page-body">
    
    </div>
  `;
  //default load this page
  loadClassAnnouncementsPage(code);

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
      loadClassAnnouncementsPage(code);
    });

  classNavPeople.addEventListener('click', () => {
    classNavAnnouncements.classList.remove('active');
    classNavPeople.classList.add('active');
    classNavInfo.classList.remove('active');
    loadClassPeoplePage(code);
  });

  //Info page
  document.getElementById('class-nav-info').addEventListener('click', () => {
    classNavAnnouncements.classList.remove('active');
    classNavPeople.classList.remove('active');
    classNavInfo.classList.add('active');
    loadClassInfoPage(code);
  });
}

function loadClassAnnouncementsPage(code) {
  document.getElementById('class-page-body').innerHTML = `
        <form action="#" >
          <div class="h4" id="class-page-container">Post an announcement</div>
          <input type="text" class="form-control mb-2" placeholder="Title" id="announcement-title">
          <textarea class="form-control mb-2" style="height: 75px;" placeholder="Announcement" id="announcement-body"></textarea>
          <input id="post-announcement" type="submit" class="btn btn-primary px-4" value="Post">
          <span id="post-error" class="text-danger"></span>
        </form>
        <hr>
        <div class="h4 mb-3">Announcements</div>
        <div id="announcements-container"></div>
        `;
  document
    .getElementById('post-announcement')
    .addEventListener('click', (event) => {
      postClassAnnouncement(event, code);
    });

  loadAnnouncements(code);
}

function loadAnnouncements(code) {
  const wrapper = document.getElementById('announcements-container');
  wrapper.innerHTML = '';
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      for (let row in response) {
        const div = document.createElement('div');
        div.classList.add('mb-3', 'p-2', 'border', 'rounded', 'bg-white');
        div.innerHTML = `
          <div class="d-flex justify-content-between">
            <div class="h6 text-muted">${response[row].fname} ${
          response[row].lname
        }</div>
            <div>${response[row].timestamp}</div>
          </div>
          <div class="h5">${
            response[row].title ? response[row].title : 'No title'
          }</div>
          <div>${response[row].body}</div>
        `;
        wrapper.appendChild(div);
      }
    }
  };
  xmlhttp.open('GET', 'api/getAnnouncements.php?code=' + code, true);
  xmlhttp.send();
}

function postClassAnnouncement(event, code) {
  //prevent page refresh
  event.preventDefault();
  let title = document.getElementById('announcement-title');
  let body = document.getElementById('announcement-body');
  let err = document.getElementById('post-error');
  if (!title.value && !body.value) {
    title.classList.add('is-invalid');
    body.classList.add('is-invalid');
    err.innerText = 'Enter a title or a body.';
  } else {
    //send post request
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        title.value = '';
        body.value = '';
        err.innerText = '';
        title.classList.remove('is-invalid');
        body.classList.remove('is-invalid');
        loadAnnouncements(code);
      }
    };
    xmlhttp.open('POST', 'api/addAnnouncement.php', true);
    xmlhttp.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );
    xmlhttp.send(
      `classCode=${code}&announcementTitle=${title.value}&announcementBody=${body.value}`
    );
  }
}

function loadClassPeoplePage(code) {
  document.getElementById('class-page-body').innerHTML = `
    <div class="h4 mb-3">People</div>
  `;
  const table = document.createElement('table');
  table.classList.add('table');
  table.innerHTML = `
  <thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Occupation</th>
    <th scope="col">First</th>
    <th scope="col">Last</th>
    <th scope="col">Email</th>
  </tr>
  </thead>
  `;

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);

      for (let row in response) {
        tbody.innerHTML += `
        <tr>
          <th scope="row">${parseInt(row) + 1}</th>
          <td>${response[row].type == 1 ? 'Student' : 'Teacher'}</td>
          <td>${response[row].fname}</td>
          <td>${response[row].lname}</td>
          <td>${response[row].email}</td>
        </tr>
        `;
      }
      document.getElementById('class-page-body').appendChild(table);
    }
  };
  xmlhttp.open('GET', 'api/getPeople.php?code=' + code, true);
  xmlhttp.send();
  //if teacher display add people form
  if (type == 0) {
    addPeopleForm(code);
  }
}

function loadClassInfoPage(code) {
  document.getElementById('class-page-body').innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.classList.add('mt-md-5');
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      for (let key in response) {
        wrapper.innerHTML += `
              <div class="row justify-content-md-center mb-2 fs-6">
                <div class="col-md-3 col-auto">
                  <strong>${key.replace(/\b\w/g, (l) =>
                    l.toUpperCase()
                  )}</strong>
                </div>
                <div class="col-md-3 col-auto">
                  ${response[key] ? response[key] : '-'}
                </div>
              </div>
          `;
      }
      document.getElementById('class-page-body').appendChild(wrapper);
    }
  };
  xmlhttp.open('GET', 'api/getClassInfo.php?code=' + code, true);
  xmlhttp.send();
}

//TODO
async function loadForms(type) {
  //show header
  const parent = document.getElementById(`${type}-page-container`);
  if ((el = parent.querySelector('#form-container'))) {
    el.remove();
  }
  parent.querySelector('.content-title').classList.remove('d-none');
  if (parent.children[1] && parent.children[2]) {
    //show hr
    parent.children[1].classList.remove('d-none');
    //show subtitle
    parent.children[2].classList.remove('d-none');
  }

  if (document.contains(parent.querySelector(`#new-${type.slice(0, -1)}`))) {
    parent
      .querySelector(`#new-${type.slice(0, -1)}`)
      .classList.remove('d-none');
  }

  return fetch(`api/getForms.php?type=${type}`)
    .then((res) => res.json())
    .then((res) => {
      try {
        document.getElementById(`${type}-container`).remove();
      } catch {}
      const wrapper = document.createElement('div');
      wrapper.id = `${type}-container`;
      wrapper.classList.add('row', 'g-3');
      for (let index in res) {
        const row = res[index];
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-md-6', 'col-lg-4');
        div.setAttribute(`data-form-${type}`, row['id']);
        const card = document.createElement('div');
        card.classList.add('card', 'position-relative');
        card.style.cursor = 'pointer';
        let d = new Date(row['end_date_time']);
        const date = d.toDateString();
        const time = d.toTimeString().slice(0, 5);
        card.innerHTML = [
          '<div class="card-body">',
          `<h5 class="card-title">${row['class_name']} - ${row['title']}</h5>`,
          `<h6 class="card-subtitle mb-2 text-muted">Due Date ${date} at ${time}</h6>`,
          '</div>',
        ].join('');
        card.addEventListener('click', () => {
          loadForm(row['id'], type, row['title'], row['class_name']);
        });
        div.append(card);
        wrapper.append(div);
      }
      document.getElementById(`${type}-page-container`).append(wrapper);
    });
}

function formValid(element, bool = true) {
  if (Array.isArray(element)) {
    element.forEach((el) => formValid(el, bool));
    return;
  }

  if (bool) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    return;
  }
  element.classList.remove('is-valid');
  element.classList.add('is-invalid');
}
