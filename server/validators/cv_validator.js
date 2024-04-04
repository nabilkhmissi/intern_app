module.exports = {
    validateEducation : (education)=>{
        if(
            !education.etablissement ||
            !education.domaine ||
            !education.start_date ||
            !education.end_date            
            ){
            return false;
        }
        return true;
    },
    validateExperience : (experience)=>{
        if(
            !experience.company ||
            !experience.job ||
            !experience.start_date ||
            !experience.end_date ||
            !experience.description
            ){
            return false;
        }
        return true;
    },
    validateCertification : (certification)=>{
        if(
            !certification.domaine ||
            !certification.date
            ){
            return false;
        }
        return true;
    },
    validateSkill : (skill)=>{
        if(
            !skill.name ||
            !skill.level
            ){
            return false;
        }
        return true;
    },
    validateProject : (project)=>{
        if(
            !project.organisation ||
            !project.title ||
            !project.description ||
            !project.date
            ){
            return false;
        }
        return true;
    }
}