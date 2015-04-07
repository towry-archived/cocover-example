(function ($) {
    var items = $('.item');
    var spans = $('.cococlass-span');

    var beneath = null;
    var drag = null;

    items.draggable();

    $('.list').on('mouseenter mouseleave', '.cococlass-span', function (e) {
        var a = $(this).closest('.item');
        if (e.type === 'mouseenter') {
            a.addClass('hover');
            if (drag) {
                beneath = a;
            }
        } else {
            a.removeClass('hover');
            if (drag) {
                beneath = null;
            }
        }
    })

    function mousedownHandler (e) {
        e.preventDefault();

        drag = $(this);
        drag.css('z-index', '999').find('.cococlass-span').css('display', 'none');
        drag.removeClass('hover');

        cocover.start();
    }
    $(".list").on('mousedown', '.item', mousedownHandler);


    $(document).on('mouseup', function (e) {
        cocover.stop();
        if (!drag) {
            return;
        }

        drag.css('z-index', '').find('.cococlass-span').css('display', '');

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

        drag = null;
        beneath = null;
    });

    // begin
    items.cocover('over', {cocoClass: 'cococlass'});
}(jQuery));
