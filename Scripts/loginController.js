app.controller('LoginController', ['$scope', 'loading', '$state', 'prompt', function ($scope, loading, $state, prompt) {
    $scope.email = '';
    $scope.password = '';

    //Go to the budget page
    $scope.login = function () {
        if (!$scope.form.$valid) {
            //Show each empty control has an error
            angular.forEach($scope.form.$$controls, function (control) {
                control.$setTouched();
            });

            //Display error prompt
            prompt.show(prompt.type.alert, 'A valid email and password is required to log into your account.', $scope);
            return;
        }

        //Load the budget page
        loading.set(true);
        $state.go('budget');
    }

    //Go to the create account page
    $scope.createAccount = function () {
        $state.go('account')
    }
}]);