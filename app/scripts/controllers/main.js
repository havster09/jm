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
    .controller('cssCtrl',['$scope','$http',cssCtrl])

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
