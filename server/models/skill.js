const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const skill_model = new Schema({
    name : { type : String, required : true },
    level : { type : Number, required : true },
})

module.exports = mongoose.model("Skill",skill_model)