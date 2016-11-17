/**
 * register service worker
 *
 * @author Michael Mueller <development@reu-network.de>
 * @author David Howon <maestroderjoker@googlemail.com>
 */

var API_URL = "http://localhost/nodejs/api";

if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('sw.js').then(function(reg) {

        if(reg.installing)
        {
            console.log('Service worker installing');
        } else if(reg.waiting)
        {
            console.log('Service worker installed');
        } else if(reg.active)
        {
            console.log('Service worker active');
        }

    }).catch(function(error)
    {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}


// check password confirmation
// $('#password, #confirm_password').on('keyup', function () {
//     if ($('#password').val() == $('#confirm_password').val()) {
//         $('#message').html('Matching').css('color', 'green');
//     } else
//         $('#message').html('Not Matching').css('color', 'red');
// });

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

// SIGNUP
// $('#submit-registration').on('click', function(e){
//     e.preventDefault();
//
//     var data = $('#frmRegistration').serialize();
//     $.ajax({
//         type: "POST",
//         url: API_URL + "/signup",
//         data: data,
//         success: function(data) {
//             if (data.success){
//                 jQuery.mobile.changePage("#Login", {
//                     transition: "slide",
//                     reverse: true,
//                 });
//                 new $.nd2Toast({
//                     message: data.message + " Please log in.",
//                     ttl: 3000
//                 });
//                 $('.nd2-toast').addClass('alert-success');
//             }
//             else
//                 new $.nd2Toast({
//                     message: data.message,
//                     ttl: 3000
//                 });
//
//             $('.nd2-toast').addClass('alert-danger');
//         },
//         error: function(xhr, options, error){
//             new $.nd2Toast({
//                 message: "Error occurred! " + error,
//                 ttl: 3000
//             });
//             $('.nd2-toast').addClass('alert-danger');
//         }
//     })
// });

// LOGIN
$('#submit-login').on('click', function(e){
    e.preventDefault();
    var data = $('#frmLogin').serialize();
    $.ajax({
        type: "POST",
        url: API_URL + "/authenticate",
        data: data,
        success: function(data){
            if(data.success)
                // TODO: save token in local storage
                jQuery.mobile.changePage("#Home", {
                    transition: "slide",
                    reverse: true,
                });
            else
                new $.nd2Toast({
                    message: data.message,
                    ttl: 3000
                });

            $('.nd2-toast').addClass('alert-danger');
        },
        error: function(xhr, options, error){
            new $.nd2Toast({
                message: "Error occurred! " + error,
                ttl: 3000
            });
            $('.nd2-toast').addClass('alert-danger');
        }
    })
});
