/**
 * file to configure service worker
 *
 * @author Michael Mueller <development@reu-network.de>
 */
var VERSION = 'v24';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll([
                '/',
                '/vendor/',

                '/vendor/nativedroid2/',
                '/vendor/nativedroid2/css/',
                '/vendor/nativedroid2/css/nativedroid2.css',
                '/vendor/nativedroid2/css/nativedroid2.color.blue-grey.css',
                '/vendor/nativedroid2/css/nativedroid2.color.teal.css',
                '/vendor/nativedroid2/css/flexboxgrid.min.css',
                '/vendor/nativedroid2/css/material-design-iconic-font.min.css',
                '/vendor/nativedroid2/fonts/',
                '/vendor/nativedroid2/fonts/Material-Design-Iconic-Font.eot',
                '/vendor/nativedroid2/fonts/Material-Design-Iconic-Font.svg',
                '/vendor/nativedroid2/fonts/Material-Design-Iconic-Font.ttf?v=2.0.0',
                '/vendor/nativedroid2/fonts/Material-Design-Iconic-Font.woff?v=2.0.0',
                '/vendor/nativedroid2/js/',
                '/vendor/nativedroid2/js/nativedroid2.js',

                '/vendor/font-awesome/',
                '/vendor/font-awesome/css/',
                '/vendor/font-awesome/css/font-awesome.min.css',
                '/vendor/font-awesome/fonts/',
                '/vendor/font-awesome/fonts/FontAwesome.otf',
                '/vendor/font-awesome/fonts/fontawesome-webfont.eot',
                '/vendor/font-awesome/fonts/fontawesome-webfont.svg',
                '/vendor/font-awesome/fonts/fontawesome-webfont.ttf?v=4.6.3',
                '/vendor/font-awesome/fonts/fontawesome-webfont.woff?v=4.6.3',
                '/vendor/font-awesome/fonts/fontawesome-webfont.woff2?v=4.6.3',

                '/vendor/jquery/',
                '/vendor/jquery/jquery-3.1.1.min.js',

                '/vendor/jquery/jquery-migrate-3.0.0.js',
                '/vendor/jquery-mobile/',
                '/vendor/jquery-mobile/jquery.mobile-1.4.5.min.js',
                '/vendor/jquery-mobile/jquery.mobile-1.4.5.min.css',
                '/vendor/jquery-mobile/images/',

                '/vendor/jquery-mobile/images/ajax-loader.gif',
                '/vendor/jquery-ui/',
                '/vendor/jquery-ui/images/',
                '/vendor/jquery-ui/jquery-ui.min.js',

                '/vendor/jquery-ui/jquery-ui.min.css',
                '/vendor/waves/',
                '/vendor/waves/waves.min.js',
                '/vendor/waves/waves.min.js.map',
                '/vendor/waves/waves.min.css',

                '/vendor/wow/',
                '/vendor/wow/animate.css',
                '/vendor/wow/wow.min.js',

                '/config/',
                '/config/nd2settings.js',
                '/fragments/',
                '/fragments/bottom.sheet.html',
                '/fragments/panel.left.html',
                '/fragments/page.home.html',
                '/fragments/page.login.html',
                '/fragments/page.register.html',
                '/fragments/page.task.add.html',

                '/resources/',
                '/resources/css/',
                '/resources/css/style.css',
                '/resources/img/',
                '/resources/img/examples/',
                '/resources/img/examples/card_bg_1.jpg',
                '/resources/img/examples/card_bg_2.jpg',
                '/resources/img/examples/card_bg_3.jpg',
                '/resources/img/examples/card_thumb_1.jpg',
                '/resources/img/examples/card_thumb_2.jpg',
                '/resources/img/examples/card_thumb_3.jpg',

                '/resources/js/',
                '/resources/js/app.js',
                '/manifest.json',
                '/index.php'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    var response;
    event.respondWith(caches.match(event.request).catch(function() {
        return fetch(event.request);
    }).then(function(r) {
        response = r;
        caches.open(VERSION).then(function(cache) {
            cache.put(event.request, response);
        });
        return response.clone();
    }).catch(function() {
        // TODO: Fallback
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
    }));
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
