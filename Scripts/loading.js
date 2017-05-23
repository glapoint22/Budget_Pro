app.factory('loading', ['$compile', '$rootScope', function loadingFactory($compile, $rootScope) {
    return {
        //This method is responsible for showing or hiding the loading icon
        set: function (show) {
            var loading;

            //Create the loading directive
            if (show) {
                loading = $compile('<loading>')($rootScope);
                angular.element(document.body).append(loading);
            } else {
                angular.element(document).find('loading').remove();
            }
        }
    }
}]);
app.directive('loading', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/loading.html',
        link: function () {
            //Disable controls if any
            angular.element(document).find('input, button[type="button"], button[type="submit"], select').attr('disabled', 'disabled');
        }
    }
});