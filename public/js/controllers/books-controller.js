angular.module('bibliapp').controller('BooksController', BooksController);

function BooksController($scope, BookService, PaginationService, $rootScope, toastr, SweetAlert) {

    $scope.aux = [];

    $scope.orderByField = 'id';
    $scope.reverseSort = false;

    $scope.total = 0;
    $rootScope.active = true;

    $scope.filterBook = '';

    var success = function(response) {

        PaginationService.configure({
            data:response.data,
            perPage: 5
        });

        $scope.paginate = {
            result : PaginationService.goToPage(0),
            total : PaginationService.itemsTotal(),
            next : function() {
                $scope.paginate.result = PaginationService.next();
            },
            prev : function() {
                $scope.paginate.result = PaginationService.prev();
            },
            indice : function (id) {
                $scope.paginate.result = PaginationService.goToPage(id);
            }
        };
        $scope.total = PaginationService.pagesTotal();
    };

    BookService.books(null)
        .then(success)
        .catch(function (error) {
            console.log(error)
        });

    $scope.getNumber = function(num) {
        return new Array(num);
    };


    $scope.remove = function (book) {

        SweetAlert.swal({
                title: "Are you sure?",
                text: "You are going to delete this book permanently!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true},
            function(isConfirm){
                if (isConfirm){
                    BookService.remove(book.id)
                        .then(function (result) {
                            var indiceLista = PaginationService.getData().indexOf(book);
                            var indiceDoBook = $scope.paginate.result.data.indexOf(book);

                            PaginationService.getData().splice(indiceLista, 1);
                            $scope.paginate.result.data.splice(indiceDoBook, 1);
                            toastr.success('Success!', 'Removed');
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            });
    }
}