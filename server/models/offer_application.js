const mongoose = require("mongoose")
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
    isAccepted : {
        type : Boolean, default : false
    }
})

module.exports = mongoose.model("Application",application_model)