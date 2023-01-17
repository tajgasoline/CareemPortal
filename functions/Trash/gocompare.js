jQuery('.numbersOnly').keyup(function() {

    this.value = this.value.replace(/[^0-9\.,]/g, '');

});

//getting id from url

var getUrlParameter = function getUrlParameter(sParam) {

    var sPageURL = window.location.search.substring(1),

        sURLVariables = sPageURL.split('&'),

        sParameterName,

        i;

    for (i = 0; i < sURLVariables.length; i++) {

        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {

            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);

        }

    }

};







//Global Variables

var count = 0;

var Age = 0;

var compareindex = 0;

var comparearrayname = [];

var filterationvendor = [];

var dbPlanData = [];

var dbModel = [];

var dbPlanBenefits = [];

var dbVendPlanExclusions = [];

var dbClaimPolicy = [];

var dbDepreciationPolicy = [];

var universalmake = '';

var universalmodel = '';

var universalyear = '';

var universalvalue = '';

var comparearray = [];

var dbSession = [];







$(document).ready(function()

    {

        // loaddata(); 

        loaddata2();









        //opening modal of user/guest to send single mail

        $(document).on('click', '.edit-modal', function() {

            var id = $(this).attr("id");

            if (id == "") {

                $('Body').html('Ops! Some Error Occured ');

                window.location.href = 'https://gocompare.com.pk/';

            } else if (dbSession[0].result == "Not Exists") {

                $("#ReceiveQuote4").val(id);

                document.getElementById("NoSession").click();

                $("#ReceiveQuote4").val(id);

            } else if (dbSession[0].result == "Exists") {

                $("#ReceiveQuote").val(id);

                $("#firstname").val(dbSession[0].firstname);

                $("#lastname").val(dbSession[0].lastname);

                $("#email").val(dbSession[0].email);

                $("#contact").val(dbSession[0].contact);

                document.getElementById("YesSession").click();

            } else {

                $('Body').html('Ops! Some Error Occured ');

                window.location.href = 'https://gocompare.com.pk/';

            }

        });









        //tracker charges adding & subtracting up into total

        $(document).on("change", ".trackerdevice", function() {

            if (this.checked) {

                var id = $(this).attr("id");

                var vtrackercharges = $("#trackercharges" + id).text();

                var vtotalamount = $("#totalamount" + id).text();

                vtotalamount = vtotalamount.replace(/,/g, '');

                vtrackercharges = vtrackercharges.replace(/,/g, '');

                var newamount = parseInt(vtrackercharges) + parseInt(vtotalamount);

                newamount = newamount.toLocaleString();

                $("#totalamount" + id).text(newamount);
                $("#totalamount_mobile" + id).text(newamount);

            } else {

                var id = $(this).attr("id");

                var vtrackercharges = $("#trackercharges" + id).text();

                var vtotalamount = $("#totalamount" + id).text();

                vtotalamount = vtotalamount.replace(/,/g, '');

                vtrackercharges = vtrackercharges.replace(/,/g, '');

                var newamount = parseInt(vtotalamount) - parseInt(vtrackercharges);

                newamount = newamount.toLocaleString();

                $("#totalamount" + id).text(newamount);
                $("#totalamount_mobile" + id).text(newamount);

            }

        });









        //comparing modal openup & filling multiple data into modal

        $(document).on("click", ".comparenow", function() {

            $("#scomparevalue").html('Rs. ' + (parseInt(getUrlParameter('Value'))).toLocaleString());

            $("#comparemake").html(universalmake);

            $("#comparemodel").html(universalmodel);

            $("#compareyear").html($("#year").val());

            var varbenefits2;

            $("#comparison-items").html(' ');

            for (var k = 0; k < compareindex; k++) {

                var varBenefitstable2 = '<table class="custom-benefits-text2 mb-0" style="width:100%;">';

                var varBenefitsicon2 = "";

                for (var l = 0; l < dbPlanBenefits.length; l++) {

                    if ((comparearray[k].planid == dbPlanBenefits[l].PlanID) && (comparearray[k].vendid == dbPlanBenefits[l].VendID)) {

                        if (dbPlanBenefits[l].Availability == 'Yes') {

                            varBenefitsicon2 = '<i class="mdi mdi-check custom-benefits-icons-check"></i>';

                        } else {

                            varBenefitsicon2 = '<i class="mdi mdi-close custom-benefits-icons-cross"></i>';

                        }

                        varBenefitstable2 += " <tr><td>" + dbPlanBenefits[l].BenefitName + "</td><td>" + varBenefitsicon2 + "</td></tr>";

                    }

                };

                varBenefitstable2 += " </table>";

                if (varBenefitstable2 == "")

                { varBenefitstable2 += 'No Benefits Uploaded'; }





                if (comparearray[k].trackermand == 1 && (Age >= comparearray[k].minage && Age <= comparearray[k].maxage)) {

                    var TrackerOptionalCell1 = 'Yes';

                } else {

                    var TrackerOptionalCell1 = 'No';

                }

                if (comparearray[k].trackeroptional == 0) {

                    //        var TrackerOptionalCell2 = '0';

                    var TrackerOptionalCell3 = '<tr style="border-bottom: 1px solid #dad5d5;"><td class="custom-compare-text2">&nbsp;</td><td><p class="text-muted custom-compare-text">&nbsp;</p></td></tr>';

                    var TrackerOptionalCell2 = (comparearray[k].amount).toLocaleString();

                } else if (comparearray[k].trackeroptional == 1) {

                    var TrackerOptionalCell3 = '<tr style="border-bottom: 1px solid #dad5d5;"><td class="custom-compare-text2">Total without Tracker</td><td><p class="text-muted custom-compare-text">Rs. ' + (comparearray[k].amount).toLocaleString() + '</p></td></tr>';

                    // var TrackerOptionalCell1 = comparearray[k].trackercharges;

                    var TrackerOptionalCell2 = (comparearray[k].amount + comparearray[k].trackercharges).toLocaleString();

                }

                if (k <= 2) {

                    $("#comparison-items").append('<div class="col-lg-4"><div class="card team-card"><div class="card-body"> <div class="text-center"><img src="../assets/images/companies/' + comparearray[k].vendname + '.png" alt="" class="user-img img-thumbnail"><h4 class="team-leader">' + comparearray[k].planname + '</h4><h6 class="team-leader">By : ' + comparearray[k].vendname + '</h6><table style="margin-left: 3.1rem;"><tbody ><tr style="border-bottom: 1px solid #dad5d5;"><td class="custom-compare-text2">Rate</td><td><p class="text-muted custom-compare-text">' + comparearray[k].rate + '%</p></td></tr><tr style="border-bottom: 1px solid #dad5d5;"><td class="custom-compare-text2">Tracker Mandatory</td><td><p class="text-muted custom-compare-text">' + TrackerOptionalCell1 + '</p></td></tr><tr style="border-bottom: 1px solid #dad5d5;"><td class="custom-compare-text2">Total with Tracker</td><td><p class="text-muted custom-compare-text">Rs. ' + TrackerOptionalCell2 + '</p></td></tr>' + TrackerOptionalCell3 + '</tbody> </table><div style="margin-top:2rem;"> <div class="accordion" id="accordionExample"> <div class="card border mb-0 shadow-none"> <button type="button" class="card-header btn btn-primary collapsed" style="padding: 0.35rem;"  data-toggle="collapse" data-target="#collapseBenefits" aria-expanded="false" aria-controls="collapseBenefits"> Benefits </button><div id="collapseBenefits" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" style=""> <div class="card-body"> ' + varBenefitstable2 + '</div></div></div><div class="card mb-0 border shadow-none"> </div></div></div>   <div class="tab-pane p-3 active text-left" ></div></div></div></div></div>');

                }

                varbenefits2 = '';

            };

            if (dbSession[0].result == "Exists")

            {

            } else if (dbSession[0].result == "Not Exists")

            {

                $("#ReceiveQuote3").attr("onclick", "ReceiveQuote5()");

            }

        });









        //adding plans into array of multiple comparison

        $(document).on("change", ".compareme", function() {

            var id = $(this).attr("id");

            if (this.checked) {

                var planname = $(this).data("planname");

                var vendname = $(this).data("vendname");

                var vendid = $(this).data("vendid");

                var rate = $(this).data("rate");

                var trackeroptional = $(this).data("trackeroptional");

                var trackercharges = $(this).data("trackercharges");

                var amount = $(this).data("amount");



                var planid = $(this).data("planid");

                var trackermand = $(this).data("trackermand");



                var maxage = $(this).data("maxage");

                var minage = $(this).data("minage");

                if (compareindex >= 1) {

                    $('#comparenow').prop('disabled', false);

                    $('.custom-schedule-getquote').prop('disabled', true);

                }

                comparearray.push({
                    "compareindex": compareindex,
                    "vendid": vendid,
                    "minage": minage,
                    "maxage": maxage,
                    "id": id,
                    "planname": planname,
                    "rate": rate

                    ,
                    "trackeroptional": trackeroptional,
                    "vendname": vendname,
                    "trackermand": trackermand,
                    "vendname": vendname,
                    "trackercharges": trackercharges,
                    "amount": amount,
                    "planid": planid
                });

                compareindex++;

            } else if (!(this.checked)) {

                var id = $(this).attr("id");

                if (compareindex < 0) {

                } else {

                    var splicaeindex = null;

                    for (var l = 0; l < compareindex; l++) {

                        // if((comparearray[l].id == id) && (l == compareindex)){

                        if ((comparearray[l].id == id)) {

                            splicaeindex = comparearray[l].compareindex;

                        }

                    };

                    comparearray.splice(splicaeindex, 1);

                    compareindex--;

                }

                if (compareindex <= 1) {

                    $('#comparenow').prop('disabled', true);

                    $('.custom-schedule-getquote').prop('disabled', false);

                }

            }

            //Disable the comparison checkbox if more than 2 are selected

            if (compareindex <= 2) {

                for (var i = 0; i < count; i++) {

                    if ($('.compareme' + i + '').prop("checked") == true) {

                        $('.compareme' + i + '').prop('disabled', false);

                    } else

                    {

                        $('.compareme' + i + '').prop('disabled', false);

                    }

                }

            } else {

                for (var i = 0; i < count; i++) {

                    if ($('.compareme' + i + '').prop("checked") == true) {

                        $('.compareme' + i + '').prop('disabled', false);

                    } else

                    {

                        $('.compareme' + i + '').prop('disabled', true);

                    }

                }

            }

        });

    });









//search $ filter  again 

function makes(selectObj) {

    var idx = selectObj.selectedIndex;

    var v_make = selectObj.options[idx].value;

    var cSelect = document.getElementById("model");

    var len = cSelect.options.length;

    while (cSelect.options.length > 0) {

        cSelect.remove(0);

    }

    for (var i = 0; i < dbModel.length; i++) {

        if (dbModel[i].MakeID == v_make) {

            newOption = document.createElement("option");

            var vvmodel = document.getElementById("model");

            newOption.value = dbModel[i].ModelID;

            newOption.text = dbModel[i].ModelName;

            try {

                vvmodel.add(newOption);

            } catch (e) {

                vvmodel.appendChild(newOption);

            }

        }

    };

}









function quote() {

    var vmake = $('#make').val();

    var vmodel = $('#model').val();

    var vyear = $('#year').val();

    var vCar = $('#Car').val();

    var var1 = vCar.replace(/,/g, '');

    window.location.href = 'compare?Make=' + vmake + '&Model=' + vmodel + '&Year=' + vyear + '&Value=' + var1 + '';

}









//user multiple comparison mail

function ReceiveQuote2() {

    var Car = getUrlParameter('Value');

    var Year = getUrlParameter('Year');

    var Model = getUrlParameter('Model');

    var Make = getUrlParameter('Make');

    $.ajax({

        url: "api/MultipleLeadUser.php",

        method: "POST",

        data: {

            Car: Car,

            Year: Year,

            Model: Model,

            Make: Make,

            comparearray: comparearray

        },

        dataType: "JSON",

        beforeSend: function() {

            BtnLoadingTrue3();

        },

        success: function(data)

        {

            BtnLoadingFalse3();

            var result = data.result;

            if (result == "Lead Generated")

            {

                Swal.fire({

                    title: "Quote sent on your Email!",

                    text: "Please, Check your Mailbox!",

                    type: "success",

                    //timer: 4000,

                    showConfirmButton: true,

                }).then(function() {

                    document.getElementById("btnclose3").click();

                    $('#ReceiveQuote').html('Receive On Email');

                });

            } else if (result == "Not Exists")

            {

                // document.getElementById("NoSession").click();

            } else

            {

                Swal.fire({

                    title: "Opps! Some Error Occured!",

                    type: "error",

                    text: "Please login first",

                    timer: 4000,

                    showConfirmButton: true,

                }).then(function() {

                    window.location.href = 'https://gocompare.com.pk/';

                });

            }

            return data;

        }

    });

}









//user single mail

function ReceiveQuote() {

    var ReceiveQuote = $('#ReceiveQuote').val();

    var gcccity = $('#gcccity').val();

    var Car = getUrlParameter('Value');

    var Year = getUrlParameter('Year');

    if (ReceiveQuote == "") {

        $('Body').html('Ops! Some Error Occured ');

        window.location.href = 'https://gocompare.com.pk/';

    } else if (gcccity == "") {

        $("#gcccity").css("border-color", "red");

        $("#gcccity").focus();

        $("#gcc2v").css("display", "block");

        $("#gcc2v").text("Please Select City.");

    } else {

        $("#gcccity").css("border-color", "");

        $("#gcc2v").css("display", "none");

        $.ajax({

            url: "api/SingleLeadUser.php",

            method: "POST",

            data: {

                ReceiveQuote: ReceiveQuote,

                Car: Car,

                Year: Year

            },

            dataType: "JSON",

            beforeSend: function() {

                BtnLoadingTrue1();

            },

            success: function(data)

            {
                BtnLoadingFalse1();

                var result = data.result;

                if (result == "Lead Generated")

                {

                    Swal.fire({

                        title: "Quote sent on your Email!",

                        text: "Please, Check your Mailbox!",

                        type: "success",

                        //timer: 4000,

                        showConfirmButton: true,

                    }).then(function() {

                        document.getElementById("btnclose2").click();

                        $('#ReceiveQuote').html('Receive On Email');

                    });

                } else

                {

                    Swal.fire({

                        title: "Opps! Some Error Occured!",

                        type: "error",

                        text: "Please login first",

                        timer: 4000,

                        showConfirmButton: true,

                    }).then(function() {

                        window.location.href = 'https://gocompare.com.pk/';

                    });

                }

                return data;

            }

        });

    }

}















//Guest single mail

function ReceiveQuote4() {

    var ReceiveQuote = $('#ReceiveQuote4').val();

    var gfirstname = $('#gfirstname').val();

    var glastname = $('#glastname').val();

    var gemail = $('#gemail').val();

    var gcontact = $('#gcontact').val();

    var gcity = $('#gcity').val();

    var Car = getUrlParameter('Value');

    var Year = getUrlParameter('Year');

    var NameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;

    var contactRegex = new RegExp(/[0-9]{11}/);

    var mailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $("#gfirstname").css("border-color", "");

    $("#glastname").css("border-color", "");

    $("#gemail").css("border-color", "");

    $("#gcontact").css("border-color", "");

    $("#gcity").css("border-color", "");

    $("#g1v").css("display", "none");

    $("#g2v").css("display", "none");

    $("#g3v").css("display", "none");

    $("#g4v").css("display", "none");

    $("#g5v").css("display", "none");

    if (ReceiveQuote == "") {

        $('Body').html('Ops! Some Error Occured ');

        window.location.href = 'https://gocompare.com.pk/';

    } else if (!gfirstname.match(NameRegex) || gfirstname == "")

    {

        $("#g1v").css("display", "block");

        $("#gfirstname").css("border-color", "red");

        $("#gfirstname").focus();

        $("#g1v").text("Invalid First Name.");

    } else if (!glastname.match(NameRegex) || glastname == "")

    {

        $("#glastname").css("border-color", "red");

        $("#glastname").focus();

        $("#g2v").css("display", "block");

        $("#g2v").text("Invalid Last Name.");

    } else if (!gemail.match(mailRegEx) || gemail == "")

    {

        $("#gemail").css("border-color", "red");

        $("#gemail").focus();

        $("#g3v").css("display", "block");

        $("#g3v").text("Invalid Email.");

    } else if (!gcontact.match(contactRegex) || gcontact == "")

    {

        $("#gcontact").css("border-color", "red");

        $("#gcontact").focus();

        $("#g4v").css("display", "block");

        $("#g4v").text("Invalid Contact Number.");

    } else if (gcity == "") {

        $("#gcity").css("border-color", "red");

        $("#gcity").focus();

        $("#g5v").css("display", "block");

        $("#g5v").text("Please Select City.");

    } else {

        $.ajax({

            url: "api/SingleLeadGuest.php",

            method: "POST",

            data: {

                ReceiveQuote: ReceiveQuote,

                firstname: gfirstname,

                lastname: glastname,

                email: gemail,

                contact: gcontact,

                city: gcity,

                Car: Car,

                Year: Year

            },

            dataType: "JSON",

            beforeSend: function() {

                BtnLoadingTrue2();

            },

            success: function(data)

            {
                BtnLoadingFalse2();

                var result = data.result;

                if (result == "Lead Generated")

                {

                    Swal.fire({

                        title: "Quote sent on your Email!",

                        text: "Please, Check your Mailbox!",

                        type: "success",

                        //timer: 4000,

                        showConfirmButton: true,

                    }).then(function() {

                        document.getElementById("btnclose1").click();

                        $('#ReceiveQuote4').html('Receive on Email');

                    });

                } else

                {

                    Swal.fire({

                        title: "Opps! Some Error Occured!",

                        type: "error",

                        text: "Please login first",

                        timer: 4000,

                        showConfirmButton: true,

                    }).then(function() {

                        window.location.href = 'https://gocompare.com.pk/';

                    });

                }

                return data;

            }

        });

    }

}









//Guest multiple  mail show row

function ReceiveQuote5() {

    $("#guest-multiple-mail").css("display", "block");

    $("#guest-multiple-mail").addClass("fadeIn animated");

    $("#ReceiveQuote3").css("display", "none");

}







//Guest multiple  mail send mail

function ReceiveQuote6() {

    var gfirstname = $('#gmfirstname').val();

    var glastname = $('#gmlastname').val();

    var gemail = $('#gmemail').val();

    var gcontact = $('#gmcontact').val();

    var gcity = $('#gmcity').val();

    var Car = getUrlParameter('Value');

    var Year = getUrlParameter('Year');

    var Make = getUrlParameter('Make');

    var Model = getUrlParameter('Model');

    var NameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;

    var contactRegex = new RegExp(/[0-9]{11}/);

    var mailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $("#gmfirstname").css("border-color", "");

    $("#gmlastname").css("border-color", "");

    $("#gmemail").css("border-color", "");

    $("#gmcontact").css("border-color", "");

    $("#gmcity").css("border-color", "");

    $("#gm1v").css("display", "none");

    $("#gm2v").css("display", "none");

    $("#gm3v").css("display", "none");

    $("#gm4v").css("display", "none");

    $("#g5v").css("display", "none");

    if (!gfirstname.match(NameRegex) || gfirstname == "")

    {

        $("#gm1v").css("display", "block");

        $("#gmfirstname").css("border-color", "red");

        $("#gmfirstname").focus();

        $("#gm1v").text("Invalid First Name.");

    } else if (!glastname.match(NameRegex) || glastname == "")

    {

        $("#gmlastname").css("border-color", "red");

        $("#gmlastname").focus();

        $("#gm2v").css("display", "block");

        $("#gm2v").text("Invalid Last Name.");

    } else if (!gemail.match(mailRegEx) || gemail == "")

    {

        $("#gmemail").css("border-color", "red");

        $("#gmemail").focus();

        $("#gm3v").css("display", "block");

        $("#gm3v").text("Invalid Email.");

    } else if (!gcontact.match(contactRegex) || gcontact == "")

    {

        $("#gmcontact").css("border-color", "red");

        $("#gmcontact").focus();

        $("#gm4v").css("display", "block");

        $("#gm4v").text("Invalid Contact Number.");

    } else if (gcity == "") {

        $("#gmcity").css("border-color", "red");

        $("#gmcity").focus();

        $("#gm5v").css("display", "block");

        $("#gm5v").text("Please Select City.");

    } else {

        $.ajax({

            url: "api/MultipleLeadGuest.php",

            method: "POST",

            data: {

                Car: Car,

                Year: Year,

                firstname: gfirstname,

                lastname: glastname,

                email: gemail,

                contact: gcontact,

                city: gcity,

                comparearray: comparearray,

                Make: Make,

                Model: Model

            },

            dataType: "JSON",

            beforeSend: function() {

                BtnLoadingTrue5();

            },

            success: function(data)

            {

                BtnLoadingFalse5();

                var result = data.result;

                if (result == "Lead Generated")

                {

                    Swal.fire({

                        title: "Quote sent on your Email!",

                        text: "Please, Check your Mailbox!",

                        type: "success",

                        //timer: 4000,

                        showConfirmButton: true,

                    }).then(function() {

                        document.getElementById("btnclose3").click();

                        $('#ReceiveQuote4').html('Receive on Email');

                    });

                } else if (result == "Not Exists")

                {

                } else

                {

                    Swal.fire({

                        title: "Opps! Some Error Occured!",

                        type: "error",

                        text: "Please login first",

                        timer: 4000,

                        showConfirmButton: true,

                    }).then(function() {

                        window.location.href = 'https://gocompare.com.pk/';

                    });

                }

                return data;

            }

        });

    }

}















//Money in words conversion

function Rs(amount) {

    var words = new Array();

    words[0] = 'Zero';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    var op;

    amount = amount.toString();

    var atemp = amount.split(".");

    var number = atemp[0].split(",").join("");

    var n_length = number.length;

    var words_string = "";

    if (n_length <= 9) {

        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);

        var received_n_array = new Array();

        for (var i = 0; i < n_length; i++) {

            received_n_array[i] = number.substr(i, 1);
        }

        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {

            n_array[i] = received_n_array[j];
        }

        for (var i = 0, j = 1; i < 9; i++, j++) {

            if (i == 0 || i == 2 || i == 4 || i == 7) {

                if (n_array[i] == 1) {

                    n_array[j] = 10 + parseInt(n_array[j]);

                    n_array[i] = 0;
                }
            }
        }

        value = "";

        for (var i = 0; i < 9; i++) {

            if (i == 0 || i == 2 || i == 4 || i == 7) {

                value = n_array[i] * 10;
            } else {

                value = n_array[i];
            }

            if (value != 0) {

                words_string += words[value] + " ";
            }

            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {

                words_string += "Crores ";
            }

            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {

                words_string += "Lakhs ";
            }

            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {

                words_string += "Thousand ";
            }

            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {

                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {

                words_string += "Hundred ";
            }
        }

        words_string = words_string.split(" ").join(" ");
    }

    return words_string;
}

function paisaq(money) {

    if (money.length < 10) {

        $('#RsNumber').html('');

        $('#RsNumber').html('( ' + Rs(money) + ' )');

    } else {

        $('#RsNumber').html('');

        $('#RsNumber').html('( Invalid Number)');

    }

}









function paisaq2ss(moneys) {

    if (moneys == "") {

        $('#RsNumber').html('');

    } else {

        var var1 = moneys.replace(/,/g, '');

        var moneysss = parseInt(var1);

        paisaq(var1);

        var koli = moneysss.toLocaleString();

        $('#Car').val(koli);

    }

}









function contactv() {

    var v_Contact = document.getElementById("gmcontact").value;

    var contactRegex = new RegExp(/[0-9]{11}/);

    $("#gmcontact").css("border-color", "");

    $("#4v").css("display", "none");

    if (!v_Contact.match(contactRegex))

    {

        $("#gmcontact").css("border-color", "red");

        $("#4v").css("display", "block");

        $("#4v").text("Invalid Contact Number.");

    }

}









function emailv() {

    var vEmail = $("#gmemail").val();

    $("#3v").css("display", "none");

    $("#gmemail").css("border-color", "");

    var mailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!vEmail.match(mailRegEx) || vEmail == "")

    {

        $("#gmemail").css("border-color", "red");

        $("#3v").css("display", "block");

        $("#3v").text("Invalid Email.");

    }

}









//btn loading sign

function BtnLoadingTrue1() {

    $("#ReceiveQuote").attr("disabled", true);

    $('#ReceiveQuote').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Sending Mail...');

}

function BtnLoadingFalse1() {

    $("#ReceiveQuote").attr("disabled", false);

    $('#ReceiveQuote').html('Receive On Email');

}

function BtnLoadingTrue2() {

    $("#ReceiveQuote4").attr("disabled", true);

    $('#ReceiveQuote4').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Sending Mail...');

}

function BtnLoadingFalse2() {

    $("#ReceiveQuote4").attr("disabled", false);

    $('#ReceiveQuote4').html('Receive on Email');

}

function BtnLoadingTrue3() {

    $("#ReceiveQuote3").attr("disabled", true);

    $('#ReceiveQuote3').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Sending Mail...');

}

function BtnLoadingFalse3() {

    $("#ReceiveQuote3").attr("disabled", false);

    $('#ReceiveQuote3').html('Receive On Email');

}

function BtnLoadingTrue5() {

    $("#ReceiveQuote5").attr("disabled", true);

    $('#ReceiveQuote5').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Sending Mail...');

}

function BtnLoadingFalse5() {

    $("#ReceiveQuote5").attr("disabled", false);

    $('#ReceiveQuote5').html('Receive On Email ');

}









//loading data of result into table

function loaddata2() {

    var vmake = getUrlParameter('Make');

    var vmodel = getUrlParameter('Model');

    var vyear = getUrlParameter('Year');

    var vcar = getUrlParameter('Value');

    if (vmake == "") {

        $('Body').html('Ops! Some Error Occured ');

        window.location.href = 'Search.php';

    } else if (vmodel == "") {

        $('Body').html('Ops! Some Error Occured ');

        window.location.href = 'Search.php';

    } else if (vyear == "") {

        $('Body').html('Ops! Some Error Occured ');

        window.location.href = 'Search.php';

    } else if (vcar == "") {

        $('Body').html('Ops! Some Error Occured ');

        window.location.href = 'Search.php';

    } else

    {

        $.ajax({

            url: "api/ComparePlansData.php",

            method: "POST",

            data: {

                make: vmake,

                model: vmodel,

                year: vyear,

                car: vcar

            },

            dataType: "JSON",

            success: function(data)

            {

                var result = data.result;

                if (result == "Done")

                {

                    dbModel = data.dbModel;

                    dbSession = data.dbSession;

                    var cSelect = document.getElementById("model");

                    var len = cSelect.options.length;

                    while (cSelect.options.length > 0) {

                        cSelect.remove(0);

                    }

                    for (var i = 0; i < dbModel.length; i++) {

                        if (dbModel[i].MakeID == vmake) {

                            newOption = document.createElement("option");

                            var vvmodel = document.getElementById("model");

                            newOption.value = dbModel[i].ModelID;

                            newOption.text = dbModel[i].ModelName;

                            try {

                                vvmodel.add(newOption);

                            } catch (e) {

                                vvmodel.appendChild(newOption);

                            }

                        }

                    };

                    $("#model").val(getUrlParameter('Model')).change();

                    $("#make").val(vmake).change();

                    $("#make").attr("onChange", "makes(this)");

                    $("#year").val(vyear).change();

                    paisaq2ss(vcar);

                    dbPlanData = data.dbPlanData;

                    dbPlanBenefits = data.dbPlanBenefits;

                    dbVendPlanExclusions = data.dbVendPlanExclusions;

                    dbClaimPolicy = data.dbClaimPolicy;

                    dbDepreciationPolicy = data.dbDepreciationPolicy;

                    dbfiltervendor = data.dbfiltervendor;



                    Age = data.Age;

                    count = 0;

                    var varTrackerMand = 0;

                    var varDepriciationPolicytable = '<table class="custom-benefits-text mb-0" style="width:40%;"><thead><td style="font-weight: 700;">Vehicle Age</td><td style="font-weight: 700;">Depreciation Rate</td></thead>';

                    //filtering DepreciationPolicy of each plan

                    for (var k = 0; k < dbDepreciationPolicy.length; k++) {

                        varDepriciationPolicytable += '<tr><td>' + dbDepreciationPolicy[k].VehicleAge + '</td><td>  ' + dbDepreciationPolicy[k].Rate + ' %</td></tr>';

                    };

                    varDepriciationPolicytable += " </table>";

                    for (var i = 0; i < dbPlanData.length; i++) {

                        var varBenefits = '';

                        var varClaimPolicy = '';

                        var varExclusions = '';

                        universalmodel = dbPlanData[i].ModelName;

                        universalmake = dbPlanData[i].MakeName;

                        //filtering Benefits of each plan

                        var varBenefitstable = '<table class="custom-benefits-text mb-0" style="width:60%;">';

                        var varBenefitsicon = "";

                        var sort = 0;

                        for (var k = 0; k < dbPlanBenefits.length; k++) {

                            if ((dbPlanData[i].PlanID == dbPlanBenefits[k].PlanID) && (dbPlanData[i].VendID == dbPlanBenefits[k].VendID)) {

                                //  varBenefits += '<i class="mdi mdi-shield-check-outline custom-benefits-icons"></i>';

                                // varBenefits +=  dbPlanBenefits[k].BenefitName;

                                if (sort % 2 == 0) {

                                    if (dbPlanBenefits[k].Availability == 'Yes') {

                                        varBenefitsicon = '<i class="mdi mdi-check custom-benefits-icons-check"></i>';

                                        sort++;

                                    } else {

                                        varBenefitsicon = '<i class="mdi mdi-close custom-benefits-icons-cross"></i>';

                                        sort++;

                                    }

                                    varBenefitstable += " <tr><td>" + dbPlanBenefits[k].BenefitName + "</td><td>" + varBenefitsicon + "</td>";

                                } else {

                                    if (dbPlanBenefits[k].Availability == 'Yes') {

                                        varBenefitsicon = '<i class="mdi mdi-check custom-benefits-icons-check"></i>';

                                        sort++;

                                    } else {

                                        varBenefitsicon = '<i class="mdi mdi-close custom-benefits-icons-cross"></i>';

                                        sort++;

                                    }

                                    varBenefitstable += " <td>" + dbPlanBenefits[k].BenefitName + "</td><td>" + varBenefitsicon + "</td></tr>";

                                }

                            }

                        };

                        varBenefitstable += " </table>";

                        //filtering Exclusions of each plan

                        var varExclusionstable = '<table class="custom-benefits-text mb-0" style="width:40%;">';

                        for (var k = 0; k < dbVendPlanExclusions.length; k++) {

                            if ((dbPlanData[i].PlanID == dbVendPlanExclusions[k].PlanID) && (dbPlanData[i].VendID == dbVendPlanExclusions[k].VendID)) {

                                varExclusionstable += '<tr><td><i class="mdi mdi-shield-check-outline custom-benefits-icons"></i></td><td>';

                                varExclusionstable += dbVendPlanExclusions[k].Description;

                                varExclusionstable += '</td></tr>';

                            }

                        };

                        varExclusionstable += " </table>";

                        var varClaimPolicytable = '<table class="custom-benefits-text mb-0" style="width:40%;">';

                        //filtering ClaimPolicy of each plan

                        for (var k = 0; k < dbClaimPolicy.length; k++) {

                            if (dbPlanData[i].VendID == dbClaimPolicy[k].VendID) {

                                varClaimPolicytable += '<tr><td><i class="mdi mdi-shield-check-outline custom-benefits-icons"></i></td><td>';

                                varClaimPolicytable += dbClaimPolicy[k].Description;

                                varClaimPolicytable += '</td></tr>';

                            }

                        };

                        varClaimPolicytable += " </table>";

                        if (dbPlanData[i].TrackerMand == 1 && (Age >= dbPlanData[i].MinAge && Age <= dbPlanData[i].MaxAge)) {

                            varTrackerMand = 'Yes';

                        } else {

                            varTrackerMand = 'No';

                        }

                        if (varDepriciationPolicytable == "") {

                            varDepriciationPolicytable = "No Data Founds";

                        }

                        if (varBenefitstable == "") {

                            varBenefitstable = "No Data Founds";

                        }

                        if (varExclusionstable == "") {

                            varExclusionstable = "No Data Founds";

                        }

                        if (varClaimPolicytable == "") {

                            varClaimPolicytable = "No Data Founds";

                        }

                        if (dbPlanData[i].TrackerOptional == 0) {

                            var TrackerOptionalCell = '<h4 class="header-title">Included</h4>';

                        } else if (dbPlanData[i].TrackerOptional == 1) {

                            var TrackerOptionalCell = '<div class="checkbox checkbox-primary checkbox-single" ><input  type="checkbox"  value="option2"  class="trackerdevice" id="' + i + '" aria-label="Single checkbox"><label ></label></div><h4  class="header-title">Rs.<span style="margin-left: 14px;" id="trackercharges' + i + '">' + (parseInt(dbPlanData[i].TrackerCharges)).toLocaleString() + '</span></h4>';

                        }

                        if (dbPlanData[i].OnScreen == 1) {



                            if (dbPlanData[i].featured == 1)

                            {

                                var featureddiv = '<div class="ribbon ribbon-mark">Featured</div>';

                            } else

                            {

                                var featureddiv = '';

                            }



                            //var btnclick="window.location.href = 'buy?id="+ dbPlanData[i].PlanRateID +"&Make="+ vmake +"&Model="+ vmodel +"&Year="+ vyear +"&Value="+ vcar +"'";

                            var btnclick = "$('.overlay').css('display','block');setTimeout(function(){window.location.href = window.location.href = 'buy?id=" + dbPlanData[i].PlanRateID + "&Make=" + vmake + "&Model=" + vmodel + "&Year=" + vyear + "&Value=" + vcar + "';}, 3000);";





                            $("#CarPlans-table-body").append('<tr class="filter_vend_1"><td style="border-right: 1px solid #e8e8e86e;">' + featureddiv + '<img  src="../assets/images/companies/' + dbPlanData[i].VendName + '.png" alt=""  height="30"><h6 style="font-size:1.2rem;" class="filter-vendname-2">' + dbPlanData[i].VendName + '</h6></td><td style="border-right: 1px solid #e8e8e86e;"><h4 class="header-title">' + dbPlanData[i].PlanName + '</h4></td><td style="border-right: 1px solid #e8e8e86e;"><div class="checkbox checkbox-primary checkbox-single" ><input  type="checkbox"  value="option2"  class="compareme compareme' + count + '" id="' + dbPlanData[i].PlanRateID + '" data-planname="' + dbPlanData[i].PlanName + '" data-maxage="' + dbPlanData[i].MaxAge + '" data-minage="' + dbPlanData[i].MinAge + '" data-vendid="' + dbPlanData[i].VendID + '" data-vendname="' + dbPlanData[i].VendName + '" data-rate="' + dbPlanData[i].Rate + '" data-trackeroptional="' + dbPlanData[i].TrackerOptional + '"  data-trackermand="' + dbPlanData[i].TrackerMand + '" data-planid="' + dbPlanData[i].PlanID + '" data-trackercharges="' + dbPlanData[i].TrackerCharges + '" data-amount="' + dbPlanData[i].Amountfeild + '" aria-label="Single checkbox"><label ></label></div></td><td style="border-right: 1px solid #e8e8e86e;" class="filter-vendname-5"><h4 class="header-title">' + parseFloat(dbPlanData[i].Rate).toFixed(2) + ' %</h4></td><td style="border-right: 1px solid #e8e8e86e;"><h4 class="header-title">' + varTrackerMand + ' </h4></td><td style="border-right: 1px solid #e8e8e86e;">' + TrackerOptionalCell + '</td><td style="border-right: 1px solid #e8e8e86e;" ><h4  class="header-title">Rs. <span id="totalamount' + i + '">' + (dbPlanData[i].Amountfeild).toLocaleString() + '</span></h4></td><td style="border-right: 1px solid #e8e8e86e;"><div> <button id="' + dbPlanData[i].PlanRateID + '"  class="btn btn-primary btn-round btn-block waves-effect waves-light edit-modal custom-schedule-getquote" style="width:90%;" data-toggle="modal" data-animation="bounce" data-target=".edit-modal1"> Get a Call Back </button></div><div><button onclick="' + btnclick + '"   class="btn btn-primary btn-round waves-effect waves-light custom-schedule-getquote" style="width:90%;margin-top:5px; color:white;">Buy Now</button></div><div><center><a class="custom-show-detail-btn" type="button" data-toggle="collapse" data-target="#collapseExample' + i + '" aria-expanded="false" aria-controls="collapseExample">Show More</a></center><div></td></tr>  <tr> <td class="no-bg-row" colspan="8"><div class="collapse" id="collapseExample' + i + '"><div class="row" style="border: 1px solid #f1f1f1c7; margin: 0px;"><div class="col-md-12" style="padding: 0px;"><div class="card"><div class="card-body"><ul class="nav nav-pills nav-justified" role="tablist"><li class="nav-item waves-effect waves-light"><a class="nav-link custom-tab-heading-text  active" data-toggle="tab"  href="#home-' + i + '" role="tab" aria-selected="false">Coverage</a></li><li class="nav-item waves-effect waves-light"><a class="nav-link custom-tab-heading-text "  data-toggle="tab" href="#profile-' + i + '" role="tab" aria-selected="false">Depreciation Policy</a></li><li class="nav-item waves-effect waves-light"><a class="nav-link custom-tab-heading-text "  data-toggle="tab" href="#settings-' + i + '" role="tab" aria-selected="true">How to Claim</a></li><li class="nav-item waves-effect waves-light"><a class="nav-link custom-tab-heading-text "  data-toggle="tab" href="#Exclusion-' + i + '" role="tab" aria-selected="true">Exclusions/Conditions</a></li></ul><div class="tab-content"><div class="tab-pane p-3 active" style="  min-height: 25rem;"  id="home-' + i + '" role="tabpanel"><center> &nbsp;' + varBenefitstable + '</center> </div><div class="tab-pane p-3" style="  min-height: 25rem;" id="profile-' + i + '" role="tabpanel"><center> &nbsp;' + varDepriciationPolicytable + '</center></div><div class="tab-pane p-3"  style="  min-height: 25rem;" id="settings-' + i + '" role="tabpanel"><center>&nbsp;' + varClaimPolicytable + '</center></div><div class="tab-pane p-3"  style="  min-height: 25rem;" id="Exclusion-' + i + '" role="tabpanel"><center><h6>&nbsp;</h6>' + varExclusionstable + '</center></div></div></div></div>  </div></div></div></td></tr> ');

                            //$("#mobile-data").append('<div class="provider-scrollable-table__item  is-bg-gray" data-row-hide-parent="hidden" style="display: none;">'+featureddiv+'<div class="provider-scrollable-table__row" ><div class="uper-box"><img class="lazyloaded" height="32" src="../assets/images/companies/'+dbPlanData[i].VendName+'.png" alt=""><p class="sub-headline sub-headline--2 text-gray-steel">'+dbPlanData[i].PlanName+'</p><div class=" d-flex  fade-in"><div class="provider-scrollable-table__label label--3 m-0">Compare</div><input type="checkbox" value="option2" class="mobcompareme mobcompareme'+count+'" id="'+dbPlanData[i].PlanRateID+'" data-planid="'+dbPlanData[i].PlanID+'" data-planname="'+dbPlanData[i].PlanName+'" data-vendid="'+dbPlanData[i].VendID+'" data-vendname="'+dbPlanData[i].VendName+'" data-price="'+dbPlanData[i].Price+'"  data-charges="'+dbPlanData[i].Chargeswtax+'" data-rental="'+dbPlanData[i].Rental+'" aria-label="Single checkbox"></div></div></div><div class="provider-scrollable-table__row provider-scrollable-table__row--first d-flex bt-gray-heather fade-in"><div class="provider-scrollable-table__label label--3 m-0">Cost</div><div class="provider-scrollable-table__value label--3 m-0">Rs.'+ (dbPlanData[i].Price).toLocaleString() +'</div></div><div class="provider-scrollable-table__row d-flex bt-gray-heather  fade-in "><div class="provider-scrollable-table__label label--3" style="margin-top: 4px;">Annual Charges</div><div class="provider-scrollable-table__value  m-0 body-copy body-copy--small-table font-700  text-gray-steel" style="margin-bottom: -10px !important;"> <p class="provider-scrollable-table__value label--3 m-0">Rs.'+(dbPlanData[i].Chargeswtax).toLocaleString()+'</p></div></div><div class="provider-scrollable-table__row bt-gray-heather" style="margin-bottom: -10px !important;padding-bottom: 0px;" ><div class="provider-scrollable-table__label label--3 m-0">Rental</div><div class="provider-scrollable-table__value label--3 m-0 body-copy body-copy--small-table ">'+dbPlanData[i].Rental+'</div></div><div class="provider-scrollable-table__row d-flex bt-gray-heather  fade-in"><div class="provider-scrollable-table__label label--3 m-0">Find More</div><div class="provider-scrollable-table__value label--3 m-0 "><button id="'+ dbPlanData[i].PlanRateID +'" class="btn btn-primary btn-round btn-block waves-effect waves-light edit-modal custom-schedule-getquote" style="width:90%; font-size: 12px; line-height: 12px;" data-toggle="modal" data-animation="bounce" data-target=".edit-modal1"> Get a Quote </button></div><div class="provider-scrollable-table__value label--3 m-0 "><button id="1" class="btn btn-primary btn-round waves-effect waves-light custom-schedule-getquote" style="width:90%; font-size: 12px; line-height: 12px;" onclick="'+btnclick+'"> Request Technician </button></div></div><div class="provider-scrollable-table__row bt-gray-heather" style="margin-bottom: -10px !important;padding-bottom: 0px;" data-row-hide-child >'+varBenefitstable+' </div><button type="button" class="label label--3 text-blue-vivid  d-block d-md-none  text-left w-100 justify-start align-items-center  is-bg-white  p-24 pt-16 pb-24  b-none bt-gray-heather expand-button expand-btn"> <span class="d-inline-block expand-text">Expand details</span> <span class="d-inline-block  css-icon css-icon--plus-minus css-icon--small  button__icon"></span> </button></div>');

                            $("#mobile-data").append('<div class="provider-scrollable-table__item_mob  is-bg-gray-light" data-row-hide-parent="hidden"><div class="provider-scrollable-table__row"><div class="uper-box">' + featureddiv + '<img class="lazyloaded" height="32"  alt="image" src="../assets/images/companies/' + dbPlanData[i].VendName + '.png"><p class="sub-headline sub-headline--2 text-gray-steel filter-vendname-2"><span >' + dbPlanData[i].VendName + '</span></p></div></div><div class="provider-scrollable-table__row provider-scrollable-table__row--first d-flex bt-gray-heather fade-in"><div class="provider-scrollable-table__label label--3 m-0"> Policy Type</div><div class="provider-scrollable-table__value label--3 m-0"><span >' + dbPlanData[i].PlanName + '</span></div></div><div class="provider-scrollable-table__row d-flex bt-gray-heather  fade-in "><div class="provider-scrollable-table__label label--3" style="margin-top: 4px;">Premium Rate</div><div class="provider-scrollable-table__value  m-0 body-copy body-copy--small-table font-700  text-gray-steel filter-vendname-5" style="margin-bottom: -10px !important;"><p class="provider-scrollable-table__value label--3 m-0"><span >' + dbPlanData[i].Rate + ' %</span></p></div></div><div class="provider-scrollable-table__row d-flex bt-gray-heather  fade-in "><div class="provider-scrollable-table__label label--3" style="margin-top: 4px;">Tracker Mandatory</div><div class="provider-scrollable-table__value  m-0 body-copy body-copy--small-table font-700  text-gray-steel" style="margin-bottom: -10px !important;"> <p class="provider-scrollable-table__value label--3 m-0"><span >' + varTrackerMand + '</span></p></div></div><div class="provider-scrollable-table__row d-flex bt-gray-heather  fade-in "><div class="provider-scrollable-table__label label--3" style="margin-top: 4px;">Tracker Device</div><div class="provider-scrollable-table__value  m-0 body-copy body-copy--small-table font-700  text-gray-steel" style="margin-bottom: -10px !important;"> <p class="provider-scrollable-table__value label--3 m-0"><span id="checkbutton"> ' + TrackerOptionalCell + '</h4></span></p></div></div><div class="provider-scrollable-table__row bt-gray-heather" style="margin-bottom: -10px !important;padding-bottom: 0px;"><div class="provider-scrollable-table__label label--3 m-0">Annual Premium</div><div class="provider-scrollable-table__value label--3 m-0 body-copy body-copy--small-table font-700 ">Rs. <span id="totalamount_mobile' + i + '">' + (dbPlanData[i].Amountfeild).toLocaleString() + '</span></div></div><div class="provider-scrollable-table__row d-flex bt-gray-heather  fade-in"><div class="provider-scrollable-table__label label--3 m-0">Find More</div><div class="provider-scrollable-table__value label--3 m-0 "><button id="' + dbPlanData[i].PlanRateID + '" class="btn btn-primary btn-round btn-block waves-effect waves-light edit-modal custom-schedule-getquote" style="width:90%; font-size: 12px; line-height: 12px;" data-toggle="modal" data-animation="bounce" data-target=".edit-modal1"> Get a Call Back </button></div><div class="provider-scrollable-table__value label--3 m-0 "><button id="1" class="btn btn-primary btn-round waves-effect waves-light custom-schedule-getquote" style="width:90%; font-size: 12px; line-height: 12px;" onclick="' + btnclick + '"> Buy Now </button></div></div><div class="provider-scrollable-table__row bt-gray-heather" style="margin-bottom: -10px !important;padding-bottom: 2px;" data-row-hide-child >Coverage' + varBenefitstable + ' </div><div class="provider-scrollable-table__row bt-gray-heather" style="margin-bottom: -10px !important;padding-bottom: 0px;" data-row-hide-child >Depreciation' + varDepriciationPolicytable + ' </div><div class="provider-scrollable-table__row bt-gray-heather" style="margin-bottom: -10px !important;padding-bottom: 0px;" data-row-hide-child >Claim' + varClaimPolicytable + ' </div><div class="provider-scrollable-table__row bt-gray-heather" style="margin-bottom: -10px !important;padding-bottom: 0px;" data-row-hide-child >Exclusions' + varExclusionstable + ' </div><button type="button" class="label label--3 text-blue-vivid  d-block d-md-none  text-left w-100 justify-start align-items-center  is-bg-white  p-24 pt-16 pb-24  b-none bt-gray-heather expand-button expand-btn"> <span class="d-inline-block expand-text">Expand details</span> <span class="d-inline-block  css-icon css-icon--plus-minus css-icon--small  button__icon"></span> </button></div>  ');

                            count++;





                        }

                    };

                    $("#totalnumberofrows").text(count);

                    //filteration data set

                    for (var f = 0; f < dbfiltervendor.length; f++) {





                        $("#filteration-vendors").append('  <p class="mb-1p5 filter-p">' + dbfiltervendor[f].filtervendor + '<span class="float-right"><label class="switch"><input type="radio" name="filtervendorname" class="companyFilterSwitch" id="companyFilterSwitch_1" value="' + dbfiltervendor[f].filtervendor + '" onclick="myFunction(this.value);" ><span class="slider round"></span></label></span></p>');





                    };

                } else {

                    Swal.fire({

                        title: 'Some Error Occurred',

                        type: "error",

                        customClass: 'animated fadeIn'

                    })

                }

                return data;

            }

        });

    }

}


// let arr = ['100.12', '77.8', '88', '77.11', '77.12', '77.9', '77', '119', '120', '100.8', '100.11', '100', '100.9'];
// arr.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}))
// console.log(arr)

var sorted = false;

function sortFunc(vendname) {
    $('#freeze').append(
        $('#freeze').find('tr.filter_vend_1').sort(function(a, b) {
            var td_a = $($(a).find('td.filter-vendname-5')[0]);
            var td_b = $($(b).find('td.filter-vendname-5')[0]);
            //console.log("here you are "+ td_a.html());
            if (sorted) {
                if (td_a.text() == 'Free') return 1;
                var asc = td_b.text().replace(/[^\d.]/g, '').localeCompare(td_a.text().replace(/[^\d.]/g, ''), undefined, { numeric: true });
                return asc;
            } else {
                if (td_a.text() == 'Free') return -1;
                return td_a.text().replace(/[^\d.]/g, '').localeCompare(td_b.text().replace(/[^\d.]/g, ''), undefined, { numeric: true });
            }
        })
    );

    //For Mobile
    $('#mobile-data').append(
        $('#mobile-data').find('.provider-scrollable-table__item_mob').sort(function(a, b) {
            var td_a = $($(a).find('.filter-vendname-5')[0]);
            var td_b = $($(b).find('.filter-vendname-5')[0]);
            //console.log("here you are "+ td_a.html());
            if (sorted) {
                if (td_a.text() == 'Free') return 1;
                var asc = td_b.text().replace(/[^\d.]/g, '').localeCompare(td_a.text().replace(/[^\d.]/g, ''), undefined, { numeric: true });
                return asc;
            } else {
                if (td_a.text() == 'Free') return -1;
                return td_a.text().replace(/[^\d.]/g, '').localeCompare(td_b.text().replace(/[^\d.]/g, ''), undefined, { numeric: true });
            }
        })
    );


    if (sorted) sorted = false;
    else sorted = true;
}






//Filteration



function numberWithCommas(x) {

    var parts = x.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");

}



function functioncf() {

    var cf = document.getElementsByName("filtervendorname");

    for (i = 0; i < cf.length; i++) {

        cf[i].checked = false;

    }

    group = document.getElementById("CarPlans-table-body");

    crds = group.getElementsByClassName("filter_vend_1");

    for (i = 0; i < crds.length; i++) {



        crds[i].style.display = "";





    }

}




function functioncf() {
    var cf = document.getElementsByName("filtervendorname");
    for (i = 0; i < cf.length; i++) {
        cf[i].checked = false;
    }
    group = document.getElementById("CarPlans-table-body");
    crds = group.getElementsByClassName("filter_vend_1");
    for (i = 0; i < crds.length; i++) {

        crds[i].style.display = "";

    }

    //For Mobile
    group = document.getElementById("mobile-data");
    crds = group.getElementsByClassName("provider-scrollable-table__item_mob");
    for (i = 0; i < crds.length; i++) {

        crds[i].style.display = "";

    }
}


function myFunction(vendname) {
    var inputvendname, filtervendname, group, crds, crdsvendname, i;
    inputvendname = vendname; // inputPcatagory = document.getElementById("pcatagory");
    filtervendname = inputvendname.toUpperCase();
    group = document.getElementById("CarPlans-table-body");
    crds = group.getElementsByClassName("filter_vend_1");
    for (i = 0; i < crds.length; i++) {
        crdsvendname = crds[i].getElementsByClassName("filter-vendname-2")[0];

        if (crdsvendname) {
            if (crdsvendname.innerHTML.toUpperCase().indexOf(filtervendname) > -1) {
                crds[i].style.display = "";
            } else {
                crds[i].style.display = "none";
            }

        }

    }

    //For mobile
    group = document.getElementById("mobile-data");
    crds = group.getElementsByClassName("provider-scrollable-table__item_mob");
    for (i = 0; i < crds.length; i++) {
        crdsvendname = crds[i].getElementsByClassName("filter-vendname-2")[0];

        if (crdsvendname) {
            if (crdsvendname.innerHTML.toUpperCase().indexOf(filtervendname) > -1) {
                crds[i].style.display = "";
            } else {
                crds[i].style.display = "none";
            }

        }

    }
}