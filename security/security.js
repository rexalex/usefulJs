// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', [
    'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
    'security.login'         // Contains the login form template and controller
])

    .factory('security', ['$http', '$q', '$location', 'securityRetryQueue', '$modal', 'Notifications', function ($http, $q, $location, queue, $modal, Notifications) {

        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            // $location.path(url);
        }

        // Login form dialog stuff
        var loginDialog = null;

        function openLoginDialog(registerTab) {
            if (loginDialog) {
                throw new Error('Trying to open a dialog that is already open!');
            }

            if (!registerTab) {
                registerTab = false;
            }

            loginDialog = $modal.open({
                templateUrl: rootUrl + '/view/security/form',
                controller: "LoginFormController",
                resolve: {
                    showRegister: function () {
                        return registerTab;
                    }
                }
            });

            loginDialog.result.then(onLoginDialogClose, function () {
                loginDialog = null;
            });
        }

        function closeLoginDialog(success) {
            if (loginDialog) {
                loginDialog.close(success);
            }
        }

        function onLoginDialogClose(success) {
            loginDialog = null;
            if (success) {
                queue.retryAll();
            } else {
                queue.cancelAll();
                redirect();
            }
        }

        // Register a handler for when an item is added to the retry queue
        queue.onItemAddedCallbacks.push(function (retryItem) {
            if (queue.hasMore()) {
                service.showLogin();
            }
        });

        // The public API of the service
        var service = {

            // Get the first reason for needing a login
            getLoginReason: function () {
                return queue.retryReason();
            },

            // Show the modal login dialog
            showLogin: function (showRegister) {
                openLoginDialog(showRegister);
            },

            // Attempt to authenticate a user by the given email and password
            login: function (username, password) {
                var _this = this;
                var request = $http.post(apiUrl + '/authentication/login', { UserName: username, Password: password, RememberMe: true });
                return request.then(function (response) {
                    _this.currentUser = response.data.data;
                    if (_this.isAuthenticated()) {
                        var anotherRequest = $http.get(rootUrl + '/account/loginpartial')
                            .success(function (response) {
//                                $("#login").html(response);
                                Notifications.dispatchEvent(ui.shared.header.events.LOGIN, { user: _this.currentUser });
                            });
                        closeLoginDialog(true);
                    }
                });
            },

            register: function (username, password, confirmPassword, email, isWriter) {
                var _this = this,
                    request = $http.post(apiUrl + '/authentication/register', { UserName: username, Password: password, ConfirmPassword: confirmPassword, Email: email, isTutor: isWriter });
                return request.then(function (response) {
                    if (response.data.status === 'ok') {

                        // _this.login(username, password);
                        // TODO: Change when out of beta
                        return { status: response.data.status };

                    } else {
                        var errorString = '',
                            errorObj = angular.fromJson(response.data.error); // TODO: Change on server side

                        for (var prop in errorObj) {
                            errorString += '&nbsp' + errorObj[prop] + '<br/>';
                        }

                        return { status: 'ERROR', error: errorString };
                    }
                });
            },

            forgotPassword: function (email, automatic) {


                var obj = {
                    email: email,
                    automatic: automatic
                };
                console.warn('email', obj);
                var _this = this,
                    request = $http.post(apiUrl + '/authentication/PasswordResetRequest?email=' + obj.email + '&automatic=' + obj.automatic, { });
                return request.then(function (response) {
                    if (response.data.status === 'ok') {
                        return { status: response.data.status.toUpperCase() };
                    } else {
                        return { status: 'ERROR', error: response.data.error };
                    }
                });
            },

            // Give up trying to login and clear the retry queue
            cancelLogin: function () {
                closeLoginDialog(false);
                redirect();
            },

            // Logout the current user and redirect
            logout: function (redirectTo) {
                $http.get(apiUrl + '/authentication/logoff').then(function () {
                    service.currentUser = null;
                    Notifications.dispatchEvent(ui.shared.header.events.LOGOUT, null);
                    redirect(redirectTo);
                });
            },

            // Ask the backend to see if a user is already authenticated - this may be from a previous session.
            requestCurrentUser: function () {
                if (service.isAuthenticated()) {
                    return $q.when(service.currentUser);
                } else {

                    if (service.currentUser !== null) {
                        return service.currentUser;
                    }

                    return $http.get(apiUrl + '/authentication/getauthenticateduser').then(function (response) {
                        if (response.data.status === 'Unauthorized') {
                            // window.location.href = rootUrl + '/Account/Login';
                            return service.currentUser;
                        }

                        service.currentUser = response.data.data;
                        return service.currentUser;
                    });
                }
            },

            getCurrentUser: function () {
                return service.currentUser;
            },

            // Information about the current user
            currentUser: null,

            // Is the current user authenticated?
            isAuthenticated: function () {
                return !!service.currentUser;
            },

            // Is the current user an adminstrator?
            isAdmin: function () {
                var isAdmin = false;

                if (!service.currentUser) {
                    return isAdmin;
                }

                for (var i = 0; i < service.currentUser.Roles.length; i++) {
                    if (service.currentUser.Roles[i] === 'Administrator') {
                        isAdmin = true;
                    }
                }
                return isAdmin;
            },

            isWriter: function () {
                var isWriter = false;

                if (!service.currentUser) {
                    return isWriter;
                }

                for (var i = 0; i < service.currentUser.Roles.length; i++) {
                    if (service.currentUser.Roles[i] === 'Writer') {
                        isWriter = true;
                    }
                }
                return isWriter;
            }
        };

        return service;
    }]);
