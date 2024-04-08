const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const pfeBook_model = new Schema({
    isCurrent : { type : Boolean, required : true, default : false },
    creationDate : { type : Date, required : true, default : Date.now() },
    file : { type : String, required : true },
    offres : [{ type: mongoose.Schema.Types.ObjectId, ref: 'OffreStage' }],
})

module.exports = mongoose.model("PfeBook",pfeBook_model)