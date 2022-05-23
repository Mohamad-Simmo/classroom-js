<?php
  require '../partials/connection.php';
  session_start();

  $userId = $_SESSION["id"];
  $announcementTitle = $_POST["announcementTitle"];
  $announcementBody = $_POST["announcementBody"];


  
?>