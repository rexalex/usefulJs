var LoginFormController = ModalBaseController.extend({

    _Security: null,

    /**
     * Initialize Notes Controller
     * @param $scope, current controller scope
     */
    init: function ($scope, Security, showRegister, RouteParams) {
        this._Security = Security;
        this._RouteParams = RouteParams;
        this._showRegister = showRegister;
        this._super($scope, LoggerModules.LoginFormController);
    },

    /**
     *@Override
     */
    defineListeners: function () {
        this._super();
    },

    _login: function () {
        var _this = this;
        this.$scope.$broadcast("autofill:update");

        if (_this.$scope.user.password.length === 0 ||
            _this.$scope.user.username.length === 0) {
            _this.$scope.authError = 'Please fill all fields !';
            return;
        }

        // Clear any previous security errors
        _this.$scope.authError = null;
        _this._loaderAnimation();

        // Try to login
        _this._Security.login(_this.$scope.user.username, _this.$scope.user.password).then(function (loggedIn) {
            if (!loggedIn) {
                // If we get here then the login failed due to bad credentials
                _this.$scope.authError = 'Invalid Credentials';
            } else {
                _this._stopLoaderAnimation();
            }
        }, function (x) {
            // If we get here then there was a problem with the login request to the server
            _this.$scope.authError = 'Server Error';
        });
    },

    _register: function () {
        var _this = this;

        this.$scope.$broadcast("autofill:update");

        if (_this.$scope.registration.password.length === 0 ||
            _this.$scope.registration.username.length === 0 ||
            _this.$scope.registration.confirmPassword.length === 0 ||
            _this.$scope.registration.email.length === 0) {
            _this.$scope.authError = 'Please fill all fields !';
            return;
        }

        if (!this.$scope.registration.agreeToTerms) {
            this.$scope.authError = 'You must agree to the terms!';
            return;
        }

        _this._loaderAnimation();

        var isWriter = false;

        if (this._RouteParams.register === 'writer') {
            isWriter = true;
        }

        // Try to login
        _this._Security.register(
            _this.$scope.registration.username,
            _this.$scope.registration.password,
            _this.$scope.registration.confirmPassword,
            _this.$scope.registration.email,
            isWriter
        ).then(
            function (response) {
                if (response.status === 'ok') {
                    safeApply(_this.$scope, function () {
                        _this._stopLoaderAnimation();
                        _this.$scope.registrationSuccessful = true;
                    });
                } else {
                    _this.$scope.authError = response.error;
                }

                _this.$scope.loading = false;
            }
        );
    },

    _forgotPanel: function (value) {
        this.$scope.isForgotPassword = value;
    },

    _submitForgotPassword: function () {
        var _this = this;
        var emailAddress = this.$scope.user.forgotEmail;
        _this._Security.forgotPassword(emailAddress, false).then(function (response) {
            safeApply(_this.$scope, function () {
                _this._Log.debug('Sent password reset - Response', response);
                if (response.status === 'OK') {
                    _this._Log.info('Sent password reset!');
                    _this._forgotPanel(false);
                    _this.$scope.forgotEmail = '';
                } else {
                    _this.$scope.forgotPasswordError = response.error;
                }
            });
        });
    },

    /**
     *@Override
     */
    defineScope: function () {
        var _this = this;
        this.$scope.user = {
            username: '',
            password: '',
            forgotPassword: ''
        };

        this._loaderAnimation();

        this.$scope.registration = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            agreeToTerms: false,
            agreeToNews: true
        };

        if (_this._RouteParams.email) {
            this.$scope.registration.email = _this._RouteParams.email;
        }

        this.$scope.registrationSuccessful = false;
        this.$scope.isRegister = this._showRegister;
        this.$scope.forgotPanel = this._forgotPanel.bind(this);
        this.$scope.submitForgotPassword = this._submitForgotPassword.bind(this);
        this.$scope.isForgotPassword = false;
        this.$scope.loading = false;
        this.$scope.returnUrl = encodeURIComponent(window.location.pathname + window.location.hash);
        this.$scope.authError = null;
        this.$scope.authReason = null;
        this.$scope.forgotEmail = '';
        this.$scope.hideFbTwt = false;
        if (this._Security.getLoginReason()) {
            this.$scope.authReason = (this._Security.isAuthenticated()) ? 'Not Authorized' : 'Not Authenticated';
        }

        setTimeout(function () {
            if (_this._RouteParams.register === 'writer') {
                safeApply(_this.$scope, function () {
                    _this.$scope.hideFbTwt = true;
                });
            }
        }, 500);

        setTimeout(function () {
            var inputToken = $("#tokenholder").html();
            $('.formz').each(function (i, div) {
                $(this).append(inputToken);
            });
        }, 500);

        this.$scope.title = function () {
            if (_this.$scope.isRegister) {
                return 'Register';
            } else {
                if (_this.$scope.isForgotPassword) {
                    return 'Forgot password';
                } else {
                    return 'Login';
                }
            }
        };

        this.$scope.login = this._login.bind(this);
        this.$scope.register = this._register.bind(this);

        this.$scope.switchTab = function () {
            _this.$scope.isRegister = !_this.$scope.isRegister;
            _this.$scope.authError = '';
        };

        this.$scope.clearForm = function () {
            _this.$scope.user = {
                username: '',
                password: ''
            };
        };

        this.$scope.cancelLogin = function () {
            _this._Security.cancelLogin();
            _this._stopLoaderAnimation();
        };
    },

    // Loader animation
    _loaderAnimation: function () {

        if (this.animationHandler) {
            this._stopLoaderAnimation();
        }
        this.$scope.loading = true;

        this.animationHandler = self.setInterval(animate, 1200);

        function animate() {
            $("#dot-1").animate({opacity: 1}, {duration: 300});

            setTimeout(function () {
                $("#dot-1").animate({opacity: 0}, {duration: 300});
                $("#dot-2").animate({opacity: 1}, {duration: 300});
            }, 300);

            setTimeout(function () {
                $("#dot-2").animate({opacity: 0}, {duration: 300});
                $("#dot-3").animate({opacity: 1}, {duration: 300});
            }, 600);

            setTimeout(function () {
                $("#dot-3").animate({opacity: 0}, {duration: 300});
            }, 900);
        }
    },

    _stopLoaderAnimation: function () {
        this.$scope.loading = false;
        window.clearInterval(this.animationHandler);
        this.animationHandler = null;
    },

    /**
     *@Override
     */
    destroy: function () {
        // remove listeners here
        this._stopLoaderAnimation();
        this._super();
    }

});
LoginFormController.$inject = ["$scope", "security", "showRegister", '$routeParams'];
