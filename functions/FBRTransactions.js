

function table(){

 $("#datatable").DataTable({

  "ajax": "api/TblFBRTransactions.php", 
  "columns": [
  { "data": "itemid"} ,
    { "data": "QTY"}, 
  { "data": "price"} ,
  { "data": "NETAMOUNT"}
  ],
});

}


function Fbrtrans(){
    

     var fbrid = $("#fbrid").val();
    var transid = $("#transid").text();
       var finaltotal = $("#totalbill").text();

           $.ajax( {
    url: "api/fbrapi.php",
    method: "POST",
    data: {
    fbrid:fbrid,
    transid:transid,
    finaltotal:finaltotal
  },
    dataType: "JSON",
    success: function (data) 
    {
      var result = data.result; 
      location.reload();

    }});

}



function Search(){
    $("#tbody").html('');
    // var store = $("#storeid").val();
    var field1 = $("#field1").val();
       $.ajax( {
    url: "api/tblMainData2.php",
    method: "POST",
    data: {field1:field1},
    dataType: "JSON",
    success: function (data) 
    {
      var result = data.data;
      var dbcustomername = data.dbcustomername;
      var dbfield1 = data.dbfield1;
      var tax = data.tax; 
      var fbrid = data.fbrid; 
      // alert(data.totalamount);
        var finaltotal2='';
     
  $("#fbrid").val(fbrid);
      
      $("#custname").text(dbcustomername);
      $("#transid").text(dbfield1);
      $("#taxpercent").text(tax);
      
      
 
      var td ='';
      var finaltotal='';
    
      for (var i = 0; i < result.length ; i++) {
        td += '<tr>'+
        '<td><span>'+result[i].itemid+'</span></td>'+
        '<td><span>'+result[i].QTY+'</span></td>'+
        '<td><span>'+result[i].price+'</span></td>'+
        '<td><span>'+result[i].NETAMOUNT+'</span></td>'+ 
        '</tr>';
        finaltotal = result[i].nettotal; 
              

      }
   finaltotal2 = data.totalamount; 
   // alert(finaltotal2);
finaltotal2 = (parseInt(finaltotal2)).toFixed(2);
       $("#totalbill").text(finaltotal2);
       $("#tablenumber").text(4);
        $("#persons").text(7);       
       
       var taxamount = ( (parseInt(finaltotal2) * 11.5)/100);
       // alert(finaltotal2);
       $("#taxamount").text(taxamount);
       $("#totalamount").text((finaltotal2-taxamount));

        td += '<tr>'+
        '<td colspan="3">Total</span></td>'+
         
        '<td><span>'+finaltotal2+'</span></td>'+ 
        '</tr>';

      $("#tbody").html(td);




      return data;
    }
  });

}


function Search2(value){
var buttonname= value;  
    var field1 = $("#field1").val();
       $.ajax( {
    url: "api/BillPayment.php",
    method: "POST",
    data: {field1:field1,buttonname:buttonname},
    dataType: "JSON",
    success: function (data) 
    {
      var result = data.data;
      if(buttonname == "paycashwithprint"){
  window.location.href = './invoice.php?Transaction='+field1 +'&PaymentType='+buttonname;

      } else if(buttonname == "paywithcard"){
          window.location.href = './invoice.php?Transaction='+field1 +'&PaymentType='+buttonname;

      }
      else {
          Swal.fire({
                    html:`Thankyou For Coming`,
                    confirmButtonText:'Close'
                })  .then(function () {
            window.location.href = 'FBRtransactions.php';
        });

      }

    
      return data;
    }
  });

}

function ActiveClass(){
 $("#CustomerOrders").addClass("mm-active");
}

function fliteration() {


  var check = 1;
  $.ajax( {
    url: "api/filteration.php",
    method: "POST",
    data: {check:check},
    dataType: "JSON",
    success: function (data) 
    {
      var result = data.result;
      Site_Warehouse = data.Site_Warehouse;
      Warehouse_Location = data.Warehouse_Location; 



      return data;
    }
  });
}




function filteringWarehouses(id,value){

  let Warehouse = 'W'+(id.substring(1));
  let Location = 'L'+(id.substring(1));
  $("#"+Location).html('');

  var options = [];
  var newoption = '<option disabled value="-1" selected>  --  Select  --  </option>';
  options.push(newoption);
   $("#"+Location).html(options);

  $("#"+Warehouse).html('');
  
  for(var i=0; i<Site_Warehouse.length;i++){

    if(Site_Warehouse[i]["SiteId"] == value){

     newoption = "<option value='"+Site_Warehouse[i]["WarehouseID"]+"'>"+Site_Warehouse[i]["WarehouseName"] +"</option>";
     options.push(newoption);
   }
 }
 $("#"+Warehouse).html(options);


}




function filteringLocations(id,value){
  let Location = 'L'+(id.substring(1));
  var options = [];
  var newoption = '<option disabled value="-1" selected>  --  Select  --  </option>';
  options.push(newoption);

  $("#"+Location).html('');
  for(var i=0; i<Warehouse_Location.length;i++){

    if(Warehouse_Location[i]["WarehouseID"] == value){

     newoption = "<option value='"+Warehouse_Location[i]["Location"]+"'>"+Warehouse_Location[i]["Location"] +"</option>";
     options.push(newoption);
   }
 }
 $("#"+Location).html(options);

}





$(document).ready(function()
{

  
  // table(); 
 

 



  $(document).on("click", ".edit-modal", function(){


   $("#id2").val($(this).attr("id"));$("#siteName1").val($(this).data("siteName"));$("#location1").val($(this).data("location"));$("#siteType1").val($(this).data("siteType"));$("#productCode1").val($(this).data("productCode"));$("#productName1").val($(this).data("productName"));$("#serialNumber1").val($(this).data("serialNumber"));$("#condition1").val($(this).data("condition"));$("#systemFor1").val($(this).data("systemFor"));$("#quantity1").val($(this).data("quantity"));$("#purchaseDate1").val($(this).data("purchaseDate"));$("#status1").val($(this).data("status"));

 });


    //dropdown select
      $(".carrier, .site, .warehouse, .location").select2({
        // dropdownParent:$("#carrierparent")
      });


});


    //balance credit debit
    $(".credit").click(function(){
        let credit= $(this).data('bid');
        $.ajax({
            url: "api/actionCredit.php",
            method: "GET",
            data: {credit:credit},
            success: function(data){
                var data = JSON.parse(data);
                console.log(data);
                Swal.fire({
                    html:`Balance:  ${data.balance} <br><br>  Credit Limit: ${data.credit}<br><br>  Available Credit Limit: ${data.available}`,
                    confirmButtonText:'Close'
                });
            }
        })

        
    })


function refreshdata(){
 $("#datatable").DataTable().destroy(); 
 table();
}






$(document).on("click", ".btnEdit", function(){

  var id = $(this).data('idd');
  var prefix = $(this).data('id');
  var holdfreeqty = $(this).data('holdfreeqty');
          // var ReleaseQty = $("#RQ-TAJ-15 T-HB-19120").val(); 
          var ReleaseQty = $("#RQ-"+id).val(); 
          var Warehouse = $("#W-"+id).val(); 
          var Site = $("#S-"+id).val(); 
          var location = $("#L-"+id).val(); 
          var TankLorry = $("#TL-"+id).val(); 
          var TankCapacity = $("#TC-"+id).val(); 


        // prefix = $(this).data('id'); // order prefix

        // // quantity
        // detail = $(this).data('qid'); // holdfree

        // // holdsfree
        // data1 = $(this).parents('tr').find('td input.holds').val(); // release qty

        $("#TLv-"+id).css("display","none");
        $("#Sv-"+id).css("display","none");
        $("#Wv-"+id).css("display","none");
        $("#Lv-"+id).css("display","none");
        $("#RQv-"+id).css("display","none");


        if(ReleaseQty == null || ReleaseQty == ""){
          $("#RQv-"+id).css("display","block");
          $("#RQv-"+id).css("color","red");
          $("#RQv-"+id).text("Please fill this field"); 
        } else if( parseInt(ReleaseQty) > parseInt(holdfreeqty.replace(/,/g, '')) ){
          // alert("Release Qty should be less than Holds free Qty");
          $("#RQv-"+id).css("display","block");
          $("#RQv-"+id).css("color","red");
          $("#RQv-"+id).text("Release Qty should be less than Holds free Qty"); 
            // Swal.fire("Release Qty should be less than Holds free Qty");
            // $(this).parents('tr').find('td div.warning-msg').slideDown().css('display', 'block');
            // $(this).parents('tr').find('td input.holds').val("").focus();
          } else if(TankLorry == null){
            $("#TLv-"+id).css("display","block");
            $("#TLv-"+id).css("color","red");
            $("#TLv-"+id).text("Please fill this field"); 
          } else if(Site == null){
            $("#Sv-"+id).css("display","block");
            $("#Sv-"+id).css("color","red");
            $("#Sv-"+id).text("Please fill this field"); 
          }
          else if(Warehouse == null){
            $("#Wv-"+id).css("display","block");
            $("#Wv-"+id).css("color","red");
            $("#Wv-"+id).text("Please fill this field"); 
          } 

          else if(location == null){
            $("#Lv-"+id).css("display","block");
            $("#Lv-"+id).css("color","red");
            $("#Lv-"+id).text("Please fill this field"); 
          }
          else{

           $("#btnApprove-"+id).prop('disabled',false); 
        //disabled approve button enable
            // $(this).parents('tr').find('td > button.btnApprove').prop('disabled',false);
            
            // $('.warning-msg').slideUp().hide();


            //checking null value of holdsfree input
            if(ReleaseQty == ""){
              Swal.fire("Null value of holdfree not allowed")
            }
            else{
              total = parseInt(holdfreeqty.replace(/,/g, '')) - ReleaseQty;

              $("#B-"+id).text(total); 
                // $(this).parents('tr').find('td.balance').text(total);
                // // balance
                // bal = $(this).parents('tr').find('td.balance').text();
              }  
            }



          });



$(document).on("click", ".btnApprove", function(){

  var prefix = $(this).data('idd');
  var id = $(this).data('idd');
  var prefix = $(this).data('id');
  var holdfreeqty = $(this).data('holdfreeqty');
  var productcode = $(this).data('productcode');
  var customer = $(this).data('customer');
  var custgroup = $(this).data('cgroup');

  var ReleaseQty = $("#RQ-"+id).val(); 
  var Warehouse = $("#W-"+id).val(); 
  var Site = $("#S-"+id).val(); 
  var location = $("#L-"+id).val(); 
  var TankLorry = $("#TL-"+id).val(); 
  var TankCapacity = parseInt($("#TC-"+id).text()); 
  var bal = parseInt($("#B-"+id).text()); 

  data1 = ReleaseQty;
  tl = TankLorry;
  siteInduction = Site;
  whInduction = Warehouse;
  locInduction = location;
  tankcap = TankCapacity;
  cgroup = custgroup;
  customer = customer;
  product = productcode;

//   // release qty
//         data1 = $(this).parents('tr').find('td input.holds').val();

//         // Tank lorry
//         tl = $(this).parents('tr').find('td select.carrier').val();

//         // site
//         siteInduction = $(this).parents('tr').find('td select.site').val();

//         // warehouse
//         whInduction = $(this).parents('tr').find('td select.warehouse').val();

//         // location
//         locInduction = $(this).parents('tr').find('td select.location').val();

//         // tank cap
//         tankcap = $(this).parents('tr').find('td input.tcHidden').val();

//         // cust group
//         cgroup = $(this).parents('tr').find('td input.ciHidden').val();

//         // customer
//         customer = $(this).parents('tr').find('td input.cHidden').val();

//         // product
//         product = $(this).parents('tr').find('td input.productHidden').val();


if(data1 == ""){
  Swal.fire("Kindly input holdsfree amount");
            bal = $(this).parents('tr').find('td.balance').text(""); // balance
          }  else{

            $("#btnApprove-"+id).prop('disabled',true); 
            $("#btnEdit-"+id).prop('disabled',true); 
            $("#RQ-"+id).prop('disabled', true);
            $("#W-"+id).prop('disabled', true); 
            $("#S-"+id).prop('disabled', true); 
            $("#L-"+id).prop('disabled', true);
            $("#TL-"+id).prop('disabled', true);
            $("#TC-"+id).prop('disabled', true);
         // //   $(this).prop('disabled', true); // approve button disable for specific row
         //    $(this).parents('tr').find('td > button.btnEdit').prop('disabled', true); // edit button disable for specific row
         //    $(this).parents('tr').find('td > input.holds').prop('disabled',true); // release 
         //    $(this).parents('tr').find('td select.carrier').prop('disabled',true); // tank lorry
         //    $(this).parents('tr').find('td select.site').prop('disabled', true); // site
         //    $(this).parents('tr').find('td select.warehouse').prop('disabled', true); // warehouse
         //    $(this).parents('tr').find('td select.location').prop('disabled', true); // location

            //console.log(tankcap + "" + cgroup + "" + data1 + "" + customer + "" + prefix);

            $.ajax({
              url: "api/actionDynRelease.php",
              method: "GET",
              data: {prefix:prefix,tankcap:tankcap,cgroup:cgroup,customer:customer,data1:data1,product:product},
              success: function(data){
                var data = JSON.parse(data);
                console.log(data);

                if(data.status == "success")
                {
                        // console.log('query exec');
                        $.ajax({
                          url: "api/actionAdminTransaction.php",
                          method: "GET",
                          data: {
                            data1:data1,
                            bal:bal,prefix:prefix,
                            tl:tl,
                            siteInduction:siteInduction,
                            whInduction:whInduction,
                            locInduction:locInduction},
                            success: function(data){
                              console.log(data);
                              var data = JSON.parse(data);

                              if(data.status == "success")
                              {
                                ajaxCallSpecial();
                                    // $.ajax({
                                    //     url: "actionNewRecord.php",
                                    //     method: "GET",
                                    //     data: {prefix:prefix, bal:bal, customer:customer, product:product},
                                    //     success: function(data){
                                    //         console.log(data);
                                    //         Swal.fire("Your data has been approved");     
                                    //     }
                                    // })
                                  }
                                }
                              })
                      }
                      else
                      {
                        Swal.fire("Tank Capacity for " + data.customer + " per day limit has been exceeded.");   
                        $(this).prop('disabled', false); // approve button disable for specific row
                        $(this).parents('tr').find('td > button.btnEdit').prop('disabled', false); // edit button disable for specific row
                        $(this).parents('tr').find('td > input.holds').prop('disabled',false); // release 
                        $(this).parents('tr').find('td select.carrier').prop('disabled',false); // tank lorry
                        $(this).parents('tr').find('td select.site').prop('disabled', false); // site
                        $(this).parents('tr').find('td select.warehouse').prop('disabled', false); // warehouse
                        $(this).parents('tr').find('td select.location').prop('disabled', false); // location  
                        //console.log('nothing');                        
                      }
                    }
            }) // end dynAjax

            function ajaxCallSpecial(){
              $.ajax({
                url: "api/actionNewRecord.php",
                method: "GET",
                data: {prefix:prefix, bal:bal, customer:customer, product:product},
                success: function(data){
                  console.log(data);
                }
              })
            }
          }

        });

    // $("#balance").click(function(){
    //     // Swal.fire({html:'Balance:  <?= number_format( $res2["Balance"],2);?> <br><br>  Credit Limit: <?= number_format( $res2["Credit_Limit"],2);?>',
    //     //             confirmButtonText:'Close'});
    //     // alert("hello world");
    // })

    //disable minus - key of keyboard
    $(".holds").keydown(function(e){
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8)) {
        return false;
    }
  })

    //balance credit debit
    $(".credit").click(function(){
      let credit= $(this).data('bid');
      $.ajax({
        url: "api/actionCredit.php",
        method: "GET",
        data: {credit:credit},
        success: function(data){
          var data = JSON.parse(data);
          console.log(data);
          Swal.fire({
            html:`Balance:  ${data.balance} <br><br>  Credit Limit: ${data.credit}<br><br>  Available Credit Limit: ${data.available}`,
            confirmButtonText:'Close'
          });
        }
      })


    })

// });


