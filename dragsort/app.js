(function ($) {
    var items = $('.item');
    var beneath = null;
    var drag = null;

    items.draggable();

    items.hover(function () {
        if (drag) {
            beneath = $(this);
        }
        $(this).addClass('hover');

    }, function () {
        if (drag) {
            beneath = null;
        }
        $(this).removeClass('hover');
    });
    
    items.on('mousedown', function (e) {
        e.preventDefault();

        drag = $(this);
        drag.cocover('destroy').css('z-index', '999');
        drag.removeClass('hover');

        cocover.start();
    });


    $(document).on('mouseup', function (e) {
        if (!drag) {
            return;
        }

        drag.cocover('over').css('z-index', '');

        if (!beneath) {
            drag.attr('style', 'position: relative');
            return;
        }

        if (beneath.is(drag)) {
            drag.attr('style', 'position: relative');
            return;
        }

        if (beneath.index() < drag.index()) {
            // put drag in front of beneath
            beneath.before(drag);
        } else {
            beneath.after(drag);
        }

        // remove left right style
        // so it's can fit into the flow automatically
        drag.attr('style', 'position: relative');

        cocover.stop();
        drag = null;
        beneath = null;
    });

    // begin
    items.cocover('over');
}(jQuery));
