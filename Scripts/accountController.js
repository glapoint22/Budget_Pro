app.controller('AccountController', ['$scope', '$http', 'prompt', function ($scope, $http, prompt) {
    //Account user info
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    //Screen
    $scope.screenIndex = 0;
    $scope.setScreen = function (index) {
        $scope.screenIndex = index;
    }


    //Submit the form
    $scope.submit = function (form) {
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
            prompt.show(prompt.type.alert, 'Ooops! Please correct all invalid fields.');
            return;
        }

        //Set the parameters
        var config = {
            params: {
                user: $scope.user,
                employers: $scope.$$childTail.employers,
                envelopes: $scope.$$childTail.envelopes
            }
        }
        $http.get('../Account.asmx/CreateAccount', config)
        .then(function successCallback(response) {

        }, function errorCallback(response) {
            prompt.show(prompt.type.alert, response.statusText);
        });
    }
}]);