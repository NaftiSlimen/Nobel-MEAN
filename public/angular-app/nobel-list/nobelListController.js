angular.module("meanNobel").controller("nobelListController", nobelListController);
function nobelListController(nobelDataFactory, $window, $route) {
    const vm = this;
    vm.title = "YOOO this is a list of job";
    vm.number = 0;
    vm.searchResult="kkkkkkkkkkkkkk";
    nobelDataFactory.getAllNobels(vm.number)
        .then(function (response) {
            vm.nobels = response;
        })
    vm.addNobelF = function () {

        const postData = {
            firstname: vm.nobelName,
            year: vm.nobelYear,
            gender: vm.nobelGender,
            category: vm.nobelCategory,
            bornCountry: vm.nobelCountry,
            affiliation: vm.nobelAffiliation
        };

        nobelDataFactory.addNobel(postData)
            .then(function (response) {
                if (!postData.gender){
                    $window.alert("Select a gender please!");
                }else{
                console.log("Nobel  added");
                $window.alert("Nobel  added successfully!");
                $route.reload();}
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    vm.nextPage = function () {

        if ((vm.nobels.length) == 5) {

            vm.number = vm.number + 5;
            nobelDataFactory.getAllNobels(vm.number)
                .then(function (response) {
                    vm.nobels = response;
                })
        }
    }
    vm.previousPage = function () {

        if (vm.number >= 5) vm.number = vm.number - 5;
        nobelDataFactory.getAllNobels(vm.number)
            .then(function (response) {
                vm.nobels = response;
            })
    }
    vm.searchCountry=function(){
        nobelDataFactory.findNobelByCountry(vm.countrySearchedFor)
        .then(function (response) {
            vm.searchResult = response;
        })
    }
    
}