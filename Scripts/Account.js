"use strict";

var app = angular.module('account', []).controller('AccountController', ['$http', 'period', 'prompt', function ($http, period, prompt) {
    var ctrl = this;

    //Account user info
    ctrl.fname = '';
    ctrl.lname = '';
    ctrl.email = '';
    ctrl.cEmail = '';
    ctrl.pword = '';
    ctrl.cPword = '';

    ctrl.p = prompt.show('Gumpy');

    ctrl.addItem = function (item) {
        //Add another item to the array
        item.push(new budgetItem());
    };

    ctrl.removeItem = function (index, item, name) {
        var temp = [];

        //Make sure there is at least one item
        if (item.length === 1) {
            alert('You need at least one ' + name + '.');
            return;
        }

        //Remove the item based on the index passed in
        angular.copy(item, temp);
        temp.splice(index, 1);
        angular.copy(temp, item);
    };

    //Employers
    ctrl.employers = [new budgetItem()];
    ctrl.employerText = new itemText('Employer', 500, 'Income Type:', 'Fixed Income', 'Variable Income', 'Employer Name', 'Net Pay', 'Pay Period Frequency:', 'This employer pays me every week on:', 'This employer pays me every other week on:', 'Enter a date when you\'ve received payment from this employer or a date when you expect to be paid:', 'This employer pays me every month on the:', 'This employer pays me every year on:', 'Click to add an employer', 'employer', 'netPay');

    //Envelopes
    ctrl.envelopes = [new budgetItem()];
    ctrl.envelopeText = new itemText('Envelope', 671, 'Envelope Type:', 'Dynamic', 'Static', 'Envelope Name', 'Amount', 'Withdraw Frequency:', 'This envelope gets withdrawn every week on:', 'This envelope gets withdrawn every other week on:', 'Enter a date when this envelope has been withdrawn:', 'This envelope gets withdrawn every month on the:', 'This envelope gets withdrawn every year on:', 'Click to add an envelope', 'envelope', 'amount');

    function itemText(legend, height, radioTitle, radio1, radio2, name, currency, frequency, weekly, biWeekly, periodStart, monthly, annually, add, itemName, currencyName) {
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
        };
    }

    function budgetItem() {
        return {
            name: '',
            type: 0,
            currency: undefined,
            period: period.setPeriod(0, 0, 1, 31, 0, 11, new Date())
        };
    }

    //frequency
    ctrl.frequency = period.frequency;

    //Days of the week
    ctrl.daysOfWeek = period.daysOfWeek;

    //Days of the month
    ctrl.daysOfMonth = period.daysOfMonth;

    //Months
    ctrl.months = period.months;

    //Screen
    ctrl.screenIndex = 0;
    ctrl.setScreen = function (index) {
        ctrl.screenIndex = index;
    };

    //Submit the form
    ctrl.submit = function (form) {
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
            alert('Please correct any errors on this form.');
            return;
        }

        //Submit the form
        var config = {
            params: {
                user: {
                    firstName: ctrl.fname,
                    lastName: ctrl.lname,
                    email: ctrl.email,
                    password: ctrl.pword
                },
                employers: ctrl.employers,
                envelopes: ctrl.envelopes
            }
        };
        $http.get('Account.asmx/CreateAccount', config).then(function successCallback(response) {}, function errorCallback(response) {
            alert(response.statusText);
        });
    };
}]).directive('itemSets', function () {
    return {
        restrict: 'E',
        controller: 'AccountController',
        controllerAs: 'ctrl',
        scope: {
            items: '=',
            itemText: '=',
            form: '='
        },
        templateUrl: 'item-set.html'
    };
}).directive('confirm', function () {
    return {
        require: 'ngModel',
        scope: {
            confirm: '='
        },
        link: function link(scope, elm, attrs, ngModelController) {
            ngModelController.$validators.confirm = function (modelValue) {
                return modelValue === scope.confirm;
            };

            scope.$watch("confirm", function () {
                ngModelController.$validate();
            });
        }
    };
}).directive('password', function () {
    return {
        require: 'ngModel',
        link: function link(scope, elm, attrs, ngModelController) {
            ngModelController.$validators.password = function (modelValue) {
                var regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16})$/;
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
    };
}).directive('setName', function () {
    return {
        scope: {
            setName: '@',
            nameIndex: '@',
            numItems: '@'
        },
        link: function link(scope, elm, attrs) {
            scope.$watch("numItems", function () {
                attrs.$set('name', scope.setName + scope.nameIndex);
            });
        }
    };
}).directive('promptz', function () {
    return {
        restrict: 'E',
        controller: 'AccountController',
        controllerAs: 'ctrl',
        scope: true,
        template: '<div>{{ctrl.p.title}}</div>'
    };
});

