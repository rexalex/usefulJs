var ModalBaseController = BaseController.extend({

    /**
     *@Override
     */
    defineListeners: function () {
        this.bindHandleKeyBoardEvent = this._handleKeyBoardEvent.bind(this);
        $(window).on('keydown.navigation', this.bindHandleKeyBoardEvent);
        this._super();
    },

    defineScope: function ($scope, LoggerModule) {
        this._super($scope, LoggerModule);
    },

    _handleKeyBoardEvent: function (event) {

        if (window.tuteviewer !== undefined) {
            if (window.tuteviewer.textboxFocused) {
                return;
            }
        }

        switch (event.keyCode) {
            case 27:
                this.removeListener(event);
                break;
        }
    },

    /**
     *@Override
     */
    removeListener: function (event) {
        // remove listeners here
        $(window).off('keydown.navigation', this.bindHandleKeyBoardEvent);
    }

});
ModalBaseController.$inject = ["$scope"];
