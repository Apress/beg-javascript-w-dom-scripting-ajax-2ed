<?php 
	// Airport Data 
	$airports=array(
		'Frankfurt','Munich','London Stansted',
		'London City','Glasgow','Cork'
	);
	$connects=array(
		'Frankfurt' => array(
			'Alicante','Mallorca','Monastir',
			'Hamburg','Amsterdam'
		),
		'Munich' => array(
			'Vienna','Warsaw','Prague','Rome','London City'
		),
		'London Stansted' => array(
			'Helsinki','Gothenburg','Copenhagen','Riga'
		),
		'London City' => array(
			'Munich','Hamburg','Hannover','Brussels'
		),
		'Glasgow' => array(
			'London Stansted','Dublin','Bergen'
		),
		'Cork' => array(
			'Dublin','Belfast','Birmingham','Liverpool'
		)
	);
	foreach(array_keys($_POST) as $d){
		$p[$d]=strip_tags($_POST[$d]);
	}
	if(!isset($p['airport'])){
		echo '<h2>Please choose your journey start - Step 1 of 3</h2><p>';
		echo renderSelect('airport',$airports,'Start');
		echo '</p>';
	} 
	if(isset($p['airport']) && !isset($p['destination'])){
		echo '<h2>Please choose your journey end - Step 2 of 3</h2><p>';
		echo 'Start: <strong>'.$p['airport'].'</strong>';
		echo '<input type="hidden" id="airport" name="airport"';
		echo ' value="'.$p['airport'].'" />';
		if(isset($connects[$p['airport']])){
			renderSelect('destination',$connects[$p['airport']],'Destination');
		} 
		echo '</p><p class="otherchoice">Wrong choice? ';
		echo '<a href="exampleSelectBoxes.php" ';
		echo 'id="back">Go back one step</a></p>';
	}
	if(isset($p['destination'])){
		echo '<h2>Pick the possible flight times and dates - Step 3 of 3</h2>';
		echo '<h3>Flights from '.$p['airport'].' to '.$p['destination'].'</h3>';
		echo '<p>... more server side functionality ...</p>';
		echo '<p class="otherchoice">Wrong choice? ';
		echo '<a href="exampleSelectBoxes.php" id="back">Select again</a></p>';
	}
	
/* Helper functions */	
function renderSelect($name,$options,$label){
	natsort($options);
	echo '<label for="'.$name.'">'.$label.'</label>';
	echo '<select name="'.$name.'" id="'.$name.'">';
	foreach ($options as $o){
		echo '<option ';
		if($p[$name]==$o){echo 'selected="selected"';}
		echo 'value="'.$o.'">'.$o.'</option>';
	}
	echo '</select>';
}
?>