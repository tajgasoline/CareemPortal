
<?php


if(isset($_POST["id"]) && isset($_POST["staffusername1"]) && isset($_POST["staffpass1"]) && isset($_POST["Role1"]) )
{
	
	$id = htmlentities($_POST["id"]); 
	$staffusername = htmlentities($_POST["staffusername1"]); 
	$staffpass = htmlentities($_POST["staffpass1"]); 
	$Role = htmlentities($_POST["Role1"]); 

  include('../MainConnect.php');     

 
	$query2 = "UPDATE CareemPortalUsers SET username='$staffusername',password='$staffpass',Role='$Role' WHERE id=$id ";
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
