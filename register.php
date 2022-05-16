<?php
    $title = 'Register';
    include('partials/header.php');

    $optionsErrText = '';
    $teacher = $student = false;
    $fnameErrText = $fnameErrClass = $fnameVal = '';
    $lnameErrText = $lnameErrClass = $lnameVal = '';
    $emailErrText = $emailErrClass = $emailAddrVal = '';
    $passErrText = $passErrClass = $passVal = '';
    $passConfErrText = $passConfErrClass = $passConfVal = '';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $error = false;

      if (empty($_POST["options-outlined"])) {
        $optionsErrText = "Please select your occupation.";
      }
      else {
        if (test_input($_POST["options-outlined"]) == "teacher") {
          $teacher = true;
          $type = 0;
        }
        elseif (test_input($_POST["options-outlined"]) == "student") {
          $student = true;
          $type = 1;
        }
      }
      

      if (empty($_POST["fname"])) {
        $fnameErrText = "Enter your first name.";
        $fnameErrClass = "is-invalid";
        $error = true;
      }
      else {
        $fname = test_input($_POST["fname"]);
        if (!preg_match("/^[a-z ,.'-]+$/i", $fname)) {
          $fnameErrClass = "is-invalid";
          $fnameErrText = "Enter a valid first name.";
          $error = true;
        }
        else {
          $fnameVal = $fname;
          $fnameErrClass = 'is-valid';
        }
      }
  
      if (empty($_POST["lname"])) {
        $lnameErrClass = "is-invalid";
        $lnameErrText = "Enter your last name.";
        $error = true;
      }
      else {
        $lname = test_input($_POST["lname"]);
        if (!preg_match("/^[a-z ,.'-]+$/i", $lname)) {
          $lnameErrClass = "is-invalid";
          $lnameErrText = "Enter a valid last name.";
          $error = true;
        }
        else {
          $lnameErrClass = "is-valid";
          $lnameVal = $lname;
        }
      }
  
      if (empty($_POST["email"])) {
        $emailErrClass = 'is-invalid';
        $emailErrText = 'Please enter an email address.';
        $error = true;
      }
      else {
        $email = test_input($_POST["email"]);
        if ((!filter_var($email, FILTER_VALIDATE_EMAIL))) {
          $emailErrClass = 'is-invalid';
          $emailErrText = 'Please enter a valid email address.';
          $emailAddrVal = '';
          $error = true;
        }
        //TODO: get emails and check if email exists.
        else {
          $emailErrClass = "is-valid";
          $emailAddrVal = $email;
        }
      }
      
      if (empty($_POST["password"])) {
        $passErrClass = "is-invalid";
        $passErrText = "Please enter a password.";
        $error = true;
      }
      else {
        $password = test_input($_POST["password"]);
        if (strlen($password) < 8) {
          $passErrClass = "is-invalid";
          $passErrText = "Password must be at least 8 characters.";
          $error = true;
        }
        else {
          $passErrClass = "is-valid";
          $passVal = $password;
        }
      }

      //$passConfErrText $passConfErrClass
      if (empty($_POST["confpassword"])) {
        $passConfErrClass = "is-invalid";
        $passConfErrText = "Please confirm password.";
        $error = true;
      }
      else {
        $confPass = test_input($_POST["confpassword"]);
        if ($confPass !== $password) {
          $passConfErrClass = "is-invalid";
          $passConfErrText = "Passwords must match.";
          $error = true;
        }
        elseif (strlen($confPass) < 8){
          $passConfErrClass = "is-invalid";
          $passConfErrText = "Password must be at least 8 characters.";
          $error = true;
        }
        else {
          $passConfErrClass = "is-valid";
          $passConfVal = $confPass;
          //encrypt pass
          $password = password_hash($password, PASSWORD_BCRYPT);
        }
      }
  
      if (!$error) {
        $query = "INSERT INTO users VALUES ('DEFAULT','$fname', '$lname', '$email', '$password', '$type')";
        try {
          mysqli_query($conn, $query);
          header('Location: ./index.php');

        } catch (mysqli_sql_exception) {
          $emailErrClass = 'is-invalid';
          $emailErrText = 'Email is already taken.';
          $emailAddrVal = '';
        }
      

      }
      $conn->close();
    }
  
    function test_input($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }
?>

<div id="div-register" style="height: 100vh;"
  class="col-lg-3 col-md-4 col-sm-6 col-8 text-center mx-auto d-flex flex-column justify-content-center">
  <img src="images/book.png" class="img-fluid mx-auto mb-2 d-none d-sm-block"
    alt="" style="width: 75px;
    height: auto;">
  <h1 class="fw-normal mb-2">Register</h1>

  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"
    method="post" class="text-center d-flex flex-column justify-content-center">

    <div
      class="d-flex justify-content-center align-items-center mb-1 gap-2 gap-sm-4">
      <input type="radio" class="btn-check" name="options-outlined"
        id="student-outlined" autocomplete="off" value="student"
        <?php echo ($student ? ' checked':'');?>>
      <label class="btn btn-lg btn-outline-dark"
        for="student-outlined">Student</label>
      <div>Or</div>
      <input type="radio" class="btn-check" name="options-outlined"
        id="teacher-outlined" value="teacher" autocomplete="off"
        required<?php echo ($teacher ? ' checked':'');?>>
      <label class="btn btn-lg btn-outline-dark"
        for="teacher-outlined">Teacher</label>
    </div>

    <div class="options-error text-danger">
      <?php echo $optionsErrText; ?>
    </div>
    <div class="row g-0">

      <div class="form-floating col-6 mb-1">
        <input type="text" class="form-control <?php echo $fnameErrClass;?>"
          id="inputFname" placeholder="First name" name="fname"
          value=<?php echo $fnameVal;?>>
        <label for="inputFname">First name</label>
        <div class="invalid-feedback text-start ms-2 mt-0">
          <?php echo $fnameErrText; ?>
        </div>
      </div>

      <div class="form-floating col-6 mb-1">
        <input type="text" class="form-control <?php echo $lnameErrClass; ?>"
          id="inputLname" placeholder="Last name" name="lname"
          value=<?php echo $lnameVal; ?>>
        <label for="inputLname">Last name</label>
        <div class="invalid-feedback text-start ms-2 mt-0">
          <?php echo $lnameErrText; ?>
        </div>
      </div>

    </div>

    <div class="form-floating mb-1">
      <input type="email" class="form-control <?php echo $emailErrClass;?>"
        id="inputEmail" placeholder="Email" name="email"
        value="<?php echo $emailAddrVal;?>">
      <label for="inputEmail">Email address</label>
      <div class="invalid-feedback text-start ms-2 mt-0">
        <?php echo $emailErrText; ?>
      </div>
    </div>

    <div class="form-floating mb-1">
      <input type="password" class="form-control <?php echo $passErrClass; ?>"
        id="inputPassword" placeholder="Password" name="password"
        value=<?php echo $passVal; ?>>
      <label for="inputPassword">Password</label>
      <div class="invalid-feedback text-start ms-2 mt-0">
        <?php echo $passErrText; ?>
      </div>
    </div>


    <div class="form-floating mb-1">
      <input type="password"
        class="form-control <?php echo $passConfErrClass; ?>"
        id="inputConfPassword" placeholder="Password" name="confpassword"
        value=<?php echo $passConfVal; ?>>
      <label for="inputPassword">Confirm Password</label>
      <div class="invalid-feedback text-start ms-2 mt-0">
        <?php echo $passConfErrText; ?>
      </div>
    </div>

    <button type="submit" class="btn btn-primary btn-lg">Register</button>
  </form>

  <p class="mt-3 mb-3">Already a member? <a href="login.php">Login</a>
  </p>
</div>




<?php
  include('partials/footer.php');
?>