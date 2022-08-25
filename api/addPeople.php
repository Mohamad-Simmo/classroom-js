<?php
  require "../partials/connection.php";
  session_start();
  
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }


  $peopleArr = [];
  $people = test_input($_POST["people"]);
  $code = test_input($_POST["code"]);

  if(empty($people)) {
    die(http_response_code(400));
  }

  $peopleArr = explode(",", $people);
  $response = [];
  foreach ($peopleArr as $email) {
    if ($email === '') {
      continue;
    }
    $query = "INSERT INTO users_classes
              VALUES (
                (SELECT id FROM users WHERE email = '$email'),
                (SELECT id FROM classes WHERE code = '$code')
              )";
    mysqli_query($conn, $query);
  }
  echo "success";

?>