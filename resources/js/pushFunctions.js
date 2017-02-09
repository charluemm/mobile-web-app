var PUSH_URL = "http://localhost:3000/push";

// /checkSubscription
function checkSubscription() {
	navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.getSubscription().then(
        function(pushSubscription) {
            if(pushSubscription)
            {
				console.log("Push Subscription exists");
				// send subscription to application server
				sendSub(pushSubscription);
			}
			else
			{
				console.log("Push Subscription not existing");
				// create subscription
				subscribePush();
          	}
        }.bind(this)).catch(function(e) {
          console.error('Error getting subscription', e);
        });
    });
  }

/**
 * Subscribe push
 *
 * - creates push manager subscription
 * - sends subscription to application server
 */
function subscribePush() {
	  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
	    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
	      .then(function(pushSubscription) {
             //Store this subscription on application server
            sendSub(pushSubscription);
            return true;
	      })
	      .catch(function(e) {
	        console.error('Unable to register push subscription', e);
	        return false;
	      });
	  });
	}

/**
 * unsubscribe push
 *
 * - unsubscribe push manager
 * - remove subscription from application server
 */
function unsubscribePush() {
	  console.log('unsubscribing...');
	  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {

	    serviceWorkerRegistration.pushManager.getSubscription()
			.then(
			  function(pushSubscription) {
				// We have a subscription, so remove it from applications server...
				cancelSub(pushSubscription);
				//... and unsubscribe it
				pushSubscription.unsubscribe().then(function() {}).catch(function(e) {
				  console.log('Error unsubscribing: ', e);
				});
			  })
			.catch(function(e) {
	        	console.error('Error unsubscribing.', e);
	      	});
	  });  
	}

/**
 * send Subscription to application server
 */
function sendSub(pushSubscription) {
	var deviceId = localStorage.getItem('deviceId');
	var deviceName = "Hier wird iwann der Username stehen";
    var subId = pushSubscription.endpoint;
    subId = subId.split("/").pop();

    fetch(PUSH_URL + "/devices/", {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "deviceName="+deviceName+"&deviceId="+deviceId+"&registrationId="+subId,
    })
		.then(function(res) {
		  console.log(res);
		  res.json()
			  .then(function(data) {
				  // Log the data for illustration
				  console.log(data);
			});
  });
}
/**
 * cancel subscription
 *
 * - remove subscription from application server
 */
function cancelSub(pushSubscription) {
	  const endPoint = pushSubscription.endpoint.slice(pushSubscription.endpoint.lastIndexOf('/') + 1);
	  fetch(PUSH_URL + "/unsubscribe/"+endpoint).then(function(res) {
	    res.json().then(function(data) {
	      console.log(data);
	    });
	  });
	}
