function tblcases2(){
 $("#datatable").DataTable({
   "ajax": "api/tblMainReport.php"  ,
   "columns": [
    { "data": "transactionid"},
    { "data": "fbrid"},
    { "data": "amount"} 
    ],
 });
}

$(document).ready(function()
{
  
  tblcases2();  
});
