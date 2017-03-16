//document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

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
        $("#logout").removeClass("hidden");
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

    //set divs where errors will be displayed
    var emailTarget = $("#emailError");
    var passwordTarget = $("#passwordError");

    //check email against pattern on blur
    $("#emailLoginDropdown").blur(function () {
        emailTarget.empty();
        $(this).css("border-color", "white");
        var email = $('#emailLoginDropdown').val();
        if (email != '') {
            isValidEmailAddress(email);
            if (isValidEmailAddress(email)) {
                $(this).css("border-color", "green");
                
            };

            if (!isValidEmailAddress(email)) {
                emailTarget.append("<p>Please enter a valid email</p>");
                $(this).css("border-color", "red");    
           }
        }    
    });


    //check password against pattern on blur
    $("#passwordLoginDropdown").blur(function () {
            
        passwordTarget.empty();
        $(this).css("border-color", "white");
        var password = $('#passwordLoginDropdown').val();

        if (password != '') {
            isPasswordValid(password);
            if (isPasswordValid(password)) {
                $(this).css("border-color", "green");
            }

            if (!isPasswordValid(password)) {
                passwordTarget.append("<p>Password must contain at least 8 characters</p>");
                $(this).css("border-color", "red");
            }
        }     
    });

    //enable or disable login button
    $("#formLogin input").on("keyup", function () {
        var password = $.trim($('#passwordLoginDropdown').val());
        var email = $.trim($('#emailLoginDropdown').val());
        console.log(email);
        console.log(password);
        if (!isPasswordValid(password) || !isValidEmailAddress(email)) {
            $('#btnLogin').prop("disabled", true);
        }

        if (isPasswordValid(password) && isValidEmailAddress(email)) {
            $('#btnLogin').prop("disabled", false);
        }
    });


    //when email and password are validated, sign in (add email/password match in the database 
    $("#btnLogin").on("click", function () {
        var email = $('#emailLoginDropdown').val();
        setCookie("username", email, 365);
        window.location.href = window.location.href;
        checkCookie();
    });

    //REGISTER

    //set target divs
    var firstnameTargetDropdown = $("#firstNameErrorDropdown");
    var surnameTargetDropdown = $("#surNameErrorDropdown");
    var emailTargetRegisterDropdown = $("#emailErrorRegisterDropdown");
    var passwordTargetRegisterDropdown = $("#passwordErrorRegisterDropdown");
    var matchTargetDropdown = $("#passwordMatchErrorDropdown")

    //check names contain only letters
    $("#firstnameDropdown").blur(function () {
        firstnameTargetDropdown.empty();
        var firstname = $.trim($('#firstnameDropdown').val());
        if (firstname != '') {
            isNameValid(firstname);
            if (isNameValid(firstname)) {
                $(this).css("border-color", "green");
            };

            if (!isNameValid(firstname)) {
                firstnameTargetDropdown.append("<p>Please enter letters only.</p>");
                $(this).css("border-color", "red");
            }
        }
    });

    $("#surnameDropdown").blur(function () {
        surnameTargetDropdown.empty();
        var surname = $.trim($('#surnameDropdown').val());
        if (surname != '') {
            isNameValid(surname);
            if (isNameValid(surname)) {
                $(this).css("border-color", "green");
            };

            if (!isNameValid(surname)) {
                surnameTargetDropdown.append("<p>Please enter letters only.</p>");
                $(this).css("border-color", "red");
            }
        }
    });

    //validate email
    $("#emailRegisterDropdown").blur(function () {
        emailTargetRegisterDropdown.empty();
        var email = $.trim($('#emailRegisterDropdown').val());
        if (email != '') {
            isValidEmailAddress(email);
            if (isValidEmailAddress(email)) {
                $(this).css("border-color", "green");
            };

            if (!isValidEmailAddress(email)) {
                emailTargetRegisterDropdown.append("<p>Please enter a valid email</p>");
                $(this).css("border-color", "red");
            }
        }
    });


    //validate password on blur
    $("#passwordRegisterDropdown").blur(function () {

        passwordTargetRegisterDropdown.empty();
        var password = $.trim($('#passwordRegisterDropdown').val());
        console.log(password);
        if (password != '') {
            isPasswordValid(password);

            if (isPasswordValid(password)) {
                $(this).css("border-color", "green");
            }

            if (!isPasswordValid(password)) {
                passwordTargetRegisterDropdown.append("<p>Password must contain at least 8 characters</p>");
                $(this).css("border-color", "red");
            }
        }
    });


    //validate passwords match
    $("#confirmPasswordDropdown").blur(function () {
        matchTargetDropdown.empty();
        var confirmPsw = $.trim($("#confirmPasswordDropdown").val());
        var password = $.trim($('#passwordRegisterDropdown').val());
        if (password !== confirmPsw) {
            matchTargetDropdown.append("<p>Passwords do not match!</p>");
            $("#confirmPasswordDropdown").css("border-color", "red");
        }
        else {
            $("#confirmPasswordDropdown").css("border-color", "green");
        }
    })

    //enable or disable button
    $("#registerDropdown").on("keyup", function () {
        var firstname = $.trim($('#firstnameDropdown').val());
        var surname = $.trim($('#surnameDropdown').val());
        var email = $.trim($('#emailRegisterDropdown').val());
        var confirmPsw = $("#confirmPasswordDropdown").val();
        var password = $('#passwordRegisterDropdown').val();

        if (password == confirmPsw && isPasswordValid(password) && isValidEmailAddress(email) && isNameValid(firstname) && isNameValid(surname)) {
            $("#btnRegisterDropdown").prop("disabled", false);
        }
        if (password !== confirmPsw || !isPasswordValid(password) || !isValidEmailAddress(email) || !isNameValid(firstname) || !isNameValid(surname)) {
            $("#btnRegisterDropdown").prop("disabled", true);
        }
    })


    //clear error colours and messages while typing
    $("input").on("keydown", function () {
        $(this).css("border-color", "white");
        $(".error").empty();
    })


    $("#btnRegisterDropdown").on("click", function () {
        var email = $.trim($('#emailRegisterDropdown').val());
        setCookie("username", email, 365);
        checkCookie();
     

    });

    //SIGN OUT
  
    $("#logout").click(function () {
        $(this).addClass("hidden");
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = window.location.href;
    })

   
});
