angular.module('bibliapp')
    .service('BookService', function ($http, $httpParamSerializer) {

        var api = 'https://bibliapp.herokuapp.com/api/books';

        return {

            books: function (id) {
                var idAux = id !== null ? '/' + id : '';
                return $http({
                    method : 'get',
                    url : api + idAux,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            },
            save: function (author) {
                return $http({
                    method : 'post',
                    data: $httpParamSerializer(author),
                    url : api,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            },
            toEdit: function (author) {
                return $http({
                    method : 'put',
                    data: $httpParamSerializer(author),
                    url : api,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            },
            remove: function (id) {
                return $http({
                    method : 'delete',
                    url : api + '/' + id,
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            }
        }
    });
