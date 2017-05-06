"use strict";
angular.module('account', []).controller('AccountController', ['$http', function ($http) {
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
                                    'Click to add an employer'
                                    );




    //Envelopes
    ctrl.envelopes = [new budgetItem()];
    ctrl.addEnvelope = function () {
        ctrl.envelopes.push(new budgetItem());
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
                                    'Click to add an envelope'
                                    );



    function itemText(legend, height, radioTitle, radio1, radio2, name, currency, frequency, weekly, biWeekly, periodStart, monthly, annually, add) {
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
            add: add
        }
    }

    function budgetItem() {
        return {
            name: '',
            type: 0,
            currency: undefined,
            period: new period()
        }
    }



    function period() {
        return {
            frequency: 0,
            dayOfWeek: 0,
            dayOfMonth1: 1,
            dayOfMonth2: 31,
            month1: 0,
            month2: 11,
            periodStart: new Date()
        }
    }





    //Pay period frequency
    ctrl.frequencyList = [
        { id: 0, name: 'Daily' },
        { id: 1, name: 'Weekly' },
        { id: 2, name: 'Bi-Weekly' },
        { id: 3, name: 'Semi-Monthly' },
        { id: 4, name: 'Monthly' },
        { id: 5, name: 'Quarterly' },
        { id: 6, name: 'Semi-Annually' },
        { id: 7, name: 'Annually' }];

    //Days of the week
    ctrl.daysOfWeek = [
        { id: 0, name: 'Sunday' },
        { id: 1, name: 'Monday' },
        { id: 2, name: 'Tuesday' },
        { id: 3, name: 'Wednesday' },
        { id: 4, name: 'Thursday' },
        { id: 5, name: 'Friday' },
        { id: 6, name: 'Saturday' }];

    //Days of the month
    ctrl.daysOfMonth = [
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
        { id: 31, name: '31st' }];

    //Months
    ctrl.months = [
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
        { id: 11, name: 'December' }];
    ctrl.screenIndex = 0;

    ctrl.setScreen = function (index, valid) {
        if (!valid) {
            alert("Form not valid!");
            return;
        }
        ctrl.screenIndex = index;
    }

    ctrl.submit = function () {
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


        $http.get('Account.asmx/CreateAccount', config);
    }
}])
.directive('itemSets', function () {
    return {
        restrict: 'E',
        scope: {
            items: '=item',
            controller: '=',
            itemText: '=',
            addItem: '='
        },
        templateUrl: 'item-set.html'
    };
})
.directive('compare', function () {
    return {
        require: 'ngModel',
        scope: {
            compare: '='
        },
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.compare = function (modelValue) {
                return modelValue === scope.compare;

            };

            scope.$watch("compare", function () {
                ctrl.$validate();
            });

            
        }
    }
});

