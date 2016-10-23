<?php 
$c = preg_match('/\d+/',$_GET['c']) ? $_GET['c'] : 5;
$s = preg_match('/\d+/',$_GET['s']) ? $_GET['s'] : 0;
$cd = is_dir($_GET['cd']) ? $_GET['cd'] : '';
if($cd != '') {
	$handle = opendir($cd);
	while(($file = readdir($handle)) != false) {
		if(preg_match('/^tn_.*(jpg|jpe|jpeg)$/i',$file)) {
			$images[] = $file;
		}
	}
	closedir($handle);
	$imgs=array_slice($images,$s,$c);
	if($s > 0) {
		echo '<li class="badgeprev">';
		echo '<a href="badge.php?c='.$c;
		echo '&amp;s='.($s-$c).'&amp;cd='.$cd.'">';
		echo 'previous</a></li>';
	} else {
		echo '<li class="badgeprev"><span>previous</span></li>';
	}
	for($i=0; $i<sizeof($imgs); $i++) {
		echo '<li><a href="'.str_replace('tn_','',$cd.$imgs[$i]).'">'.
		'<img src="'.$cd.$imgs[$i].'" alt="'.$imgs[$i].'" /></a></li>';
	}
	if(($c+$s) <= sizeof($images)) {
		echo '<li class="badgenext">';
		echo '<a href="badge.php?c='.$c.'&amp;s='.($s + $c);
		echo '&amp;cd='.$cd.'">next</a></li>';
	} else {
		echo '<li class="badgenext"><span>next</span></li>';
	}
}
?>