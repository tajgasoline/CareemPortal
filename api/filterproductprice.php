<?php


if(isset($_POST['price']) )
{
	

	$price = $_POST["price"]; 
	$dbprice='';
 
 
	$result = array(); 

	include('../MainConnect.php');  
	$query = "select price,discount from careemportalproducts where productid=".$price."";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{
		$price = $row["price"];
		$discount = $row["discount"]; 
		

	} 
 
 
 
	$data["price"] = $price;
	$data["discount"] = $discount;
	echo json_encode($data);



}

?>
