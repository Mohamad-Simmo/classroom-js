<?php
  $title = 'Login';
  include('partials/header.php');
  
  if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: ./index.php");
    exit;
  }

  $emailErrClass = $passwordErrClass = $loginErrText = '';
  $email = $password = '';

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["email"])) {
      loginError();
    }
    elseif (empty($_POST["password"])) {
      loginError();
    }
    
    $email = test_input($_POST["email"]);
    $password = test_input($_POST["password"]);

    $query = "SELECT * FROM users WHERE email='$email'";
    try {
      $result = mysqli_query($conn, $query);
      mysqli_close($conn);
    }
    catch (Exception $e) {
      echo $e->getMessage();
    }
    
    if (mysqli_num_rows($result) === 0) {
      loginError();
    }
    else {
      $row = mysqli_fetch_assoc($result);
      mysqli_free_result($result);
      $hashed_password = $row["password"];
      if (password_verify($password, $hashed_password)) {
        $_SESSION["id"] = $row["id"];
        $_SESSION["email"] = $row["email"];
        $_SESSION["name"] = $row["fname"]." ".$row["lname"];
        $_SESSION["type"] = $row["type"];
        $_SESSION["loggedin"] = true;
        if ($_SESSION["type"] == 0) {
          header("location: ./index.php");
          exit;
        }
        else {
          header("location: ./student.php");
        }
      }
      else {
        loginError();
      }
    }
  }

  function loginError() {
    global $emailErrClass, $passwordErrClass, $loginErrText;
    $emailErrClass = "is-invalid";
    $passwordErrClass = "is-invalid";
    $loginErrText = "Email or password is incorrect.";
  }

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>

<div id="div-login" style="height: 100vh;"
  class="col-lg-3 col-md-4 col-sm-6 col-8 text-center mx-auto d-flex flex-column justify-content-center">
  <i class="bi bi-book-half" style="font-size: 5rem;"></i>
  <h1 class="fw-normal mb-3" style="margin-top:-15px;">Login</h1>
  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"
    method="post" class="text-center d-flex flex-column justify-content-center">
    <div class="form-floating mb-1">
      <input type="email" class="form-control <?php echo $emailErrClass; ?>"
        id="inputEmail" placeholder="Email" autocomplete="email" name="email">
      <label for="inputEmail">Email address</label>
    </div>

    <div class="form-floating mb-2">
      <input type="password"
        class="form-control <?php echo $passwordErrClass; ?>" id="inputPassword"
        placeholder="Password" autocomplete="current-password" name="password">
      <label for="inputPassword">Password</label>
      <div class="invalid-feedback text-start ms-2 mt-0">
        <?php echo $loginErrText; ?>
      </div>
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
    include('partials/footer.php');
?>