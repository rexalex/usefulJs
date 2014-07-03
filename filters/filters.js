var filters = angular.module('filters', []);

filters.filter('xdate', function () {
    return function (input) {

        if (input != undefined) {

            var parts = input.split(' ');
            var dateparts = parts[0].split('-');
            var timeparts = parts[1].split(':');
            if ((dateparts.length == 3) && (timeparts.length == 3))
                var tryDate = new XDate(
                    parseInt(dateparts[0]), // year
                    parseInt(dateparts[1] ? dateparts[1] - 1 : 0), // month
                    parseInt(dateparts[2]), // day
                    parseInt(timeparts[0]), // hours
                    parseInt(timeparts[1]), // minutes
                    parseInt(timeparts[2])  // seconds
                );

            if (tryDate[0] != "Invalid Date") {
                input = tryDate;
            }
        }
        
        if (input == undefined || input.toDateString == undefined) {
            return '-.-.-';
        }

        return input.toString('MM.dd.yyyy');
    };
});

filters.filter('xdatetime', function () {
    return function (input) {

        if (input === null || input === undefined) {
            return '-.-.-';
        }

        var dateNoTimeZone = input.split('+')[0].trim(),
            tryDate = new XDate(dateNoTimeZone.toString());

        return tryDate.toString('MMM d, yyyy - h(:mm)TT');
    };
});

filters.filter('xdatetimepassed', function () {
    return function (input) {

        if (input === null || input === undefined) {
            return '-.-.-';
        }

        var dateNoTimeZone = input.split('+')[0].trim(),
            tryDate = new XDate(dateNoTimeZone.toString()),
            year = tryDate.getFullYear(),
            currentDate = new XDate(true),
            currentYear = currentDate.getFullYear(),
            differenceYears = currentYear - year;

        if (differenceYears > 0) {
            return differenceYears + ' ' + returnSingle(differenceYears, 'year') + ' ago';

        } else {
            var moth = tryDate.getMonth(),
                currentMonth = currentDate.getMonth(),
                differenceMonths = currentMonth - moth;

            if (differenceMonths > 0) {
                return differenceMonths + ' ' + returnSingle(differenceMonths, 'month') + ' ago';
            } else {
                var day = tryDate.getDate(),
                    currentDay = currentDate.getDate(),
                    differenceDays = currentDay - day;

                if (differenceDays > 0) {
                    return differenceDays + ' ' + returnSingle(differenceDays, 'day') + ' ago';

                } else {
                    var hours = tryDate.getHours(),
                        currentHour = currentDate.getHours(),
                        differenceHours = currentHour - hours;

                    if (differenceHours > 0) {
                        return differenceHours + ' ' + returnSingle(differenceHours, 'hour') + ' ago';
                    } else {
                        var minutes = tryDate.getMinutes(),
                            currentMinutes = currentDate.getMinutes(),
                            differenceMinutes = currentMinutes - minutes;

                        if (differenceMinutes > 0) {
                            return differenceMinutes + ' ' + returnSingle(differenceMinutes, 'minute') + ' ago';
                        } else {
                            return '';
                        }
                    }
                }
            }
        }
        function returnSingle(difference, value) {
            if (difference == 1) {
                return value;
            }
            return value + 's';
        }
    };
});

filters.filter('round', function () {
    return function (input) {
        return Math.round(input);
    };
});

filters.filter('percentage', function () {
    return function (input) {
        return Math.round(input) + "%";
    };
});

filters.filter('percentage', function () {
    return function (input) {
        return Math.round(input) + "%";
    };
});

filters.filter('nospace', function () {
    return function (input) {
        return input.replace(' ', '').toLocaleLowerCase();
    };
});

filters.filter('trimtimespan', function () {
    return function (input) {
        if (input === undefined || input === null) {
            return '';
        }

        var time = input.split(':');
        if (time.length > 2) {
            return time[1] + ':' + time[2];
        }

        return input;
    };
});

filters.filter('notext', function () {
    return function (input) {
        if (input === undefined || input === null) {
            return "-";
        }

        return input;
    };
});

filters.filter('tutestatus', function () {
    return function (input) {
        if (input === undefined || input === null) {
            return "-";
        }

        switch (input) {
            case 1:
                return "Published";
            case 2:
                return "Draft";
            default:
                return "";
        }
    };
});

filters.filter('unittype', function () {
    return function (input) {
        if (input === undefined || input === null) {
            return input;
        }

        switch (input) {
            case 1:
            {
                return "Video";
            }
                ;
                break;
            case 2:
            {
                return "Youtube";
            }
                ;
                break;
            case 3:
            {
                return "HTML";
            }
                ;
                break;
            case 4:
            {
                return "Slides";
            }
                ;
                break;
            case 5:
            {
                return "Image";
            }
                ;
                break;
            case 6:
            {
                return "Pdf";
            }
                ;
                break;
            case 8:
            {
                return "Vimeo";
            }
                ;
                break;
        }
        return input;
    };
});

filters.filter('momentparse', function () {
    return function (input) {
        return moment(input).fromNow();
    };
});

filters.filter('highlight', function ($sce) {

    return function (input, searchParam) {

        if (searchParam) {
            var words = searchParam.split(/\ /).join('|'),
                exp = new RegExp("(" + words + ")", "gi");

            if (words.length) {
                input = $sce.trustAsHtml(input.replace(exp, "<span class=\"highlight\">$1</span>"));
            }
        }

        return input;

    };

});


