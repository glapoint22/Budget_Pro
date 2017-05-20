app.controller('AccountController', ['$scope', '$http', 'prompt', 'period', 'budgetItem', 'itemSets', function ($scope, $http, prompt, period, budgetItem, itemSets) {
    //Account user info
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    //Employers
    $scope.employers = [new budgetItem('', 0)];
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
    $scope.envelopes = [new budgetItem('Savings', 1)];
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
        item.push(new budgetItem('', 0));
    };

    //Remove an item from the set
    $scope.removeItem = function (index, items, name) {
        var i;

        if (name === 'envelope') {
            var staticTypeCount = 0;

            //Get the number of static types
            for (i = 0 ; i < items.length; i++) {
                if (items[i].type === 1) staticTypeCount++;
            }

            //If there is only one remaining static type and you're trying to remove it, throw an error
            if (staticTypeCount === 1 && items[index].type === 1) {
                prompt.show(prompt.type.alert, 'You need at least one static envelope.');
                return;
            }
        }


        //Make sure there is at least one item
        if (items.length === 1) {
            prompt.show(prompt.type.alert, 'You need at least one ' + name + '.');
            return;
        }

        
        var temp = [];
        prompt.show(prompt.type.confirm, 'Are you sure you want to remove this ' + name + '?', function () {
            //Remove the item based on the index passed in
            angular.copy(items, temp);
            temp.splice(index, 1);
            angular.copy(temp, items);
        });
    };


    //Screen
    $scope.screenIndex = 0;
    $scope.setScreen = function (index) {
        var form = $scope.form, formValid = true;

        //Check if any fields are not valid
        if (index === 1) {
            angular.forEach(form.$$controls, function (control) {
                if (control.$validators.required) {
                    if (control.$name === 'firstName' || control.$name === 'lastName' ||
                        control.$name === 'email' || control.$name === 'confirmEmail' ||
                        control.$name === 'password' || control.$name === 'confirmPassword'
                        || control.$name.substring(0, 8) === 'employer' || control.$name.substring(0, 6) === 'netPay') {
                        if (!control.$valid) formValid = false;
                        control.$setTouched();
                    }
                    
                }
            });
        }

        if (!formValid) {
            //Show a message stating to fix errors
            prompt.show(prompt.type.alert, 'Oops! Some fields need your attention. All errors must be corrected before you can move on.');
            return;
        }
        $scope.screenIndex = index;
    }


    //Submit the form
    $scope.submit = function () {
        var form = $scope.form;

        //First check to see if all fields on the form are correctly filled out
        if (!form.$valid) {
            //Loop through each control and set it as touched.
            //Any control not filled out will show an error
            angular.forEach(form.$$controls, function (control) {
                if (control.$validators.required) {
                    control.$setTouched();
                }
            });

            //Show a message stating to fix errors
            prompt.show(prompt.type.alert, 'Oops! Some fields need your attention. All errors must be corrected before this form can be submitted.');
            return;
        }

        //Set the parameters
        var config = {
            params: {
                user: $scope.user,
                employers: $scope.employers,
                envelopes: $scope.envelopes
            }
        }
        $http.get('../Account.asmx/CreateAccount', config)
        .then(function successCallback(response) {

        }, function errorCallback(response) {
            prompt.show(prompt.type.alert, response.statusText);
        });
    }
}]);