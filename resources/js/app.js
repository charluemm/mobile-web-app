$(document).ready(function(){
    $('#btn-fab-add-task').on('click', function(){
        $('div[data-tab="tasks"]').html('<nd2-include data-src="fragments/form.task.add.html"></nd2-include>');
        $('#page1').trigger('pagecreate');
    });
});
