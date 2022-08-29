<?php 
  require "../partials/connection.php";
  session_start();

  $userId = $_SESSION["id"];
  
  $form = json_decode(file_get_contents('php://input'), true);
  
  $title = $form["title"];
  $code = $form["code"];
  $table = $form["type"]."s";

  $startDate = $form["startDate"];
  $startTime = $form["startTime"];
  $startDateTime = $startDate ." ". $startTime . ":00";
  $endDate = $form["endDate"];
  $endTime = $form["endTime"];
  $endDateTime = $endDate ." ". $endTime . ":00";

  //get class id
  $query = "SELECT id FROM classes WHERE code='$code'";
  $classId = mysqli_fetch_object(mysqli_query($conn, $query))->id;

  //insert form
  $query = "INSERT INTO forms
            VALUES(
              DEFAULT, $userId, $classId, '$title','$startDateTime', '$endDateTime'
            )";
  mysqli_query($conn, $query);
  $formId = mysqli_insert_id($conn);

  //insert type
  $query = "INSERT INTO $table
            VALUES(DEFAULT, $formId)";
  mysqli_query($conn, $query);

  //insert questions
  $questions = $form["questions"];
  foreach ($questions as $question) {
    $questionText = $question["question"];
    $grade = $question["grade"];
    $query = "INSERT INTO questions
              VALUES(
                DEFAULT, $formId, '$questionText', $grade
              )";
    echo "question:".mysqli_query($conn, $query)."\n";
    $questionId = mysqli_insert_id($conn);
    foreach ($question["choices"] as $choice) {
      $choiceText = $choice["choice"];
      $correct = $choice["isCorrect"]?1:0;
      $query = "INSERT INTO choices
                VALUES(
                  DEFAULT, $questionId, '$choiceText', $correct
                )";
      echo "choice: ".mysqli_query($conn, $query)."\n";
    }
  }


  
  /* array(4) {
  ["title"]=>
  string(3) "ddd"
  ["code"]=>
  string(13) "6288afee86357"
  ["type"]=>
  string(10) "assignment"
  ["questions"]=>
  array(1) {
    [0]=>
    array(3) {
      ["question"]=>
      string(0) ""
      ["choices"]=>
      array(1) {
        [0]=>
        array(2) {
          ["choice"]=>
          string(0) ""
          ["isCorrect"]=>
          bool(false)
        }
      }
      ["grade"]=>
      NULL
    }
  }
} */
?>