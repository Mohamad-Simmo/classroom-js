<?php 
  require "partials/connection.php";
  session_start();
  $userId = $_SESSION["id"];

  //return classes
  $query = "SELECT classes.id, classes.name, classes.description, classes.code,
                   COUNT(users_classes.class_id) as num_people
            FROM classes, users_classes
            WHERE classes.user_id = '$userId' 
              AND classes.id = users_classes.class_id
            GROUP BY classes.id DESC";

  $result = mysqli_query($conn, $query);
  $response = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }
  -
  mysqli_free_result($result);
  mysqli_close($conn);
  echo json_encode($response);
?>