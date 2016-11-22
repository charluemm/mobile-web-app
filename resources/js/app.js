/**
 * register service worker
 *
 * @author Michael Mueller <development@reu-network.de>
 * @author David Howon <maestroderjoker@googlemail.com>
 */

var API_URL = "http://localhost/nodejs/api";

// SERVICE WORKER configuration
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

// LOCAL STORAGE configuration
// if (typeof(Storage) !== "undefined") {
//     console.log("Local Storage supported");
// } else {
//    console.log("Local Storage not supported");
// }

// check password confirmation
// $('#password, #confirm_password').on('keyup', function () {
//     if ($('#password').val() == $('#confirm_password').val()) {
//         $('#message').html('Matching').css('color', 'green');
//     } else
//         $('#message').html('Not Matching').css('color', 'red');
// });

// CHECK AUTHENTICATION on each pageload
$(document).on("pagebeforecreate",function(event){
    console.log(event);
    // CHECK AUTHENTICATION
    if (typeof(Storage) !== "undefined")
    {
        var userToken = localStorage.getItem("auth-token");
        if(userToken)
        {
            var target = event.target.id;
            jQuery.mobile.changePage("#"+target, {
                transition: "slide",
                reverse: false,
            });
        }
        else
        {
            jQuery.mobile.changePage("#Login", {
                transition: "slide",
                reverse: false,
            });
        }
    }
    else
    {
        console.log("Storage not supported");
    }
});

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
        success: function(data){
            if(data.success)
            {
                // save token in local storage
                localStorage.setItem("auth-token", data.token);
                // redirect to #Home
                jQuery.mobile.changePage("#Home", {
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
        type: "POST",
        url: API_URL + "/authenticate",
        data: data,
        error: function(xhr, options, error){
            new $.nd2Toast({
                message: "Error occurred! " + error,
                ttl: 3000
            });
            $('.nd2-toast').addClass('alert-danger');
        }
    })
});
