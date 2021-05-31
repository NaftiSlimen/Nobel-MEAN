const mongoose = require("mongoose");
const nobelSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum: ['male', 'female'],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    affiliation:{
        type:String,
        required:true
    },
    bornCountry:{
        type:String,
        required:true
    },
 
});

mongoose.model("nobel", nobelSchema, "laureates");