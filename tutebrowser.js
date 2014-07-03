'use strict';

var tutebrowserViewUrl = rootUrl + '/view/tutebrowser';
angular.module('tutebrowser', [
        'services',
        'filters',
        'tutebrowser.mytutes',
        'tutebrowser.sharetute',
        'tutebrowser.explore',
        'tutebrowser.controlbar',
        'tutebrowser.sidebar',
        'tutebrowser.titlebar',
        'tutebrowser.unit',
        'dragdropmodule',
        'services.notifications',
        'tutebrowser.unit.unityoutubefp',
        'tutebrowser.unit.unitvimeo'
    ])
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
//        $routeProvider.when('/', { templateUrl: tutebrowserViewUrl + '/landing', controller: 'LandingController' });
        $routeProvider.when('/signup/:register?', { templateUrl: tutebrowserViewUrl + '/dashboard', controller: 'DashboardController' });
        $routeProvider.when('/dashboard/:mode?', { templateUrl: tutebrowserViewUrl + '/dashboard', controller: 'DashboardController' });
        $routeProvider.when('/register/:email?', { templateUrl: tutebrowserViewUrl + '/dashboard', controller: 'DashboardController' });

        //$routeProvider.when('/tute/:id/cover', { templateUrl: tutebrowserViewUrl + '/unitlist', controller: 'TuteController' });
        $routeProvider.when('/tute/:user/:id/cover', { templateUrl: tutebrowserViewUrl + '/unitlist', controller: 'TuteController' });

        //$routeProvider.when('/tute/:id', { templateUrl: tutebrowserViewUrl + '/tutereader', controller: 'UnitPageController' });
        $routeProvider.when('/tute/:user/:id', { templateUrl: tutebrowserViewUrl + '/tutereader', controller: 'UnitPageController' });

        $routeProvider.when('/tute/:user/:id/unit/:unit', { templateUrl: tutebrowserViewUrl + '/tutereader', controller: 'UnitPageController' });

        $routeProvider.when('/tute/:user/:id/unit/:unit/qid/:qid', { templateUrl: tutebrowserViewUrl + '/tutereader', controller: 'UnitPageController' });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);

    }]);