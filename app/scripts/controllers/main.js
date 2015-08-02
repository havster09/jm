'use strict';

/**
 * @ngdoc function
 * @name jmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jmApp
 */

angular.module('jmApp')
    .controller('theCtrl',['$scope','$http',theCtrl])
    .controller('cssCtrl',['$scope',cssCtrl])
    .controller('appCtrl',['$scope',appCtrl])
    .controller('myCtrl',['$scope','$http',myCtrl])
    .controller('noscopeCtrl',noscopeCtrl)
    .controller('oneCtrl',[oneCtrl])
    .controller('twoCtrl',[twoCtrl])

function oneCtrl(){
    this.title = "terminator"
}

function twoCtrl(){
    this.title = "terminator 2 Judgement day"
}


function noscopeCtrl($scope) {
    this.title = 'Some title';
    this.changelogDirective = 0;
    this.incrementFromDirective = function(){
        this.changelogDirective++;
    }
    $scope.changelog = 1;

    $scope.$watch(angular.bind(this, function () {
        return this.title;
    }),
        function (newVal, oldVal) {
        if(newVal){
            $scope.changelog++;
        }
    });
}

function appCtrl($scope){
    $scope.$on('LOAD',function(){
        $scope.loading=true;
    });
    $scope.$on('UNLOAD',function(){
        $scope.loading=false;
    });
}

function myCtrl($scope,$http){
    $scope.$emit('LOAD');
    $http.jsonp('http://www.filltext.com/?rows=10&fname={firstName}&delay=1&callback=JSON_CALLBACK')
        .success(function(data){
            $scope.people=data;
            $scope.$emit('UNLOAD');
        })
}

function cssCtrl($scope){
    $scope.items = [
        {'title':'a','type':1},
        {'title':'b','type':2},
        {'title':'c','type':1},
        {'title':'d','type':3}
    ];

    $scope.style1 = 'blue';
    $scope.style2 = 'underline';
}

function theCtrl($scope,$http){
    $scope.getPeople = function(count){
        $http.jsonp('http://www.filltext.com/?rows='+count+'&fname={firstName}&callback=JSON_CALLBACK')
            .success(function(data){
                $scope.people = data;
            });
    }
    $scope.countSelection = 10;

    var listener = $scope.$watch('countSelection',function(newVal,oldVal){
        $scope.getPeople(newVal);
    });
    $scope.$watch('people',function(newVal,oldVal){
        if(newVal != oldVal){
            $scope.whenChanged = Date().toString();
        }
    },true);//deep eval of $watch equality
}


angular.module('jmApp')
    .controller('carCtrl', ['$scope', function ($scope) {
        $scope.features = ["this is a car"];
        this.addFeature = function (f) { //this references the controller for nested directives to use
            $scope.features.push(f);
        }
    }]);

angular.module('jmApp')
    .directive("car", function () {
        return{
            restrict: "E",
            scope: true,
            link: function (scope, el, attrs) {
                scope.vm = {};
                scope.vm.model = attrs.model;
            },
            controller: "carCtrl",
            template: "Model:{{vm.model}}<ul class='list-unstyled' data-ng-repeat='feature in features'><li>{{feature}}</li></ul>"
        }
    })
    .directive("wheels", function () {
        return{
            restrict: "A",
            require: "^car",
            link: function (scope, el, attrs, carCtrl) {
                carCtrl.addFeature("has fukin weels");
            }
        }
    })
    .directive("brakes", function () {
        return{
            restrict: "A",
            require: "^car",
            link: function (scope, el, attrs, carCtrl) {
                carCtrl.addFeature("can stop");
            }
        }
    })
