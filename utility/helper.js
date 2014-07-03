var noOfShares = 0;

function generateRandomDate(state) {
    if (state === 1) {
        var dayStart = _.random(1, 15);
        var monthStart = _.random(1, 6);
        return new XDate(2013, monthStart, dayStart);
    }
    else {
        var dayEnd = _.random(15, 25);
        var monthEnd = _.random(6, 12);
        return new XDate(2013, monthEnd, dayEnd);
    }
}

function globalShortThis(name, isClass) {
    setTimeout(function () {
        $(isClass ? "." : "#" + name).shorten({ showChars: 130 });
    }, 50);
}

function globalFocusOnTextArea(name) {
    setTimeout(function () {
        var textarea = $(name);
        var val = textarea.val();
        textarea.focus().val("").val(val).scrollTop(textarea[0].scrollHeight - textarea.height());
    }, 50);
}

function adjustTooltip(elemId, tooltipTrigger) {

    tooltipAdjustments();

    // Left TO DO: refactor this, optimize code make it like one function to rule them all.
    function tooltipAdjustments() {
        switch (tooltipTrigger) {
            case "embed-share-tute":
                adjustTooltipForEmbed();
                break;
            case "initial-share-tute":
                adjustTooltipAfterEmbed();
                break;
            case "more-actions":
                adjustMoreActions();
                break;
            default:
                adjustShareTooltip();
                break;
        }
    }

    function adjustMoreActions() {
        setTimeout(function () {

            var windowHeight = $(window).height(),
                tooltip = $("#" + elemId + " .dashb-tooltip"),
                arrow = $("#" + elemId + " .dashb-tooltip-arrow"),
                tooltipMarginPadding = 22;
            var tooltipHeight = tooltip.height() + tooltipMarginPadding,
                tooltipOffset = tooltip.offset(),
                tooltipFarEnd = tooltipHeight + tooltipOffset.right,
                tooltipright = parseInt(tooltip.css("right").replace("px", "")),
                arrowright = parseInt(arrow.css("right").replace("px", "")),
                tooltipAdjust = 0,
                arrowAdjust = 0,
                adjustMargin = 20,
                tooltipAdjustMargin = 0;

            if (tooltipFarEnd > windowHeight) {

                // Adjustment distance
                tooltipAdjust = tooltipFarEnd - windowHeight;
                tooltipAdjustMargin = tooltipAdjust - tooltipright + adjustMargin;

                // Adjust tooltip
                tooltip.css("right", tooltipAdjustMargin * -1);

                // Adjust Arrow
                arrowAdjust = arrowright + tooltipAdjustMargin + tooltipright;
                arrow.css("right", arrowAdjust);

                tooltip.css("opacity", 1);
            } else {
                tooltip.css("transition", "0");
                var tooltiprightDrop = tooltipright - 20;
                tooltip.css("right", tooltiprightDrop - 12);
                tooltip.css("opacity", 0);
                setTimeout(function () {
                    tooltip.css("transition", "0.3s");
                    tooltip.css("right", tooltipright - 12);
                    tooltip.css("opacity", 1);
                }, 50);
            }

            if (tooltip[tooltip.length - 1].offsetLeft + tooltip.offset().left < 0) {
                tooltip.css('right', 'initial');
                tooltip.css('margin-left', '10px');


                // Adjust Arrow
                arrow.css("right", arrowright);
                arrow.css('right', tooltip[tooltip.length - 1].clientWidth);
                arrow.css("-webkit-transform", "rotate(180deg)");

            }

        }, 100);
    }

    function adjustTooltipForEmbed() {
        var tooltip = $("#" + elemId + " .dashb-tooltip");
        if (tooltip.offset() == undefined)
            return;
        var tooltipOffsetLeft = tooltip.offset().left;

        var arrow = $("#" + elemId + " .dashb-tooltip-arrow");
        var arrowOFfsetLeft = arrow.offset().left;
        var buttonsContainer = $(".dashb-share-icons");

        if (arrowOFfsetLeft > tooltipOffsetLeft) {
            tooltip.width(590);
            tooltip.offset({ left: tooltipOffsetLeft - 164 });

            buttonsContainer.css("margin-left", "12%");
            arrow.css("transition", "0");
            arrow.css("opacity", 0);
            arrow.offset({ left: arrowOFfsetLeft + 164 });
            arrow.css("opacity", 1);
        }
        else {
            tooltip.width(590);

            buttonsContainer.css("margin-left", "12%");
            arrow.css("transition", "0");
            arrow.css("opacity", 0);
            arrow.css("opacity", 1);
        }
    }

    function adjustTooltipAfterEmbed() {
        var tooltip = $("#" + elemId + " .dashb-tooltip");
        if (tooltip.offset() == undefined)
            return;
        var tooltipOffsetLeft = tooltip.offset().left;

        var arrow = $("#" + elemId + " .dashb-tooltip-arrow");
        var arrowOFfsetLeft = arrow.offset().left;
        var buttonsContainer = $(".dashb-share-icons");

        if (arrowOFfsetLeft > tooltipOffsetLeft) {
            tooltip.width(426);
            tooltip.offset({ left: tooltipOffsetLeft + 164 });
            buttonsContainer.css("margin-left", "0");
            arrow.css("transition", "0");
            arrow.css("opacity", 0);
            arrow.offset({ left: arrowOFfsetLeft - 164 });
            arrow.css("opacity", 1);
        }
        else {
            tooltip.width(426);
            buttonsContainer.css("margin-left", "0");
            arrow.css("transition", "0");
            arrow.css("opacity", 0);
            arrow.css("opacity", 1);
        }

    }

    function adjustShareTooltip() {
        var windowWidth = $(window).width();

        setTimeout(function () {
            //Get data for the tooltip Position, height, width and construct an object with all the specs
            //Left if,else in the case when we could use this function to show all the tooltips

            var tooltip = $("#" + elemId + " .dashb-tooltip");
            tooltip.width(426);

            var tooltipHeight = tooltip.height();
            var tooltipWidth = 426;
            var tooltipOffsetTop = tooltip.offset().top;
            var tooltipOffsetLeft = tooltip.offset().left;
            var tooltipObject = {
                tooltip: tooltip,
                tooltipHeight: tooltipHeight,
                tooltipWidth: tooltipWidth,
                tooltipOffsetTop: tooltipOffsetTop,
                tooltipOffsetLeft: tooltipOffsetLeft
            };

            var buttonsContainer = $(".dashb-share-icons");
            buttonsContainer.css("margin-left", "0");

            //Get data for the arrow position, height, width and construct an object with all the specs.
            var arrow = $("#" + elemId + " .dashb-tooltip-arrow");
            var arrowHeight = arrow.height();
            var arrowWidth = arrow.width();
            var arrowOffsetTop = arrow.offset().top;
            var arrowOFfsetLeft = arrow.offset().left;
            var arrowObject = {
                arrow: arrow,
                arrowHeight: arrowHeight,
                arrowWidth: arrowWidth,
                arrowOffsetTop: arrowOffsetTop,
                arrowOFfsetLeft: arrowOFfsetLeft
            };

            //for the explore feature, we have to look in the first children of the tooltip's parent(which is actualy the whole bar that contains both the share button and the play button, thus, we must find the share button to point at it)
            if (tooltipTrigger == "explore-share-tute") {
                var sourceNode = $($(tooltip[0]).offsetParent().children()[0]);
            }
            else if (tooltipTrigger == "reader-share-tute") {
                var sourceNode = $($("#" + elemId).children()[0]);
            }
            else {
                var sourceNode = $(tooltip[0]).offsetParent();
            }

            var sourceHeight = sourceNode.height();
            var sourceWidth = sourceNode.width();
            var sourceOffsetTop = sourceNode.offset().top;
            var sourceOffsetLeft = sourceNode.offset().left;
            var sourceObject = {
                sourceNode: sourceNode,
                sourceHeight: sourceHeight,
                sourceWidth: sourceWidth,
                sourceOffsetTop: sourceOffsetTop,
                sourceOffsetLeft: sourceOffsetLeft,
            };

            //logic to decide where to position it
            if (sourceOffsetTop < 20) {
                positionToBottom(tooltipObject, arrowObject, sourceObject);
            }
            else if ((sourceOffsetLeft - tooltipWidth) > 0) {
                positionToLeft(tooltipObject, arrowObject, sourceObject);
            }
            else if ((windowWidth - sourceOffsetLeft - sourceWidth) >= tooltipWidth) {
                positionToRight(tooltipObject, arrowObject, sourceObject);
            }
        }, 1);
    }

    function positionToBottom(tooltipObject, arrowObject, sourceObject) {
        var arrow_valForTop = sourceObject.sourceOffsetTop + sourceObject.sourceHeight;
        var arrow_valForDrop = arrow_valForTop - 10;
        var arrow_valForLeft = sourceObject.sourceOffsetLeft + (sourceObject.sourceWidth / 2);

        var tooltip_valForTop = arrow_valForTop + 7;
        var tooltip_valForDrop = tooltip_valForTop - 20;
        var tooltip_valForLeft = (sourceObject.sourceOffsetLeft + sourceObject.sourceWidth + 15) - tooltipObject.tooltipWidth;

        tooltipObject.tooltip.offset({ left: noOfShares != 0 && $(window).width() < 1520 ? tooltip_valForLeft + 82 : tooltip_valForLeft, top: tooltip_valForDrop });
        tooltipObject.tooltip.css("transition", "0");
        tooltipObject.tooltip.css("opacity", "0");

        if ($(window).width() < 1520 & noOfShares == 0) {
            arrowObject.arrow.offset({ left: arrow_valForLeft + 75, top: arrow_valForDrop - 11 });
        }
        if ($(window).width() < 1520 && noOfShares != 0) {
            arrowObject.arrow.offset({ left: arrow_valForLeft - 11, top: arrow_valForDrop + 8 });
        }
        if ($(window).width() > 1520) {
            arrowObject.arrow.offset({ left: arrow_valForLeft - 3, top: arrow_valForDrop });
        }
        arrowObject.arrow.css("transition", "0");
        arrowObject.arrow.css("opacity", "0");
        arrowObject.arrow.css("-webkit-transform", "rotate(270deg)");
        arrowObject.arrow.css("-moz-transform", "rotate(270deg)");


        setTimeout(function () {
            tooltipObject.tooltip.css("transition", "0.3s");
            tooltipObject.tooltip.offset({ top: $(window).width() < 1520 ? tooltip_valForTop - 5 : tooltip_valForTop });
            tooltipObject.tooltip.css("opacity", 1);
            tooltipObject.tooltip.css("width", tooltipObject.tooltip.width() + 3);

            arrowObject.arrow.css("transition", "0.3s");
            if ($(window).width() < 1520 & noOfShares == 0) {
                arrowObject.arrow.offset({ top: arrow_valForTop - 26 });
            }
            if ($(window).width() < 1520 && noOfShares != 0) {
                arrowObject.arrow.offset({ top: arrow_valForTop - 18 });
            }
            if ($(window).width() > 1520) {
                arrowObject.arrow.offset({ top: arrow_valForTop - 22 });
            }
            arrowObject.arrow.css("opacity", 1);
            noOfShares = noOfShares + 1;
        }, 50);
    }

    function positionToLeft(tooltipObject, arrowObject, sourceObject) {
        var tooltip_valForLeft = sourceObject.sourceOffsetLeft - tooltipObject.tooltipWidth;
        var tooltip_valForDrop = tooltip_valForLeft + 50;
        var tooltip_valForTop = (sourceObject.sourceOffsetTop + (sourceObject.sourceHeight / 2)) - (tooltipObject.tooltipHeight / 2);

        var arrow_valForLeft = tooltip_valForLeft + tooltipObject.tooltipWidth;
        var arrow_valForTop = sourceObject.sourceOffsetTop + (sourceObject.sourceHeight / 2);
        var arrow_valForDrop = arrow_valForLeft + 50;


        tooltipObject.tooltip.offset({ left: tooltip_valForDrop, top: tooltip_valForTop });
        tooltipObject.tooltip.css("transition", "0");
        tooltipObject.tooltip.css("opacity", 0);

        arrowObject.arrow.offset({ left: arrow_valForDrop, top: arrow_valForTop });
        arrowObject.arrow.css("transition", "0");
        arrowObject.arrow.css("opacity", 0);


        setTimeout(function () {
            tooltipObject.tooltip.css("transition", "0.3s");
            tooltipObject.tooltip.offset({ left: (tooltip_valForLeft - 30) });
            tooltipObject.tooltip.css("opacity", 1);

            arrowObject.arrow.css("transition", "0.3s");
            arrowObject.arrow.offset({ left: (arrow_valForDrop + 21) });
            arrowObject.arrow.css("opacity", 1);
        }, 50);
    }

    function positionToRight(tooltipObject, arrowObject, sourceObject) {
        var tooltip_valForLeft = sourceObject.sourceOffsetLeft + sourceObject.sourceWidth + arrowObject.arrowWidth;
        var tooltip_valForTop = (sourceObject.sourceOffsetTop + (sourceObject.sourceHeight / 2)) - (tooltipObject.tooltipHeight / 2);
        var tooltip_valForDrop = tooltip_valForLeft - 50;

        var arrow_valForLeft = sourceObject.sourceOffsetLeft + sourceObject.sourceWidth;
        var arrow_valForTop = sourceObject.sourceOffsetTop + (sourceObject.sourceHeight / 2);
        var arrow_valForDrop = arrow_valForLeft;

        tooltipObject.tooltip.offset({ left: tooltip_valForDrop, top: tooltip_valForTop });
        tooltipObject.tooltip.css("transition", "0");
        tooltipObject.tooltip.css("opacity", 0);

        arrowObject.arrow.offset({ left: arrow_valForDrop, top: arrow_valForTop });
        arrowObject.arrow.css("transition", "0");
        arrowObject.arrow.css("opacity", 0);
        arrowObject.arrow.css("-webkit-transform", "rotate(180deg)");

        setTimeout(function () {
            tooltipObject.tooltip.css("transition", "0.3s");
            tooltipObject.tooltip.offset({ left: tooltip_valForLeft });
            tooltipObject.tooltip.css("opacity", 1);

            arrowObject.arrow.css("transition", "0.3s");
            arrowObject.arrow.offset({ left: arrow_valForLeft - 49 });
            arrowObject.arrow.css("opacity", 1);
        }, 50);
    }
}

function injectService(serviceName) {
    var injector = angular.element(document.getElementById('app')).injector();
    return injector.get(serviceName);
}

function extractTimespan(totalSec) {

    totalSec = Math.floor(totalSec);
    var hours = parseInt(totalSec / 3600) % 24;
    var minutes = parseInt(totalSec / 60) % 60;
    var seconds = totalSec % 60;

    var result = (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
    result = result.replace(new RegExp('NaN', 'g'), '00');

    return result;
}

function extractTotalSeconds(timespan) {
    if (!timespan) {
        return 0;
    }
    var spans = timespan.split(':');
    return parseInt(spans[0] * 3600) + parseInt(spans[1] * 60) + parseInt(spans[2]);
}

function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
}

function getDurationTimeFormat(seconds) {
    var hours = Math.floor(seconds / (60 * 60));

    var divisor_for_minutes = seconds % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };

    var timestampFormat = '';

    if (obj.h < 10) {
        obj.h = '0' + obj.h;
    }
    timestampFormat = obj.h + ":";


    if (obj.m < 10) {
        obj.m = '0' + obj.m;
    }
    timestampFormat += obj.m;


    if (obj.s < 10) {
        obj.s = '0' + obj.s;
    }
    timestampFormat += ":" + obj.s;

    return timestampFormat;

}

function formatUrl(url) {
    if (url.indexOf('http') == -1 ||
        url.indexOf('https') == -1) {
        url = "http://" + url;
    }

    return url;
}

function thousandSep(val) {
    return String(val).split("").reverse().join("")
        .replace(/(\d{3}\B)/g, "$1,")
        .split("").reverse().join("");
}

function drawImageOnCanvas(video, context, width, heigth) {
    context.drawImage(video, 0, 0, width, heigth);
    var rawData = canvas.toDataURL('image/png', true, true),
        image = rawData.replace('data:image/png;base64,', '');
    return rawData;
}

function parseURL(url) {
    var a = document.createElement('a');
    a.href = formatUrl(url);
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: (a.hostname == 'http' || a.hostname == 'https') ? a.pathname.replace(/^\//, '').split('/')[1] : a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

function cloneObjectFully(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function cloneObject(src, dest) {
    for (var prop in src) {
        if (typeof src[prop] !== 'function') {
            dest[prop] = src[prop];
        }
    }
    return dest;
}

function startsWith(str, starts) {
    if (starts === '') return true;
    if (str == null || starts == null) return false;
    str = String(str);
    starts = String(starts);
    return str.length >= starts.length && str.slice(0, starts.length) === starts;
}

function stripHTML(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

// Temporary Section

function globalVideoResize() {
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        leftMenuWidth = 50,
        sidebarWidth = 0,
        unitCaseHeightDiff = 84;

    if (windowWidth <= 1520) {
        if ($("#sidbar").hasClass("open-sidebar")) {
            sidebarWidth = 270;
        }
        if ($("#all").hasClass("open-menu")) {
            leftMenuWidth = 378;
        }
    } else {
        if ($("#sidbar").hasClass("open-sidebar")) {
            sidebarWidth = 300;
        }
        if ($("#all").hasClass("open-menu")) {
            leftMenuWidth = 378;
        }
        unitCaseHeightDiff += 20;
    }
    
    $('#unitcase').css('height', windowHeight - unitCaseHeightDiff - 50);
    $('#unitcase').css("width", (windowWidth - leftMenuWidth - sidebarWidth));
}

function globalPlayerControlResize(scenario) {
    var windowWidth = $(window).width(),
        volumeCntrlWidth = 0,
        playCntrlWidth = $(".play_cntrl").width(),
        toggleMuteWidth = $("#togglemuteunmute").width(),
        sidebarClosedWidth = $(".sidebar_closed").width(),
        leftMenuWidth = 0;

    if (scenario && scenario === "volume-hover") {
        volumeCntrlWidth = 120;
    }

    if ($("#all").hasClass("open-menu")) {
        leftMenuWidth = 333;
    }

    // Progress bar size
    if ($("#sidbar").hasClass("open-sidebar")) {
        if (windowWidth <= 1520) {
            sidebarClosedWidth = 315;
        } else {
            sidebarClosedWidth = 350;
        }
    }

    progressBarWidth = windowWidth - leftMenuWidth - playCntrlWidth - toggleMuteWidth - volumeCntrlWidth - sidebarClosedWidth;
    $("#video-progress-parent-id").css("width", progressBarWidth); //Volume slider open
}

function globalSlidesControlResize() {
    var windowWidth = $(window).width(),
        slidesControlWidth = $(".pctrl_slides").width(),
        sidebarClosedWidth = $(".sidebar_closed").width(),
        leftMenuWidth = 0;

    if ($("#all").hasClass("open-menu")) {
        leftMenuWidth = 333;
    }

    // Progress bar size
    if ($("#sidbar").hasClass("open-sidebar")) {
        if (windowWidth <= 1520) {
            sidebarClosedWidth = 315;
        } else {
            sidebarClosedWidth = 350;
        }
    }

    var progressBarWidth = windowWidth - leftMenuWidth - slidesControlWidth - sidebarClosedWidth;
    $("#slides-progress-parent-id").css("width", progressBarWidth);
}

function globalPlayerDivsResize() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var allDivWidth = ($("#leftmenu").width());
    var offset = 0;

    $("#all").css("width", (windowWidth - allDivWidth));

    if (windowWidth <= 1520) {
        offset = 80;
    } else {
        offset = 100;
    }
    $(".tut_sidbar").css("height", windowHeight - offset);
    $("#sidbarscr_id").css("height", windowHeight - offset);
    $(".sidebar_closed").css("height", windowHeight - offset);
    globalMenuButtonPosition();
}

function globalMenuButtonPosition() {
    var menuElement = $("#menu"),
        windowWidth = $(window).width(),
        allElement = $("#all");

    if (allElement.hasClass("open-menu")) {
        if (windowWidth >= 1520) {
            menuElement.css('left', '208px');
        } else {
            menuElement.css('left', '223px');
        }
    }
}

// Temporary Section END