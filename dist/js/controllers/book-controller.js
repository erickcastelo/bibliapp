angular.module('bibliapp').controller('BookController', BookController);

function BookController($scope, AuthorService, BookService, $routeParams, toastr, $location) {

    $scope.book = {};
    $scope.authors = [];

    AuthorService.authors(null)
        .then(function (result) {
            $scope.authors = result.data;
            console.log($scope.authors);
        })
        .catch(function (error) {
            console.log(error);
        });

    if ($routeParams.id) {

        BookService.books($routeParams.id)
            .then(function (result) {
                $scope.book = result.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    $scope.toSubmit = function () {
        console.log($scope.book);

        if ($scope.form.$valid) {

            if ($scope.book.id) {

                BookService.toEdit($scope.book)
                    .then(function (result) {
                        toastr.success('Success!', 'Edited book!');
                        $location.path('/book/index');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }else {
                BookService.save($scope.book)
                    .then(function (result) {
                        toastr.success('Success!', 'Created book!');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            $scope.book = {};
            $scope.form.$setPristine();
        }
    }
}