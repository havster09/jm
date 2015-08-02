'use strict';

/**
 * @ngdoc function
 * @name jmApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jmApp
 */
angular.module('jmApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
    .controller("theController",['$scope','$compile',function($scope,$compile){
        //example of $compile service to add new directives ng content with binding
        $scope.addVal = function(v){
            var btn = $compile('<btn val="'+v+'"></btn>')($scope);
            angular.element(document.getElementById('holder')).append(btn);
        }
    }])
    .directive("btn",function(){
        return{
            restrict:"E",
            scope:{
                'val':'@'
            },
            template:"<button>{{val}}</button>",
            link:function(scope,el,attrs){
                el.on('click',function(){
                    alert(attrs.val);
                })
            }
        }
    })
    .directive('m',['$parse',function($parse){
        //$example of $parse - returns a function that needs executing
        return{
            restrict:"E",
            scope:{},
            link:function(scope,el,attrs){
                scope.inner = $parse(attrs.eq)();
                console.log(attrs.eq);
;            },
            template:'{{inner}}<br/>'
        }
    }])
