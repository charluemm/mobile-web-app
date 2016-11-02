/**
 * register service worker
 *
 * @author Michael Mueller <development@reu-network.de>
 */
if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('/task-notification/sw.js', { scope: '/task-notification/' }).then(function(reg) {

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
