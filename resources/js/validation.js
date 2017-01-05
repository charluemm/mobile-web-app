var API_URL = "http://localhost:3000/api";
// REGISTRATION FORM

$('#frmRegistration').validate({
    rules: {
        register_username: {
            required: true,
            minlength: 2
        },
        register_email: {
            required: true,
            email: true
        },
        register_password: {
            required: true,
            minlength: 5
        },
        register_confirm_password: {
            required: true,
            minlength: 5,
            equalTo: "#register_password"
        }
    },
    messages: {
        register_username: {
            required: "Please enter your username.",
            minlength: "Your username must consist of at least 2 characters."
        },
        register_email: {
            required: "Please enter your email.",
            email: "Please enter a valid email."
        },
        register_password: {
            required: "Please enter your password.",
            minlength: "Your password must consist of at least 5 characters."
        },
        register_confirm_password: {
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
        var data = $(form).serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        console.log(data);
        $.ajax({
            type: "POST",
            url: API_URL + "/signup",
            data: 'username='+data['register_username']+'&password='+data['register_password']+'&email='+data['register_email'],
            success: function(data){
                if(data.success)
                {
                    new $.nd2Toast({
                        message: data.message,
                        ttl: 3000
                    });
                    // redirect to #Login
                    jQuery.mobile.changePage("#Login", {
                        transition: "slide",
                        reverse: true,
                    });
                }
                else
                {
                    new $.nd2Toast({
                        message: data.message,
                        ttl: 3000
                    });

                    $('.nd2-toast').addClass('alert-danger');
                }
            },
            error: function(xhr, options, error) {
                new $.nd2Toast({
                    message: "Error occurred! " + error,
                    ttl: 3000
                });
                $('.nd2-toast').addClass('alert-danger');
            }
        });
        return false;
    }
});