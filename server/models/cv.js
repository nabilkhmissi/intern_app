const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cv_model = new Schema({
    educations : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
    projects : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    certifications : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certification' }],
    skills : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    experiences : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
})

module.exports = mongoose.model("Cv",cv_model)