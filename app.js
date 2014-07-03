var LOCAL_DEBUG = false;
//var LOCAL_DEBUG = true;

(function () {
    if (location.href.indexOf('Tuteboard.Web') != -1) {
        LOCAL_DEBUG = true;
    }
}());

var apiUrl = "/api";
var rootUrl = "/";
var youtubeApiUrlV2 = "https://gdata.youtube.com/feeds/api";
var youtubeApiUrlV3 = "https://www.googleapis.com/youtube/v3";

if (LOCAL_DEBUG) {
    rootUrl = "/Tuteboard.Web";
    apiUrl = "/Tuteboard.Web/api";
    //rootUrl = "/TestTuteboard";
    //apiUrl = "/TestTuteboard/api";
} else {
    rootUrl = '';
    apiUrl = "/api";
}

var LoggerModules = {
    UnitEdit: 'UnitEdit',
    SectionEdit: 'SectionEdit',
    YouTubeFP: 'YouTubeFP',
    UnitFPSnapshot: 'UnitFPSnapshot',
    CoverChangeSplashController: 'CoverChangeSplashController',
    SceneEditorControlBarController: 'SceneEditorControlBarController',
    SlideEditorController: 'SlideEditorController',
    TextEditorController: 'TextEditorController',
    UnitToEditController: 'UnitToEditController',
    HeaderController: 'HeaderController',
    ResourceBarLibraryUploadController: 'ResourceBarLibraryUploadController',
    AuthenticationController: 'AuthenticationController',
    NavigationBarController: 'NavigationBarController',
    SidebarScenesController: 'SidebarScenesController',
    ShareTuteController: 'ShareTuteController',
    LoginFormController: 'LoginFormController',
    CreateNewTuteController: 'CreateNewTuteController',
    BrowserController: 'BrowserController'
};

angular.module('app', [
    //'filters',
    'ngRoute',
    'ngSanitize',
    'ngResource',
    'services.breadcrumbs',
    'shared',
    'tutebrowser',
    'tutebuilder',
    'security',
    'directives',
    'services.notifications',
    'services.helpers',
    'services.httpRequestTracker'
]).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    // Global Config

    // Global cacheing - TEST IT !
    // $httpProvider.defaults.cache = $cacheFactory('myNewDefaultCache', { capacity: 100 });

    // $locationProvider.html5Mode(false);
    // $routeProvider.otherwise({ redirectTo: '/login' });
    $httpProvider.interceptors.push('myHttpInterceptor');

    var spinnerFunction = function (data, headersGetter) {
        return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);

}]).run(['security', function (security) {
    // Get the current user when the application starts
    // (in case they are still logged in from a previous session)
    security.requestCurrentUser();
    Logger.useDefaults();

    function loggerHandler(messages, context) {
        // Send messages to a custom logging endpoint for analysis.

        if (!LOCAL_DEBUG) {
            return;
        }

        var params = [];
        params.push('[' + context.name + ']#');
        _.each(messages, function (log) {
            params.push(log);
        });

        if (filterModules(context.name)) {
            switch (context.level.name) {
                case 'DEBUG':
                    console.debug.apply(console, params);
                    break;
                case 'INFO':
                    console.info.apply(console, params);
                    break;
                case 'WARN':
                    console.warn.apply(console, params);
                    break;
                case 'ERROR':
                    console.error.apply(console, params);
                    break;
            }

        }
    }

    Logger.setHandler(loggerHandler);

    function filterModules(logModule) {
        if (ActiveModules === undefined ||
            ActiveModules.length === 0) {
            return true;
        }

        var willLog = _.contains(ActiveModules, logModule);
        return willLog;
    }

    // Filter for modules you desire to filter
    var ActiveModules = [
        // Add modules Here e.g. below
        // LoggerModules.SectionEdit
//            LoggerModules.YouTubeFP,
//            LoggerModules.UnitFPSnapshot,
//        LoggerModules.UnitToEditController,
//        LoggerModules.UnitEdit
//            LoggerModules.SceneEditorControlBarController,
//            LoggerModules.SlideEditorController,
//            LoggerModules.TextEditorController,
//            LoggerModules.UnitFPSnapshot
    ];

    // Default for all logs, if not specified per module
    Logger.setLevel(Logger.INFO);

}]).factory("stacktraceService", function () {
    // "printStackTrace" is a global object.
    return ({
        print: printStackTrace
    });

}).factory("errorLogService", ["$log", "$window", "stacktraceService", function ($log, $window, stacktraceService) {

    function log(exception, cause) {

        if (LOCAL_DEBUG) {
            return;
        }

        $log.error.apply($log, arguments);

        try {
            var errorMessage = exception.toString();
            var stackTrace = stacktraceService.print({ e: exception });

            $.ajax({
                type: "POST",
                url: apiUrl + "/ClientSideError",
                contentType: "application/json",
                data: angular.toJson({
                    URL: $window.location.href.toString(),
                    ErrorMessage: errorMessage.toString(),
                    StackTrace: stackTrace.toString()
//                        cause: ( cause || "" )
                })
            });

        } catch (loggingError) {
            $log.warn("Error logging failed");
            $log.log(loggingError);
        }
    }

    return log;

}]).factory('myHttpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    $rootScope.pendingRequests = 0;
    return {
        'request': function (config) {
            $rootScope.pendingRequests++;
            return config || $q.when(config);
        },

        'requestError': function (rejection) {
            $rootScope.pendingRequests--;
            return $q.reject(rejection);
        },

        'response': function (response) {
            $rootScope.pendingRequests--;
            return response || $q.when(response);
        },

        'responseError': function (rejection) {
            $rootScope.pendingRequests--;
            return $q.reject(rejection);
        }
    };
}]);


//Hack to allow the change of the url without reloading
angular.module('app').run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location, $routeParams) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;

                un();
            });
        }

        var returna = original.apply($location, [path]);

//        if ($route.current && path) {
//            var routeParams = path.match($route.current.regexp);
//            var newRoutes = [];
//            for (var i = 1; i < routeParams.length; i++) {
//                newRoutes[i - 1] = (routeParams[i]);
//            }
//
//            $route.current.params.new = routeParams[3];
//        }
        return returna;
    };
}]);