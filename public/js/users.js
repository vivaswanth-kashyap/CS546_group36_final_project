// In this file, you must perform all client-side validation for every single form input (and the academicStatus dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
// Register form
$(document).ready(function() 
{

    // Set the default values
    var defaultStatus = $("#defaultStatus").val();
    $("#academicStatusInput").val(defaultStatus).prop("selected", true);

    $("#registration-form").submit(function(event) 
    {
        event.preventDefault();
        $(".error").hide();

        // validation 
        var firstName = $("#firstNameInput").val().trim();
        var lastName = $("#lastNameInput").val().trim();
        var email = $("#emailAddressInput").val().trim();
        var password = $("#passwordInput").val().trim();
        var confirmPassword = $("#confirmPasswordInput").val().trim();
        
        var academicStatus = $("#academicStatusInput").val();
        if (academicStatus) {
			var academicStatus = $("#academicStatusInput").val().trim();
		}
        
        let regex = /^[a-zA-Z]+$/;

        if (!firstName || !regex.test(firstName) || firstName.length < 2 || firstName.length > 25)
        {
            $('#firstNameError').show();
            $('#firstNameInput').focus();
            $('#firstNameInput').val('');
            return;
        }
        if (!lastName || !regex.test(lastName) || lastName.length < 2 || lastName.length > 25)
        {
            $('#lastNameError').show();
            $('#lastNameInput').focus();
            $('#lastNameInput').val('');
            return;
        }
        if (!email || email.split('@').length != 2 || email.split('@')[1].toLowerCase() != "stevens.edu")
        {
            $('#emailError').show();
            $('#emailInput').focus();
            $('#emailInput').val('');
            return;
        }
        if (!password)
        {
            $('#passwordError').show();
            $('#passwordInput').focus();
            $('#passwordInput').val('');
            return;
        }

        // Validate password
        let condition = {"uppercase": 0, "number": 0, "special": 0};
        let numRegex = /^\d+$/;
        let charRegex = /^[a-zA-Z]+$/;

        for (let i of password)
        {
            if (i == " ") 
            {
                condition.uppercase = -1000;
                break;
            }
            if (i == i.toUpperCase()) condition.uppercase += 1;
            if (numRegex.test(i)) condition.number += 1;
            if (!numRegex.test(i) && !charRegex.test(i)) condition.special += 1;
        }

        if (condition.uppercase + condition.number + condition.special < 3 || password.length < 8)
        {   
            $('#passwordInvalidError').show();
            $('#passwordInput').focus();
            $('#passwordInput').val('');
            $('#confirmPasswordInput').val('');
            return;
        }


        if (!confirmPassword)
        {
            $('#confirmPasswordError').show();
            $('#confirmPasswordInput').focus();
            $('#confirmPasswordInput').val('');
            return;
        }

        // validate both passwords
        if (password !== confirmPassword) 
        {
            $('#confirmPasswordMatchError').show();
            $('#confirmPasswordInput').focus();
            $('#confirmPasswordInput').val('');
            return;
        }
        this.submit();
    });


    $("#login-form").submit(function(event) 
    {
        event.preventDefault();
        $(".error").hide();

        // validation 
        var email = $("#emailAddressInput").val().trim();
        var password = $("#passwordInput").val().trim();

        if (!email)
        {
            $('#emailError').show();
            $('#emailInput').focus();
            $('#emailInput').val('');
            return;
        }
        if (!password)
        {
            $('#passwordError').show();
            $('#passwordInput').focus();
            $('#passwordInput').val('');
            return;
        }
        
        this.submit();
    });


});

