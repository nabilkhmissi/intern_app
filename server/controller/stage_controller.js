const { PfeBook, OffreStage, User, OffreApplication, Status, app_status, StageTask } = require("../models");
const { encadrant } = require("../models/ROLES");
const offer_application = require("../models/offer_application");
const stage_tasks = require("../models/stage_tasks");
const { ApiError } = require("../utils");
const { validatePfebook, validateOffreStage } = require("../validators");

module.exports.createPfeBook = async (req, res, next)=>{
    try {
        if(validatePfebook(req.body)){
            throw new ApiError("Invalid Pfe book details");
        }
        if (!req.file) {
            throw new ApiError("Pfebook file is required", 400);
        }
        req.body.file = req.file.filename;
        const new_pfebook = await PfeBook.create(req.body);
        return res.status(200).send({ message : "Pfe book created successfully", data : new_pfebook });

    } catch (error) {
        next(error);
    }
}
module.exports.getPfeBooks = async (req, res, next)=>{
    try {
        const pfebooks = await PfeBook.find({});
        return res.status(200).send({ message : "Pfebooks retrieved successfully", data : pfebooks });

    } catch (error) {
        next(error);
    }   

}
module.exports.createOffreStage = async (req, res, next)=>{
    try {
        if(!validateOffreStage(req.body)){
            throw new ApiError("Invalid Internship offer details", 400);
        }
        const offre = await OffreStage.create(req.body);

        return res.status(200).send({ message : "Offre stage created successfully", data : offre });

    } catch (error) {
        next(error);
    }   

}
module.exports.findAllOffres = async (req, res, next)=>{
    try {
        const { isExpired } = req.query;
        let offres;
        if(isExpired != undefined){
            offres = await OffreStage.find({ isExpired : isExpired });
        }else{
            offres = await OffreStage.find();
        }
        return res.status(200).send({ message : "Offre stage retrieved successfully", data : offres });

    } catch (error) {
        next(error);
    }   

}
module.exports.deleteOffer = async (req, res, next)=>{
    try {
        if(!req.params.id){
            throw new ApiError("Invalid Offer ID", 400);
        }
        await OffreStage.deleteOne({ _id : req.params.id });

        return res.status(200).send({ message : "Offre deleted successfully" });

    } catch (error) {
        next(error);
    }   
}
module.exports.updateOffer = async (req, res, next)=>{
    try {
        if(!req.params.id){
            throw new ApiError("Invalid Offer ID", 400);
        }
        if(!validateOffreStage(req.body)){
            throw new ApiError("Invalid Offre details", 400);
        }
        const old_offer = await OffreStage.findById(req.params.id);
        if(!old_offer){
            throw new ApiError("Offer stage with this ID not found", 400);
        }

        const updated_offer = await OffreStage.findOneAndUpdate({ _id : req.params.id }, { $set: req.body }, {returnOriginal : false});

        return res.status(200).send({ message : "Offre updated successfully", data : updated_offer });

    } catch (error) {
        next(error);
    }   
}

module.exports.apply = async (req, res, next)=>{
    try {
        if(!req.params.id){
            throw new ApiError("Invalid Offer ID", 400);
        }
        if(!req.params.userId){
            throw new ApiError("Invalid User ID", 400);
        }
        const offre = await OffreStage.findById(req.params.id);
        const user = await User.findById(req.params.userId);
        const application = await OffreApplication.findOne({ user : req.params.userId, offer : req.params.id });

        if(!application){
            await OffreApplication.create({ user : req.params.userId, offer : req.params.id });
            return res.status(200).send({ message : "Application sent successfully"});
        }else{
            await OffreApplication.deleteOne({ user : req.params.userId, offer : req.params.id });
            return res.status(200).send({ message : "Application cancelled successfully"});
        }

    } catch (error) {
        next(error);
    }   
}

module.exports.getAllApplications = async (req, res, next)=>{
    try {
       
        const applications = await OffreApplication.find({}).populate("user offer")
        return res.status(200).send({ message : "Applications retrieved successfully", data : applications });
    } catch (error) {
        next(error);
    }
}
module.exports.findApplicationsByUserId = async (req, res, next)=>{
    try {
        if(!req.params.userId){
            throw new ApiError("Invalid user ID", 400);
        }
        const applications = await OffreApplication.find({ user : req.params.userId }).populate("user offer");
        return res.status(200).send({ message : "Applications retrieved successfully", data : applications });
    } catch (error) {
        next(error);
    }
}
//TODO : should email candidate whenever the application approved
module.exports.handleApplication = async (req, res, next)=>{
    try {
        if(!req.params.id){
            throw new ApiError("Invalid application ID", 400);
        }
        const application = await OffreApplication.findById(req.params.id).populate("user offer");
        if(!application){
            throw new ApiError("Application with this id not found", 400);
        }
        const action = req.params.action;
        if(action === "accept"){
            application.status = app_status.accepted;
        }else{
            application.status = app_status.rejected;
        }
        const updatedApplication = await application.save();

        if(action == "accept"){
            return res.status(200).send({ message : "Applications accepted successfully", data : updatedApplication });
        }else{
            return res.status(200).send({ message : "Applications rejected successfully", data : updatedApplication });
        }
    } catch (error) {
        next(error);
    }
}
module.exports.setEncadrant = async (req, res, next)=>{
    try {
        if(!req.params.id){
            throw new ApiError("Invalid application ID", 400);
        }
        const { encadrantId } = req.body;
        if(!encadrantId){
            throw new ApiError("Invalid encadrant ID");
        }
        const encadrant = await User.findById(encadrantId);
        if(!encadrant){
            throw new ApiError("Encadrant with this ID not found");
        }
        const application = await OffreApplication.findById(req.params.id).populate("user offer");
        if(!application){
            throw new ApiError("Application with this id not found", 400);
        }
        console.log("here")
        application.encadrant = encadrant;
        const updatedApplication = await application.save();

        return res.status(200).send({ message : "Encadrant set successfully", data : updatedApplication });

    } catch (error) {
        next(error);
    }
}

module.exports.createTask = async (req, res, next)=>{
    try {
        const applicationId = req.params.id;
    
        const app = await offer_application.findById(applicationId).populate("tasks");
        if(!app){
            throw new ApiError("Invalid Application ID");
        }
        const new_task = await StageTask.create(req.body);
        app.tasks.push(new_task);
        await app.save();
        return res.status(200).send({ message : "Task created successfully", data : new_task });
    } catch (error) {
        next(error);
    }

}

module.exports.deleteTask = async (req, res, next)=>{
    try {
    
        await StageTask.deleteOne({ _id : req.params.id });

        return res.status(200).send({ message : "Task deleted successfully" });
    } catch (error) {
        next(error);
    }

}

module.exports.getApplicationTasks = async (req, res, next)=>{
    try {
        const applicationId = req.params.id;
        const app = await offer_application.findById(applicationId).populate("tasks");
        if(!app){
            throw new ApiError("Invalid Application ID");
        }

        res.status(200).send({ message : "Tasks retrieved successfully", data : app });
    } catch (error) {
        next(error);
    }
}
//todo
module.exports.completeTask = async (req, res, next)=>{
    try {
        const taskId = req.params.id;
        const task = await stage_tasks.findById(taskId);
        if(!task){
            throw new ApiError("Task not found");
        }

        task.status = taskStatus

        res.status(200).send({ message : "Tasks retrieved successfully", data : app });
    } catch (error) {
        next(error);
    }
}