<?php
  require '../partials/connection.php';
  session_start();

  //TODO: error checking
  $userId = $_SESSION["id"];
  $announcementTitle = trim($_POST["announcementTitle"]);
  $announcementBody = trim($_POST["announcementBody"]);
  $classCode = $_POST["classCode"];

  $query = "INSERT INTO announcements
            VALUES(
              DEFAULT,
              '$userId',
              (SELECT id FROM classes WHERE code='$classCode'),
              '$announcementTitle',
              '$announcementBody',
              DEFAULT)";

   echo mysqli_query($conn, $query);

  
  
?>