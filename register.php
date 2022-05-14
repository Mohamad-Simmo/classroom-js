<?php
    $title = 'Register';
    include('partials/header.php');

    $emailErrText = $emailErrClass = $emailAddr = '';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

      if (empty($_POST["fname"])) {
        echo "<script> setInvalid('#inputFname'); </script>";
      }
      else {
        $fname = test_input($_POST["fname"]);
        if (!preg_match("/^[a-z ,.'-]+$/i", $fname)) {
          
        }
      }
  
      if (empty($_POST["lname"])) {
        echo "<script> setInvalid('#inputLname'); </script>";
      }
      else {
        $lname = test_input($_POST["lname"]);
        if (!preg_match("/^[a-z ,.'-]+$/i", $lname)) {
          
        }
      }
  
      $email = test_input($_POST["email"]);
      if (empty($_POST["email"])) {
        $emailErrClass = 'is-invalid';
        $emailErrText = 'Please enter an email address.';
      }
      else {
        if ((!filter_var($email, FILTER_VALIDATE_EMAIL))) {
          $emailErrClass = 'is-invalid';
          $emailErrText = 'Please enter a valid email address.';
        }
        $emailErrClass = "is-valid";
        $emailAddr = $_POST["email"];
      }
  
      $password = test_input($_POST["password"]);
      $confirmPassword = test_input($_POST["confpassword"]);
  
      
      if (test_input($_POST["options-outlined"]) == "teacher") {
        $type = 0;
      }
      elseif (test_input($_POST["options-outlined"]) == "student") {
        $type = 1;
      }
  
      /* $query = "INSERT INTO users VALUES ('DEFAULT','$fname', '$lname', '$email', '$password', '$type')";
      if (mysqli_query($conn, $query)) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $query . "<br>" . mysqli_error($conn);
      }
      
      
      $conn->close(); */
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
  <img src="images/book.png" class="img-fluid mx-auto mb-4 d-block" alt=""
    style="width: 75px;
    height: auto;">
  <h1 class="fw-normal mb-3">Register</h1>

  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"
    method="post" class="text-center d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-center align-items-center mb-3 gap-4">
      <input type="radio" class="btn-check" name="options-outlined"
        id="student-outlined" autocomplete="off" value="student">
      <label class="btn btn-lg btn-outline-dark"
        for="student-outlined">Student</label>
        <div>Or</div>
      <input type="radio" class="btn-check" name="options-outlined"
        id="teacher-outlined" value="teacher" autocomplete="off">
      <label class="btn btn-lg btn-outline-dark"
        for="teacher-outlined">Teacher</label>
    </div>
    <div class="d-flex gap-1">
      <div class="form-floating mb-1">
        <input type="text" class="form-control" id="inputFname"
          placeholder="First name" name="fname">
        <label for="inputFname">First name</label>
      </div>
      <div class="form-floating mb-1">
        <input type="text" class="form-control" id="inputLname"
          placeholder="Last name" name="lname">
        <label for="inputLname">Last name</label>
      </div>
    </div>
    <div class="form-floating mb-1">
      <input type="email" class="form-control <?php echo $emailErrClass;?>"
        id="inputEmail" placeholder="Email" name="email" value="<?php echo $emailAddr;?>">
      <label for="inputEmail">Email address</label>
      <div class="invalid-feedback text-start ms-2">
        <?php echo $emailErrText; ?>
      </div>
    </div>
    <div class="form-floating mb-1">
      <input type="password" class="form-control" id="inputPassword"
        placeholder="Password" name="password">
      <label for="inputPassword">Password</label>
    </div>
    <div class="form-floating mb-1">
      <input type="password" class="form-control" id="inputConfPassword"
        placeholder="Password" name="confpassword">
      <label for="inputPassword">Confirm Password</label>
    </div>

    <button type="submit" class="btn btn-primary btn-lg">Register</button>
  </form>

  <p class="mt-3 mb-3">Already a member? <a href="login.php">Login</a>
  </p>
</div>




<?php
  include('partials/footer.php');
?>