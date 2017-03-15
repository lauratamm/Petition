
function counter(count) {
    count=count+1;
    return count;
}

$(document).ready(function () {

    $(".submitSignature").on("click",function () {

            var email = getCookie("username");
            console.log(email);
            $("#signatories").prepend("<span>" + email + "</span>");
            $('html, body').animate({
                scrollTop: $("#signatories").offset().top
            }, 1000);
            $('.submitSignature').attr("disabled", true);
    });
});