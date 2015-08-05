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
    .controller("theController",['$scope','$compile','$sce',function($scope,$compile,$sce){
        $scope.ddoTester = 'woohoo';
        $scope.app = {};
        $scope.app.someHtml = $sce.trustAsHtml('<a href="#" style="color:red">get f</a>');
        //example of $compile service to add new directives ng content with binding
        $scope.addVal = function(v){
            var btn = $compile('<btn val="'+v+'"></btn>')($scope);
            angular.element(document.getElementById('holder')).append(btn);
        }
        $scope.items = [];

        $scope.addItems = function(){
            for(var i = 10; i > 1; i--){
                $scope.items.push({'title':'item'+i});
            }
        }
        $scope.clearItems = function(){
            $scope.items = [];
        }
        $scope.removeItem = function(index){
            $scope.items.splice(index,1);
        }

        console.log('theController scope: ',$scope);


    }])
    .directive("ddo",function(){
        return{
            restrict:"E",
            scope:{ddoTester:"@woo"},
            template:"<h1>{{ddoTester}}</h1>",
            link:function(scope,el,attrs){
                console.log('ddo scope: ',scope);
            }
        }
    })
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
    .directive('note',function(){
        //bindToController
        return{
            restrict:"E",
            scope:{message:"@"},
            bindToController:true,
            controller:"NoteCtrl as note",
            template:"<div>{{note.message}}</div>"
        }
    })
    .controller('NoteCtrl',function(){
        var note = this;
        console.log(this);
    })

