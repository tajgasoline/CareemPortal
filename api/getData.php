<?php
if(isset($_POST['check']) )
{
	session_start();
	$staffusername = $_SESSION['staffusername'];
	$site = $_SESSION['site'];
	$role = $_SESSION['role'];
	$dbPetrolPrice='';
	$dbDieselPrice='';
	$dbDiscount=''; 
	$result = array(); 

	// Getting product prices
	include('../MainConnect.php');  
	$query = "select name,price,discount from careemportalproducts where site='".$site."'";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{
		if($row["name"] == 'Petrol'){
			$dbPetrolPrice = $row["price"];
			$dbDiscount = $row["discount"]; 
		}
		if($row["name"] == 'Diesel'){
			$dbDieselPrice = $row["price"];
			$dbDiscount = $row["discount"]; 
		}
	} 


	//GEtting Captains 
	// $options='<option value="null" selected disabled>Select Vehicle Number</option>';

	$result = array(); 

	include('../MainConnect.php');  
	$query = "select top 1000 id,captainid,vehicleid,vehiclenumber,customername,contactnumber,vehicletype from careemportalcustomers	where   status='Active'";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{
		$mysql_data[] = array
		( 
			"id" => $row["id"],
			"captainid" => $row["captainid"],
			"vehicleid" => $row["vehicleid"],
			"vehiclenumber" => $row["vehiclenumber"],
			"customername" => $row["customername"],
			"contactnumber" => $row["contactnumber"],
			"vehicletype" => $row["vehicletype"]
		);
	} 



	$data["CaptainData"] = $mysql_data;
	$data["dbPetrolPrice"] = $dbPetrolPrice;
	$data["dbDieselPrice"] = $dbDieselPrice;
	$data["dbDiscount"] = $dbDiscount; 
	echo json_encode($data);
}
?>