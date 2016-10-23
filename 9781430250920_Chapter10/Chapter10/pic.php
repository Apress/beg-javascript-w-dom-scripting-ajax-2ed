<?php
if($p!=''){?>
<?php
		foreach($curimgs as $c){
			if(!preg_match('/^tn/',$c)){continue;}
			$temp[]=$c;
		}
		$count=0;
		foreach($temp as $key=>$c){
			if(preg_replace('/^tn_/','',$c)!=$p){$count++;continue;}
			$cs=$count;
			break;
		}
		$s=preg_replace("/\..$/",'',($cs/10))*10;
	echo '<div id="largepic"><a href="examplePHPgallery.php?cd='.$cd.'&#38;s='.($s).'"><img src="galleries/'.$cd.'/'.$p.'" alt="'.$p.'"></a></div>';
?>

<ul id="picthumbs">
<?php
	if(is_array($curimgs)){
		if($cs-1>=0){
			echo '<li><a class="prev" href="examplePHPgallery.php?cd='.$cd.'&#38;p='.preg_replace('/^tn_/','',$temp[$cs-1]).'&#38;s='.($s).'"><img src="galleries/'.$cd.'/'.$temp[$cs-1].'" alt="'.$temp[$cs-1].'" /></a></li>';
		}
		if($cs-2<sizeof($temp) && $temp[$cs+1]!=''){
			echo '<li><a class="next" href="examplePHPgallery.php?cd='.$cd.'&#38;p='.preg_replace('/^tn_/','',$temp[$cs+1]).'&#38;s='.($s).'"><img src="galleries/'.$cd.'/'.$temp[$cs+1].'" alt="'.$temp[$cs+1].'" /></a></li>';
		}
		
	}	
?>
<?}?>
</ul>
