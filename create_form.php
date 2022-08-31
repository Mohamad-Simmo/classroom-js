<?php
    $title = $_GET["type"] == "assignment" ? 
    "Assignment - ".$_GET["title"] : "Test - ".$_GET["title"];
    include('partials/header.php');

    if(!(isset($_SESSION["loggedin"])) || $_SESSION["loggedin"] === false || $_SESSION["type"] != 0){
      die("Unauthorized");
    }
?>

<div class="container py-3" id="page">

  <h1 class="mb-3">Assignment: <?= $_GET["title"] ?></h1>
  <form action="#" id="questions">
    <button class="btn btn-secondary" data-role="add-q">
      Add Question
    </button>

    <h5 class="ms-3 d-inline" id="grade-container">
      Grade <span id="totalGrade">0</span>/100
    </h5>
    <br>
    <input type="submit" class="btn btn-primary my-3" />
    <p id="error" class="text-danger fs-5"></p>
  </form>
</div>

<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
  crossorigin="anonymous"></script>

<?php 
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  echo "<script>let type =".$_SESSION["type"]."</script>"; 
}
?>
<script src="js/create_form.js"></script>
</body>

</html>