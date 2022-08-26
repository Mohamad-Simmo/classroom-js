<?php
    $title = 'New placeholder';
    include('partials/header.php');

    if(!(isset($_SESSION["loggedin"])) || $_SESSION["loggedin"] === false || $_SESSION["type"] != 0){
      die("Unauthorized");
    }
    echo $_GET["form"];
?>


<?php include('partials/footer.php'); ?>