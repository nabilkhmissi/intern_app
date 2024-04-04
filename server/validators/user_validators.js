module.exports = validateUser = (user) => {
    if(
           !user.fullName 
        || !user.email
        || !user.department
        || !user.phone
        || !user.role
        || !user.dateOfBirth
        || !user.address
        || !user.gender){
            return false
        }
        return true;
}