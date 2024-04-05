const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const experience_model = new Schema({
    company : {
        type : String, required : true
    },
    job : {
        type : String, required : true
    },
    start_date : {
        type : Date, required : true
    },
    end_date : {
        type : Date, required : true
    },
    description : {
        type : String, required : true
    }
})

module.exports = mongoose.model("Experience",experience_model)