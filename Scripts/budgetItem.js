app.factory('budgetItem', ['period', function budgetItemFactory(period) {
    return function(){
        return {
            name: '',
            type: 0,
            currency: undefined,
            period: period.setPeriod(0, 0, 1, 31, 0, 11, new Date())
        }
    }
}]);