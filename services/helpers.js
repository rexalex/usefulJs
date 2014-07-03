(function () {
    'use strict';
    /**
     * Create a global event dispatcher
     * that can be injected accross multiple components
     * inside the application
     *
     * Use of Class.js
     * @type {class}
     * @author universalmind.com
     */
    var DOMHelperProvider = Class.extend({

        instance: new DOMHelper(),

        /**
         * Configures and returns instance of GlobalEventBus.
         *
         * @return {GlobalEventBus}
         */
        $get: [function () {
            return this.instance;
        }]
    });

    angular.module('services.helpers', [])
        .provider('Helpers', DOMHelperProvider);
}());