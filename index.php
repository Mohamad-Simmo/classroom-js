<?php
    $title = 'Home';
    include('partials/header.php');

    if(!(isset($_SESSION["loggedin"])) || $_SESSION["loggedin"] === false){
      header("location: login.php");
      exit;
    }
    
?>

<div
  class="d-flex flex-column flex-shrink-0 p-2 text-white bg-dark vh-100 align-items-center align-items-md-stretch"
  style="width: 250px" id="sidebar-container">
  <a href="./"
    class="d-flex align-items-center mb-0 me-md-auto text-white text-decoration-none">
    <i class="bi bi-book me-md-2 me-0" style="font-size: 3rem;"></i>
    <span class="fs-4 d-none d-md-inline-block">Classroom</span>
  </a>
  <div
    class="col-7 text-warning fw-semibold w-100 text-center text-md-start text-wrap text-truncate">
    <?php echo $_SESSION["name"]; ?>
  </div>
  <hr class="mt-2 mb-3" />
  <ul class="nav nav-pills flex-column mb-auto h-100">
    <li class="nav-item mx-auto mx-md-0">
      <a href="javascript:void(0)"
        class="nav-link text-white active d-flex align-items-center"
        id="sidebar-btn-classes">
        <i class="bi bi-journal me-md-2 me-0 fs-4"></i>
        <span class="d-none d-md-inline-block">Classes</span>
      </a>
    </li>
    <li class="nav-item mx-auto mx-md-0">
      <a href="javascript:void(0)"
        class="nav-link text-white d-flex align-items-center"
        id="sidebar-btn-Assignments">
        <i class="bi bi-file-earmark-text me-md-2 me-0 fs-4"></i>
        <span class="d-none d-md-inline-block">Assignments</span>
      </a>
    </li>
    <li class="nav-item mx-auto mx-md-0">
      <a href="javascript:void(0)"
        class="nav-link text-white d-flex align-items-center"
        id="sidebar-btn-Tests">
        <i class="bi bi-file-earmark-text me-md-2 me-0 fs-4"></i>
        <span class="d-none d-md-inline-block">Tests</span>
      </a>
    </li>

    <?php
        echo $_SESSION["type"] == 1 ?
            '<li class="nav-item mx-auto mx-md-0">
              <a href="javascript:void(0)"
                class="nav-link text-white d-flex align-items-center"
                id="sidebar-btn-grades">
                <i class="bi bi-hash me-md-2 me-0 fs-4"></i>
                <span class="d-none d-md-inline-block">Grades</span>
              </a>
            </li>':
            '';
    ?>

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
      <h1 class="d-inline content-title">Classes</h1>
      <button type="button" class="btn btn-link p-0" id="new-class-btn"
        data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i
          class="bi bi-plus-circle fs-2" data-bs-toggle="tooltip"
          title="<?php echo $_SESSION["type"]==0 ? "New Class": "Join Class" ?>"
          data-bs-custom-class="custom-tooltip"></i></button>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
      data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              <?php echo $_SESSION["type"]==0 ? "New Class": "Join Class" ?>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-class-body p-3" id="modal-class-body">

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"
              data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary"
              id="<?php echo $_SESSION["type"]==0 ? "confirm-class": "join-class" ?>">
              Confirm </button>
          </div>
        </div>
      </div>
    </div>

    <div id="liveAlertPlaceholder"></div>

  </div>



  <div id="assignments-page-container">
    <div class="d-flex align-items-center gap-3">
      <h1 class="content-title text-bold">Assignments</h1>
      <?php
      echo $_SESSION["type"] == 0 ?
        '<a href="javascript:void(0)">
          <button id="new-assignment" class="btn btn-primary new-form" data-bs-toggle="modal" data-bs-target="#modal-new-form">
            Create New Assignment
          </button>
        </a>':
        '';
    ?>
    </div>
    <?= $_SESSION["type"] == 0 ?
    '<hr><h3 class="mb-3">View Submissions</h3>' : '' ?>
  </div>

  <div id="tests-page-container">
    <div class="d-flex align-items-center gap-3">
      <h1 class="content-title text-bold">Tests</h1>
      <?php
      echo $_SESSION["type"] == 0 ?
        '<a href="javascript:void(0)">
            <button id="new-test" class="btn btn-primary new-form" data-bs-toggle="modal" data-bs-target="#modal-new-form">
              Create New Test
            </button>
        </a>':
        '';
    ?>
    </div>
    <?= $_SESSION["type"] == 0 ?
    '<hr><h3 class="mb-3">View Submissions</h3>' : '' ?>
  </div>

  <?= $_SESSION["type"]==1? 
  '<div id="grades-page-container">
  <h1>My Grades</h1>
  </div>' : '' ?>

  <!-- Modal -->
  <div class="modal fade" id="modal-new-form" data-bs-backdrop="static"
    data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-form-body p-3">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
            id="create-form">Create</button>
        </div>
      </div>
    </div>
  </div>

</div>

<?php
    /* echo $_SESSION["id"]; */
    include('partials/footer.php');
?>