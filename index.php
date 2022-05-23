<?php
    $title = 'Home';
    include('partials/header.php');

    if(!(isset($_SESSION["loggedin"])) || $_SESSION["loggedin"] === false){
      header("location: login.php");
      exit;
    }
    elseif ($_SESSION["type"] == 1) {
      header("location: student.php");
      exit;
    }
?>

<div
  class="d-flex flex-column flex-shrink-0 p-2 text-white bg-dark vh-100 align-items-center align-items-md-stretch"
  style="width: 250px" id="sidebar-container">
  <a href="./"
    class="d-flex align-items-center mb-0 me-md-auto text-white text-decoration-none">
    <i class="bi bi-book me-md-2 me-0" style="font-size: 3rem;"></i>
    <span class="fs-4 d-none d-md-inline-block">LIU
      Classroom</span>
  </a>
  <div
    class="col-7 text-warning fw-semibold w-100 text-center text-md-start text-wrap text-truncate">
    <?php echo $_SESSION["name"]; ?>
  </div>
  <hr class="mt-2 mb-3" />
  <ul class="nav nav-pills flex-column mb-auto h-100">
    <li class="nav-item mx-auto mx-md-0">
      <a href="#" class="nav-link text-white active d-flex align-items-center"
        id="sidebar-btn-classes">
        <i class="bi bi-journal me-md-2 me-0 fs-4"></i>
        <span class="d-none d-md-inline-block">Classes</span>
      </a>
    </li>
    <li class="nav-item mx-auto mx-md-0">
      <a href="#" class="nav-link text-white d-flex align-items-center"
        id="sidebar-btn-lorem">
        <i class="bi bi-border-all me-md-2 me-0 fs-4"></i>
        <span class="d-none d-md-inline-block">Lorem</span>
      </a>
    </li>
    <li class="nav-item mx-auto mx-md-0">
      <a href="#" class="nav-link text-white d-flex align-items-center"
        id="sidebar-btn-ipsum">
        <i class="bi bi-border-all me-md-2 me-0 fs-4"></i>
        <span class="d-none d-md-inline-block">Ipsum</span>
      </a>
    </li>

    <li class="mt-auto">
      <a href="logout.php"
        class="nav-link text-white d-flex align-items-center">
        <i class="bi bi-box-arrow-left me-2 fs-4"></i>
        <span class="d-none d-md-inline-block">Logout</span>
      </a>

    </li>
  </ul>
</div>

<div class="content p-3">


  <div id="classes-page-container">

    <div class="content-header d-flex gap-3 align-items-center mb-3">
      <h1 id="content-title" class="d-inline">Classes</h1>
      <button type="button" class="btn btn-link p-0" id="new-class-btn"
        data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i
          class="bi bi-plus-circle fs-2" data-bs-toggle="tooltip"
          title="New Class" data-bs-custom-class="custom-tooltip"></i></button>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
      data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">New Class</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
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
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" id="confirm-class">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="liveAlertPlaceholder"></div>

  </div>

  <div id="lorem-container"></div>
  <div id="ipsum-container"></div>

</div>

<?php
    /* echo $_SESSION["id"]; */
    include('partials/footer.php');
?>