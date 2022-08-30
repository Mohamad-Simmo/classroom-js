<?php 
  require "../partials/connection.php";
  session_start();
  
  $userId = $_SESSION["id"];
  $type = $_GET["type"];
  //get forms for user joined classes
  $query = "SELECT $type.form_id as id, forms.title, forms.start_date_time,
              forms.end_date_time, classes.name as class_name
            FROM $type
            JOIN forms ON $type.form_id = forms.id
            JOIN classes ON classes.id = forms.class_id
            JOIN users_classes ON users_classes.class_id = classes.id
            JOIN users ON users.id = users_classes.user_id
            WHERE users.id = $userId AND $userId NOT IN (
              SELECT form_submissions.user_id
              FROM form_submissions
              WHERE user_id = $userId AND form_submissions.form_id = $type.form_id
            )";

  $result = mysqli_query($conn, $query);

  $response = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }
  mysqli_free_result($result);
  mysqli_close($conn);
  
  echo json_encode($response);
?>