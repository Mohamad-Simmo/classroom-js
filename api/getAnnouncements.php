<?php 
  require "../partials/connection.php";

  $classCode = $_GET["code"];

  $query = "SELECT users.fname, users.lname ,announcements.title, announcements.body,
                    announcements.timestamp, classes.code
            FROM announcements
            JOIN users ON announcements.user_id = users.id
            JOIN classes ON announcements.class_id = classes.id 
            AND  classes.code = '$classCode'
            ORDER BY announcements.timestamp DESC";

  $result = mysqli_query($conn, $query);
  $response= [];
  while($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }

  echo json_encode($response);
?>