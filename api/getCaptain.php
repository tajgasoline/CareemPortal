<?php
if(isset($_POST['Search']) )
{
	session_start();
	$staffusername = $_SESSION['staffusername'];
	$site = $_SESSION['site'];
	$role = $_SESSION['role'];
	$Search = $_POST["Search"]; 
	$result = ''; 
	include('../MainConnect.php');  
	$query = "select   id,captainid,vehicleid,vehiclenumber,customername,contactnumber,vehicletype from careemportalcustomers where (vehiclenumber = '".$Search."'  or RIGHT(contactnumber,10) = RIGHT('".$Search."',10)  or captainid = '".$Search."') and  status='Active' ";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{
		$data["id"] = $row["id"]; 
		$data["captainid"] = $row["captainid"]; 
		$data["vehicleid"] = $row["vehicleid"]; 
		$data["vehiclenumber"] = $row["vehiclenumber"]; 
		$data["customername"] = $row["customername"]; 
		$data["contactnumber"] = $row["contactnumber"]; 
		$data["vehicletype"] = $row["vehicletype"]; 
		$data["result"] = 'Success'; 

	} 
	echo json_encode($data);
}
?>