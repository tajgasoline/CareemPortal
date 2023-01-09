<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="assets/printer/printer.css" rel="stylesheet" type="text/css">
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>

    <title>Taj-Gasoline Receipt</title>
</head>

<body style="padding: 0px 10px !important;">
    <div class="ticket">
       
        <center><img src="assets/images/login3.png" alt="Logo" style="width: 45%; height: 45%;"></center>
        <table class="tab" style="width: 100%; margin-top: 1.5rem !important;">
            <tbody class="tab">
                  <tr class="tab">
                       <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Date</p></td>
                       <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="doc">-</span></p></td> 
                    <!-- <td class="tab" style="float: right;" ><p  class="margin-padding-0 bold"><span id="doc">-</span></p></td>  -->
                </tr> 
                <tr class="tab">
                       <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Site</p></td>
                    <td class="tab" ><p style="float: right;" class="margin-padding-0 bold"><span id="site">-</span></p></td> 
                </tr> 
                 <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Vehicle Type</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="VEHICLETYPE">-</span></p></td> 
                </tr> 
               
                <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Vehicle Number</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="vehiclenumber">-</span></p></td> 
                </tr> 
                  <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Customer Name</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="customername">-</span></p></td> 
                </tr>
                  <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Contact No.</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="contactnumber">-</span></p></td> 
                </tr>
                <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Product</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="product">-</span></p></td> 
                </tr> 
                <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Price (Rs.)</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="price">-</span></p></td> 
                </tr> 
                <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Discount (Rs.)</p></td>
                    <td class="tab" style="float: right;"style="float: right;" ><p class="margin-padding-0 bold"><span id="discount">-</span></p></td> 
                </tr> 
                <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Quantity (Ltr.)</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="quantity">-</span></p></td> 
                </tr> 
                  
                  <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Disc. Amount (Rs.)</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="discountamount">-</span></p></td> 
                </tr> 
                <tr class="tab">
                    <td class="tab" style="width: 45%;" ><p class="margin-padding-0">Amount (Rs.)</p></td>
                    <td class="tab" style="float: right;"><p class="margin-padding-0 bold"><span id="amount">-</span></p></td> 
                </tr>  
                 
            </tbody>
        </table>

    


        </table>
        <p class="centered">Thank You for visting us.
            <br>Taj Ehsas Helpline : 03-111-111-825.
        </p>
    </div>
    <button id="btnPrint" class="hidden-print">Print</button>
    <script src="printer.js"></script>



    <script src="assets/printer/printer.js"></script>
    <script src="functions/Invoice.js"></script>
</body>

</html>