<?php require('dyngal_functions.php');?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html dir="ltr" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
	<title></title>
	<style type="text/css">
		@import 'dyngal.css';
	</style>
	<script type="text/javascript" src="../DOMhelp.js">
	</script>
	<script type="text/javascript" src="dyngal_xhr.js">
	</script>
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
