const mongoose = require("mongoose");
const  Status  = require("./app_status");
const Schema = mongoose.Schema;


const application_model = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, ref : "User"
    },
    offer : {
        type : mongoose.Schema.Types.ObjectId, ref : "OffreStage"
    },
    date : {
        type : Date, default : Date.now()
    },
    status : {
        type : String, enum: Object.values(Status)
    },
    encadrant : {
        type : mongoose.Schema.Types.ObjectId, ref : "User"
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId, ref : "StageTask"
    }]
})

module.exports = mongoose.model("Application",application_model)