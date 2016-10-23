<?php
$validationRules=array(
	'Name'=>array(
		'error'=>'Please enter a name that is at least 10 characters long',
		'pattern'=>'/.{10}/i'
	),
	'subject'=>array(
		'error'=>'Please choose a subject',
		'pattern'=>'/.{10}/i'
	),
	'Message'=>array(
		'error'=>'Please enter a message at least 20 characters long',
		'pattern'=>'/.{20}/i'
	),	
	'email'=>array(
		'error'=>'Please enter a valid email',
		'pattern'=>'/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/i'
	)
);
if(isset($_GET['json'])){
	header('Content-type:text/javascript');
	echo 'validationRules={';
		foreach(array_keys($validationRules) as $a){
			echo '\''.$a.'\':{'."\n";
				foreach(array_keys($validationRules[$a]) as $b){
					if($b=='pattern'){
						echo '\''.$b.'\':'.$validationRules[$a][$b]."\n";
					} else {
						echo '\''.$b.'\':\''.$validationRules[$a][$b].'\','."\n";
					}
				}
			echo '}';
			echo $a!='email'?',':'';
			echo "\n";
		}
	echo '};';
}

?>

