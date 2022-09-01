<?php 
  require "../partials/connection.php";
  session_start();
  $userId = $_SESSION["id"];
  $query = "SELECT grade, title, name FROM form_submissions 
            JOIN forms ON form_submissions.form_id = forms.id 
            JOIN classes ON forms.class_id = classes.id
            WHERE form_submissions.user_id = $userId";

  $result = mysqli_query($conn, $query);
  $response = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }

  echo json_encode($response);
?>