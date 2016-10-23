<?php require('dyngal_functions.php');?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
	<title>Example: A PHP driven image gallery</title>
     <link rel="stylesheet" href="dyngal.css">
	<style type="text/css">
		#boundary{
			background:url(backgroundwithnav.gif) top left no-repeat #466b0b;
		}
		#largepic{
			height:310px;
			margin-top:-20px;
		}
		#contentbody{
			background:url(backgroundwithnav.gif) bottom left no-repeat #466b0b;
			height:480px;
		}	
	</style>
	<script type="text/javascript" src="../DOMhelp.js"></script>
	<script type="text/javascript" src="dyngal_xhr.js"></script>
</head>
<body>
<div id="boundary">
	<div id="header"><h1>Dynamic gallery example</h1></div>
	<div id="contentbody">
	<?php include('navtree.php');?>
	<div id="content">
	<?php include('pic.php')?>
	<?php include('thumbs.php')?>
	</div>
	</div>
</div>
</body>
</html>
