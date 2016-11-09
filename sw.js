/**
 * file to configure service worker
 *
 * @author Michael Mueller <development@reu-network.de>
 */
var VERSION = 'v43';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll([
                //'./',
                //'./vendor/',

                //'./vendor/nativedroid2/',
                // './vendor/nativedroid2/css/',
                './vendor/nativedroid2/css/nativedroid2.css',
                './vendor/nativedroid2/css/nativedroid2.color.blue-grey.css',
                './vendor/nativedroid2/css/nativedroid2.color.teal.css',
                './vendor/nativedroid2/css/flexboxgrid.min.css',
                './vendor/nativedroid2/css/material-design-iconic-font.min.css',
                //'./vendor/nativedroid2/fonts/',
                './vendor/nativedroid2/fonts/Material-Design-Iconic-Font.eot',
                './vendor/nativedroid2/fonts/Material-Design-Iconic-Font.svg',
                './vendor/nativedroid2/fonts/Material-Design-Iconic-Font.ttf?v=2.0.0',
                './vendor/nativedroid2/fonts/Material-Design-Iconic-Font.woff?v=2.0.0',
                //'./vendor/nativedroid2/js/',
                './vendor/nativedroid2/js/nativedroid2.js',

                //'./vendor/font-awesome/',
                //'./vendor/font-awesome/css/',
                './vendor/font-awesome/css/font-awesome.min.css',
                //'./vendor/font-awesome/fonts/',
                './vendor/font-awesome/fonts/FontAwesome.otf',
                './vendor/font-awesome/fonts/fontawesome-webfont.eot',
                './vendor/font-awesome/fonts/fontawesome-webfont.svg',
                './vendor/font-awesome/fonts/fontawesome-webfont.ttf?v=4.6.3',
                './vendor/font-awesome/fonts/fontawesome-webfont.woff?v=4.6.3',
                './vendor/font-awesome/fonts/fontawesome-webfont.woff2?v=4.6.3',

                //'./vendor/jquery/',
                './vendor/jquery/jquery-3.1.1.min.js',

                './vendor/jquery/jquery-migrate-3.0.0.js',
                //'./vendor/jquery-mobile/',
                './vendor/jquery-mobile/jquery.mobile-1.4.5.min.js',
                './vendor/jquery-mobile/jquery.mobile-1.4.5.min.css',
                //'./vendor/jquery-mobile/images/',

                './vendor/jquery-mobile/images/ajax-loader.gif',
                //'./vendor/jquery-ui/',
                //'./vendor/jquery-ui/images/',
                './vendor/jquery-ui/jquery-ui.min.js',

                './vendor/jquery-ui/jquery-ui.min.css',
                //'./vendor/waves/',
                './vendor/waves/waves.min.js',
                './vendor/waves/waves.min.js.map',
                './vendor/waves/waves.min.css',

                //'./vendor/wow/',
                './vendor/wow/animate.css',
                './vendor/wow/wow.min.js',

                //'./config/',
                './config/nd2settings.js',
                //'./fragments/',
                './fragments/bottom.sheet.html',
                './fragments/panel.left.html',
                './fragments/page.home.html',
                './fragments/page.login.html',
                './fragments/page.register.html',
                './fragments/page.task.add.html',

                //'./resources/',
                //'./resources/css/',
                './resources/css/style.css',
                //'./resources/fonts/',
                './resources/fonts/Roboto-Regular.ttf',
                //'./resources/img/',
                './resources/img/2.jpg',
                './resources/img/8.jpg',
                './resources/img/9.jpg',
                './resources/img/10.jpg',
                //'./resources/img/examples/',
                './resources/img/examples/card_bg_1.jpg',
                './resources/img/examples/card_bg_2.jpg',
                './resources/img/examples/card_bg_3.jpg',
                './resources/img/examples/card_thumb_1.jpg',
                './resources/img/examples/card_thumb_2.jpg',
                './resources/img/examples/card_thumb_3.jpg',

                //'./resources/js/',
                './resources/js/app.js',
                './manifest.json',
                './index.php'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {

    if (event.request.method !== 'GET') { return; }
    if (event.request.url.indexOf('http://localhost:3000/api') !== -1) { return; }

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                //Cache hit - return response
                if (response) {
                    return response;
                }

                //IMPORTANT: Clone the request. A request is a stream and
                //can only be consumed once. Since we are consuming this
                //once by cache and once by the browser for fetch, we need
                //to clone the response.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        //Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        //IMPORTANT: Clone the response. A response is a stream
                        //and because we want the browser to consume the response
                        //as well as the cache consuming the response, we need
                        //to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(VERSION)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
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
    );
});
