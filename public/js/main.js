angular.module('bibliapp', ['ngRoute', 'ngAnimate', 'toastr', 'oitozero.ngSweetAlert'])
    .config(function ($routeProvider, $locationProvider, $qProvider, $httpProvider) {

        $qProvider.errorOnUnhandledRejections(false);
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        $httpProvider.defaults.headers.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;

        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: 'partials/home.html'
        });

        $routeProvider.when('/author/index', {
            templateUrl: 'partials/author/index.html',
            controller: 'AuthorsController'
        });


        $routeProvider.when('/author/cadastrar', {
            templateUrl: 'partials/author/formulario.html',
            controller: 'AuthorController'
        });

        $routeProvider.when('/author/editar/:id', {
            templateUrl: 'partials/author/formulario.html',
            controller: 'AuthorController'
        });

        $routeProvider.when('/book/index', {
            templateUrl: 'partials/book/index.html',
            controller: 'BooksController'
        });

        $routeProvider.when('/book/create', {
            templateUrl: 'partials/book/formulario.html',
            controller: 'BookController'
        });

        $routeProvider.when('/book/edit/:id', {
            templateUrl: 'partials/book/formulario.html',
            controller: 'BookController'
        });

        $routeProvider.when('/author/view/:id', {
            templateUrl: 'partials/author/view.html',
            controller: 'ViewController'
        });

        $routeProvider.otherwise( { redirectTo: '/'} );
    });