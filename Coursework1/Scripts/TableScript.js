

var UserPetitionArray = new Array();
var AdminPetitionArray = new Array();

//read in data from json file for petition listing for users
$.getJSON("/Content/causes.json", function (dataUser) {
    $.each(dataUser, function (key, val) {
        $("#causesTable").append('<tr class="tableRow"><td class="col-md-4 col-xs-4 hidden-xs"><img class="img-rounded" src="' + val.image + '">' +
        "</td><td class='col-md-8 col-xs-12 text-left'><p class='lead'>" + val.title + "</p><div class='hidden-xs'><p>" + val.description + "</p></div></td><td class='visible-xs'><button class='btn btn-success'>View</button></td></tr>");
    });
    })
    .done(function (dataUser) { UserPetitionArray = dataUser; });

//read in data from json file for petition listing for admin
$.getJSON("/Content/causes.json", function (dataAdmin) {
    $.each(dataAdmin, function (key, val) {
        var signArray = val.signatories;
        counter = 0;
        for (i = 0; i < signArray.length; i++) {
            var signatory = signArray[i].username
            console.log(signArray[i].username);
            counter++;
        }
        $("#AdminCausesTable").append('<tr class="tableRow"> <td class="petitionID hoverRow">' + val.petitionID + '<td class="hoverRow">' + val.title + '<td class="hoverRow">' + counter +'</td><td class="hoverRow">' + val.author +
            '</td><td class="hoverRow">' + val.date + '</td><td> <button class="btn btn-danger deleteBtn">Delete</button> </td></tr>');
    });
    })
    .done(function (dataAdmin) { AdminPetitionArray = dataAdmin; });


$(document).ready(function () {


    // highlight on hover - Admin table
    $(".tableRow").on("mouseover", function () {
        $(this).css('cursor', 'pointer');
        $(this).css("background-color", "#f7d8be");
        $(this).siblings().css("background-color", "ghostwhite");
    }
        )

    //view petition 
   $(".hoverRow").on("click", function () {
       window.location.href = "/AllPetitions/ViewPetition";
    });
   $("#causesTable tr").on("click", function () {
       window.location.href = "/AllPetitions/ViewPetition";
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
    
});