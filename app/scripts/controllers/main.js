'use strict';

/**
 * @ngdoc function
 * @name quiddityInteractiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quiddityInteractiveApp
 */
angular.module('quiddityInteractiveApp')
  .controller('MainCtrl', function ($scope,TabletopService) {

  	TabletopService.getData().then(function(response){
  		$scope.data = response.data;
  		console.log(response.data);
  	});

  	$scope.candidatoText = {
  		'macri':'a Macri',
  		'scioli': 'a Scioli',
  		'blanco': 'en blanco o inpugnaste',
  		'otro': 'a otro candidato'
  	};

  	$scope.category = {
  		'macri-macri':   'base',

  		'scioli-scioli': 'oposicion',

  		'otro-scioli':   'desconfianza',
  		'blanco-scioli': 'desconfianza',
  		'macri-scioli':  'desconfianza',
  		'blanco-blanco': 'desconfianza',
  		'otro-blanco':   'desconfianza',
  		'macri-blanco':  'desconfianza',
  		'scioli-blanco': 'desconfianza',
  		
  		'otro-macri': 	 'confianza',
  		'scioli-macri':  'confianza',
  		'blanco-macri':  'confianza'
  	};

  	$scope.primera = null;
  	$scope.segunda = null;

  	$scope.selectPrimera = function($event,candidato){
  		$scope.primera = candidato;
  		angular.element('.option-primera').removeAttr('disabled');
  		$event.currentTarget.disabled = 'disabled';
  		$scope.renderResponse();
  	};

  	$scope.selectSegunda = function($event,candidato){
  		$scope.segunda = candidato;
  		angular.element('.option-segunda').removeAttr('disabled');
  		$event.currentTarget.disabled = 'disabled';
  		$scope.renderResponse();
  	};

  	$scope.renderResponse = function(){
  		if($scope.primera && $scope.segunda){
  			console.log('render');
  		} else {
  			console.log('nada');
  		}
  	};

  });
