
var dataArray = new Array();

$(document).ready(function () {




    var jqxhr = $.getJSON("/Content/causes.json", function () {
        console.log("success");
    })
  .done(function () {
      console.log("second success");
  })
  .fail(function () {
      console.log("error");
  })
  .always(function () {
      console.log("complete");
  });

    $.getJSON("/Content/causes.json", function (data) {
        $.each(data, function (key, val) {
            $("#causesTable").append("<tr><td>" + val[0] +
"</td><td>" + val[1] + "</td><td>" +
val[2] + "</td></tr>");
        });
    })
.done(function (data) { dataArray = data; });


    // highlight on hover - Admin table
    $(".tableRow").on("mouseover", function () {
        $(this).css('cursor', 'pointer');
        $(this).css("background-color", "#f7d8be");
        $(this).siblings().css("background-color", "ghostwhite");
    }
        )

    //view petition 
   $(".hoverRow").on("click", function () {
        window.location.href = "/Signature/ViewPetition";
    });


    //delete petition
    $(".tableRow").on("click", ".deleteBtn", function () {
        
        //get petition ID
        var petitionId = $(this).parent().parent().find(".petitionID").text();

        //erase in DB using the petition ID as a reference

        //remove from list on browser
        var deleteTableRow = $(this).parent().parent();
        deleteTableRow.hide();
     
    })

    //highlight on hover - user table
    $("#causesTable tr").on("mouseover", function () {
        $(this).css('cursor', 'pointer');
        $(this).css("background-color", "#f7d8be");
        $(this).siblings().css("background-color", "ghostwhite");
    }
    )
    $("#causesTable tr").on("click", function () {
        window.location.href = "/Signature/ViewPetition";
    });

});