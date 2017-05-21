var app = angular.module('budgetPro', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .state('account', {
            url: '/account',
            templateUrl: 'templates/account.html',
            controller: 'AccountController'
        });
}]);
                
app.factory('budgetItem', ['period', function budgetItemFactory(period) {
    return function(name, type){
        return {
            name: name,
            type: type,
            currency: undefined,
            period: period.setPeriod(0, 0, 1, 31, 0, 11, new Date())
        }
    }
}]);
app.factory('period', function periodFactory() {
    return {
        setPeriod: function (frequency, dayOfWeek, dayOfMonth1, dayOfMonth2, month1, month2, periodStart) {
            return {
                frequency: frequency,
                dayOfWeek: dayOfWeek,
                dayOfMonth1: dayOfMonth1,
                dayOfMonth2: dayOfMonth2,
                month1: month1,
                month2: month2,
                periodStart: periodStart
            }
        },
        periods: {
            frequency: [
            { id: 0, name: 'Daily' },
            { id: 1, name: 'Weekly' },
            { id: 2, name: 'Bi-Weekly' },
            { id: 3, name: 'Semi-Monthly' },
            { id: 4, name: 'Monthly' },
            { id: 5, name: 'Quarterly' },
            { id: 6, name: 'Semi-Annually' },
            { id: 7, name: 'Annually' }],
            daysOfWeek: [
            { id: 0, name: 'Sunday' },
            { id: 1, name: 'Monday' },
            { id: 2, name: 'Tuesday' },
            { id: 3, name: 'Wednesday' },
            { id: 4, name: 'Thursday' },
            { id: 5, name: 'Friday' },
            { id: 6, name: 'Saturday' }],
            daysOfMonth: [
            { id: 1, name: '1st' },
            { id: 2, name: '2nd' },
            { id: 3, name: '3rd' },
            { id: 4, name: '4th' },
            { id: 5, name: '5th' },
            { id: 6, name: '6th' },
            { id: 7, name: '7th' },
            { id: 8, name: '8th' },
            { id: 9, name: '9th' },
            { id: 10, name: '10th' },
            { id: 11, name: '11th' },
            { id: 12, name: '12th' },
            { id: 13, name: '13th' },
            { id: 14, name: '14th' },
            { id: 15, name: '15th' },
            { id: 16, name: '16th' },
            { id: 17, name: '17th' },
            { id: 18, name: '18th' },
            { id: 19, name: '19th' },
            { id: 20, name: '20th' },
            { id: 21, name: '21st' },
            { id: 22, name: '22nd' },
            { id: 23, name: '23rd' },
            { id: 24, name: '24th' },
            { id: 25, name: '25th' },
            { id: 26, name: '26th' },
            { id: 27, name: '27th' },
            { id: 28, name: '28th' },
            { id: 29, name: '29th' },
            { id: 30, name: '30th' },
            { id: 31, name: '31st' }],
            months: [
            { id: 0, name: 'January' },
            { id: 1, name: 'February' },
            { id: 2, name: 'March' },
            { id: 3, name: 'April' },
            { id: 4, name: 'May' },
            { id: 5, name: 'June' },
            { id: 6, name: 'July' },
            { id: 7, name: 'August' },
            { id: 8, name: 'September' },
            { id: 9, name: 'October' },
            { id: 10, name: 'November' },
            { id: 11, name: 'December' }]
        }
    }
});
app.factory('prompt', ['$compile', '$rootScope', function promptFactory($compile, $rootScope) {
    return {
        //Enumeration for the different prompt types
        type: {
            alert: 1,
            confirm: 2,
            input: 3
        },
        //This method is responsible for showing the prompt
        show: function (promptType, message, acceptCallback, declineCallback) {
            var prompt, scope, title, accept, decline;

            //Get the scope the prompt is being called in
            scope = $rootScope.$$childTail;

            //Create the prompt directive
            prompt = $compile('<prompt>')(scope);
            angular.element(document.getElementById("ctrl")).append(prompt);

            //Set the prompt type
            switch(promptType) {
                //Alert
                case 1:
                    title = 'Alert';
                    accept = 'OK';
                    break;
                //Confirm
                case 2:
                    title = 'Confirm';
                    accept = 'Yes';
                    decline = 'No';
                    break;
                //Input
                case 3:
                    title = 'Input';
                    accept = 'OK';
                    decline = 'Cancel';
                    break;
            }

            //Set the properties for this prompt
            scope.$$childTail.promptTitle = title;
            scope.$$childTail.promptMessage = message;
            scope.$$childTail.acceptLabel = accept;
            scope.$$childTail.declineLabel = decline;
            scope.$$childTail.acceptCallback = acceptCallback;
            scope.$$childTail.declineCallback = declineCallback;
        }
    }
}]);
app.directive('prompt', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'templates/prompt.html',
        link: function (scope, element, attributes) {
            //Disable controls if any
            setDisabled(true);

            //Function called if the accept button is clicked
            scope.accept = function () {
                close();
                if (scope.acceptCallback)scope.acceptCallback();
            }

            //Function called if the decline button is clicked
            scope.decline = function () {
                close();
                if(scope.declineCallback)scope.declineCallback();
            }

            //Remove this directeve
            function close() {
                scope.$destroy();
                element.remove();
                setDisabled(false);
            }

            //Disables/Enables controls on a form
            function setDisabled(isDisabled) {
                if (scope.form) {
                    angular.forEach(scope.form.$$controls, function (control) {
                        control.$$attr.$set('disabled', isDisabled);
                    });
                }
                
            }
        }
    }
});
app.directive('confirm', function () {
    return {
        require: 'ngModel',
        scope: {
            confirm: '='
        },
        link: function (scope, elm, attrs, ngModelController) {
            ngModelController.$validators.confirm = function (modelValue) {
                return modelValue === scope.confirm;
            };

            scope.$watch("confirm", function () {
                ngModelController.$validate();
            });
        }
    }
});
app.directive('password', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelController) {
            ngModelController.$validators.password = function (modelValue) {
                var regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16})$/
                //Password is empty
                if (modelValue === '' || modelValue === undefined) return true;

                //Password is valid
                if (regex.test(modelValue)) {
                    return true;
                }

                // password is not valid
                return false;
            };
        }
    }
});
app.factory('itemSets', function itemSetsFactory() {
    return{
        setItemSetText: function (legend, height, radioTitle, radio1, radio2, name, currency, frequency, weekly, biWeekly, periodStart, monthly, annually, add, itemName, currencyName) {
            return {
                legend: legend,
                height: height,
                radioTitle: radioTitle,
                radio1: radio1,
                radio2: radio2,
                name: name,
                currency: currency,
                frequency: frequency,
                weekly: weekly,
                biWeekly: biWeekly,
                periodStart: periodStart,
                monthly: monthly,
                annually: annually,
                add: add,
                itemName: itemName,
                currencyName: currencyName
            }
        }
    }
});
app.directive('itemSets', function () {
    return {
        restrict: 'E',
        controller: 'AccountController',
        scope: {
            items: '=',
            itemText: '=',
            form: '='
        },
        templateUrl: 'templates/itemSet.html'
    };
});
app.directive('setName', function () {
    return {
        scope: {
            setName: '@',
            nameIndex: '@',
            numItems: '@',
        },
        link: function (scope, elm, attrs) {
            scope.$watch("numItems", function () {
                attrs.$set('name', scope.setName + scope.nameIndex);
            });

        }
    }
});
app.controller('AccountController', ['$scope', '$http', 'prompt', 'period', 'budgetItem', 'itemSets', function ($scope, $http, prompt, period, budgetItem, itemSets) {
    //Account user info
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    //Employers
    $scope.employers = [new budgetItem('', 0)];
    $scope.employerText = itemSets.setItemSetText('Employer',
                                    500,
                                    'Income Type:',
                                    'Fixed Income',
                                    'Variable Income',
                                    'Employer Name',
                                    'Net Pay',
                                    'Pay Period Frequency:',
                                    'This employer pays me every week on:',
                                    'This employer pays me every other week on:',
                                    'Enter a date when you\'ve received payment from this employer or a date when you expect to be paid:',
                                    'This employer pays me every month on the:',
                                    'This employer pays me every year on:',
                                    'Click to add an employer',
                                    'employer',
                                    'netPay'
                                    );

    //Envelopes
    $scope.envelopes = [new budgetItem('Savings', 1)];
    $scope.envelopeText = itemSets.setItemSetText('Envelope',
                                    671,
                                    'Envelope Type:',
                                    'Dynamic',
                                    'Static',
                                    'Envelope Name',
                                    'Amount',
                                    'Withdraw Frequency:',
                                    'This envelope gets withdrawn every week on:',
                                    'This envelope gets withdrawn every other week on:',
                                    'Enter a date when this envelope has been withdrawn:',
                                    'This envelope gets withdrawn every month on the:',
                                    'This envelope gets withdrawn every year on:',
                                    'Click to add an envelope',
                                    'envelope',
                                    'amount'
                                    );

    //Set the periods
    $scope.periods = period.periods;

    //Add an item to the set
    $scope.addItem = function (item) {
        item.push(new budgetItem('', 0));
    };

    //Remove an item from the set
    $scope.removeItem = function (index, items, name) {
        var i;

        if (name === 'envelope') {
            var staticTypeCount = 0;

            //Get the number of static types
            for (i = 0 ; i < items.length; i++) {
                if (items[i].type === 1) staticTypeCount++;
            }

            //If there is only one remaining static type and you're trying to remove it, throw an error
            if (staticTypeCount === 1 && items[index].type === 1) {
                prompt.show(prompt.type.alert, 'You need at least one static envelope.');
                return;
            }
        }


        //Make sure there is at least one item
        if (items.length === 1) {
            prompt.show(prompt.type.alert, 'You need at least one ' + name + '.');
            return;
        }

        
        var temp = [];
        prompt.show(prompt.type.confirm, 'Are you sure you want to remove this ' + name + '?', function () {
            //Remove the item based on the index passed in
            angular.copy(items, temp);
            temp.splice(index, 1);
            angular.copy(temp, items);
        });
    };


    //Screen
    $scope.screenIndex = 0;
    $scope.setScreen = function (index) {
        var form = $scope.form, formValid = true;

        //Check if any fields are not valid
        if (index === 1) {
            angular.forEach(form.$$controls, function (control) {
                if (control.$validators.required) {
                    if (control.$name === 'firstName' || control.$name === 'lastName' ||
                        control.$name === 'email' || control.$name === 'confirmEmail' ||
                        control.$name === 'password' || control.$name === 'confirmPassword'
                        || control.$name.substring(0, 8) === 'employer' || control.$name.substring(0, 6) === 'netPay') {
                        if (!control.$valid) formValid = false;
                        control.$setTouched();
                    }
                    
                }
            });
        }

        if (!formValid) {
            //Show a message stating to fix errors
            prompt.show(prompt.type.alert, 'Oops! Some fields need your attention. All errors must be corrected before you can move on.');
            return;
        }
        $scope.screenIndex = index;
    }


    //Submit the form
    $scope.submit = function () {
        var form = $scope.form;

        //First check to see if all fields on the form are correctly filled out
        if (!form.$valid) {
            //Loop through each control and set it as touched.
            //Any control not filled out will show an error
            angular.forEach(form.$$controls, function (control) {
                if (control.$validators.required) {
                    control.$setTouched();
                }
            });

            //Show a message stating to fix errors
            prompt.show(prompt.type.alert, 'Oops! Some fields need your attention. All errors must be corrected before this form can be submitted.');
            return;
        }

        //Set the parameters
        var config = {
            params: {
                user: $scope.user,
                employers: $scope.employers,
                envelopes: $scope.envelopes
            }
        }
        $http.get('../Account.asmx/CreateAccount', config)
        .then(function successCallback(response) {

        }, function errorCallback(response) {
            prompt.show(prompt.type.alert, response.statusText);
        });
    }
}]);
app.controller('LoginController', ['$scope', function ($scope) {
    $scope.test = 'hello';
}]);