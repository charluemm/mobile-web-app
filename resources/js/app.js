
$(document).ready(function(){
    $('#btn-fab-add-task').on('tap', function(){
        $('div[data-tab="tasks"]').load("fragments/form.task.add.html");

        $(document).trigger("createinclude");
    });
});

function renderFragment(fragment)
{
    var el = this.element;
    var opts = $.extend(this.options, el.data("options"));
    $(document).trigger("createinclude");

    if (opts.src !== null) {
        el.load(opts.src, function() {
            el.enhanceWithin();

            // Apply waves.js
            if (typeof Waves !== "undefined") {
                Waves.attach('a', ['waves-button']);
                Waves.attach('button', ['waves-button']);
                Waves.init();

                $("body").find(".ui-flipswitch-on").removeClass("waves-effect");
                Waves.attach('.ui-flipswitch', ['waves-button', 'waves-light']);

            }

        });
    }
}