<?php
    $title = 'Register';
    include('templates/header.php');
?>

<div id="div-register" style="height: 100vh;"
  class="col-lg-3 col-md-4 col-sm-6 col-8 text-center mx-auto d-flex flex-column justify-content-center">
  <img src="images/book.png" class="img-fluid mx-auto mb-4 d-block" alt=""
    style="width: 75px;
    height: auto;">
  <h1 class="fw-normal mb-3">Register</h1>
  <form action="#" method="post"
    class="text-center d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-center mb-3 gap-4">
      <input type="radio" class="btn-check" name="options-outlined"
        id="student-outlined" autocomplete="off" checked>
      <label class="btn btn-lg btn-outline-dark"
        for="student-outlined">Student</label>
      <input type="radio" class="btn-check" name="options-outlined"
        id="teacher-outlined" autocomplete="off">
      <label class="btn btn-lg btn-outline-dark"
        for="teacher-outlined">Teacher</label>
    </div>
    <div class="d-flex gap-1">
      <div class="form-floating mb-1">
        <input type="text" class="form-control" id="inputFname"
          placeholder="First name">
        <label for="inputFname">First name</label>
      </div>
      <div class="form-floating mb-1">
        <input type="text" class="form-control" id="inputLname"
          placeholder="Last name">
        <label for="inputLname">Last name</label>
      </div>
    </div>
    <div class="form-floating mb-1">
      <input type="email" class="form-control" id="inputEmail"
        placeholder="Email">
      <label for="inputEmail">Email address</label>
    </div>
    <div class="form-floating mb-1">
      <input type="password" class="form-control" id="inputPassword"
        placeholder="Password">
      <label for="inputPassword">Password</label>
    </div>
    <div class="form-floating mb-1">
      <input type="password" class="form-control" id="inputPassword"
        placeholder="Password">
      <label for="inputPassword">Confirm Password</label>
    </div>

    <button type="submit" class="btn btn-primary btn-lg">Register</button>
  </form>
  <p class="mt-3 mb-3">Already a member? <a href="login.php">Login</a>
  </p>
</div>


<?php
    include('templates/footer.php');
?>