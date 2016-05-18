'use strict';

/**
 * @ngdoc function
 * @name quiddityInteractiveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quiddityInteractiveApp
 */
angular.module('quiddityInteractiveApp')
  .controller('MainCtrl', function ($scope,TabletopService,$timeout,$location) {

  	$scope.charts = {};

  	$scope.chartData = {};

	$scope.loading = true;

  	TabletopService.getData().then(function(response){
  		$scope.data = response.data;
	  	angular.forEach($scope.data,function(topics,category){
			angular.forEach(topics,function(t){
				$scope.chartData[category+'-'+t.id+'-chart'] = t;
			});
		});
		$timeout(function(){
			$('[data-toggle="tooltip"]').tooltip();
			$scope.createCharts();
			$scope.loading = false;

			//read params
			/*if($location.search().primera && $location.search().segunda){
				console.log($location.search().primera);
				$('.option-primera.'+$location.search().primera).click();
				$('.option-segunda.'+$location.search().segunda).click();
			} else {
				$location.search('');
			}*/

		},1000);
  	});

  	function candidatoTranslate(voto) {
  		switch(voto){
  			case 'otro-massa':
  			case 'otro-stolbizer':
  			case 'otro-del-cano':
  			case 'otro-saa':
  				return 'otro';
  			default:
  				return voto;
  		}
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
  		$scope.primera = candidatoTranslate(candidato);
  		$scope.primera_selection = candidato;
  		angular.element('.option-primera').removeAttr('disabled');
  		$event.currentTarget.disabled = 'disabled';
  		if($scope.primera && $scope.segunda){
  			$scope.updateCharts();
  			//$location.search({'primera':$scope.primera,'segunda':$scope.segunda});
  		}
  	};

  	$scope.selectSegunda = function($event,candidato){
  		$scope.segunda = candidatoTranslate(candidato);
  		angular.element('.option-segunda').removeAttr('disabled');
  		$event.currentTarget.disabled = 'disabled';
  		if($scope.primera && $scope.segunda){
  			$scope.updateCharts();
  			//$location.search({'primera':$scope.primera,'segunda':$scope.segunda});
  		}
  	};

  	$scope.rendered = false;

  	$scope.updateCharts = function(){
        if(!$scope.rendered){
          	$scope.rendered = true;
	  		angular.element('.chart-to-render').each(function(index,item){
				var chart = $scope.charts[item.id];
				$timeout(function(){
				chart.load({
					        columns: [
					            [item.id, $scope.chartData[item.id].total]
					        ]
						});
				},500*index);
			});
		}
  	}


  	$scope.createCharts = function(){
  		var w = $('.col-md-3#example-width .col-xs-12').width();
		$('.chart-to-render').each(function(index,item){
			$scope.charts[item.id] = c3.generate({
				bindto: '#'+item.id,
				size: {
				  height: 50,
				  width: w
				},
			    data: {
			        columns: [
			            [item.id, 0]
			        ],
			        type: 'bar',
				  	color: function (color, d) {
				  		var scale = d3.scale.threshold()
								.range(['#d9534f','#e99184','#e2b9a2','#c7cca6','#9bcc8e','#5cb85c'])
							    .domain([-150,-50,0,50,150]);
				  		return scale(d.value);
					}
			    },
			    axis: {
					rotated: true,
				 	x: {
				    	show: false
				  	},
				  	y:{
				  		show: false,
				  		min: -200,
				  		max: -200,
				  		center: 0
				  	}
				},
				grid: {
				  y: {
				    lines: [
				      {value: 0, text: ''}
				    ]
				  }
				},
				legend: {
				  show: false
				},
				tooltip:{
					contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
			          var $$ = this, config = $$.config,
			              titleFormat = config.tooltip_format_title || defaultTitleFormat,
			              nameFormat = config.tooltip_format_name || function (name) { return name; },
			              valueFormat = config.tooltip_format_value || defaultValueFormat,
			              text, i, title, value, name, bgcolor;

			              var data = $scope.chartData[d[0].id];

			              if (! text) {
			                  text = "<table class='" + $$.CLASS.tooltip + "'><tr><th colspan='2'>"+data.tema+"</th></tr>";
			              }

			              value = 'millones';
			              bgcolor = 'red';

			              var colors = {
								desaprueba_mucho:'#ff0000',
								desaprueba_poco: '#c05e00',
								aprueba_poco: '#7f7500',
								aprueba_mucho: '#008000',
								ns_nc: '#CCC'
			              }

			              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[0].id + "'>";
			              text += " <td class='name'><span style='background-color:" + colors['aprueba_mucho'] + "'></span>Aprueba Mucho</td>";
			              text += " <td class='value'>" + data.aprueba_mucho.toFixed(2) + "%</td>";
			              text += "</tr>";

			              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[0].id + "'>";
			              text += " <td class='name'><span style='background-color:" + colors['aprueba_poco'] + "'></span>Aprueba</td>";
			              text += " <td class='value'>" + data.aprueba_poco.toFixed(2) + "%</td>";
			              text += "</tr>";

			              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[0].id + "'>";
			              text += " <td class='name'><span style='background-color:" + colors['desaprueba_poco'] + "'></span>Desaprueba</td>";
			              text += " <td class='value'>" + data.desaprueba_poco.toFixed(2) + "%</td>";
			              text += "</tr>";

			              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[0].id + "'>";
			              text += " <td class='name'><span style='background-color:" + colors['desaprueba_mucho'] + "'></span>Desaprueba Mucho</td>";
			              text += " <td class='value'>" + data.desaprueba_mucho.toFixed(2) + "%</td>";
			              text += "</tr>";

			              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[0].id + "'>";
			              text += " <td class='name'><span style='background-color:" + colors['ns_nc'] + "'></span>No sabe / No contesta</td>";
			              text += " <td class='value'>" + data.ns_nc.toFixed(2) + "%</td>";
			              text += "</tr>";

			          		return text + "</table>";
			      	}				
				}

			});
  				
		});

  	};

});
