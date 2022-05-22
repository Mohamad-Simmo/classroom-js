<?php 
  require "partials/connection.php";
  session_start();

  $userId = $_SESSION["id"];
  $className = test_input($_POST["className"]);
  $classDescription = test_input($_POST["classDescription"]);
  $classCode = uniqid();
  $classStudents = test_input($_POST["classStudents"]);
  $classStudentsArr = [];

  $response = array();
  
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
    $response += [
      'success' => true,
      'message' => "Class created successfully",
    ];

    $classId = mysqli_insert_id($conn);
    $query = "INSERT INTO users_classes VALUES('$userId', '$classId')";
    mysqli_query($conn, $query);
    
    //Add students to class
    if (!empty($classStudentsArr)) {
      $response["emails"] = array();

      $num = 0;
      foreach ($classStudentsArr as $email) {
        if ($email === '') {
          continue;
        }
        //get student email id
        $query = "SELECT id FROM users WHERE email = '$email'";
        try {
          $result = mysqli_query($conn, $query);
        }
        catch(Exception $e) {
          $response += [
            'success' => false,
            'message' => $e->getMessage(),
          ];
        }
        //if email exists add it to class
        if (mysqli_num_rows($result) === 1){
          $row = mysqli_fetch_assoc($result);
          mysqli_free_result($result);
          $userId = $row["id"];
          $query = "INSERT INTO users_classes VALUES('$userId', '$classId')";
          try {
            mysqli_query($conn, $query);
            $response["emails"] += [
              $num => [
                "email" => $email,
                "added" => true,
              ]
            ];
            $num++;

          }
          catch (Exception $e) {
            $response += [
              'success' => false,
              'message' => $e->getMessage(),
            ];
          }
        }
        else {
          $response["emails"] += [
            $num => [
              "email" => $email,
              "added" => false,
            ]
          ];
          $num++;
        }
      }
    }
    mysqli_close($conn);
    echo json_encode($response);
  }
  catch (Exception $e) {
    $response += [
      'success' => false,
      'message' => "Error try again later.",
    ];
    mysqli_close($conn);
    echo json_encode($response);
  }

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>