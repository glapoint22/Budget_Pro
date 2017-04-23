'use strict';

angular.module('budgetProApp', []).controller('envelopeController', ['$http', function ($http) {
    var ctrl = this;
    var config = {
        params: {
            fname: 'Walter',
            lname: 'White',
            email: 'ww@gmail.com',
            pword: 'meth1',
            employers: [{
                name: 'Car Wash',
                incomeType: 1,
                netPay: 252000.52,
                payPeriod: {
                    frequency: 1,
                    dayOfWeek: 1,
                    dayOfMonth1: 1,
                    dayOfMonth2: 1,
                    month1: 1,
                    month2: 1,
                    periodStart: '2017-4-4'
                }

            }, {
                name: 'Los Pollos Hermanos',
                incomeType: 2,
                netPay: 185.91,
                payPeriod: {
                    frequency: 2,
                    dayOfWeek: 5,
                    dayOfMonth1: 10,
                    dayOfMonth2: 8,
                    month1: 6,
                    month2: 8,
                    periodStart: '2017-12-8'
                }
            }]
        }
    };
    $http.get('Account.asmx/CreateAccount', config);
}]);

