// REGISTRATION FORM

$('#frmRegistration').validate({
    rules: {
        username: {
            required: true,
            minlength: 2
        },
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 5
        },
        confirm_password: {
            required: true,
            minlength: 5,
            equalTo: "#password"
        }
    },
    messages: {
        username: {
            required: "Please enter your username.",
            minlength: "Your username must consist of at least 2 characters."
        },
        email: {
            required: "Please enter your email.",
            email: "Please enter a valid email."
        },
        password: {
            required: "Please enter your password.",
            minlength: "Your password must consist of at least 5 characters."
        },
        confirm_password: {
            required: "Please confirm your password.",
            minlength: "Your password must consist of at least 5 characters.",
            equalTo: "Your passwords doesn't match."
        }
    },
    errorPlacement: function (error, element) {
        console.log(element);
        error.appendTo(element.parent());
    },
    submitHandler: function (form) {
        alert("top");
        return false;
    }
});