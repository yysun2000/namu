<?php
	include('dbcon.php');
	$sql = str_replace('\\','',$_POST['sql']);
	$o = array();
	if(strstr($sql,"SELECT") !== false){
		$data1 = mysql_query($sql,$con);
		while($row= mysql_fetch_object($data1)){
			$o[] = $row;
			unset($row);
		}
		
		echo json_encode($o);
	}else if(strstr($sql,"INSERT") !== false){
		mysql_query( $sql, $con );
	}else if(strstr($sql,"DELETE") !== false){
		mysql_query( $sql, $con );
	}else if(strstr($sql,"UPDATE") !== false){
		mysql_query( $sql, $con );	
	}else{
		echo "Invalid Query!";
	}
		mysql_close($con);

?>