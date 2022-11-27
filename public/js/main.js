console.log("mainer");
//ready doc
$(document).ready(function () {
  //calcs button listerner
  $("#calcs").on("click", function () {
    //get cals from server
    $.ajax({
      url: "/calcs",
      method: "GET",
      success: function (data) {
        console.log("data", data);
        //render calcs
        //renderCalcs(data);
      },
    });
  });
});
