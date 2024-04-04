const { User, Education } = require("../models");
const { Cv } = require("../models");
const { ApiError } = require("../utils");
const { validateEducation } = require("../validators/cv_validator");

module.exports.addEducation = async (req, res, next)=>{
    const currentUser = await User.findById(req.body.userId).populate("cv");
    if(!currentUser){
        throw new ApiError("user with this id not found", 404)
    }

    if(!validateEducation(req.body)){
        throw new ApiError("please fill all fields", 400)
    }

    const new_education = await Education.create(req.body);
    currentUser.cv.educations.push(new_education);
    const updatedUser = await currentUser.save();

    res.status(200).send({ message : "Education added successfully ", data : new_education })


}
module.exports.addExperience = async (req, res, next)=>{
    
}
module.exports.addSkill = async (req, res, next)=>{
    
}
module.exports.addCertification = async (req, res, next)=>{
    
}
module.exports.addProject = async (req, res, next)=>{
    
}