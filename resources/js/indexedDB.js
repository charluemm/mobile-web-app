/**
 * file to configure and handle indexDB
 *
 * @author Michael Mueller <s147105@hft-leipzig.de>
 * @author David Howon <s147102@hft-leipzig.de>
 */

// configure indexDB
// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
function updateTasks(collection)
{
       var db = idb.open('TaskyAppState', 1, function(upgradeDb) {
           const tasks = upgradeDb.createObjectStore('tasks', {
               keyPath: '_id'
           });

           // 2. Open a new read/write transaction with the store within the database
           const transaction = db.transaction('tasks', 'readwrite');
           const store = transaction.objectStore('tasks');

           // 3. Add the data to the store
           collection.forEach(function (entry) {
               console.log('item:', entry);
               store.put(entry);
           });

           // 4. Complete the transaction
           return transaction.complete;
       })
}
