var UnitController = BaseController.extend({

    /**
     * Initialize Notes Controller
     * @param $scope, current controller scope
     */
    init: function ($scope) {
        this._super($scope);
    },

    /**
     *@Override
     */
    defineListeners: function () {
        this._super();
    },


    _unitChanged: function (newVal) {
        var _this = this;

        if (newVal === undefined) {
            return;
        }
        this.$scope.Unit = newVal;

        // Handle change of unit

        setTimeout(function () {

            switch (_this.$scope.Unit.TypeId) {
                case Enums.UnitTypes.Pdf:
                    angular.element('#pdf').html(
                        // here we also change the skin color to alert the user
                            '<iframe id="pdf1" src="' + _this.$scope.Unit.ResourceUrl + '" width="100%" height="100%" ></iframe> '
                    );
                    break;
                case Enums.UnitTypes.Word:
                    angular.element('#pdf').html(
                        // here we also change the skin color to alert the user
                            '<iframe id="pdf1" src="' + _this.$scope.Unit.ResourceUrl + '" width="100%" height="100%" ></iframe> '
                    );
                    break;
                case Enums.UnitTypes.HTML:
                    angular.element('#html').html(
                        // here we also change the skin color to alert the user
                            '<iframe id="html1" src="' + _this.$scope.Unit.ResourceUrl + '" width="100%" height="100%" ></iframe> '
                    );
                    break;
                case Enums.UnitTypes.TextView:
                    angular.element('#html').html(
                        // here we also change the skin color to alert the user
                            '<div id="html2" style="width:100%; height:100%; overflow: auto;" >' + _this.$scope.Unit.TextContent + '</div> '
                    );
                    break;
            }
        }, 500);

    },

    /**
     *@Override
     */
    defineScope: function () {
        var _this = this;
        this.addWatch('currentunit', this._unitChanged.bind(this));
    },

    /**
     *@Override
     */
    destroy: function () {
    }
});


UnitController.$inject = ["$scope"];


