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
      .state( "productDetails", {
        url: '/products/:id',
        templateUrl:'src/templates/product-details.html',
        controller:'productDetailsController',
        controllerAs:'prodSearchCtrl'
      })
    })
  .controller( "productController", function ( products, $scope ) {
      var vm = this;
      vm.searchResult = products;
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
  });
