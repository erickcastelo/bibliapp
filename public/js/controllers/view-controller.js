angular.module('bibliapp').controller('ViewController', ViewController);

function ViewController($scope, AuthorService, $routeParams, toastr, $location, SweetAlert) {

    var id = $routeParams.id;

    $scope.authorBooks = [];
    $scope.disabled = '';

    $scope.bool = false;

    AuthorService.authorBook(id)
        .then(function (result) {
            $scope.authorBooks= result.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    AuthorService.authors(id)
        .then(function (result) {
            $scope.author = result.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    AuthorService.count(id)
        .then(function (result) {
            $scope.disabled = result.data.count === 0 ? 'disabled' : '';
        })
        .catch(function (error) {
            console.log(error);
        });

    $scope.remove = function (id) {

        if ($scope.disabled !== 'disabled') {

            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will delete all books from the author!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: true},
                function(isConfirm){
                    if (isConfirm){
                        AuthorService.removeAllBooks(id)
                            .then(function (result) {
                                toastr.success('Success!', 'Removed');

                                $location.path('/author/index');
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }
                });

            // if (confirm('Do you really want to delete all ' + $scope.author.firstName + ' ' + $scope.author.lastName + ' books?')) {
            //
            //     AuthorService.removeAllBooks(id)
            //         .then(function (result) {
            //             toastr.success('Success!', 'Removed');
            //
            //             $location.path('/author/index');
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         })
            // }
        }
    }
}