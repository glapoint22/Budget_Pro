app.factory('prompt', function () {
    return {
        show: function(title) {
            return {
                title: title
            }
        }
    }
});