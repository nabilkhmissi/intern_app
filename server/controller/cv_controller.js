const { User, Education, Cv, Experience, Skill, Certification, Project } = require("../models");
const { ApiError } = require("../utils");
const { validateEducation, validateExperience, validateSkill, validateCertification, validateProject } = require("../validators/cv_validator");


//find cv by user id
module.exports.findCvByUserId = async (req, res, next)=>{
    try {
        const userId = req.params.id;
        if(!userId){
            throw new ApiError("Invalid user ID", 400)
        }
        const user = await User.findById(userId);
        if(!user){
            throw new ApiError("User with this id not found", 400)
        }
        const cv = await Cv.findById(user.cv).populate('educations certifications experiences skills projects');

        if(!cv){
            throw new ApiError("Cv with this id not found", 400)
        }
        return res.status(200).send({ message : "Cv retrieved successfully ", data : cv });
    } catch (error) {
        next(error)
    }
}
// ===================================== Educations section =====================================
//add education
module.exports.addEducation = async (req, res, next)=>{
    try {
        const currentUser = await User.findById(req.params.userId);
        if(!currentUser){
            throw new ApiError("user with this id not found", 404)
        }
    
        if(!validateEducation(req.body)){
            throw new ApiError("please fill all fields", 400)
        }
    
        const cv = await Cv.findById(currentUser.cv);

        const new_education = await Education.create(req.body);

        cv.educations.push(new_education);
        await cv.save();

       return res.status(200).send({ message : "Education added successfully", data : new_education })
    } catch (error) {
        next(error)
    }
}
//delete education
module.exports.deleteEducation = async (req, res, next)=>{
    try {
        const id = req.params.id;
        if(!id){
            throw new ApiError("Invalid ID", 400);
        }
        const education = await Education.findById(id);
        if(!education){
            throw new ApiError("education with this id not found", 404)
        }
        await education.deleteOne({ _id : id });

       return res.status(200).send({ message : "Education deleted successfully " })
    } catch (error) {
        next(error)
    }
}
//update education
module.exports.updateEducation = async (req, res, next)=>{
    try {
        const isEducationValid = validateEducation(req.body);
        if(!isEducationValid){
            throw new ApiError("Please fill all fields");
        }
        const updated_education = await Education.findByIdAndUpdate(req.params.id, req.body, { new : true });

       return res.status(200).send({ message : "Education updated successfully", data : updated_education });
    } catch (error) {
        next(error)
    }
}
// ===================================== Experience section =====================================
module.exports.addExperience = async (req, res, next)=>{
    try {
        const userId = req.params.userId
        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new ApiError("user with this id not found", 404)
        }
    
        if(!validateExperience(req.body)){
            throw new ApiError("please fill all fields", 400)
        }
    
        const cv = await Cv.findById(currentUser.cv);

        const new_experience = await Experience.create(req.body);

        cv.experiences.push(new_experience);
        await cv.save();

       return res.status(200).send({ message : "Experience added successfully", data : new_experience })
    } catch (error) {
        next(error)
    }
}
//delete experiences
module.exports.deleteExperience = async (req, res, next)=>{
    try {
        const id = req.params.id;
        if(!id){
            throw new ApiError("Invalid ID", 400);
        }
        const experience = await Experience.findById(id);
        if(!experience){
            throw new ApiError("experience with this id not found", 404)
        }
        await experience.deleteOne({ _id : id });

       return res.status(200).send({ message : "Experience deleted successfully " })
    } catch (error) {
        next(error)
    }
}

//update experience
module.exports.updateExperience = async (req, res, next)=>{
    try {
        const isExperienceValid = validateExperience(req.body);
        if(!isExperienceValid){
            throw new ApiError("Please fill all fields");
        }
        const updated_experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new : true });

       return res.status(200).send({ message : "Experience updated successfully", data : updated_experience });
    } catch (error) {
        next(error)
    }
}

// ===================================== Skills section =====================================
module.exports.addSkill = async (req, res, next)=>{
    try {
        const userId = req.params.userId;
        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new ApiError("user with this id not found", 404)
        }
    
        if(!validateSkill(req.body)){
            throw new ApiError("please fill all fields", 400)
        }
    
        const cv = await Cv.findById(currentUser.cv);

        const new_skill = await Skill.create(req.body);

        cv.skills.push(new_skill);
        await cv.save();

        return res.status(200).send({ message : "Skill added successfully", data : new_skill })
    } catch (error) {
        next(error)
    }
}
//delete skill
module.exports.deleteSkill = async (req, res, next)=>{
    try {
        const id = req.params.id;
        if(!id){
            throw new ApiError("Invalid ID", 400);
        }
        const skill = await Skill.findById(id);
        if(!skill){
            throw new ApiError("Skill with this id not found", 404)
        }
        await Skill.deleteOne({ _id : id });

       return res.status(200).send({ message : "Skill deleted successfully " })
    } catch (error) {
        next(error)
    }
}

//update skill
module.exports.updateSkill = async (req, res, next)=>{
    try {
        const isSkillValid = validateSkill(req.body);
        if(!isSkillValid){
            throw new ApiError("Please fill all fields");
        }
        const updated_skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new : true });

       return res.status(200).send({ message : "Skill updated successfully", data : updated_skill });
    } catch (error) {
        next(error)
    }
}

// ===================================== Certifications section =====================================
//add Certification
module.exports.addCertification = async (req, res, next)=>{
    try {
        const userId = req.params.userId;
        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new ApiError("user with this id not found", 404)
        }
    
        if(!validateCertification(req.body)){
            throw new ApiError("please fill all fields", 400)
        }
    
        const cv = await Cv.findById(currentUser.cv);

        const new_certif = await Certification.create(req.body);

        cv.certifications.push(new_certif);
        await cv.save();

        return res.status(200).send({ message : "Certification added successfully", data : new_certif })
    } catch (error) {
        next(error)
    }
}
//delete Certification
module.exports.deleteCertification = async (req, res, next)=>{
    try {
        const id = req.params.id;
        if(!id){
            throw new ApiError("Invalid ID", 400);
        }
        const certification = await Certification.findById(id);
        if(!certification){
            throw new ApiError("Certification with this id not found", 404)
        }
        await Certification.deleteOne({ _id : id });

       return res.status(200).send({ message : "Certification deleted successfully " })
    } catch (error) {
        next(error)
    }
}

//update Certification
module.exports.updateCertification = async (req, res, next)=>{
    try {
        const isProjectValid = validateCertification(req.body);
        if(!isCertifValid){
            throw new ApiError("Please fill all fields");
        }
        const updated_certif = await Certification.findByIdAndUpdate(req.params.id, req.body, { new : true });

       return res.status(200).send({ message : "Certification updated successfully", data : updated_certif });
    } catch (error) {
        next(error)
    }
}

// ===================================== Projects section =====================================
//add Project
module.exports.addProject = async (req, res, next)=>{
    try {
        const userId = req.params.userId;
        const currentUser = await User.findById(userId);
        if(!currentUser){
            throw new ApiError("user with this id not found", 404)
        }
    
        if(!validateProject(req.body)){
            throw new ApiError("please fill all fields", 400)
        }
    
        const cv = await Cv.findById(currentUser.cv);

        const new_project = await Project.create(req.body);

        cv.projects.push(new_project);
        await cv.save();

        return res.status(200).send({ message : "Project added successfully", data : new_project })
    } catch (error) {
        next(error)
    }
}
//delete Project
module.exports.deleteProject = async (req, res, next)=>{
    try {
        const id = req.params.id;
        if(!id){
            throw new ApiError("Invalid ID", 400);
        }
        const project = await Project.findById(id);
        if(!project){
            throw new ApiError("Project with this id not found", 404)
        }
        await Project.deleteOne({ _id : id });

       return res.status(200).send({ message : "Project deleted successfully " })
    } catch (error) {
        next(error)
    }
}

//update Certification
module.exports.updateProject = async (req, res, next)=>{
    try {
        const isProjectValid = validateProject(req.body);
        if(!isProjectValid){
            throw new ApiError("Please fill all fields");
        }
        const updated_project = await Project.findByIdAndUpdate(req.params.id, req.body, { new : true });

       return res.status(200).send({ message : "Project updated successfully", data : updated_project });
    } catch (error) {
        next(error)
    }
}