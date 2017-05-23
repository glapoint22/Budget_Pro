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
        })
        .state('budget', {
            url: '/budget',
            templateUrl: 'templates/budget.html',
            controller: 'BudgetController'
        });
}]);
                