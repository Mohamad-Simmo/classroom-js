<?php
  //insert into useres_classes user id class id where code = code
  require "../partials/connection.php";
  session_start();

  $userId = $_SESSION["id"];
  $classCode = $_POST["classCode"];

  $query = "INSERT INTO users_classes
            VALUES(
              '$userId',
              (SELECT id FROM classes WHERE code = '$classCode')
            )";

  echo mysqli_query($conn, $query);
?>