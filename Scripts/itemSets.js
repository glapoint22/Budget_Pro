app.factory('itemSets', function itemSetsFactory() {
    return{
        setItemSetText: function (legend, height, radioTitle, radio1, radio2, name, currency, frequency, weekly, biWeekly, periodStart, monthly, annually, add, itemName, currencyName) {
            return {
                legend: legend,
                height: height,
                radioTitle: radioTitle,
                radio1: radio1,
                radio2: radio2,
                name: name,
                currency: currency,
                frequency: frequency,
                weekly: weekly,
                biWeekly: biWeekly,
                periodStart: periodStart,
                monthly: monthly,
                annually: annually,
                add: add,
                itemName: itemName,
                currencyName: currencyName
            }
        }
    }
});
app.directive('itemSets', function () {
    return {
        restrict: 'E',
        controller: 'ItemSetsController',
        scope: {
            items: '=',
            itemText: '=',
            form: '='
        },
        templateUrl: 'item-set.html'
    };
});
app.directive('setName', function () {
    return {
        scope: {
            setName: '@',
            nameIndex: '@',
            numItems: '@',
        },
        link: function (scope, elm, attrs) {
            scope.$watch("numItems", function () {
                attrs.$set('name', scope.setName + scope.nameIndex);
            });

        }
    }
});