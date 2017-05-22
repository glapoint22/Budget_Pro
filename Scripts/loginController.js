app.controller('LoginController', ['$scope', 'loading', function ($scope, loading) {
    $scope.email = '';
    $scope.password = '';
    $scope.login = function () {
        loading.set(true, $scope);
    }
}]);