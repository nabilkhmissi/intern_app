const { PfeBook, OffreStage } = require("../models");
const { ApiError } = require("../utils");
const { validatePfebook } = require("../validators");

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
        const offre = await OffreStage.create(req.body);
        return res.status(200).send({ message : "Offre stage created successfully", data : offre });

    } catch (error) {
        next(error);
    }   

}