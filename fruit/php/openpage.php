<?php
	$filepath = "../../pages/".$_GET["filename"];
//	$myfile = fopen($filepath, "r") or die("Unable to open file!");
	echo nl2br(file_get_contents($filepath));
//	echo fread($myfile,filesize($filepath));
//	fclose($myfile);
?>