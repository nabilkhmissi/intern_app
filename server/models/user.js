const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const role = require("./ROLES")
const department = require("./departments")

const user_schema = new Schema({
    fullName : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already in use"],
    },
    password : {
        type : String,
        required : true
    },
    salt: { 
        type: String, 
        required: true 
    },
    role : {
        type :String ,
        enum: Object.values(role),
        required : true
    },
    image : {
        type : String,
    },
    nationality : {
        type : String,
        required : true
    },
    dateOfBirth : {
        type : Date,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    department : {
        type : String,
        enum: Object.values(department),
        required : true
    },
    nationality : {
        type : String
    },
    gender : {
        type : String
    },
    isEnabled : {
        type : Boolean,
        default : false
    },
    isBanned : {
        type : Boolean,
        default : false
    },
    cv : { type: mongoose.Schema.Types.ObjectId, ref: 'Cv' }
},
{
    timestamps : true
})

user_schema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.salt
    delete obj.__v
    return obj;
}

module.exports = mongoose.model("User", user_schema)