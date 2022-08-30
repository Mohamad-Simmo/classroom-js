<?php 
  require "../partials/connection.php";
  session_start();
  
  $formId = $_GET["id"];
  $query = "SELECT users.fname, users.lname, users.email, form_submissions.date_time, form_submissions.grade
            FROM users 
            JOIN form_submissions 
              ON form_submissions.user_id = users.id
            WHERE form_submissions.form_id = $formId";

  $result = mysqli_query($conn, $query);
  $response = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }

  echo json_encode($response);
?>