/**
 * handle home ui interaction
 *
 * @author Michael Mueller <development@reu-network.de>
 * @author David Howon <maestroderjoker@googlemail.com>
 */

var API_URL = "http://localhost:3000/api";

$(document).on("pagecreate", "#Home", function () {
   //navigator.serviceWorker.ready.then(reload);
return ;
    if (typeof(Storage) !== "undefined")
    {
        var userToken = localStorage.getItem("auth-token");
        $.ajax({
            type: "GET",
            url: API_URL + "/tasks",
            data: { 'token': userToken },
            success: function(data){
                console.log(data);
                if(data)
                {
                    $.each(data, function(index, element){
                        console.log("aufgabe "+index+": ", element);
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
                if(xhr.status == 403)
                {
                    new $.nd2Toast({
                        message: "Authentifizierung fehlgeschlagen! " + error,
                        ttl: 3000
                    });
                    $('.nd2-toast').addClass('alert-danger');
                    localStorage.removeItem("auth-token");
                }
                else if(xhr.status == 0)
                {
                    new $.nd2Toast({
                        message: "Überprüfen Sie Ihre Netzwerkverbindung. " + error,
                        ttl: 3000
                    });
                    $('.nd2-toast').addClass('alert-danger');
                }
                else
                {
                    new $.nd2Toast({
                        message: "Error occurred! " + error,
                        ttl: 3000
                    });
                    $('.nd2-toast').addClass('alert-danger');
                }
            }
        })
    }
    else
    {
        console.log("Storage not supported");
    }
});