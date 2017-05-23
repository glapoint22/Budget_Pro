app.factory('prompt', ['$compile', function promptFactory($compile) {
    return {
        //Enumeration for the different prompt types
        type: {
            alert: 1,
            confirm: 2,
            input: 3
        },
        //This method is responsible for showing the prompt
        show: function (promptType, message, scope, acceptCallback, declineCallback) {
            var prompt, title, accept, decline;

            //Create the prompt directive
            prompt = $compile('<prompt>')(scope);
            angular.element(document.body).append(prompt);

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

            //Disable/Enable
            function setDisabled(isDisabled) {
                if (isDisabled) {
                    angular.element(document).find('input, button[type="button"], button[type="submit"], select').attr('disabled', 'disabled')
                } else {
                    angular.element(document).find('input, button[type="button"], button[type="submit"], select').removeAttr('disabled');
                }
            }
        }
    }
});