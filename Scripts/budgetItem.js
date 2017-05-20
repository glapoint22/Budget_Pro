app.factory('budgetItem', ['period', function budgetItemFactory(period) {
    return function(name, type){
        return {
            name: name,
            type: type,
            currency: undefined,
            period: period.setPeriod(0, 0, 1, 31, 0, 11, new Date())
        }
    }
}]);