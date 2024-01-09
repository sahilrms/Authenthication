const loginDataValidate = (req, res, next) => {
    const { user_name, password } = req.body;
    let error = {};
    let flag = false;
    if (!user_name) {
        flag = true
        error.user_name = "user_name must be present"
    }
    if (!password) {
        flag = true
        error.password = "password must be present"
    }
flag===true? res.status(400).json(error):next();
}
module.exports = loginDataValidate