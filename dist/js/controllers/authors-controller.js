angular.module('bibliapp').controller('AuthorsController', AuthorsController);

function AuthorsController($scope, AuthorService, PaginationService, $rootScope, toastr, SweetAlert) {

    $scope.authors = [];
    $scope.aux = [];

    $scope.orderByField = 'id';
    $scope.reverseSort = false;

    $scope.total = 0;
    $rootScope.active = true;

    $scope.filterAuthor = '';

    var success = function(response) {
        console.log(response);
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

    AuthorService.authors(null)
        .then(success)
        .catch(function (error) {
            console.error(error);
        });


    $scope.getNumber = function(num) {
        return new Array(num);
    };


    $scope.remove = function (author) {

        SweetAlert.swal({
                title: "Are you sure?",
                text: "You are going to delete this author permanently!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true},
            function(isConfirm){
                if (isConfirm){
                    AuthorService.remove(author.id)
                        .then(function (result) {
                            var indiceLista = PaginationService.getData().indexOf(author);
                            var indiceDoAuthor = $scope.paginate.result.data.indexOf(author);

                            PaginationService.getData().splice(indiceLista, 1);
                            $scope.paginate.result.data.splice(indiceDoAuthor, 1);
                            toastr.success('Success!', 'Removed');
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            });

    }
}