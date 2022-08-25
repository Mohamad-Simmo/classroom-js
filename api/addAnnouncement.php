<?php
  require '../partials/connection.php';
  session_start();

  if(!(isset($_SESSION["loggedin"])) || $_SESSION["loggedin"] === false){
    die(http_response_code(401));
  }

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }


  $userId = $_SESSION["id"];
  $announcementTitle = test_input($_POST["announcementTitle"]);
  $announcementBody = test_input($_POST["announcementBody"]);
  $classCode = test_input($_POST["classCode"]);



  if(empty($classCode) || (empty($announcementTitle) && empty($announcementBody))) {
    die(http_response_code(400));
  }

  $query = "INSERT INTO announcements
            VALUES(
              DEFAULT,
              '$userId',
              (SELECT id FROM classes WHERE code='$classCode'),
              '$announcementTitle',
              '$announcementBody',
              DEFAULT
            )";

  mysqli_query($conn, $query) or die("Connection error");

?>