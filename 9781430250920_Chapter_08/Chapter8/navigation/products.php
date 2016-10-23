<?php include('globals.php');?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html dir="ltr" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
	<title>Products</title>
	<style type="text/css">
		@import 'siteIndicatorNavigation.css';
	</style>
	<script type="text/javascript" src="../../DOMhelp.js"></script>
	<script type="text/javascript" src="XHRSiteNav.js"></script>
	<script type="text/javascript" src="siteNavigationIndicator.js"></script>
</head>
<body>
<?php echo $nav;?>
<div id="content"><?php include('content/'.$self);?></div>
</body>
</html>
