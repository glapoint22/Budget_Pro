app.directive('confirm', function () {
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
});
app.directive('password', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelController) {
            ngModelController.$validators.password = function (modelValue) {
                var regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16})$/
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
    }
});