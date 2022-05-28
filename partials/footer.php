<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
  crossorigin="anonymous"></script>

<?php 
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  echo "<script>let type =".$_SESSION["type"]."</script>"; 
}
?>



<script src="js/single_page.js"></script>
<script src="js/script.js"></script>
<?php
if ($_SESSION["type"] == 0) {
  echo '<script src="js/teacher.js"></script>';
}
else {
  echo '<script src="js/student.js"></script>';
}
 
?>

</body>

</html>