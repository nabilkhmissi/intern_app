const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const project_model = new Schema({
    organisation : { type : String, required : true },
    title : { type : String, required : true },
    description : { type : String, required : true },
    date : { type : Date, required : true },
})

module.exports = mongoose.model("Project",project_model)