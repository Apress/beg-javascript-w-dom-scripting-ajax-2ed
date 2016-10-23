<?php include('globals.php');?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">  
	<title>Home</title>
    <link rel="stylesheet" href="siteIndicatorNavigation.css">
	<script type="text/javascript" src="../../DOMhelp.js"></script>
	<script type="text/javascript" src="XHRSiteNav.js"></script>
	<script type="text/javascript" src="siteNavigationIndicator.js"></script>
</head>
<body>
<?php echo $nav;?>
<div id="content"><?php include('content/'.$self);?></div>

</body>
</html>
