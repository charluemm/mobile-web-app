/**
 * file to configure service worker
 *
 * @author Michael Mueller <development@reu-network.de>
 */
var VERSION = 'v25';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll([
                '/task-notification/',
                '/task-notification/vendor/',

                '/task-notification/vendor/nativedroid2/',
                '/task-notification/vendor/nativedroid2/css/',
                '/task-notification/vendor/nativedroid2/css/nativedroid2.css',
                '/task-notification/vendor/nativedroid2/css/nativedroid2.color.blue-grey.css',
                '/task-notification/vendor/nativedroid2/css/nativedroid2.color.teal.css',
                '/task-notification/vendor/nativedroid2/css/flexboxgrid.min.css',
                '/task-notification/vendor/nativedroid2/css/material-design-iconic-font.min.css',
                '/task-notification/vendor/nativedroid2/fonts/',
                '/task-notification/vendor/nativedroid2/fonts/Material-Design-Iconic-Font.eot',
                '/task-notification/vendor/nativedroid2/fonts/Material-Design-Iconic-Font.svg',
                '/task-notification/vendor/nativedroid2/fonts/Material-Design-Iconic-Font.ttf?v=2.0.0',
                '/task-notification/vendor/nativedroid2/fonts/Material-Design-Iconic-Font.woff?v=2.0.0',
                '/task-notification/vendor/nativedroid2/js/',
                '/task-notification/vendor/nativedroid2/js/nativedroid2.js',

                '/task-notification/vendor/font-awesome/',
                '/task-notification/vendor/font-awesome/css/',
                '/task-notification/vendor/font-awesome/css/font-awesome.min.css',
                '/task-notification/vendor/font-awesome/fonts/',
                '/task-notification/vendor/font-awesome/fonts/FontAwesome.otf',
                '/task-notification/vendor/font-awesome/fonts/fontawesome-webfont.eot',
                '/task-notification/vendor/font-awesome/fonts/fontawesome-webfont.svg',
                '/task-notification/vendor/font-awesome/fonts/fontawesome-webfont.ttf?v=4.6.3',
                '/task-notification/vendor/font-awesome/fonts/fontawesome-webfont.woff?v=4.6.3',
                '/task-notification/vendor/font-awesome/fonts/fontawesome-webfont.woff2?v=4.6.3',

                '/task-notification/vendor/jquery/',
                '/task-notification/vendor/jquery/jquery-3.1.1.min.js',

                '/task-notification/vendor/jquery/jquery-migrate-3.0.0.js',
                '/task-notification/vendor/jquery-mobile/',
                '/task-notification/vendor/jquery-mobile/jquery.mobile-1.4.5.min.js',
                '/task-notification/vendor/jquery-mobile/jquery.mobile-1.4.5.min.css',
                '/task-notification/vendor/jquery-mobile/images/',

                '/task-notification/vendor/jquery-mobile/images/ajax-loader.gif',
                '/task-notification/vendor/jquery-ui/',
                '/task-notification/vendor/jquery-ui/images/',
                '/task-notification/vendor/jquery-ui/jquery-ui.min.js',

                '/task-notification/vendor/jquery-ui/jquery-ui.min.css',
                '/task-notification/vendor/waves/',
                '/task-notification/vendor/waves/waves.min.js',
                '/task-notification/vendor/waves/waves.min.js.map',
                '/task-notification/vendor/waves/waves.min.css',

                '/task-notification/vendor/wow/',
                '/task-notification/vendor/wow/animate.css',
                '/task-notification/vendor/wow/wow.min.js',

                '/task-notification/config/',
                '/task-notification/config/nd2settings.js',
                '/task-notification/fragments/',
                '/task-notification/fragments/bottom.sheet.html',
                '/task-notification/fragments/panel.left.html',
                '/task-notification/fragments/page.home.html',
                '/task-notification/fragments/page.login.html',
                '/task-notification/fragments/page.register.html',
                '/task-notification/fragments/page.task.add.html',

                '/task-notification/resources/',
                '/task-notification/resources/css/',
                '/task-notification/resources/css/style.css',
                '/task-notification/resources/img/',
                '/task-notification/resources/img/examples/',
                '/task-notification/resources/img/examples/card_bg_1.jpg',
                '/task-notification/resources/img/examples/card_bg_2.jpg',
                '/task-notification/resources/img/examples/card_bg_3.jpg',
                '/task-notification/resources/img/examples/card_thumb_1.jpg',
                '/task-notification/resources/img/examples/card_thumb_2.jpg',
                '/task-notification/resources/img/examples/card_thumb_3.jpg',

                '/task-notification/resources/js/',
                '/task-notification/resources/js/app.js',
                '/task-notification/manifest.json',
                '/task-notification/index.php'
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
            if(typeof response == 'Response')
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
