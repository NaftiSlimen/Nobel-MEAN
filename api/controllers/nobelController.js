
const mongoose = require("mongoose");
const nobeldb = mongoose.model("nobel");

const showAll=function(req,res){
    let offset=0;
    let count=5;
    if (req.query.offset&&req.query.count){
        offset=parseInt(req.query.offset);
        count=parseInt(req.query.count);
    }
    nobeldb.find().skip(offset).limit(count).exec(function(err,nobels){
        const response = {
            status: 200,
        };
        if (err){
            console.log(err);
            response.status=500;
            response.message=err;
        }else{
            response.message=nobels;
        }
        res.status(response.status).json(response.message);
    })
}

const addNobel=function(req,res){
    const response = {
        status: 200,
        message: "nobel winner added"
    };
    nobeldb.create({
        "firstname": req.body.firstname,
        "year": req.body.year,
        "gender": req.body.gender,
        "category": req.body.category,
        "affiliation": req.body.affiliation,
        "bornCountry": req.body.bornCountry
    }, function (err, createdNobel) {
        if (err) {
            response.status = 400;
            console.log(err);
            response.message = err;
        } else {
            response.status = 201;
            response.message = { "message": "nobel winner created" };
        }
    });
    res.status(response.status).json(response.message);  
}

const removeNobel=function(req,res){
    const nobelId=req.params.nobelID;
    const response = {
        status: 204,
        message: "nobel deleted"
    };
    nobeldb.findByIdAndRemove(nobelId).exec(function(err,nobelDeleted){
        if (err) {
            response.status = 500;
            console.log(err);
            response.message = err;
        } else if(nobelDeleted){
            response.message = {"message":"nodel winner with ID "+nobelId+" has been deleted"};
        } else{
            response.status = 404;
            response.message = {"message":"nodel winner non existent"};
        }
        res.status(response.status).json(response.message);
    })
}

const showOne=function(req,res){
    const nobelId=req.params.nobelID;
    nobeldb.findById(nobelId).exec(function(err,nobel){
        const response = {
            status: 200,
        };
        if (err){
            console.log(err);
            response.status=500;
            response.message=err;
        }else if(nobel){
            response.message=nobel;
        }else{
            response.status=404;
            response.message={"message":"nobel winner not found!"};
        }
        res.status(response.status).json(response.message);
    })

}

const fullyUpdateNobel=function(req,res){
    const nobelId=req.params.nobelID;
    const response = {
        status: 200,
    };
    nobeldb.findById(nobelId).exec(function(err,nobel){
        if (err) {
            response.status = 400;
            console.log(err);
            response.message = err;
        } else if (nobel){
            if (req.body.firstname&&req.body.year&&req.body.gender&&req.body.category&&req.body.affiliation&&req.body.bornCountry){
                nobel.firstname=req.body.firstname;
                nobel.year=req.body.year;
                nobel.gender=req.body.gender;
                nobel.category=req.body.category;
                nobel.affiliation=req.body.affiliation;
                nobel.bornCountry=req.body.bornCountry;
                nobel.save(function(err,updatedNobel){
                    if (err) {
                        response.status = 500;
                        response.message = err;
                        console.log(err);
                    }
                    console.log(updatedNobel);
                    response.message = { "message": "nobel winner fully updated" };
                    
                });
            }else{
                response.status = 400;
                response.message = { "message": "update failed. Check inputs!" };
            }
        } else{
            response.status = 404;
            response.message = { "message": "nobel winner not found!" };
        }
        res.status(response.status).json(response.message);
    })
}

const partiallyUpdateNobel=function(req,res){
    const nobelId=req.params.nobelID;
    const response = {
        status: 200,
        message: "nobel winner partially edited"
    };
    nobeldb.findById(nobelId).exec(function(err,nobel){
        if (err) {
            response.status = 500;
            console.log(err);
            response.message = err;
        } else if (nobel){
            if (req.body.firstname||req.body.year||req.body.gender||req.body.category||req.body.affiliation||req.body.bornCountry){
                if (req.body.firstname) nobel.firstname=req.body.firstname;
                if (req.body.year) nobel.year=req.body.year;
                if (req.body.gender) nobel.gender=req.body.gender;
                if (req.body.category) nobel.category=req.body.category;
                if (req.body.affiliation) nobel.affiliation=req.body.affiliation;
                if (req.body.bornCountry) nobel.bornCountry=req.body.bornCountry;
                nobel.save(function(err,updatedNobel){
                    if (err) {
                        response.status = 500;
                        response.message = err;
                        console.log(err);
                    }
                    console.log(updatedNobel);
                    response.message = { "message": "nobel winner partially updated" };
                    res.status(response.status).json(response.message);
                });
            }
        } else{
            response.status = 404;
            response.message = { "message": "nobel winner not found!" };
        }
        res.status(response.status).json(response.message);
    })
}
const findByCountryOfBirth=function(req,res){
    console.log("searching");
    const country=req.params.countryOfBirth;
    nobeldb.find({"bornCountry":country}).exec(function(err,nobel){
        const response = {
            status: 200,
        };
        if (err){
            response.status = 500;
            console.log(err);
            response.message = err;
        }else{
            response.message=nobel;
            console.log(nobel);
            console.log("found");
        }
        res.status(response.status).json(response.message);
    })

}
module.exports={
    showAll:showAll,
    addNobel:addNobel,
    removeNobel:removeNobel,
    showOne:showOne,
    fullyUpdateNobel:fullyUpdateNobel,
    partiallyUpdateNobel:partiallyUpdateNobel,
    findByCountryOfBirth:findByCountryOfBirth
}
