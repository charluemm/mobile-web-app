/**
 * file to configure service worker
 *
 * @author Michael Mueller <development@reu-network.de>
 */

var API_URL = "http://localhost:3000/api";
var PUSH_URL = "http://localhost:3000/push";
var VERSION = 'v58';

this.addEventListener('install', function(event) {
    console.log('The service worker is being installed.');
    event.waitUntil(precache()
        .then(function(){
            return self.skipWaiting();
        })
    );
});

this.addEventListener('fetch', function(event) {
    console.log('The service worker is serving the asset.');

    // if (event.request.method !== 'GET') { return; }
    if (event.request.url.indexOf(API_URL) !== -1) { return; }

    event.respondWith(
        // try to return request from network
        fetch(event.request.url).catch(function(){
            // if fails, try to return request from cache
            return caches.match(event.request).then(function(response){
                //Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                return response;
            })
        })
    );
        // caches.match(event.request)
        //     .then(function(response) {
        //         //Cache hit - return response
        //         if (response) {
        //             return response;
        //         }
        //         var fetchRequest = event.request.clone();
        //
        //         return fetch(fetchRequest).then(
        //             function(response) {
        //                 //Check if we received a valid response
        //                 if(!response || response.status !== 200 || response.type !== 'basic') {
        //                     return response;
        //                 }
        //                 var responseToCache = response.clone();
        //
        //                 caches.open(VERSION)
        //                     .then(function(cache) {
        //                         cache.put(event.request, responseToCache);
        //                     });
        //
        //                 return response;
        //             }
        //         );
        //     })
        // );
});

this.addEventListener('activate', function(event) {
    var cacheWhitelist = [VERSION];

    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    )
});

function precache(){
        return caches.open(VERSION).then(function(cache) {
            return cache.addAll([
                './vendor/nativedroid2/css/nativedroid2.color.blue-grey.css',
                './vendor/nativedroid2/css/nativedroid2.color.teal.css',
                './vendor/nativedroid2/css/flexboxgrid.min.css',
                './vendor/nativedroid2/css/material-design-iconic-font.min.css',
                './vendor/nativedroid2/fonts/Material-Design-Iconic-Font.eot',
                './vendor/nativedroid2/fonts/Material-Design-Iconic-Font.svg',
                './vendor/nativedroid2/fonts/Material-Design-Iconic-Font.ttf?v=2.0.0',
                './vendor/nativedroid2/fonts/Material-Design-Iconic-Font.woff?v=2.0.0',
                './vendor/nativedroid2/js/nativedroid2.js',
                './vendor/fingerprint2js/fingerprint2.js',

                './vendor/font-awesome/css/font-awesome.min.css',
                './vendor/font-awesome/fonts/FontAwesome.otf',
                './vendor/font-awesome/fonts/fontawesome-webfont.eot',
                './vendor/font-awesome/fonts/fontawesome-webfont.svg',
                './vendor/font-awesome/fonts/fontawesome-webfont.ttf?v=4.6.3',
                './vendor/font-awesome/fonts/fontawesome-webfont.woff?v=4.6.3',
                './vendor/font-awesome/fonts/fontawesome-webfont.woff2?v=4.6.3',

                './vendor/jquery/jquery-3.1.1.min.js',
                './vendor/jquery/jquery-migrate-3.0.0.js',
                './vendor/jquery-mobile/jquery.mobile-1.4.5.min.js',
                './vendor/jquery-mobile/jquery.mobile-1.4.5.min.css',
                './vendor/jquery-mobile/images/ajax-loader.gif',
                './vendor/jquery-ui/jquery-ui.min.js',
                './vendor/jquery-ui/jquery-ui.min.css',
                './vendor/jquery-validate/jquery.validate.min.js',

                './vendor/waves/waves.min.js',
                './vendor/waves/waves.min.js.map',
                './vendor/waves/waves.min.css',

                './vendor/wow/animate.css',
                './vendor/wow/wow.min.js',

                './vendor/idb/',
                './vendor/idb/lib/',
                './vendor/idb/lib/idb.js',

                './config/nd2settings.js',
                './fragments/bottom.sheet.html',
                './fragments/panel.left.html',
                './fragments/page.home.html',
                './fragments/page.login.html',
                './fragments/page.register.html',
                './fragments/page.task.add.html',

                './resources/css/style.css',
                './resources/fonts/Roboto-Regular.ttf',
                './resources/img/2.jpg',
                './resources/img/8.jpg',
                './resources/img/9.jpg',
                './resources/img/10.jpg',
                './resources/img/examples/card_bg_1.jpg',
                './resources/img/examples/card_bg_2.jpg',
                './resources/img/examples/card_bg_3.jpg',
                './resources/img/examples/card_thumb_1.jpg',
                './resources/img/examples/card_thumb_2.jpg',
                './resources/img/examples/card_thumb_3.jpg',

                './resources/js/app.js',
                './resources/js/pushFunctions.js',
                './resources/js/validation.js',
                './resources/js/home.js',
                './manifest.json',
                './index.php',
                './'
            ]);
        });
}

function getEndpoint() {
    return self.registration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription.endpoint;
            }

            throw new Error('User not subscribed');
        });
}
// @author DavidHowon
// Push Message with Icon and redirect to Google.de
self.addEventListener('push', function(event) {
    console.log('Push message', event);

    event.waitUntil(getEndpoint().then(function(endpoint){
        var subId = endpoint.split("/").pop();
        var request = new Request(PUSH_URL + "/getPayload/"+subId, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow'
        });
        return fetch(request);
    }).then(function(res) {
        res.json().then(function(data){
            if(data.type == "update")
            {

            }
            else
            {
                // Show notification
                self.registration.showNotification(data.title, {
                        'body': data.body,
                        'icon': data.icon
                });
            }
            console.log(data);
        })
        }));
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag', event.notification.tag);

    event.notification.close();
    var url = 'http://localhost/task-notification/#Home';

    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
            .then(function(windowClients) {
                console.log('WindowClients', windowClients);
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    console.log('WindowClient', client);
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});
