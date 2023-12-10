$(document).ready(function() 
{
    // Set the default values
    var defaultFirstName = $("#defaultFirstName").val();
    var defaultLastName = $("#defaultLastName").val();
    var defaultStatus = $("#defaultStatus").val();
    $("#academicStatusInput").val(defaultStatus).prop("selected", true);

    // Form event
    $("#setting-form").submit(function(event) 
    {
        event.preventDefault();
        $(".error").hide();

        // validation 
        var firstName = $("#firstNameInput").val().trim();
        var lastName = $("#lastNameInput").val().trim();
        var academicStatus = $("#academicStatusInput").val().trim();
        let regex = /^[a-zA-Z]+$/;

        if (!firstName || !regex.test(firstName) || firstName.length < 2 || firstName.length > 25)
        {
            $('#firstNameError').show();
            $('#firstNameInput').focus();
            $('#firstNameInput').val(defaultFirstName);
            return;
        }
        if (!lastName || !regex.test(lastName) || lastName.length < 2 || lastName.length > 25)
        {
            $('#lastNameError').show();
            $('#lastNameInput').focus();
            $('#lastNameInput').val(defaultLastName);
            return;
        }
        
        this.submit();
    });

});