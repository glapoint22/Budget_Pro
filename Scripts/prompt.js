app.factory('prompt', ['$compile', '$rootScope', function promptFactory($compile, $rootScope) {
    return {
        //Enumeration for the different prompt types
        type: {
            alert: 1,
            confirm: 2,
            input: 3
        },
        //This method is responsible for showing the prompt
        show: function (promptType, message, acceptCallback, declineCallback) {
            var prompt, scope, title, accept, decline;

            //Get the scope the prompt is being called in
            scope = $rootScope.$$childTail;

            //Create the prompt directive
            prompt = $compile('<prompt>')(scope);
            angular.element(document.getElementById("ctrl")).append(prompt);

            //Set the prompt type
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

            //Set the properties for this prompt
            scope.$$childTail.promptTitle = title;
            scope.$$childTail.promptMessage = message;
            scope.$$childTail.acceptLabel = accept;
            scope.$$childTail.declineLabel = decline;
            scope.$$childTail.acceptCallback = acceptCallback;
            scope.$$childTail.declineCallback = declineCallback;
        }
    }
}]);
app.directive('prompt', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'templates/prompt.html',
        link: function (scope, element, attributes) {
            //Disable controls if any
            setDisabled(true);

            //Function called if the accept button is clicked
            scope.accept = function () {
                close();
                if (scope.acceptCallback)scope.acceptCallback();
            }

            //Function called if the decline button is clicked
            scope.decline = function () {
                close();
                if(scope.declineCallback)scope.declineCallback();
            }

            //Remove this directeve
            function close() {
                scope.$destroy();
                element.remove();
                setDisabled(false);
            }

            //Disables/Enables controls on a form
            function setDisabled(isDisabled) {
                if (scope.form) {
                    angular.forEach(scope.form.$$controls, function (control) {
                        control.$$attr.$set('disabled', isDisabled);
                    });
                }
                
            }
        }
    }
});