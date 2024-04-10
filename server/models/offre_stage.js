const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const offreStage_model = new Schema({
    creationDate : { type : Date, required : true, default : Date.now() },
    title : { type : String, required : true },
    description : { type: String, required : true },
    technologies : [ { type : String, required : true } ],
    duration : {  type : Number , required : true},
    capacity : {  type : Number , required : true},
    isExpired : { type : Boolean, required : false, default : false }
})

module.exports = mongoose.model("OffreStage",offreStage_model)