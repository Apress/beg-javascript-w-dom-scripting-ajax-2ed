<!doctype html>
<html>
<head>
<meta charset="UTF-8"> 
	<title>Example: Interdependent select boxes</title>
    <link rel="stylesheet" href="selectBoxes.css">
	<script type="text/javascript" src="selectBoxes.js">
	</script>
</head>
<body>
<h1>See our flight offers</h1>
<form action="exampleSelectBoxes.php" method="post">
  <div id="formOutput"> 
   <?php include('selectBoxes.php');?>
  </div>
  <p class="submit"><input type="submit" name="select" 
  id="select" value="Choose" /></p>
</form>


</body>
</html>
