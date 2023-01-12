<?php


if(isset($_POST['VehicleType']) )
{
	

	$VehicleType = $_POST["VehicleType"]; 
	$options='<option value="null" selected disabled>Select Vehicle Number</option>';
  
	$result = array(); 

	include('../MainConnect.php');  
	$query = "select captainid,vehicleid,vehiclenumber,customername,contactnumber from careemportalcustomers
where vehicletype='".$VehicleType."' and status='Active'";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{

		$options .= "<option 
		data-captainid='".$row["captainid"]."'
		data-vehicleid='".$row["vehicleid"]."'
		data-vehiclenumber='".$row["vehiclenumber"]."'
		data-customername='".$row["customername"]."'
		data-contactnumber='".$row["contactnumber"]."'
		 value='".$row["vehiclenumber"]."''>".$row["vehiclenumber"]." - ".$row["customername"]." - ".$row["contactnumber"]."</option>"; 

	} 
 
 
 
	$data["options"] = $options; 
	echo json_encode($data);



}

?>
