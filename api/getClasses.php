<?php 
  require "../partials/connection.php";
  session_start();
  $userId = $_SESSION["id"];

  //get classes created by user or user is in class and number of people in class
  $query = "SELECT users.fname, users.lname, classes.name, 
                    classes.description, classes.code, COUNT(*) as num_people
            FROM classes
            JOIN users_classes ON users_classes.class_id = classes.id 
            AND (
              classes.user_id = '$userId'
              OR users_classes.class_id IN (
                SELECT users_classes.class_id 
                FROM users_classes 
                WHERE users_classes.user_id = '$userId'
              )
            ) 
            JOIN users ON users.id = classes.user_id
            GROUP BY classes.code ASC";

  $result = mysqli_query($conn, $query);
  $response = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }
  mysqli_free_result($result);
  mysqli_close($conn);
  echo json_encode($response);
?>