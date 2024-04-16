const mongoose = require("mongoose");
const taskStatus = require("./taskStatus");
const Schema = mongoose.Schema;


const task_model = new Schema({
    title : {
        type : String, required : true
    },
    description : {
        type : String, required : true
    },
    start_date : {
        type : Date, required : true
    },
    end_date : {
        type : Date, required : true
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId, ref : "User", required : true
    },
    status : {
        type : String, enum: Object.values(taskStatus)
    }
})

module.exports = mongoose.model("StageTask",task_model)