<?
		$dburl = "localhost";
		$id = "root";
		$password = "apmsetup";
		$selectdb = "ptm";
		
		$con = mysql_connect($dburl,$id,$password);
		if(!$con){
			echo "디비 사망";
			die(mysql_error());
		}
		
		
		mysql_query("set session character_set_connection=utf8;");
		mysql_query("set session character_set_results=utf8;");
		mysql_query("set session character_set_client=utf8;");
		
		
		mysql_select_db($selectdb,$con);
?>