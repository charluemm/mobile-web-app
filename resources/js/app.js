/**
 * register service worker
 *
 * @author Michael Mueller <s147105@hft-leipzig.de>
 * @author David Howon <s147102@hft-leipzig.de>
 */

var API_URL = "http://localhost:3000/api";

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
    }).then(function(){
        console.log("register push...");
        registerPushManager();
    });
}

// CHECK if unique device id exists
$(document).ready(function(){

    // store device id
    var deviceId = localStorage.getItem("deviceId");
    if(deviceId === null)
    {
        new Fingerprint2().get(function(result, components){
            localStorage.setItem("deviceId", result);
            console.log("Set deviceId: " + result); //a hash, representing your device fingerprint
        });
    }
    console.log("DeviceID: " + deviceId);

    // update indexedDB
//    var authToken = localStorage.getItem("auth-token");
});

// CHECK AUTHENTICATION on each pageload
$(document).on("pagebeforeshow",function(event){
    if (typeof(Storage) !== "undefined")
    {
        var userToken = localStorage.getItem("auth-token");
        var target = event.target.id;

        var gcmRegId = localStorage.getItem("gcmRegId");

        if(target === "Register" || target == "Login")
        {
            if(userToken)
            {
                jQuery.mobile.changePage("#Home", {
                    transition: "slide",
                    reverse: false,
                });
            }
            return;
        }

        // check AUTHENTICATION
        if(userToken)
        {
            registerPushManager();

            jQuery.mobile.changePage("#"+target, {
                transition: "slide",
                reverse: false,
            });
            return ;
        }
        else
        {
            jQuery.mobile.changePage("#Login", {
                transition: "slide",
                reverse: false,
            });
            return ;
        }

    }
    else
    {
        console.log("Storage not supported");
    }
});

// LOGIN
$('#frmLogin').on('submit', function(e){
    e.preventDefault();
    var data = $('#frmLogin').serialize();
    $.ajax({
        type: "POST",
        url: API_URL + "/authenticate",
        data: data,
        success: function(data){
            if(data.success)
            {
                if(window.indexedDB)
                {

                }
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
        error: function(xhr, options, error){
            new $.nd2Toast({
                message: "Error occurred! " + error,
                ttl: 3000
            });
            $('.nd2-toast').addClass('alert-danger');
        }
    })
});
