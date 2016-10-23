<?php 
	echo'<ul id="navtree">';
	echo'<li><h2>Choose gallery:</h2></li>';
	$dir=directory('galleries','all');
	foreach($dir as $d){
		if(preg_match('/^\.{1,2}/',$d)){continue;}
		if(is_dir('galleries/'.$d)){
			$imgs=directory('galleries/'.$d,'jpg,JPG,jpeg,JPEG,jpe,JPE');
			if($cd==''){$cd=$d;}
			if($d==$cd){$curimgs=$imgs;}
			$imgs=ditchtn($imgs);
			echo '<li>';
			if($d==$cd){
				echo '<strong><a href="'.$self.'?cd='.$d.'">'.ucwords($d).' ('.sizeof($imgs).')</a></strong>';
			} else {
				echo '<a href="'.$self.'?cd='.$d.'">'.ucwords($d).' ('.sizeof($imgs).')</a>';
			}
			echo '</li>';
		}
	}	
	echo '</ul>'
?>