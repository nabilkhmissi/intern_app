module.exports = offreStageValidator = (offre)=>{
    if(
        ! offre ||
        ! offre.title ||
        ! offre.description ||
        ! offre.title ||
        ! offre.technologies ||
        offre.technologies.length == 0 ||
        ! offre.duration ||
        ! offre.capacity
        ){
        return false
    }
    return true;
}