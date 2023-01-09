<?php
// Prepare array
 
  include("../StoreConnect.php");
  $mysql_data = array();
  $result="";
  $message="";
  if($conn)
  {

    $query = "select  RTST.itemid,RTST.price, RTST.QTY, RTST.NETAMOUNT
 from  RETAILTRANSACTIONSALESTRANS RTST 
 inner join RETAILTRANSACTIONTABLE RTT on RTT.TRANSACTIONID= RTST.TRANSACTIONID
 where RTT.transactionid='RTGUL-RTGC-175117' ";
    $stmt = sqlsrv_query($conn, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
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
     //        $Action='<td><button 
     //         id="'.$res["ORDERID"].'" 
     //  data-id="'.$res['ORDERPREFIXID'].'" 
     // class="btn cancelOrder" type="button"  style="background-color:#efb5b5; color:black;">Cancel</button></td>';

 
        $mysql_data[] = array
        (
          "itemid" => $res['itemid'],
              "QTY" => $res['QTY'], 
          "price" => $res['price'],
     
          "NETAMOUNT" => $res['NETAMOUNT']
        );
      }
    }
//   // Close database connection
  }
// Prepare data
  $data = array(
    "result"  => $result,
    "message" => $message,
    "data"    => $mysql_data
  );
// Convert PHP array to JSON array
  $json_data = json_encode($data);
  print $json_data;
 
?>