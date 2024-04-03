const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cv_model = new Schema({
    education : [{ type: Schema.Types.ObjectId, ref: 'Education' }],
    projects : [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    certification : [{ type: Schema.Types.ObjectId, ref: 'Certification' }],
    skills : [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    Experience : [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
})

module.exports = mongoose.model("Cv",cv_model)