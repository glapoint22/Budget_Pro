"use strict";
angular.module('account', []).controller('AccountController', function () {
    var ctrl = this;

    ctrl.employers = [{
        name: '',
        incomeType: 0,
        netPay: 0,
        payPeriod: {
            frequency: 0,
            dayOfWeek: 0,
            dayOfMonth1: 1,
            dayOfMonth2: 31,
            month1: 0,
            month2: 0,
            periodStart: new Date()
        }
    }];

    ctrl.addEmployer = function () {
        ctrl.employers.push();
    };

    //Pay period frequency
    ctrl.frequencyList = [{ id: 0, name: 'Daily' }, { id: 1, name: 'Weekly' }, { id: 2, name: 'Bi-Weekly' }, { id: 3, name: 'Semi-Monthly' }, { id: 4, name: 'Monthly' }, { id: 5, name: 'Quarterly' }, { id: 6, name: 'Semi-Annually' }, { id: 7, name: 'Annually' }];

    //Days of the week
    ctrl.daysOfWeek = [{ id: 0, name: 'Sunday' }, { id: 1, name: 'Monday' }, { id: 2, name: 'Tuesday' }, { id: 3, name: 'Wednesday' }, { id: 4, name: 'Thursday' }, { id: 5, name: 'Friday' }, { id: 6, name: 'Saturday' }];

    //Days of the month
    ctrl.daysOfMonth = [{ id: 1, name: '1st' }, { id: 2, name: '2nd' }, { id: 3, name: '3rd' }, { id: 4, name: '4th' }, { id: 5, name: '5th' }, { id: 6, name: '6th' }, { id: 7, name: '7th' }, { id: 8, name: '8th' }, { id: 9, name: '9th' }, { id: 10, name: '10th' }, { id: 11, name: '11th' }, { id: 12, name: '12th' }, { id: 13, name: '13th' }, { id: 14, name: '14th' }, { id: 15, name: '15th' }, { id: 16, name: '16th' }, { id: 17, name: '17th' }, { id: 18, name: '18th' }, { id: 19, name: '19th' }, { id: 20, name: '20th' }, { id: 21, name: '21st' }, { id: 22, name: '22nd' }, { id: 23, name: '23rd' }, { id: 24, name: '24th' }, { id: 25, name: '25th' }, { id: 26, name: '26th' }, { id: 27, name: '27th' }, { id: 28, name: '28th' }, { id: 29, name: '29th' }, { id: 30, name: '30th' }, { id: 31, name: '31st' }];
});

