<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "university_project";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $db);

// Check connection
if (mysqli_connect_errno()) {
  echo "Error";
}
?>