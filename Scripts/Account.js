"use strict";

var app = angular.module('account', []).controller('AccountController', ['$http', 'period', function ($http, period) {
    var ctrl = this;

    //Account user info
    ctrl.fname = '';
    ctrl.lname = '';
    ctrl.email = '';
    ctrl.cEmail = '';
    ctrl.pword = '';
    ctrl.cPword = '';

    //Employers
    ctrl.employers = [new budgetItem()];
    ctrl.addEmployer = function () {
        ctrl.employers.push(new budgetItem());
    };

    ctrl.removeEmployer = function (index) {
        var temp = [];

        //Make sure there is at least one employer
        if (ctrl.employers.length === 1) {
            alert('You need at least one employer.');
            return;
        }

        //Remove the employer based on the index passed in
        angular.copy(ctrl.employers, temp);
        temp.splice(index, 1);
        angular.copy(temp, ctrl.employers);
    };

    ctrl.employerText = new itemText('Employer',
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
    ctrl.envelopes = [new budgetItem()];
    ctrl.addEnvelope = function () {
        ctrl.envelopes.push(new budgetItem());
    };
    ctrl.removeEnvelope = function (index) {
        console.log(index);
    };

    ctrl.envelopeText = new itemText('Envelope',
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
        }
    }

    function budgetItem() {
        return {
            name: '',
            type: 0,
            currency: undefined,
            period: period.setPeriod(0, 0, 1, 31, 0, 11, new Date())
        }
    }





    //frequency
    ctrl.frequency = period.frequency;

    //Days of the week
    ctrl.daysOfWeek = period.daysOfWeek;

    //Days of the month
    ctrl.daysOfMonth = period.daysOfMonth;

    //Months
    ctrl.months = period.months;



    ctrl.screenIndex = 0;

    ctrl.setScreen = function (index) {
        ctrl.screenIndex = index;
    }


    //Submit the form
    ctrl.submit = function (formValid) {
        if (!formValid) {
            alert('Please correct any errors on this form.');
            return;
        }

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
        }


        //$http.get('Account.asmx/CreateAccount', config);
    }
}])
.directive('itemSets', function () {
    return {
        restrict: 'E',
        controller: 'AccountController',
        controllerAs: 'ctrl',
        scope: {
            items: '=item',
            itemText: '=',
            addItem: '&',
            removeItem: '=',
            form: '='
        },
        templateUrl: 'item-set.html'
    };
})
.directive('confirm', function () {
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
})
.directive('password', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelController) {
            ngModelController.$validators.password = function (modelValue) {
                var regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16})$/

                //Password is valid
                if (regex.test(modelValue)) {
                    return true;
                }

                // password is not valid
                return false;

            };
        }
    }
})
.directive('setName', function () {
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



