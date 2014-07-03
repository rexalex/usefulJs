var directives = angular.module('directives', []);

directives.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]);

directives.directive('ngOnBlur', ['$parse', function ($parse) {
    return function (scope, elm, attrs) {

        var onBlurFunction = $parse(attrs['ngOnBlur']);
        elm.bind("blur", function (event) {
            scope.$apply(function () {
                onBlurFunction(scope, { $event: event });
            });
        });

    };
}]);

directives.directive('richtext', ['$parse', function ($parse) {
    return  {
        replace: true,
        restrict: 'A',
        scope: false,
        link: function (scope, elm, $attr) {
            setTimeout(run, 100);
            function run() {
                var viewOption = $attr.formatting, nicEditOptions = {}, myInstance, cache;

                if (viewOption === 'simple') {
                    nicEditOptions = {
                        buttonList: [
                            'titles',
                            'bold',
                            'ul',
                            'link',
                            'unlink'
                        ],
                        maxHeight: 86
                    };
                } else {
                    nicEditOptions = {
                        buttonList: [
                            'fontSize',
                            'fontFamily',
                            'fontFormat',
                            'bold',
                            'italic',
                            'underline',
                            'left',
                            'center',
                            'right',
                            'justify',
                            'ol',
                            'ul',
                            'subscript',
                            'superscript',
                            'strikethrough',
                            'removeformat',
                            'indent',
                            'outdent',
                            'hr',
                            'image',
                            'forecolor'
                        ]
                    };
                }


                if ($attr.panel) {
                    myInstance = new nicEditor(nicEditOptions);
                    myInstance.setPanel($attr.panel);
                    myInstance.addInstance($attr.id);
                } else {
                    myInstance = new nicEditor(nicEditOptions).panelInstance($attr.id);
                }


                cache = "";

                function _focusEvent() {

                    safeApply(scope, function () {
                        var invoker = $parse($attr['ngClick']);
                        invoker(scope, {arg1: ''});
                    });
                }

                function _blurEvent() {
                    safeApply(scope, function () {
                        if (cache === editor.getContent()) {
                            var invoker = $parse($attr['ngTextBlur']);
                            invoker(scope, {arg1: ''});
                            return;
                        }

                        var model = $parse($attr.ngModel);
                        model.assign(scope, editor.getContent());
                        cache = editor.getContent();

                        var invoker = $parse($attr['ngTextChange']);
                        invoker(scope, {arg1: ''});
                    });
                }

                myInstance.addEvent('focus', _focusEvent);
                myInstance.addEvent('blur', _blurEvent);

                var editor = new nicEditors.findEditor($attr.id);
                scope.$watch($attr.ngModel, function (value) {
                    if (value) {
                        editor.setContent(value);
                    }
                });

                scope.$on('$destroy', function () {
                    myInstance.removeEvent('blur', _blurEvent);
                    myInstance.removeEvent('focus', _focusEvent);
                });
            }
        }
    };
}]);

directives.directive('wljSwitchOn', function () {
    return {
        controller: function ($scope) {
            var _value;
            this.getValue = function () {
                return _value;
            };
            this.setValue = function (value) {
                _value = value;
            };

            var _whensCount = 0;
            this.addWhen = function (value) {
                _whensCount++;
            }
            this.removeWhen = function (value) {
                _whensCount--;
            }
            this.hasWhens = function () {
                return _whensCount < -1;
            };
        },
        link: function (scope, element, attrs, controller) {
            scope.$watch(function () {
                return scope.$eval(attrs.wljSwitchOn);
            }, function (value) {
                controller.setValue(value);
            });
        }
    };
});

directives.directive('wljSwitchWhen', function () {
    return {
        require: '^wljSwitchOn',
        //  template: '<div ng-transclude></div>',
        //  transclude: true,
        replace: true,
        link: function (scope, element, attrs, controller) {
            var initialAttr = element.attr('style');
            if (!initialAttr) {
                initialAttr = '';
            }

            scope.$watch(function () {
                return controller.getValue() === scope.$eval(attrs.wljSwitchWhen);
            }, function (value) {
                if (value) {
                    controller.addWhen();
                } else {
                    controller.removeWhen();
                }

                element.attr('style',
                    value ?
                        initialAttr + 'height:100%' :
                        'display:none;height:100%');
            });
        }
    };
});

directives.directive('wljSwitchDefault', function () {
    return {
        require: '^wljSwitchOn',
        //  template: '<div ng-transclude></div>',
        // transclude: true,
        replace: true,
        link: function (scope, element, attrs, controller) {
            scope.$watch(controller.hasWhens, function (value) {
                element.attr('style', value ? '' : 'display:none;');
            });
        }
    };
});

directives.directive('ngReallyClick', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    };
}]);

directives.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                safeApply(scope,
                    function () {
                        scope.$eval(attrs.ngEnter);
                    }
                );
                event.preventDefault();
            }
        });
    };
});

directives.directive("autofill", function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {
            scope.$on("autofill:update", function () {
                ngModel.$setViewValue(element.val());
            });
        }
    };
});

directives.directive('customSelect', ['$parse', function ($parse) {
    return {
        scope: {
            values: "=customSelect",
            selectCallback: "=",
            ngModel: '=',
            selection: '=',
            header: '=',
            top: '='
        },
        template: '<select name="selectedUIC" style="display:none;"></select>' +
            '<div class="{{header}} custom dropdown medium around_select" ng-init="menuOpen=false" ng-class="{open: menuOpen}" ng-click="change()">' +
            '<a href="javascript:void(0);" class="{{top}} current custom-select">{{ ngModel.name }}</a>' +
            '<ul>' +
            '    <li ng-repeat="uic in values" class="{{selection}} custom-select" ng-click="changeSelection(uic)">{{uic.name}}</li>' +
            '</ul>' +
            '</div>',
        link: function (scope, elem, attr) {

        },
        controller: ['$scope', '$document', function ($scope, $document) {
            $scope.changeSelection = function (selection) {
                $scope.ngModel = selection;
            };

            $scope.change = function () {
                $scope.menuOpen = !$scope.menuOpen;
                setTimeout(run, 100);
                function run() {
                    if ($scope.menuOpen === true) {
                        $document.on("click", function (event) {
                            clickDoc(event);
                        });
                    }
                }
            };


            function clickDoc(event) {
                safeApply($scope, function () {
                    $scope.menuOpen = false;
                    $document.off('click');
                });

            }
        }]
    };
}]);

directives.directive("passwordVerify", function () {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});

directives.directive('suggestion', function () {
    return {
        restrict: 'A',
        require: '^autocomplete', // ^look for controller on parents element
        link: function (scope, element, attrs, autoCtrl) {
            element.bind('mouseenter', function () {
                autoCtrl.preSelect(attrs['val']);
                autoCtrl.setIndex(attrs['index']);
            });

            element.bind('mouseleave', function () {
                autoCtrl.preSelectOff();
            });
        }
    };
});