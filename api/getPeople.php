<?php
  require "../partials/connection.php";
  session_start();

  $code = $_GET["code"];

  $query = "SELECT users.fname, users.lname, users.email, users.type
            FROM users
            JOIN users_classes ON users_classes.user_id = users.id
            JOIN classes ON users_classes.class_id = classes.id
            AND classes.code = '$code'
            ORDER BY users.type ASC";
            
  $result = mysqli_query($conn, $query);

  $response = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }
  echo json_encode($response);
?>