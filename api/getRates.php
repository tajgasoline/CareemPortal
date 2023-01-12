<?php


if(isset($_POST['check']) )
{
	session_start();
	$staffusername = $_SESSION['staffusername'];
	$site = $_SESSION['site'];
	$role = $_SESSION['role'];

	$PetrolPrice = '';
	$PetrolDiscount = '';
	$DiesalPrice = '';
	$DiesalDiscount = '';

	$check = $_POST["check"]; 

	$result = ''; 

	include('../MainConnect.php');  
	$query = "select price,name as productname,discount from CareemPortalProducts
	where site='".$site."' ";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{

		if($row["productname"] == 'Petrol'){

			$PetrolPrice = $row["price"];
			$PetrolDiscount = $row["discount"];

		} else if($row["productname"] == 'Diesel'){

			$DiesalPrice = $row["price"];
			$DiesalDiscount = $row["discount"];

		}
		$result = 'Success';
	} 



	$data["PetrolPrice"] = $PetrolPrice; 
	$data["PetrolDiscount"] = $PetrolDiscount; 
	$data["DiesalPrice"] = $DiesalPrice; 
	$data["DiesalDiscount"] = $DiesalDiscount; 
	$data["result"] = $result; 
	echo json_encode($data);



}

?>
