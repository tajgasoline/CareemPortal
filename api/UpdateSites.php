
<?php


if(isset($_POST["ID1"]) &&  isset($_POST["SitesName"]) && isset($_POST["City"]) 
	&& isset($_POST["Username"]) && isset($_POST["Password"])   && isset($_POST["userid1"])   )
{
	

	$ID1 = htmlentities($_POST["ID1"]); 
	$SitesName = htmlentities($_POST["SitesName"]); 
	$City = htmlentities($_POST["City"]); 
	$Username = htmlentities($_POST["Username"]); 
	$Password = htmlentities($_POST["Password"]);  
	$userid1 = htmlentities($_POST["userid1"]);  
		$dbusername='';
	$username='';


	session_start();
	$staffusername = $_SESSION['staffusername'];
	$site = $_SESSION['site'];
	$role = $_SESSION['role'];

	include('../MainConnect.php');  
	$query = "select username  from CareemPortalUsers where username = '".$Username."'";
 
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{
		$username = $row["username"]; 

	} 

 
	if( $username == '' || $username == null){
		include('../MainConnect.php');   
		$query2 = "UPDATE CareemPortalSite SET site='".$SitesName."',city='".$City."' WHERE id=".$ID1 ;
		$stmt2 = sqlsrv_query($MainConnect, $query2, array(), array("Scrollable"=>'static')) or DIE(sqlsrv_errors());  

		if( $stmt2 == True){
			$query2 = "UPDATE CareemPortalUsers SET username='".$Username."',password='".$Password."',site='".$SitesName."' WHERE id=".$userid1 ; 
			include('../MainConnect.php');  
			$stmt2 = sqlsrv_query($MainConnect, $query2, array(), array("Scrollable"=>'static')) or DIE(sqlsrv_errors());  
			$data["result"] = "Done";
			echo json_encode($data);
		}
		else
		{

			$data["result"] = "error";
			echo json_encode($data);


		}

	}
	else
	{

		$data["result"] = "Username Already Exist";
		echo json_encode($data);


	}




}

?>
