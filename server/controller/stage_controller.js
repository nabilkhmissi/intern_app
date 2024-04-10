const { PfeBook, OffreStage } = require("../models");
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
        const offres = await OffreStage.find({});

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

        const updated_offer = await OffreStage.findOneAndUpdate({ _id : req.params.id }.id, { $set: req.body }, {returnOriginal : false});

        return res.status(200).send({ message : "Offre updated successfully", data : updated_offer });

    } catch (error) {
        next(error);
    }   
}