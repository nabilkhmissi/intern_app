module.exports = pfeValidator = (pfebook)=>{
    if(
        !pfebook ||
        ! pfebook.file
        ){
        return false
    }
    return true;
}