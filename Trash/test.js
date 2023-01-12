<script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
<script type="text/javascript">
function readyFn( jQuery ) 
	//JQuery(document).ready(function($)
{

$(document).on("click", "#SUBB", function(){
var NAME = $("#NAME").val();
var PHONE = $("#phone ").val();
var EMAIL = $("#EMAIL").val();
var MESSAGE = $("#MESSAGE").val();
var CampaignName = $("input[name='UCAMPAIGN']").val();
var CampaignSource = $("input[name='USOURCE']").val();
var CampaignMedium = $("input[name='UMEDIUM']").val();
            $.ajax( {
                url: "https://psi.estate/wp-includes/crm-integration/api.php",
                method: "POST",
                data: {
                    //phone:phone,MESSAGE:MESSAGE,EMAIL:EMAIL,NAME:NAME 
					NAME:NAME,
					PHONE:PHONE,
					EMAIL:EMAIL,
					MESSAGE:MESSAGE,
					CampaignName:CampaignName,
					CampaignSource:CampaignSource,
					CampaignMedium:CampaignMedium
                },
                dataType: "JSON",
                success: function (data) 
                {
					var result = data.result;
				alert('Data Added to CRM Successfully!');
// 					console.log(result);
// 					var result2 = result.result;
// 					alert(result2);                    
					return data;
                }
       	});
   });
})

</script>