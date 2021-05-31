angular.module("meanNobel").controller("nobelDisplayController", nobelDisplayController);
function nobelDisplayController(nobelDataFactory, $window, $route, $routeParams) {
    const vm = this;
    const nobelId = $routeParams.nobelID;
    nobelDataFactory.getOneNobel(nobelId)
        .then(function (response) {
            vm.nobel = response;
        }).catch(function (err) { console.log(err) });
    vm.deleteNobel = function (nobelId) {
        nobelDataFactory.deleteNobel(nobelId)
            .then(function (response) {
                console.log("Nobel  deleted");
                $window.alert("Nobel   deleted successfully!");
                $window.location.href = "http://localhost:5000/#/nodels/";
            })
    }

    vm.editNobelF=function(){
        const postData = {
            firstname: vm.newnobelName,
            year: vm.newnobelYear,
            gender: vm.newnobelGender,
            category: vm.newnobelCategory,
            bornCountry: vm.newnobelCountry,
            affiliation: vm.newnobelAffiliation
        };
        nobelDataFactory.fullyUpdateNobel(nobelId,postData)
            .then(function (response) {
                console.log("Nobel  edited");
                $window.alert("Nobel edited successfully!");
                $route.reload();
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    
}