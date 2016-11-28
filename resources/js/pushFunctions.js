//checkSubscription

function checkSubscription() {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.getSubscription().then(
        function(pushSubscription) {
          if(pushSubscription) {
          	console.log("Push Subscription exists");
            //Send subscription to application server
            sendSub(pushSubscription);
 
            //Manage interface
            pushStatus = true;
            //document.getElementById("pushStatus").checked = true;
            //document.getElementById("pushStatusMsg").innerHTML = '<span>You are subscribed!</span>';
          }
          else {
          	console.log("Push Subscription not existing");
            subscribePush();
          	//Manage interface
            pushStatus = false;
            //document.getElementById("pushStatus").checked = false;
            //document.getElementById("pushStatusMsg").innerHTML = '<span>You are not subscribed!</span>';
          }
        }.bind(this)).catch(function(e) {
          console.error('Error getting subscription', e);
        });
    });
  }



//subscribePush

function subscribePush() {
	  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
	    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
	      .then(function(pushSubscription) {
	        /*
		var subId = pushSubscription.endpoint;	
		subId = subId.split("/").pop();
		localStorage.setItem("ajdlkadj", subId);
		*/
		//Store this subscription on application server
	        sendSub(pushSubscription);
	        
	        //Update status of interface
	        //document.getElementById("pushStatus").checked = true;
	        //document.getElementById("pushStatusMsg").innerHTML = '<span>You are subscribed!</span>';
	        pushStatus = true;
	        return true;
	      })
	      .catch(function(e) {
	        console.error('Unable to register push subscription', e);
	        return false;
	      });
	  });
	}

//unsubribePush

function unsubscribePush() {
	  console.log('unsubscribing...');
	  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
	 
	    serviceWorkerRegistration.pushManager.getSubscription().then(  
	      function(pushSubscription) {  
	        // Check we have a subscription to unsubscribe  
	        if (!pushSubscription) {  
	          // Nothing to unsubscribe, set checkboox interface unchecked...
	          document.getElementById("pushStatus").checked = false;
	          document.getElementById("pushStatusMsg").innerHTML = '<span>You are not subscribed!</span>';
	          pushStatus = false;
	          return;  
	        }  
	 
	        // We have a subscription, so remove it from applications server...
	        cancelSub(pushSubscription);
	 
	        //... and unsubscribe it
	        pushSubscription.unsubscribe().then(function() {  
	          //User unchecked the checkbox, but let's make sure
	          document.getElementById("pushStatus").checked = false;
	          document.getElementById("pushStatusMsg").innerHTML = '<span>You are not subscribed!</span>';
	          pushStatus = false;
	        }).catch(function(e) {  
	          console.log('Error unsubscribing: ', e);  
	        });  
	      }).catch(function(e) {  
	        console.error('Error unsubscribing.', e);  
	      });  
	  });  
	}


// sendSub


function sendSub(pushSubscription) {
	
	var subId = pushSubscription.endpoint;	
	subId = subId.split("/").pop();
	console.log(subId);
	
	
	// TODO: Server Route implementieren
  fetch("http://localhost:3000/api/subscribe/"+subId, { 'mode': 'cors' }).then(function(res) {
	  console.log(res);
    res.json().then(function(data) {
      // Log the data for illustration
      console.log(data);
    });
  });
}


//cancelSub

function cancelSub(pushSubscription) {
	  const endPoint = pushSubscription.endpoint.slice(pushSubscription.endpoint.lastIndexOf('/')+1);
	  fetch("https://android.googleapis.com/unsubscribe/"+endpoint).then(function(res) {
	    res.json().then(function(data) {
	      console.log(data);
	    });
	  });
	}
