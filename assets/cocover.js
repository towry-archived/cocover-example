/*! cocover.js v0.1.0 | @copyright 2015 Towry Wang | @license MIT | http://github.com/towry/cocover.js */

(function (factory) {
    if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        window.cocover = factory({});

        if (typeof define === 'function' && define.amd) {
            define([], function () {
                return window.cocover;
            });
        }
    }
}(function (cocover) {
    var $ = window.jQuery;
    var cocoClass;
    var span = null;
    var alpha = 'abcdefghijklmnopqrstuvwxyz';
    alpha = alpha + alpha.toUpperCase();
    var number = '1234569890';

    function over (selector) {
        selector = $(selector);
        if (!selector.length) {
            return;
        }

        if (typeof cocoClass === 'undefined') {
            cocoClass = getClass();
        }
        cocover.cocoClass = cocover.cocoClass || cocoClass;

        selector.addClass(cocoClass);
        createSpan(selector);
        styleSpan();
    }

    function getClass (prefix) {
        if (!prefix) {
            prefix = 'c-';
        } else {
            prefix = prefix + '-';
        }

        var posibble = alpha + number;
        var length = posibble.length;
        for (var i = 0; i < 5; i++) {
            prefix += posibble.charAt(Math.floor(Math.random() * length));
        }

        return prefix;
    }

    function createSpan (a) {
        var o = span || $('<span class="' + cocoClass + '-span"></span>');
        var m, n;

        a.each(function (i, e) {
            m = $(e);
            if (m.css('position') === '' || m.css('position') == 'static') {
                m.css('position', 'relative');
            }
            n = o.clone();
            m.append(n);
        });
    }

    function styleSpan () {
        if ($("#" + cocoClass).length) {
            return;
        }

        var css = [
            '.' + cocoClass + '-span {',
            'position: absolute !important;',
            'display: block;',
            'z-index: 9999 !important;', 
            'width: 100%;',
            'height: 100%;',
            'top: 0;',
            'left: 0;', 
            'visibility: hidden !important', 
            '}'
        ]

        css = css.join('');

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute('id', cocoClass);
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            var node = document.createTextNode(css);
            style.appendChild(node);
        }

        head.appendChild(style);
    }

    function destroy (a) {
        if (!cocoClass) return;

        if (!a) {
            $('#' + cocoClass).remove();
            $('.' + cocoClass + '-span').remove();
            $('.' + cocoClass).removeClass(cocoClass);
        } else {
            a = $(a);
            a.removeClass(cocoClass);
            a.find('.' + cocoClass + '-span').remove();
        }
    }

    function start () {
        if (!cocoClass || $(document.head).find('#' + cocoClass + '-start').length) {
            return;
        }

        var css = '.' + cocoClass + '-span { visibility: visible !important; }';
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute('id', cocoClass + '-start');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }

    function stop () {
        $(document.head).find('#' + cocoClass + '-start').remove();
    }

    cocover.over = over;
    cocover.start = start;
    cocover.stop = stop;
    cocover.destroy = destroy;
    cocover.cocoClass = cocoClass || '';

    $.fn.cocover = function (m) {
        if (! (m in cocover) || typeof cocover[m] !== 'function') {
            return this;
        }

        if (m === 'over') {
            cocover.over(this);
        } 

        else if (m === 'destroy') {
            cocover.destroy(this);
        }
        
        else {
            cocover[m].call(cocover);
        }

        return this;
    }
    
    return cocover;
}));
