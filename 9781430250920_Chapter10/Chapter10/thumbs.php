<?php
	if($p==''){
?>
<ul id="thumbs">
<?php
	if(is_array($curimgs)){
		foreach($curimgs as $c){
			if(!preg_match('/^tn/',$c)){continue;}
			$temp[]=$c;
		}
		$imgs=array_slice($temp,$start,$chunksize);
		foreach($imgs as $c){
			if(!preg_match('/^tn/',$c)){continue;}
			echo '<li><a href="'.$self.'?cd='.$cd.'&#38;p='.preg_replace('/^tn_/','',$c).'&#38;s='.$start.'"><img src="galleries/'.$cd.'/'.$c.'" alt="'.$c.'" /></a></li>';
		}		

	}	
?>
</ul>

<ul id="thumbsnav">
	<?php	
		if($cd!=''){
		if($start-$chunksize>=0){
			echo '<li><a href="'.$self.'?cd='.$cd.'&s='.($start-$chunksize).'" class="prev">previous</a></li>';
		}
		echo '<li>Showing '.($start+1).' to '.($start+10<sizeof($temp)?$start+10:sizeof($temp)).' of '.sizeof($temp).'</li>';
		if($start+$chunksize<=sizeof($temp)){
			echo '<li><a href="'.$self.'?cd='.$cd.'&s='.($start+$chunksize).'" class="next">next</a></li>';
		}
		}
	?>
</ul>
<?php
	}
?>

