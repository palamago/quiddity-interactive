'use strict';

/**
 * @ngdoc overview
 * @name quiddityInteractiveApp
 * @description
 * # quiddityInteractiveApp
 *
 * Main module of the application.
 */
angular
  .module('quiddityInteractiveApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('TabletopService', function ($q) {

    this.data = false;

    this.getData = function(){
      var that = this;
      return $q(function(resolve, reject) {
        if(!that.data){
            that.loading = true;
            Tabletop.init( { 
                key: '1gJSWmiZoGJRiE3Ol6wxM1xWFrfHYUboDa6EkzZUgUZQ', //PROD
                    callback: function(data, tabletop) {
                      that.data = {};
                      angular.forEach(tabletop.foundSheetNames,function(sheet){
                        that.data[sheet] = data[sheet].elements.sort(function(a,b){
                          return a<b;
                        });
                      });
                      resolve({data:that.data});
                    },
                    simpleSheet: false,
                    postProcess: function(r){
                      r.total = parseFloat(r.total.replace(',','.'));
                      r.apruebamucho = parseFloat(r.apruebamucho.replace(',','.'));
                      r.apruebapoco = parseFloat(r.apruebapoco.replace(',','.'));
                      r.desapruebamucho = parseFloat(r.desapruebamucho.replace(',','.'));
                      r.desapruebapoco = parseFloat(r.desapruebapoco.replace(',','.'));
                      r.nsnc = parseFloat(r.nsnc.replace(',','.'));
                      return r;
                    }
                  });
        } else {
          resolve({data:that.data});
        }
      });
    };

  });
