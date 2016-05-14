'use strict';

/**
 * @ngdoc function
 * @name quiddityInteractiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quiddityInteractiveApp
 */
angular.module('quiddityInteractiveApp')
  .controller('MainCtrl', function ($scope) {

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
