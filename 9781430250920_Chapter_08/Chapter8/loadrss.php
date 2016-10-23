<?php
// set the XML header
header('Content-type: text/xml'); 
// define an error message in case the feed cannot be found
$error='<?xml version="1.0"?><error>Cannot find feed</error>';
// clear the contents
$contents = '';
// read the url variable from the GET request
$rssurl=$_GET['url'];
// test if the url starts with http to prevent surfers being able 
// to call and display local files
if(preg_match('/^http:/',$rssurl)){
	// open the remote file, and store it contents
	$handle = @fopen($rssurl, "rb");
	if($handle==true){
		while (!feof($handle)) {
			$contents .= fread($handle, 8192);
		}
		fclose($handle);
	}
}
// if the file has no channel element, delete contents
if(!preg_match('/<channel/',$contents)){$contents='';}
// return either the contents or the error
echo $contents==''?$error:$contents;
?>