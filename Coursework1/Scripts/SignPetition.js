
function counter(count) {
    count=count+1;
    return count;
}

$(document).ready(function () {

    checkCookie();
    var user = checkCookie();
    if (user == "not logged in") {
        $('.submitSignature').attr("disabled", true);
        $("#SignInMessage").append("<p class='orange-font'>Please log in to sign<p>");

    }
    else $('.submitSignature').attr("disabled", false);

    $(".submitSignature").on("click",function () {

            var email = getCookie("username");
            $("#signatories").prepend("<span>" + email + "</span>");
            $('html, body').animate({
                scrollTop: $("#signatories").offset().top
            }, 1000);
            $('.submitSignature').attr("disabled", true);
            $("#alreadySignedMessage").append("<p class='orange-font'>You are supporting this cause<p>");
    });
});