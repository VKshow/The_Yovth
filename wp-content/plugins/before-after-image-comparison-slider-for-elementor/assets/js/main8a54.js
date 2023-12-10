"use strict";

jQuery(function ($) {
    var resizing = false;

    $(window).on("load resize", function () {
        if (!resizing) {
            resizing = true;
            $(window).trigger("resize");
            resizing = false;
        }
    });

    $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addAction("frontend/element_ready/wb-before-after-image-slider-elementor.default", function (e, t) {
            var $element = $(e),
                beforeText = $element.find(".before_text").text(),
                afterText = $element.find(".after_text").text();

            $element.find(".wb_ebais_twentytwenty_container").twentytwenty({
                before_label: beforeText,
                after_label: afterText
            });
        });
    });

    $(window).on("scroll", function () {
        $(".wb_ebais_twentytwenty_container").each(function () {
            if ($(this).wbebaic_isInViewport()) {
                if (!resizing) {
                    resizing = true;
                    $(window).trigger("resize");
                    resizing = false;
                }
            }
        });
    });

    $.fn.wbebaic_isInViewport = function () {
        var elementTop = $(this).offset().top,
            elementBottom = elementTop + $(this).outerHeight(),
            viewportTop = $(window).scrollTop(),
            viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
});
