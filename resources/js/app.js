
$(document).ready(function(){
    $('#btn-fab-add-task').on('tap', function(){
        $('#page1').trigger('pagecreate');
        $.mobile.loadPage("fragments/form.task.add.html", $('div[data-tab="tasks"]'));
    });
});
