angular.module('bibliapp').controller('AuthorController', AuthorController);

function AuthorController($scope, AuthorService, $routeParams, toastr, $location, SweetAlert) {

    $scope.author = {};

    if ($routeParams.id) {

        AuthorService.authors($routeParams.id)
            .then(function (result) {
                $scope.author = result.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    $scope.toSubmit = function () {
        if ($scope.form.$valid) {

            if ($scope.author.id) {

                AuthorService.toEdit($scope.author)
                    .then(function (result) {
                        toastr.success('Success!', 'Edited author!');
                        $location.path('/author/index');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            } else {
                AuthorService.save($scope.author)
                    .then(function (result) {
                        toastr.success('Success!', 'Created author!');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            $scope.author = {};
            $scope.form.$setPristine();
        }
    }
}