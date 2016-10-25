
$(document).ready(function(){
    $('#btn-fab-add-task').on('click touchstart', function(e){
        e.preventDefault();
        console.log("clicked");
        $('div[data-tab="tasks"]').html('<nd2-include data-src="fragments/form.task.add.html"></nd2-include>');
        $('#page1').trigger('pagecreate');
       // $.mobile.loadPage("fragments/form.task.add.html", $('div[data-tab="tasks"]'));
    });
});
