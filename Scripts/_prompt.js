app.factory('prompt', ['$compile', function promptFactory ($compile) {
    return {
        type: {
            alert: 1,
            confirm: 2,
            input: 3
        },
        show: function (promptType, message, scope, acceptCallback, declineCallback) {
            var prompt, title, accept, decline;

            switch(promptType) {
                //Alert
                case 1:
                    title = 'Alert';
                    accept = 'OK';
                    break;
                //Confirm
                case 2:
                    title = 'Confirm';
                    accept = 'Yes';
                    decline = 'No';
                    break;
                //Input
                case 3:
                    title = 'Input';
                    accept = 'OK';
                    decline = 'Cancel';
                    break;
            }


            scope.promptTitle = title;
            scope.promptMessage = message;
            scope.acceptLabel = accept;
            scope.declineLabel = decline;
            scope.acceptCallback = acceptCallback;
            scope.declineCallback = declineCallback;


            prompt = $compile('<prompt>')(scope);
            angular.element(document.getElementById("ctrl")).append(prompt);
        }
    }
}]);

app.directive('prompt', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'prompt.html',
        link: function (scope, element, attributes) {
            setDisabled(true);

            scope.accept = function () {
                close();
                scope.acceptCallback();
            }

            scope.decline = function () {
                close();
                scope.declineCallback();
            }

            function close() {
                scope.$destroy();
                element.remove();
                setDisabled(false);
            }

            function setDisabled(isDisabled) {
                angular.forEach(scope.form.$$controls, function (control) {
                    control.$$attr.$set('disabled', isDisabled);
                });
            }
        }
    }
});