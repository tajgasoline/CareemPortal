<?php
if(isset($_POST['CustomerName']) &&  isset($_POST['VehicleType']) && isset($_POST['VehicleNumber']) && 
	isset($_POST['Product']) && isset($_POST['ProductPrice']) && isset($_POST['Liters']) && isset($_POST['DiscountAmount']) && 
	isset($_POST['Amount']) 
&& isset($_POST['ContactNumber']) && 
	isset($_POST['Discount']))
{
	session_start();
	$Site = $_SESSION['site'];
	$CustomerName = $_POST["CustomerName"]; 
	$VehicleType = $_POST["VehicleType"]; 
	$VehicleNumber = $_POST["VehicleNumber"]; 
	$Product = $_POST["Product"]; 
	$Liters = $_POST["Liters"]; 
	$DiscountAmount = $_POST["DiscountAmount"]; 
	$Amount = $_POST["Amount"]; 
	$ProductPrice = $_POST["ProductPrice"]; 

		$ContactNumber = $_POST["ContactNumber"]; 
	$Discount = $_POST["Discount"]; 

	$result = array(); 

	include('../MainConnect.php');  
	$query = "select count(id) as id from careemportal";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{
		$id = $row["id"]; 

	} 
	$id = $id +1; 
	include('../MainConnect.php');  
	$query = "INSERT INTO CareemPortal(id,CUSTOMERNAME,VEHICLETYPE,VEHICLENUMBER,PRODUCT
		,PRICE,QUANTITY,AMOUNT,SITE,discountamount,discount,contactnumber,doc)  values (?,?,?,?,?,?,?,?,?,?,?,?,getdate()) ";
	$params = array(&$id,&$CustomerName,&$VehicleType,&$VehicleNumber,&$Product,&$ProductPrice,&$Liters,&$Amount,&$Site,
		&$DiscountAmount,&$Discount,
		&$ContactNumber);
	$stmt = sqlsrv_prepare($MainConnect, $query, $params);
	if (sqlsrv_execute( $stmt ) === false ) 
	{
		$result="Not Inserted";
	}
	else{
		$result="Inserted";
	}
	$data["result"] = $result; 
	$data["id"] = $id; 
	echo json_encode($data);
}
?>