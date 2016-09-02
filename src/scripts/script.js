//// <reference path="angular.min.js"/>
var myApp = angular
  .module( "productModule", ["ui.router"] )
  .config( function ( $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider ) {

    $urlMatcherFactoryProvider.caseInsensitive( true );
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("home", {
        url: '/',
        templateUrl:'src/templates/home.html',
        controller: 'homeController',
        controllerAs:'homeCtrl',
        customData: {
          homeData1 : "Products",
          homeData2 : "Services",
          homeData3 : function(){
            return 'AutoCAD Cloud Services';
          }
        }
      })
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
        },
        data:{
          favoriteProducts1: 'AutoCAD',
          favoriteProducts2: 'MayaLT',
          favoriteProducts3: productsCustomData()
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
  .controller("homeController", function ($state) {
      var vm = this;
      vm.homeFav1 = $state.current.customData.homeData1;
      vm.homeFav2 = $state.get('home').customData.homeData2;
      vm.homeFav3 = $state.current.customData.homeData3();
      vm.fav1 = $state.get('products').data.favoriteProducts1;
      vm.fav2 = $state.get('products').data.favoriteProducts2;
      vm.fav3 = $state.get('products').data.favoriteProducts3;

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
      var vm = this,
        url= "http://localhost:3000";
      url = $stateParams.name ? url + "/searchByName/" + $stateParams.name : url;
      $http.get( url)
      .then( function ( response ){
        vm.products = response.data;
      });
  });


  function productsCustomData() {
    return 'OnlineStorage';
  }
