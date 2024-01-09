var validator = require("email-validator");
function signupDataValidate(req, res, next) {
    const { name, user_name, email, password, confirmPassword, bio } = req.body

    let error = {};
    let flag = false;
    if (!name) {
        flag = true;
        error.name = "name is not provided"
    }


    if (!user_name) {
        flag = true;
        error.user_name = "user_name is not provided"
    }

    if (!email) {
        flag = true;
        error.email = "email is not provided"
    }

    if (!password) {
        flag = true;
        error.password = "password is not provided"
    }

    if (password !== confirmPassword) {
        flag = true;
        error.confirmPassword = "password and confirm password should be same"
    }

    if (!bio) {
        flag = true;
        error.bio = "bio is not provided"
    }

    if (!validator.validate(email)) {
        flag = true;
        error.email = "email is not valid string"
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/;
    if (!passwordRegex.test(password)) {
        flag = true;
        error.password = "password must have atleast 5 digits with capital,small and numbers"
    }

    if (flag === true) {
        flag = false;
        res.status(400).json(error)
    }
    else { next(); }

}
module.exports = signupDataValidate