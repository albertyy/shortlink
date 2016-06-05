(function () {

    angular
        .module("TransLink", [])
        .controller("AppController", AppController);

    function AppController($scope, $http) {

        $scope.transfer = transfer;

        function transfer(oldAddr) {

            if($scope.form.$valid) {
                console.log("input is valid");

                var addr = {"oldAddr": oldAddr};

                $http.post("/api/link", addr)
                    .success(function (res) {
                        $scope.newAddr = res;
                    });
            } else {
                console.log("input is not valid");
            }

        }


    }

})();