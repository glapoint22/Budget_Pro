'use strict';

angular.module('budgetProApp', []).controller('envelopeController', ['$http', function ($http) {
    var ctrl = this;
    $http.get('Envelopes.asmx/GetEnvelopes').then(function (response) {
        ctrl.envelopes = response.data;
    });
}]);

