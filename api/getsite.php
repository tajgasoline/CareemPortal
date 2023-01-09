<?php


if(isset($_POST['Email']) )
{
	

	$Email = $_POST["Email"]; 
	$dbprice='';
 
 
	$result = array(); 

	include('../MainConnect.php');  
	$query = "select site from careemportalusers where username='".$Email."'";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{
		$site = $row["site"]; 

	} 
 
 
 
	$data["site"] = $site; 
	echo json_encode($data);



}

?>
