<?php
  define("SERVER", "localhost");
  define("USERNAME", "root");
  define("PASSWORD", "");
  define("DATABASE", "university_project");
  $conn = mysqli_connect(SERVER, USERNAME, PASSWORD, DATABASE) or die(mysqli_error($conn));
?>