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


// LOGIN
$('#submit-login').on('click', function(e){
    e.preventDefault();
    var data = $('#frmLogin').serialize();
    $.ajax({
        type: "POST",
        // TODO: load URL from config
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