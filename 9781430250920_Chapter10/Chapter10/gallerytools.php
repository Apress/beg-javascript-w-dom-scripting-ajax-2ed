<?php 
	$cd=is_dir('galleries/'.$_GET['cd'])?$_GET['cd']:'';
	$p=file_exists('galleries/'.$cd.'/'.$_GET['p'])?$_GET['p']:'';
	$start=preg_match('/\d+/',$_GET['s'])?$_GET['s']:0;
	$chunksize=10;
	$name='gallerytools.php';
	$allimgs=directory('galleries/'.$cd,'JPG,jpg,JPEG,jpeg,jpe,JPE');
	$temp=ditchtn($allimgs);
	if($cd!='' && $p==''){
		$imgs=array_slice($temp,$start,$chunksize);
		echo '<ul id="thumbs">';
			foreach($imgs as $c){
				echo '<li><a href="'.$name.'?cd='.$cd.'&#38;p='.
				preg_replace('/^tn_/','',$c).'&#38;s='.$start.'">'.
				'<img src="galleries/'.$cd.'/'.$c.'" alt="'.$c.'" /></a></li>';
			}		
		echo '</ul>';
		echo '<ul id="thumbsnav">';
			if($cd!=''){
			if($start-$chunksize>=0){
				echo '<li><a href="'.$name.'?cd='.$cd.'&s='.
				($start-$chunksize).'" class="prev">previous</a></li>';
			}
			echo '<li>Showing '.($start+1).' to '.
			($start+10<sizeof($temp)?$start+10:sizeof($temp)).' of '.
			sizeof($temp).'</li>';
			if($start+$chunksize<=sizeof($temp)){
				echo '<li><a href="'.$name.'?cd='.$cd.'&s='.($start+$chunksize).
				'" class="next">next</a></li>';
			}
			}
		echo '</ul>';
	} 
	if($p!=''){
		$count=0;
		foreach($temp as $key=>$c){
			if(preg_replace('/^tn_/','',$c)!=$p){$count++;continue;}
			$cs=$count;
			break;
		}
		$s=preg_replace("/\..$/",'',($cs/10))*10;
		echo '<div id="largepic"><a href="'.$name.'?cd='.$cd.'&#38;s='.($s).
		'"><img src="galleries/'.$cd.'/'.$p.'" alt="'.$p.'"></a></div>';
		echo '<ul id="picthumbs">';
		if($cs-1>=0){
			echo '<li><a class="prev" href="'.$name.'?cd='.$cd.'&#38;p='.
			preg_replace('/^tn_/','',$temp[$cs-1]).'&#38;s='.($s).
			'"><img src="galleries/'.$cd.'/'.$temp[$cs-1].'" alt="'.
			$temp[$cs-1].'" /></a></li>';
		}
		if($cs-2<sizeof($temp) && $temp[$cs+1]!=''){
			echo '<li><a class="next" href="'.$name.'?cd='.$cd.'&#38;p='.
			preg_replace('/^tn_/','',$temp[$cs+1]).'&#38;s='.($s).
			'"><img src="galleries/'.$cd.'/'.$temp[$cs+1].'" alt="'.
			$temp[$cs+1].'" /></a></li>';
		}
		echo '</ul>';
	}
	function ditchtn($allimgs){
		foreach($allimgs as $c){
			if(!preg_match('/^tn/',$c)){continue;}
			$temp[]=$c;
		}		
		return $temp;
	}
	
	function directory($dir,$filters){
		$handle=opendir($dir);
		$files=array();
		if ($filters == "all"){
			while(($file = readdir($handle))!==false){
				$files[] = $file;
			}
		}
		if ($filters != "all"){
			$filters=explode(",",$filters);
			while (($file = readdir($handle))!==false){
				for ($f=0;$f<sizeof($filters);$f++){
					$system=explode(".",$file);
					if ($system[1] == $filters[$f]){
						$files[] = $file;
					}
				}
			}
		}
		closedir($handle);
		return $files;
	}
?>