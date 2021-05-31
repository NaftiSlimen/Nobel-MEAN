var a=angular.module("meanNobel",  ["ngRoute"]).config(config);


function config($routeProvider,$locationProvider)  {
    $locationProvider.hashPrefix("");
     $routeProvider.when("/nobels",  {
         templateUrl:  "angular-app/nobel-list/nobelList.html",
         controller:"nobelListController",
         controllerAs:  "nobelListController"})
         .when("/nobels/:nobelID", {
             templateUrl:  "angular-app/nobel-display/nobelDisplay.html",
             controller: "nobelDisplayController",
             controllerAs:  "nobelDisplayController"})
             .otherwise({redirectTo: "/nobels"});};