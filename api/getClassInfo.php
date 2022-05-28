<?php
  require '../partials/connection.php';

  $classCode = $_GET["code"];

  $query = "SELECT classes.name, classes.description, classes.code, 
            COUNT(users_classes.class_id) AS people 
            FROM classes 
            JOIN users_classes ON classes.id = users_classes.class_id 
            AND classes.code = '$classCode'";

  $result = mysqli_query($conn, $query);
  $response = mysqli_fetch_assoc($result);

  echo json_encode($response);
?>