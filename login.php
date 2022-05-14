<?php
    $title = 'Login';
    include('templates/header.php');
?>

<div id="div-login" style="height: 100vh;"
  class="col-lg-3 col-md-4 col-sm-6 col-8 text-center mx-auto d-flex flex-column justify-content-center">
  <img src="images/book.png" class="img-fluid mx-auto mb-4 d-block" alt=""
    style="width: 75px;
    height: auto;">
  <h1 class="fw-normal mb-3">Login</h1>
  <form action="index.php" method="post"
    class="text-center d-flex flex-column justify-content-center">
    <div class="form-floating mb-1">
      <input type="email" class="form-control" id="inputEmail"
        placeholder="Email">
      <label for="inputEmail">Email address</label>
    </div>
    <div class="form-floating mb-2">
      <input type="password" class="form-control" id="inputPassword"
        placeholder="Password">
      <label for="inputPassword">Password</label>
    </div>
    <div class="form-check mx-auto mb-3">
      <input class="form-check-input" type="checkbox" value=""
        id="flexCheckChecked">
      <label class="form-check-label" for="flexCheckChecked">
        Remember me
      </label>
    </div>
    <button type="submit" class="btn btn-primary btn-lg">Login</button>
  </form>
  <p class="mt-3 mb-5">New user? <a href="register.php">Register</a></p>
  <p class="text-muted me-3">© Mohammad Semmo</p>
</div>

<?php
    include('templates/footer.php');
?>