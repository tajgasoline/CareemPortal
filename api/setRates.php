<?php
if(isset($_POST['PetrolNewRates'])  && isset($_POST['DiesalNewRates']) && isset($_POST['PetrolDiscount']) && isset($_POST['DiesalDiscount']) )
{
	$PetrolNewRates = $_POST["PetrolNewRates"]; 
	$DieselNewRates = $_POST["DiesalNewRates"]; 
	$PetrolDiscount = $_POST["PetrolDiscount"]; 
	$DieselDiscount = $_POST["DiesalDiscount"]; 
	session_start();
	$staffusername = $_SESSION['staffusername'];
	$site = $_SESSION['site'];
	$role = $_SESSION['role'];
	$result = ''; 

//Updating price of Petrol
	include('../MainConnect.php');
	$query2 = "update CareemPortalProducts set price='".$PetrolNewRates."',discount ='".$PetrolDiscount."'  
	where site='".$site."' and name = 'Petrol'";
	$stmt2 = sqlsrv_query($MainConnect, $query2, array(), array("Scrollable"=>'static')) or DIE(sqlsrv_errors());  
	if( $stmt2 == True){
		$result= "Done"; 
	}
	else
	{
		$result = "error"; 
	}

//Updating price of Diesel
	include('../MainConnect.php');
	$query2 = "update CareemPortalProducts set price='".$DieselNewRates."',discount ='".$DieselDiscount."'  
	where site='".$site."' and name = 'Diesel'";
	$stmt2 = sqlsrv_query($MainConnect, $query2, array(), array("Scrollable"=>'static')) or DIE(sqlsrv_errors());  
	if( $stmt2 == True){
		$result= "Done"; 
	}
	else
	{
		$result= "error"; 
	} 
	$data["result"] = $result; 
	echo json_encode($data);
}
?>