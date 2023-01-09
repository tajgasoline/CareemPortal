<?php


if(  isset($_POST['id']))
{

 session_start();
 $id = htmlentities($_POST["id"]); 
 $result = array(); 
 
// select cp.id,cp.customername,cp.VEHICLETYPE,cp.vehiclenumber,cpp.name as product,cp.price,
// cp.quantity,cp.amount,cp.site from careemportal cp ,careemportalproducts cpp where 
// cp.site=cpp.site and cp.product=cpp.productid and
// cp.id=4



 include('../MainConnect.php');  
 $query = "select cp.id,cp.customername,cp.VEHICLETYPE,cp.vehiclenumber,cpp.name as product,cp.price,
cp.quantity,cp.amount,cp.site,cp.discount,cp.contactnumber,cp.discountamount,cp.doc from careemportal cp ,careemportalproducts cpp where cp.site=cpp.site and cp.product=cpp.productid and cp.id=".$id;
 $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
 while ($row = sqlsrv_fetch_array($stmt))
 {
  $id = $row["id"]; 
  $customername = $row["customername"]; 
  $VEHICLETYPE = $row["VEHICLETYPE"]; 
  $vehiclenumber = $row["vehiclenumber"]; 
  $product = $row["product"]; 
  $price = $row["price"]; 
  $quantity = $row["quantity"]; 
  $amount = $row["amount"]; 
  $site = $row["site"];  
    $discount = $row["discount"]; 
  $contactnumber = $row["contactnumber"]; 
  $discountamount = $row["discountamount"];
  $doc = $row["doc"]; 
} 

 

$data["id"] = $id; 
$data["customername"] = $customername; 
$data["VEHICLETYPE"] = $VEHICLETYPE; 
$data["vehiclenumber"] = $vehiclenumber; 
$data["product"] = $product; 
$data["price"] = $price; 
$data["quantity"] = $quantity; 
$data["amount"] = $amount;
$data["site"] = $site;  


$data["discount"] = $discount; 
$data["contactnumber"] = $contactnumber; 
$data["discountamount"] = $discountamount;
$data["doc"] = date_format($doc,"Y/m/d H:i:s");  

 
$json_data = json_encode($data);
print $json_data;


}

?>
