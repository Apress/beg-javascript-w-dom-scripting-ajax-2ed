<?php
$cd=is_dir('galleries/'.$_GET['cd'])?$_GET['cd']:'';
$p=file_exists('galleries/'.$cd.'/'.$_GET['p'])?$_GET['p']:'';
$start=preg_match('/\d+/',$_GET['s'])?$_GET['s']:0;
$chunksize=10;
$self=$_SERVER['PHP_SELF'];
/*
        function ditchtn($arr)
        filters out thumbnails
*/
function ditchtn($arr){
	foreach ($arr as $item){
		if (!preg_match("/^tn_|preview\.jpg/",$item)){$tmparr[]=$item;}
	}
	return $tmparr;
}

/*
        Function load($file)
        reads the content of the file that you send and returns it
*/
function load($filelocation){
        if (file_exists($filelocation)){
                $newfile = fopen($filelocation,"r");
                $file_content = fread($newfile, filesize($filelocation));
                fclose($newfile);
                return $file_content;
                }
        }

/*
        Function save($file,$content)
        writes the content to the file and generates it if needed
*/
function save($filelocation,$newdatas){
        $newfile = fopen($filelocation,"w+");
        fwrite($newfile, $newdatas);
        fclose($newfile);
        }

/*
        Function reverse($array)
        reverses an array
*/
function reverse($srcarray){
        $backarray=array();
        for ($i=sizeof($srcarray);$i>0;$i--){
                $backarray[] = $srcarray[$i];
                }
        return $backarray;
        }

/*
        Function namefiler($array,$filter)
        filters out all the items that apply to filter and returns the cleaned array
*/
function namefilter($array,$filter){
        $temparray=array();
        $searchsize=strlen($filter);
                for ($r=0;$r<sizeof($array);$r++){
                        if (substr($array[$r],0,$searchsize) != $filter){$temparray[]=$array[$r];}
                }
        return $temparray;
        }

/*
        Function directory($directory,$filters)
        reads the content of $directory, takes the files that apply to $filter and returns an
        array of the filenames.
        You can specify which files to read, for example
        $files = directory(".","jpg,gif");
                gets all jpg and gif files in this directory.
        $files = directory(".","all");
                gets all files.
*/
function directory($dir,$filters){
        $handle=opendir($dir);
        $files=array();
        if ($filters == "all"){while(($file = readdir($handle))!==false){$files[] = $file;}}
        if ($filters != "all"){
                $filters=explode(",",$filters);
                while (($file = readdir($handle))!==false) {
                        for ($f=0;$f<sizeof($filters);$f++):
                                $system=explode(".",$file);
                                if ($system[1] == $filters[$f]){$files[] = $file;}
                        endfor;
                }
        }
        closedir($handle);
        return $files;
        }
/*
        Function untag($string,$tag,mode){
        written by Chris Heilmann (info@onlinetools.org)
        filters the content of tag $tag from $string
        when mode is 1 the content gets returned as an array
        otherwise as a string
*/
function untag($string,$tag,$mode){
        $tmpval="";
        $preg="/<".$tag.">(.*?)<\/".$tag.">/si";
        preg_match_all($preg,$string,$tags);
        foreach ($tags[1] as $tmpcont){
                if ($mode==1){$tmpval[]=$tmpcont;}
                else {$tmpval.=$tmpcont;}
                }
        return $tmpval;
}
?>