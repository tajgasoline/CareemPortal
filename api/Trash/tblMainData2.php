<?php


if(isset($_POST['store'])  && isset($_POST['field1']))
{
	

	$store = htmlentities($_POST["store"]);
	$field1 = htmlentities($_POST["field1"]); 
	$serverName = "";
    $userId = "";
    $userPassword = "";
    $database = "";
    $fbrid='';
 

	$result = array(); 

  //fbrtable id

  include('../MainConnect.php'); 
                      $query = "select fbrid from tblfbr";
                      $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
                      while ($row = sqlsrv_fetch_array($stmt))
                      {
                        $fbrid = $row["fbrid"] +1; 
                     } 

	include('../MainConnect.php'); 
                      $query = "select dbname,username,password,server from tblfbrtransactions where store = '".$store."'";
                      $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
                      while ($row = sqlsrv_fetch_array($stmt))
                      {
                      	$serverName = $row["server"];
    					$userId = $row["username"];
    					$userPassword = $row["password"];
    					$database = $row["dbname"]; 
                     } 
 
    $connectionInfo = array("UID" => $userId,
                            "PWD" => $userPassword,
                            "Database"=> $database,
                            "TrustServerCertificate"=>True);
    $StoreConnect = sqlsrv_connect($serverName,$connectionInfo);
    if(!$StoreConnect){
        // print_r(sqlsrv_errors(), true);
        echo "<script>alert('Oops connection Problem')</script>";
    }


     if($StoreConnect)
  {

$where = 'where';
// $field1 = 'RTGUL-RTGC-175117';
if($field1 != ""){
	$where .= " RTT.transactionid='".$field1."' ";
}
else {
	$where .='';

}
 



    $query = " select RTT.CUSTACCOUNT
 ,DIRPARTYTABLE.name as CustomerNAme 
 , RTST.itemid,ECORESPRODUCTTRANSLATION.NAME as ItemNAme,RTST.price, abs(RTST.QTY) as QTY, abs(RTST.NETAMOUNT) as NETAMOUNT
,( select abs(sum(RL.NETAMOUNT))
 from  RETAILTRANSACTIONSALESTRANS RL  
 where RL.transactionid=RTT.transactionid) as nettotal
 from  RETAILTRANSACTIONSALESTRANS RTST 
 inner join RETAILTRANSACTIONTABLE RTT on RTT.TRANSACTIONID= RTST.TRANSACTIONID  
 inner join CUSTTABLE on custtable.accountnum = Rtt.CustAccount
 inner join DIRPARTYTABLE on Custtable.PARTY = DIRPARTYTABLE.RECID
 inner join Inventtable on INventtable.itemid = RTST.ITEMID
 inner join ECORESPRODUCTTRANSLATION on Inventtable.PRODUCT = ECORESPRODUCTTRANSLATION.PRODUCT
  ".$where." ";
    $stmt = sqlsrv_query($StoreConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
    if (!$query )  {
      $result  = "error";
      $message = "query error";
    }
    else
    {
      $result  = "success";
      $message = "query success";
      $empty="";


      while ($res = sqlsrv_fetch_array($stmt))
      {  
 
      	$dbcustomername= $res['CustomerNAme'];
      	$dbfield1 = $field1;

        $mysql_data[] = array
        (
          "itemid" => $res['ItemNAme'],
          "price" => number_format(round($res['price'])),
          "QTY" => round($res['QTY']), 
          "NETAMOUNT" => number_format(round($res['NETAMOUNT'])),
           "nettotal" => number_format(round($res['nettotal'])),
          "nettotal2" => $res['nettotal']
          
        );
      }
    }
//   // Close database connection
  }
// Prepare data
  $data = array(
    
    "fbrid"  => $fbrid,
    "result"  => $result,
    "message" => $message,
    "dbcustomername" => $dbcustomername,
    "dbfield1" => $dbfield1,
    "data"    => $mysql_data
  );
// Convert PHP array to JSON array
  $json_data = json_encode($data);
  print $json_data;
														

}

?>
