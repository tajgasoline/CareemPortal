
<?php


if(isset($_POST["ID1"]) && isset($_POST["VehicleID1"]) && isset($_POST["VEHICLETYPE1"]) && isset($_POST["VEHICLENUMBER1"])
&& isset($_POST["CaptainID1"]) && isset($_POST["CUSTOMERNAME1"]) && isset($_POST["CONTACTNUMBER1"]) && isset($_POST["Status1"]) )
{
	
 
$ID1 = htmlentities($_POST["ID1"]); 
	$VehicleID1 = htmlentities($_POST["VehicleID1"]); 
	$VEHICLETYPE1 = htmlentities($_POST["VEHICLETYPE1"]); 
	$VEHICLENUMBER1 = htmlentities($_POST["VEHICLENUMBER1"]); 
	$CaptainID1 = htmlentities($_POST["CaptainID1"]); 
	$CUSTOMERNAME1 = htmlentities($_POST["CUSTOMERNAME1"]); 
	$CONTACTNUMBER1 = htmlentities($_POST["CONTACTNUMBER1"]); 
	$Status1 = htmlentities($_POST["Status1"]); 


session_start();
$staffusername = $_SESSION['staffusername'];
$site = $_SESSION['site'];
$role = $_SESSION['role'];

  include('../MainConnect.php');     
 $date = date('Y-m-d H:i:s');

	$query2 = "UPDATE CareemPortalCustomers SET VEHICLETYPE='".$VEHICLETYPE1."',VEHICLENUMBER='".$VEHICLENUMBER1."',CUSTOMERNAME='".$CUSTOMERNAME1."',CONTACTNUMBER='".$CONTACTNUMBER1."',STATUS='".$Status1."',MODIFIEDBY='".$staffusername."',MODIFIEDDATE=getdate(),
	CaptainID='".$CaptainID1."',VehicleID='".$VehicleID1."' WHERE id=".$ID1 ;


	$stmt2 = sqlsrv_query($MainConnect, $query2, array(), array("Scrollable"=>'static')) or DIE(sqlsrv_errors());  


	if( $stmt2 == True){

		$data["result"] = "Done";
		echo json_encode($data);
	}
	else
	{

		$data["result"] = "error";
		echo json_encode($data);


	}


}

?>
