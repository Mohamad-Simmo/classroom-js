<?php 
  require "../partials/connection.php";
  session_start();
  
  $userId = $_SESSION["id"];

  $query = "SELECT type FROM users WHERE id = $userId";
  $result = mysqli_fetch_object(mysqli_query($conn, $query))->type;

  $userType = $result;

  date_default_timezone_set('Asia/Beirut');
  $now = new DateTime();
  $now = $now->format('Y-m-d H:i:s');



  $type = $_GET["type"];
  //get forms for user joined classes (not submitted and before due date)
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
            )".($userType == 1 ? " AND forms.end_date_time > '$now'":"");



  $result = mysqli_query($conn, $query);
  
  $response = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $response[] = $row;
  }

  mysqli_free_result($result);
  mysqli_close($conn); 
  
  echo json_encode($response); 
?>