<?php
  require "../partials/connection.php";
  session_start();

  $code = $_GET["code"];

  $query = "SELECT * 
            FROM classes
            JOIN users_classes ON classes.id = users_classes.class_id 
            JOIN users ON users.id = users_classes.user_id 
            WHERE classes.code = '$code'"; // <--code
  $result = mysqli_query($conn, $query);

  $response = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }
  echo json_encode($response);
?>