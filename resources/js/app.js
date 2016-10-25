$(document).ready(function(){
    $('#btn-fab-add-task').on('vclick', function(e, ui){
        e.preventDefault();
        $(this).text("haha");
        $('div[data-tab="tasks"]').html('<nd2-include data-src="fragments/form.task.add.html"></nd2-include>');
        $('#page1').trigger('pagecreate');
    });
});
