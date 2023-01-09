<?php


if(  isset($_POST['Transaction']))
{
	  session_start();

	$store =   $_SESSION['store'];
  $tax =  $_SESSION['tax'];

	$field1 = htmlentities($_POST["Transaction"]); 
	$serverName = "";
    $userId = "";
    $userPassword = "";
    $database = "";
 

	$result = array(); 


 $serverName =$_SESSION['server'];
 $userId = $_SESSION['dbusername'];
 $userPassword = $_SESSION['dbpassword'];
 $database = $_SESSION['dbname'];

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
 

// SELECT RTT.store,RTT.TRANSACTIONID,cast(RPT.STARTDATE as Date)  STARTDATE ,B.ORDERTYPE,EC.NAME AS HNAME,ECPT.NAME AS INAME, (RTST.QTY *-1) QTY,RTST.PRICE,
// RTST.DISCAMOUNT * -1 DISCAMOUNT, RTST.TRANSACTIONSTATUS,
// CASE WHEN TGD.TAXCODE = 'SRV CHARGE' THEN  (RTST.TAXAMOUNT *-1)  ELSE 0 END SERVICETAX,
// CASE WHEN TGD.TAXCODE = 'SRV CHARGE' THEN  0  ELSE (RTST.TAXAMOUNT * -1 ) END SALESTAX, 
// RTST.NETAMOUNT * -1 NETAMOUNT,GETDATE(),B.PERSONS,,RTST.ITEMID,RTST.LINENUM,REFERENCENAME , CONTACTNUMBER,ADDRESS 
// FROM RETAILTRANSACTIONTABLE RTT
// INNER JOIN RETAILTRANSACTIONSALESTRANS RTST ON RTST.TRANSACTIONID = RTT.TRANSACTIONID
// AND RTT.DATAAREAID   =RTST.DATAAREAID
// INNER JOIN INVENTTABLE IT ON IT.ITEMID = RTST.ITEMID AND IT.DATAAREAID = RTST.DATAAREAID
// LEFT JOIN RETAILPOSBATCHTABLE RPT on RPT.BATCHID = RTT.BATCHID AND RTT.STORE = RPT.STOREID
// LEFT JOIN RBOBOOKINGS B on B.BOOKINGID = RTT.COMMENT_
// LEFT JOIN ECORESPRODUCTTRANSLATION ECPT ON ECPT.PRODUCT       = IT.PRODUCT
// LEFT JOIN ECORESPRODUCTCATEGORY ECP on IT.PRODUCT = ECP.PRODUCT
// LEFT JOIN ECORESCATEGORY EC on ec.RECID  = ECP.CATEGORY
// LEFT JOIN HCMWORKER HW ON HW.PERSONNELNUMBER = RTT.STAFF
// LEFT JOIN DIRPARTYTABLE DP ON DP.RECID = HW.PERSON
// LEFT JOIN SALESTABLE ST ON ST.SALESID = RTT.SALESORDERID AND ST.DATAAREAID = RTT.DATAAREAID
// LEFT JOIN TAXGROUPDATA TGD ON TGD.TAXGROUP = ST.TAXGROUP AND TGD.DATAAREAID = ST.DATAAREAID
// where  
// (RTT.DATAAREAID IN ('T-RB'))
// AND (ECPT.LANGUAGEID ='en-us')   
// and RTT.transactionid='RTGUL-RTGC-175117'


    $query = "select RTT.CUSTACCOUNT
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
  $totalamount = 0;

      while ($res = sqlsrv_fetch_array($stmt))
      {  
   $totalamount = $totalamount + $res['NETAMOUNT'];
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
    "result"  => $result,
    "totalbill"  => $totalamount,    
    "message" => $message,
    "dbcustomername" => $dbcustomername,
    "staffusername" => $_SESSION['staffusername'], 
    "tax" => $tax,
    "dbfield1" => $dbfield1,
    "data"    => $mysql_data
  );
// Convert PHP array to JSON array
  $json_data = json_encode($data);
  print $json_data;
														

}

?>
