<?php 
  require "partials/connection.php";
  session_start();

  $userId = $_SESSION["id"];
  $className = test_input($_POST["className"]);
  $classDescription = test_input($_POST["classDescription"]);
  $classCode = uniqid();
  $classStudents = test_input($_POST["classStudents"]);
  $classStudentsArr = [];

  if (!empty(trim($classStudents))){
    $classStudentsArr = explode(",", $classStudents);
  }
  
  if (empty($classDescription)) {
    $query = "INSERT INTO classes VALUES(DEFAULT, '$userId','$className', NULL, '$classCode')";
  }
  else {
    $query = "INSERT INTO classes VALUES(DEFAULT, '$userId','$className', '$classDescription', '$classCode')";
  }
  
  try {
    //Create class and teacher to class
    mysqli_query($conn, $query);
    echo "Class created successfully.\n";

    $classId = mysqli_insert_id($conn);
    $query = "INSERT INTO users_classes VALUES('$userId', '$classId')";
    mysqli_query($conn, $query);
    
    //Add students to class
    if (!empty($classStudentsArr)) {
      foreach ($classStudentsArr as $email) {
        //get student email id
        $query = "SELECT id FROM users WHERE email = '$email'";
        try {
          $result = mysqli_query($conn, $query);
        }
        catch(Exception $e) {
          echo $e->getMessage();
        }
        //if email exists add it to class
        if (mysqli_num_rows($result) === 1){
          $row = mysqli_fetch_assoc($result);
          $userId = $row["id"];
          $query = "INSERT INTO users_classes VALUES('$userId', '$classId')";
          try {
            mysqli_query($conn, $query);
            echo "Added: $email\n";
          }
          catch (Exception $e) {
            echo $e->getMessage();
          }
        }
        else {
          echo "Failed to add: $email\n";
        }
      }
    }
  }
  catch (Exception $e) {
    echo "Error: Please try again later.\n";
  }

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>