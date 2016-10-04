<?
	$filename = $_POST['filename'];
	$txt = $_POST['data'].PHP_EOL;
	echo $filename.stripslashes($txt);
	
	echo EMPTY($filename);
	if(!EMPTY($filename)){
		$myfile = fopen("../../pages/".$filename, "w") or die("Unable to open file!");
		fwrite($myfile, stripslashes($txt));
		fclose($myfile);
	}
?>