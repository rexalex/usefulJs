/**
 * @Events
 */
namespace('ui.tuteviewer.unit.events').OPENED_SIDEBAR = "ui.tuteviewer.unit.events.OPENED_SIDEBAR";
namespace('ui.tuteviewer.unit.events').CLOSED_SIDEBAR = "ui.tuteviewer.unit.events.CLOSED_SIDEBAR";
namespace('ui.tuteviewer.units.events').NEXT_UNIT = "ui.tuteviewer.units.events.NEXT_UNIT";
namespace('ui.tuteviewer.units.events').PREV_UNIT = "ui.tuteviewer.units.events.PREV_UNIT";
namespace('ui.tuteviewer.units.events').RESIZE_DESCRIPTION = "ui.tuteviewer.units.events.RESIZE_DESCRIPTION";
namespace('ui.tuteviewer.units.events').INTERVAL_ELPALSED = "ui.tuteviewer.units.events.INTERVAL_ELPALSED";
namespace('ui.tuteviewer.units.events').VIDEO_STARTED = "ui.tuteviewer.units.events.VIDEO_STARTED";
namespace('ui.tuteviewer.units.events').VIDEO_ENDED = "ui.tuteviewer.units.events.VIDEO_ENDED";
namespace('ui.tuteviewer.units.events').REFRESH_GROUPS = "ui.tuteviewer.units.events.REFRESH_GROUPS";
namespace('ui.tuteviewer.units.events').SET_THUMBNAIL = "ui.tuteviewer.units.events.SET_THUMBNAIL";
namespace('ui.tuteviewer.units.events').TAKE_SNAPSHOT = "ui.tuteviewer.units.events.TAKE_SNAPSHOT";

// Slides events
namespace('ui.tuteviewer.units.events').NEXT_SLIDE = "ui.tuteviewer.units.events.NEXT_SLIDE";
namespace('ui.tuteviewer.units.events').PREV_SLIDE = "ui.tuteviewer.units.events.PREV_SLIDE";
namespace('ui.tuteviewer.units.events').JUMP_TO_SLIDE = "ui.tuteviewer.units.events.JUMP_TO_SLIDE";
namespace('ui.tuteviewer.units.events').REFRESH_GROUPS_SLIDE = "ui.tuteviewer.units.events.REFRESH_GROUPS_SLIDE";
namespace('ui.tuteviewer.units.events').GO_TO_SLIDE = "ui.tuteviewer.units.events.GO_TO_SLIDE";

var tutebrowserViewUrl = rootUrl + '/view/tutebrowser';

angular.module('tutebrowser.unit', ['services',
    'filters',
    'tutebrowser.unit.unitvideo',
    'tutebrowser.unit.unityoutube',
    'tutebrowser.unit.unityoutubefp',
    'tutebrowser.unit.unitvimeo',
    'tutebrowser.unit.unitfpsnapshot',
    'tutebrowser.unit.image',
    'tutebrowser.questions',
    'tutebrowser.downloadsview',
    'tutebrowser.notes',
    'tutebrowser.unit.slides'])

    .directive('unit', function () {
        return {
            restrict: 'E',
            scope: {
                tute: '=',
                currentunit: '='
            },
            templateUrl: tutebrowserViewUrl + "/unit",
            controller: 'UnitController'
        };
    })
;
