<?php
	$path_parts = pathinfo($_SERVER['PHP_SELF']);
	$self=$path_parts['basename'];
	$nav=load('navigation.php');
	preg_match_all('/(<a.*?href="(.*?)">(.*?)<\/a>)/si',$nav,$as);
	for($i=0;$i<sizeof($as[0]);$i++)
	{
		if($as[2][$i]==$self)
		{
			$found=$as[0][$i];
			$foundname=$as[3][$i];
			$foundlink=$as[2][$i];
			break;
		}
	}
	if($found)
	{
		$nav=str_replace($found,'<strong class="'.str_replace('.php','',$foundlink).'">'.$foundname.'</strong>',$nav);
	}
	if(!isset($_GET['ajax'])){
		$htmldoc = domxml_xmltree($nav);
		$ul = $htmldoc->document_element();
		$uls = $htmldoc->get_elements_by_tagname("ul");
		foreach($uls as $i)
		{
			$mother=$i->parent_node();
			if($mother->node_name()=='li')
			{	
				if(sizeof($mother->get_elements_by_tagname("strong"))==0)
				{
					$mother->remove_child($i);
				} 
			}
		}
		$nav=$htmldoc->html_dump_mem();
	}
function load($filelocation){
	if (file_exists($filelocation)){
		$newfile = fopen($filelocation,"r");
		$file_content = fread($newfile, filesize($filelocation));
		fclose($newfile);
		return $file_content;
		}
	}
?>
