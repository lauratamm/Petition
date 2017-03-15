document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//set cookie value on login
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//return cookie value if it exists
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//display content depending on if the user is logged in
function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        //replace login menu with greeting message
        $("#welcome").empty();
        $("#welcome").append("Welcome," + username);
        $("#menuLogin").addClass("hidden");
    } else {
        //if cookie does not exist, show login menu
        $("#menuLogin").removeClass("hidden");
        return "not logged in";
    }
}



$(document).ready(function () {
    
    checkCookie();
    //stop dropdown menu from collapsing when clicked on
    $(document).on('click', '.dropdown-menu', function (e) {
       e.stopPropagation();
    });


    ////LOGIN

    ////get values from input fields
    //var emailTarget = $("#emailError");
    //var passwordTarget = $("#passwordError");

    ////check email against pattern on blur
    //$("#email").blur(function () {
    //    emailTarget.empty();
    //    $(this).css("border-color", "white");
    //    var email = $('#email').val();
    //    if (email != '') {
    //        isValidEmailAddress(email);
    //        if (isValidEmailAddress(email)) {
    //            $(this).css("border-color", "green");
                
    //        };

    //        if (!isValidEmailAddress(email)) {
    //            emailTarget.append("<p>Please enter a valid email</p>");
    //            $(this).css("border-color", "red");    
    //       }
    //    }    
    //});


    ////check password against pattern on blur
    //$("#password").blur(function () {
            
    //    passwordTarget.empty();
    //    $(this).css("border-color", "white");
    //    var password = $('#password').val();
    //    if (password != '') {
    //        isPasswordValid(password);
    //        if (isPasswordValid(password)) {
    //            $(this).css("border-color", "green");
    //        }

    //        if (!isPasswordValid(password)) {
    //            passwordTarget.append("<p>Password must contain at least 8 characters</p>");
    //            $(this).css("border-color", "red");
    //        }
    //    }     
    //});

    ////enable or disable login button
    //$(".dropdown-login input").on("keyup", function () {
    //    var password = $.trim($('#password').val());
    //    var email = $.trim($('#email').val());
    //    console.log(email);
    //    console.log(password);
    //    if (!isPasswordValid(password) || !isValidEmailAddress(email)) {
    //        $('#btnLogin').prop("disabled", true);
    //    }

    //    if (isPasswordValid(password) && isValidEmailAddress(email)) {
    //        $('#btnLogin').prop("disabled", false);
    //    }
    //});


    ////when email and password are validated, sign in (add email/password match in the database 
    //$("#btnLogin").on("click", function () {
    //    var email = $('#email').val();
    //    setCookie("username", email, 365);
    //    checkCookie();
    //});

    ////REGISTER

    ////set target divs
    //var firstnameTarget = $("#firstNameError");
    //var surnameTarget = $("#surNameError");
    //var emailTarget = $("#emailError");
    //var passwordTarget = $("#passwordError");
    //var matchTarget = $("#passwordMatchError")

    ////check names contain only letters
    //$("#firstname").blur(function () {
    //    firstnameTarget.empty();
    //    var firstname = $.trim($('#firstname').val());
    //    if (firstname != '') {
    //        isNameValid(firstname);
    //        if (isNameValid(firstname)) {
    //            $(this).css("border-color", "green");
    //        };

    //        if (!isNameValid(firstname)) {
    //            firstnameTarget.append("<p>Please enter letters only.</p>");
    //            $(this).css("border-color", "red");
    //        }
    //    }
    //});

    //$("#surname").blur(function () {
    //    surnameTarget.empty();
    //    var surname = $.trim($('#surname').val());
    //    if (surname != '') {
    //        isNameValid(surname);
    //        if (isNameValid(surname)) {
    //            $(this).css("border-color", "green");
    //        };

    //        if (!isNameValid(surname)) {
    //            surnameTarget.append("<p>Please enter letters only.</p>");
    //            $(this).css("border-color", "red");
    //        }
    //    }
    //});

    ////validate email
    //$("#email").blur(function () {
    //    emailTarget.empty();
    //    var email = $.trim($('#email').val());
    //    if (email != '') {
    //        isValidEmailAddress(email);
    //        if (isValidEmailAddress(email)) {
    //            $(this).css("border-color", "green");
    //        };

    //        if (!isValidEmailAddress(email)) {
    //            emailTarget.append("<p>Please enter a valid email</p>");
    //            $(this).css("border-color", "red");
    //        }
    //    }
    //});


    ////validate password on blur
    //$("#password").blur(function () {

    //    passwordTarget.empty();
    //    var password = $.trim($('#password').val());

    //    if (password != '') {
    //        isPasswordValid(password);

    //        if (isPasswordValid(password)) {
    //            $(this).css("border-color", "green");
    //        }

    //        if (!isPasswordValid(password)) {
    //            passwordTarget.append("<p>Password must contain at least 8 characters</p>");
    //            $(this).css("border-color", "red");
    //        }
    //    }
    //});


    ////validate passwords match
    //$("#confirmPassword").blur(function () {
    //    matchTarget.empty();
    //    var confirmPsw = $.trim($("#confirmPassword").val());
    //    var password = $.trim($('#password').val());
    //    if (password !== confirmPsw) {
    //        matchTarget.append("<p>Passwords do not match!</p>");
    //        $("#confirmPassword").css("border-color", "red");
    //    }
    //    else {
    //        $("#confirmPassword").css("border-color", "green");
    //    }
    //})

    ////enable or disable button
    //$(".dropdown input").on("keyup", function () {
    //    var firstname = $.trim($('#firstname').val());
    //    var surname = $.trim($('#surname').val());
    //    var email = $.trim($('#email').val());
    //    var confirmPsw = $("#confirmPassword").val();
    //    var password = $('#password').val();

    //    if (password == confirmPsw && isPasswordValid(password) && isValidEmailAddress(email) && isNameValid(firstname) && isNameValid(surname)) {
    //        $("#btnRegister").prop("disabled", false);
    //    }
    //    if (password !== confirmPsw || !isPasswordValid(password) || !isValidEmailAddress(email) || !isNameValid(firstname) || !isNameValid(surname)) {
    //        $("#btnRegister").prop("disabled", true);
    //    }
    //})



    ////clear error colours and messages while typing
    //$("input").on("keydown", function () {
    //    $(this).css("border-color", "white");
    //    $(".error").empty();
    //})


    //$("#btnRegister").on("click", function () {
    //    var email = $.trim($('#emailRegister').val());
    //    setCookie("username", email, 365);
    //    checkCookie();
     

    //});






});
