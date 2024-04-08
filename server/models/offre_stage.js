const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const offreStage_model = new Schema({
    creationDate : { type : Date, required : true },
    title : { type : String, required : true },
    description : { type: String, required : true },
    technologies : [ { type : String, required : true } ],
    duration : {  type : Number , required : true}
})

module.exports = mongoose.model("OffreStage",offreStage_model)