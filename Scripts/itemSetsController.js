app.controller('ItemSetsController', ['$scope', 'period', 'prompt', 'budgetItem', 'itemSets', function ($scope, period, prompt, budgetItem, itemSets) {
    //Employers
    $scope.employers = [new budgetItem()];
    $scope.employerText = itemSets.setItemSetText('Employer',
                                    500,
                                    'Income Type:',
                                    'Fixed Income',
                                    'Variable Income',
                                    'Employer Name',
                                    'Net Pay',
                                    'Pay Period Frequency:',
                                    'This employer pays me every week on:',
                                    'This employer pays me every other week on:',
                                    'Enter a date when you\'ve received payment from this employer or a date when you expect to be paid:',
                                    'This employer pays me every month on the:',
                                    'This employer pays me every year on:',
                                    'Click to add an employer',
                                    'employer',
                                    'netPay'
                                    );

    //Envelopes
    $scope.envelopes = [new budgetItem()];
    $scope.envelopeText = itemSets.setItemSetText('Envelope',
                                    671,
                                    'Envelope Type:',
                                    'Dynamic',
                                    'Static',
                                    'Envelope Name',
                                    'Amount',
                                    'Withdraw Frequency:',
                                    'This envelope gets withdrawn every week on:',
                                    'This envelope gets withdrawn every other week on:',
                                    'Enter a date when this envelope has been withdrawn:',
                                    'This envelope gets withdrawn every month on the:',
                                    'This envelope gets withdrawn every year on:',
                                    'Click to add an envelope',
                                    'envelope',
                                    'amount'
                                    );

    //Set the periods
    $scope.periods = period.periods;

    //Add an item to the set
    $scope.addItem = function (item) {
        item.push(new budgetItem());
    };

    //Remove an item from the set
    $scope.removeItem = function (index, item, name) {
        var temp = [];

        //Make sure there is at least one item
        if (item.length === 1) {
            prompt.show(prompt.type.alert, 'You need at least one ' + name + '.');
            return;
        }

        prompt.show(prompt.type.confirm, 'Are you sure you want to remove this ' + name + '?', function () {
            //Remove the item based on the index passed in
            angular.copy(item, temp);
            temp.splice(index, 1);
            angular.copy(temp, item);
        });
    };
}]);