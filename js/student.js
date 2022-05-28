document.getElementById('modal-body').innerHTML = `
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
