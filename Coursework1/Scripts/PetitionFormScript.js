
//email pattern
function isValidEmailAddress(email) {
    var emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailPattern.test(email);

};

//password pattern
function isPasswordValid(password) {
    var passwordPattern = /^.{8,}$/;
    return passwordPattern.test(password);

};

//name pattern
function isNameValid(name) {
    var namePattern = /^[A-Za-z]+$/;
    return namePattern.test(name);
}

$(document).ready(function () {

    //make number circles into a link
    $(".stages").mouseover(function () {
        $(this).css('cursor', 'pointer')

    });
    $(".stages").click(function () {
        window.location.href = "/Form/PetitionForm"
    });

    //'create petition' button for xs screen linking to the form
    $("#xs-screen-petitionBtn").click(function () {
        window.location.href = "/Form/PetitionForm";
    })


    //if 'create a petition button' is clicked and user is logged in, display a shorter form

    checkCookie();
    var user = checkCookie();
    if (user == "not logged in") {
        $(".progress").removeClass("hidden");
    }
   
    //set target divs
    var titleTarget = $(".titleError");
    var descriptionTarget = $(".descriptionError")

    //if title is empty display an error
    $("#title").on("keyup", function () {
        titleTarget.empty();
        var title = $.trim($("#title").val());
        var description = $.trim($("#description").val());
        if (title =='') {
            titleTarget.append("<p>Please enter a title</p>");
            $(this).css("border-color", "red");
        }
            else{
                $(this).css("border-color", "green");

            }
        if ((title == '') || (description == '')) {
            $('#btnNext').prop("disabled", true);
        }

        if ((title !== '') && (description !== '')) {
            $('#btnNext').prop("disabled", false);
        }
    });

    //if title is empty display an error
    $("#description").on("keyup",function () {
        descriptionTarget.empty();
        var title = $.trim($("#title").val());
        var description = $.trim($("#description").val());

        if (description=='') {
            descriptionTarget.append("<p>Please enter a description</p>");
            $(this).css("border-color", "red");
        }
            else {
                $(this).css("border-color", "green");
            }

        //if values are filled enable the 'next' button
        if ((title == '') || (description == '')) {
            $('#btnNext').prop("disabled", true);
            }
            
        if ((title !== '') && (description !== '')) {
            $('#btnNext').prop("disabled", false);
        }
    });

    //if title and description are filled in move to next fieldset
    $("#btnNext").click(function () {
       
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        //if user is signed in skip the second stage of entering peronal details
        checkCookie();
        var user = checkCookie();
        if (user == "not logged in") {
            current_fs.fadeOut(500, function () {
                next_fs.fadeIn(500);
                $("#step2").css("background-color", "#428bca");
            })}
        else {
            //get the title and description and display at the final stage
            var title = $.trim($("#title").val());
            var description = $.trim($("#description").val());
            $("#titleDisplay").append(title);
            $("#descriptionDisplay").append(description);

            //remove form title
            $(".formTitle").addClass("hidden");

            next_stage = $(".sharing");
            current_fs.fadeOut(500, function () {
                $(next_stage).fadeIn(500);
                $("#step3").css("background-color", "#428bca");
            })   
        }      
    });

    
    
    //LOGIN

    //set target divs
    var emailTargetLogin = $(".emailErrorLogin");
    var passwordTargetLogin = $(".passwordErrorLogin");

    // if 'Sign in option is selected, fade out registration form and fade in Login form
    $("#clickToSignIn").click(function () {
        $("#formStep1").fadeOut(500, function () {
            $(".signInTarget").fadeIn(500);
        })
    });

    //if 'Register now' option is selected, fade out login form and fade in Registration form

    $("#clickToRegister").click(function () {
        $(".signInTarget").fadeOut(500, function () {
            $("#formStep1").fadeIn(500);
        })
    });


    //validate email on blur
    $(".emailLogin").blur(function () {
        emailTargetLogin.empty();
        $(this).css("border-color", "white");
        var email = $.trim($('.emailLogin').val());
        console.log(email);
        if (email != '') {
            isValidEmailAddress(email);
            if (isValidEmailAddress(email)) {
                $(this).css("border-color", "green");
            };

            if (!isValidEmailAddress(email)) {
                emailTargetLogin.append("<p>Please enter a valid email</p>");
                $(this).css("border-color", "red");
            }
        }
    });


    //validate password on blur
    $(".passwordLogin").blur(function () {

        passwordTargetLogin.empty();
        $(this).css("border-color", "white");
        var password = $.trim($('.passwordLogin').val());
        console.log(password);
        var email = $.trim($('.emailLogin').val());

        if (password != '') {
            isPasswordValid(password);
            //  console.log(isPasswordValid(password));
            if (isPasswordValid(password)) {
                $(this).css("border-color", "green");
            }

            if (!isPasswordValid(password)) {
                passwordTargetLogin.append("<p>Password must contain at least 8 characters</p>");
                $(this).css("border-color", "red");
            }          
        }
    });

    //enable or disable the 'complete' button
    $(".signInTarget input").on("keyup", function () {
        var password = $.trim($('.passwordLogin').val());
        var email = $.trim($('.emailLogin').val());

        if (!isPasswordValid(password) || !isValidEmailAddress(email)) {
            $('#btnLoginPetitionForm').prop("disabled", true);
        }

        if (isPasswordValid(password) && isValidEmailAddress(email)) {
            $('#btnLoginPetitionForm').prop("disabled", false);
        }
    });

  

    //fieldset variables
    var current_fs, next_fs, previous_fs;

    //move to the next step when password and email are validated
    $("#btnLoginPetitionForm").on("click", function () {
        var email = $.trim($('.emailLogin').val());
        var password = $.trim($('.passwordLogin').val());
        if (isValidEmailAddress(email) && isPasswordValid(password) && (password != '') && (email != '')) {
            //set cookie
            setCookie("username", email, 365);
            //check if user is now logged in and change the 'login' button to a greeting message
            checkCookie();

            //remove form title
            $(".formTitle").addClass("hidden");

            //move to the next stage
            current_fs = $(this).parent().parent();
            next_stage = $(".sharing");
            current_fs.fadeOut(500, function () {
                $(next_stage).fadeIn(500);
                $("#step3").css("background-color", "#428bca");
            });   
        }
    });

    //move back to the previous fieldset
    $("#btnBack").on("click", function () {
        current_fs = $(this).parent().parent();
        previous_fs = $(this).parent().parent().prev();
        
        current_fs.fadeOut(500, function () {
            $("#step2").css("background-color", "#999999");
            $(previous_fs).fadeIn(500);    
        });
    });



//REGISTER

    //set target divs
    var firstnameTargetRegister = $(".firstNameErrorRegister");
    var surnameTargetRegister = $(".surNameErrorRegister");
    var emailTargetRegister = $(".emailErrorRegister");
    var passwordTargetRegister = $(".passwordErrorRegister");
    var matchTargetRegister = $(".passwordMatchError")

    //check names contain only letters
    $("#firstnameRegister").blur(function () {
        firstnameTargetRegister.empty();
        $(this).css("border-color", "white");
        var firstname = $.trim($('#firstnameRegister').val());
        if (firstname != '') {
            isNameValid(firstname);
            if (isNameValid(firstname)) {
                $(this).css("border-color", "green");
            };

            if (!isNameValid(firstname)) {
                firstnameTargetRegister.append("<p>Please enter letters only.</p>");
                $(this).css("border-color", "red");
            }
        }
    });
    
    $("#surnameRegister").blur(function () {
        surnameTargetRegister.empty();
        $(this).css("border-color", "white");
        var surname = $.trim($('#surnameRegister').val());
        if (surname != '') {
            isNameValid(surname);
            if (isNameValid(surname)) {
                $(this).css("border-color", "green");
            };

            if (!isNameValid(surname)) {
                surnameTargetRegister.append("<p>Please enter letters only.</p>");
                $(this).css("border-color", "red");
            }
        }
    });

    //validate email
    $("#emailRegister").blur(function () {
        emailTargetRegister.empty();
        $(this).css("border-color", "white");
        var email = $.trim($('#emailRegister').val());
        if (email != '') {
            isValidEmailAddress(email);
            if (isValidEmailAddress(email)) {
                $(this).css("border-color", "green");
            };

            if (!isValidEmailAddress(email)) {
                emailTargetRegister.append("<p>Please enter a valid email</p>");
                $(this).css("border-color", "red");
            }
        }
    });


    //validate password on blur
    $("#passwordRegister").blur(function () {

        passwordTargetRegister.empty();
        var password = $.trim($('#passwordRegister').val());

        if (password != '') {
            isPasswordValid(password);

            if (isPasswordValid(password)) {
                $(this).css("border-color", "green");
            }

            if (!isPasswordValid(password)) {
                passwordTargetRegister.append("<p>Password must contain at least 8 characters</p>");
                $(this).css("border-color", "red");
            }
        }
    });


    //validate passwords match
    $("#confirmPasswordPetitionForm").blur(function () {
        matchTargetRegister.empty();
        var confirmPsw = $.trim($("#confirmPasswordPetitionForm").val());
        var password = $.trim($('#passwordRegister').val());
        console.log(password);
        console.log(confirmPsw);
        if (password !== confirmPsw) {
            matchTargetRegister.append("<p>Passwords do not match!</p>");
            $("#confirmPasswordPetitionForm").css("border-color", "red");
        }
        else {
            $("#confirmPasswordPetitionForm").css("border-color", "green");
        }
    })

    //enable or disable button
    $(".registerTarget input").on("keyup", function () {
        var firstname = $.trim($('#firstnameRegister').val());
        var surname = $.trim($('#surnameRegister').val());
        var email = $.trim($('#emailRegister').val());
        var confirmPsw = $("#confirmPasswordPetitionForm").val();
        var password = $('#passwordRegister').val();

        if (password == confirmPsw && isPasswordValid(password) && isValidEmailAddress(email) && isNameValid(firstname) && isNameValid(surname)) {
            $("#completePetitionViaReg").prop("disabled", false);
        }
        if (password !== confirmPsw || !isPasswordValid(password) || !isValidEmailAddress(email) || !isNameValid(firstname) || !isNameValid(surname)){
            $("#completePetitionViaReg").prop("disabled", true);
        }
    })
    
  
    //move back to the previous fieldset
    $("#btnPrevious").on("click", function () {
        current_fs = $(this).parent().parent();
        previous_fs = $(this).parent().parent().prev();
        console.log(current_fs.get(0).tagName);
        console.log(previous_fs.get(0).tagName);
        current_fs.fadeOut(500, function () {
            $(previous_fs).fadeIn(500);
        });
    });

    
    //clear error colours and messages while typing
    $("input").on("keydown", function () {
        $(this).css("border-color", "white");
        $(".error").empty();
    })


    //complete petition form via registration and review
    $("#completePetitionViaReg").on("click", function () {
        var email = $.trim($('#emailRegister').val());
        setCookie("username", email, 365);
        checkCookie();
        var title = $('#title').val();
        var description = $('#description').val();

        //remove form title
        $(".formTitle").addClass("hidden");

        current_fs = $(this).parent().parent();
        next_fs = $(".sharing");
        current_fs.fadeOut(500, function () {
            $(next_fs).fadeIn(500);
            $("#step3").css("background-color", "#428bca");
        });
        $("#titleDisplay").append(title);
        $("#descriptionDisplay").append(description);
    });

    $("#btnView").click(function () {
        window.location.href = "/AllPetitions/ViewPetition";
    })
    

});