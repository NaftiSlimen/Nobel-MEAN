angular.module("meanNobel").factory("nobelDataFactory", nobelDataFactory);
function nobelDataFactory($http) {
    return {
        getAllNobels: getAllNobels,
        getOneNobel: getOneNobel,
        addNobel:addNobel,
        fullyUpdateNobel:fullyUpdateNobel,
        deleteNobel:deleteNobel,
        findNobelByCountry:findNobelByCountry
    };
    function getAllNobels(number) {
        return $http.get("api/nobel?offset="+number+"&count=5")
            .then(complete)
            .catch(failed);
    }
    function getOneNobel(id) {
        return $http.get("api/nobel/"+id)
            .then(complete)
            .catch(failed);
    }
    function addNobel(nobel) {
        return $http.post("api/nobel",nobel)
            .then(complete)
            .catch(failed);
    }
    function fullyUpdateNobel(id,nobel) {
        return $http.patch("api/nobel/"+id,nobel)
            .then(complete)
            .catch(failed);
    }
    function findNobelByCountry(country) {
        return $http.get("/api/search/"+country)
            .then(complete)
            .catch(failed);
    }
    
    function deleteNobel(id) {
        return $http.delete("api/nobel/"+id)
            .then(complete)
            .catch(failed);
    }
    function complete(response) {
       
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}