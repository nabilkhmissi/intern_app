const password_utility = require("./password-utility");
const { User, ROLES } = require("../models");
const departments = require("../models/departments");

module.exports = initAdminAccount = async ()=>{
    try {
        const salt = await password_utility.genSalt();
        const password = await password_utility.hashPassword("admin", salt);

        const existed_admin = await User.findOne({ email : "admin@mail.com" });
        if(existed_admin){
            return;
            await User.deleteOne({ email : "admin@mail.com" })
        }
        const user = {
            "fullName": "admin",
            "phone": "9876543210",
            "email": "admin@mail.com",
            "password": password,
            "role": "user",
            "salt": salt,
            // "image": "https://example.com/profile.jpg",
            "nationality": "British",
            "dateOfBirth": "1995-06-15",
            "address": "456 Elm Street, Town, Country",
            "department": departments.system,
            "gender": "male",
            "isEnabled" : "true",
            "isBanned" : "false",
            "role" : ROLES.admin
        };
        await User.create(user);
        console.log("ADMIN ACCOUNT CREATED...");
    } catch (error) {
        console.log(error)
    }
}