const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const education_model = new Schema({
    etablissement : {
        type : String, required : true
    },
    domaine : {
        type : String, required : true
    },
    start_date : {
        type : Date, required : true
    },
    end_date : {
        type : Date, required : true
    }
    
})

module.exports = mongoose.model("Education",education_model)