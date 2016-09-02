//// <reference path="angular.min.js"/>
var myApp = angular
  .module( "productModule", ["ui.router"] )
  .config( function ( $stateProvider ) {
    $stateProvider
      .state("products", {
        url: '/products',
        templateUrl:'src/templates/product-table.html',
        controller:'productController',
        controllerAs: 'prdCtrl',
        resolve:{
          products: function($http){
            return $http.get("http://localhost:3000/")
            .then( function ( response ) {
              return response.data;
            });
          }
        }
      })
      .state("searchProducts",{
        url:'/products/searchProducts/:name',
        templateUrl:'src/templates/product-details.html',
        controller:'searchProductsController',
        controllerAs:'prodSearchCtrl'
      })
      .state( "productDetails", {
        url: '/products/:id',
        templateUrl:'src/templates/product-details.html',
        controller:'productDetailsController',
        controllerAs:'prodSearchCtrl'
      })
    })
  .controller( "productController", function ( products, $scope, $state ) {
      var vm = this;
      vm.searchResult = products;
      $scope.searchProducts = function( searchProducts ) {
          $state.go("searchProducts", { name: searchProducts} );
      }

  })
  .controller("productDetailsController", function ( $http, $scope, $stateParams, $log ) {
    var vm = this;
    $http({
            method: 'GET',
            url: 'http://localhost:3000/searchById/' + $stateParams.id,
          })
      .then( function ( response ) {
        vm.products =  response.data;
      });
  })
  .controller("searchProductsController", function($http, $stateParams ){
      var vm = this;
      $http.get("http://localhost:3000/searchByName/" + $stateParams.name)
      .then( function ( response ){
        vm.products = response.data;
      });
  });
