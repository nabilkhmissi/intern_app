const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const certification_model = new Schema({
    domaine : { type : String, required : true },
    date : { type : Date, required : true },
})

module.exports = mongoose.model("Certification",certification_model)