app.factory('loading', ['$compile', '$rootScope', function loadingFactory($compile, $rootScope) {
    return {
        //This method is responsible for showing or hiding the loading icon
        set: function (show, scope) {
            var loading;

            //Create the loading directive
            if (show) {
                loading = $compile('<loading>')(scope);
                angular.element(document.body).append(loading);
            } else {
                scope.$$childTail.close();
            }
        }
    }
}]);
app.directive('loading', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'templates/loading.html',
        link: function (scope, element, attributes) {
            //Disable controls if any
            setDisabled(true);

            //Remove this directeve
            scope.close = function() {
                scope.$destroy();
                element.remove();
                setDisabled(false);
            }

            //Disables/Enables controls on a form
            function setDisabled(isDisabled) {
                if (scope.form) {
                    if (isDisabled) {
                        document.activeElement.blur();
                        scope.form.$$element.find('input').attr('tabindex', '-1');
                        scope.form.$$element.find('button').attr('tabindex', '-1');
                        scope.form.$$element.find('a').attr('tabindex', '-1');
                    }
                }
            }
        }
    }
});