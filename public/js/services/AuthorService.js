angular.module('bibliapp')
    .service('AuthorService', function ($http, $httpParamSerializer) {

        var api = 'https://bibliapp.herokuapp.com/api/authors';

        return {

            authors: function (id) {
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
            },

            authorBook: function (id) {
                return $http({
                    method : 'get',
                    url : api + '/' + id + '/books',
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            },

            //remove todos os livros referentes a um autor
            removeAllBooks: function (id) {
                return $http({
                    method : 'delete',
                    url : api + '/' + id + '/books',
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            },

            count: function (id) {
                return $http({
                    method : 'get',
                    url : api + '/' + id + '/books/count',
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            }
        }
    });
