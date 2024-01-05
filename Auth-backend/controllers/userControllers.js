const User = require('../models/userModel.js')
exports.home = (req, res) => {
    res.send("Welcome to app")
}

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        console.log(name)
        console.log(email)
        if (!name || !email) {
            throw new Error('name and email are required')
        }
        // check if user is already registered
        const userExists = await User.findOne({ email })
        console.log(userExists);
        if (userExists) {
            throw new Error('User already registered')
        }
        const user = await User.create({ name, email }) //command to write document in collection in mongo db
        res.status(201).json({
            sucess: true,
            message: `${name} user created sucessfully`,
            user
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            sucess: false,
            message: error.message
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({"sucess" : true,
            users})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            "sucess": false,
            "message": error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId= req.params.id;
        console.log(userId)
        const userDeleted = await User.findByIdAndDelete(userId)
        res.status(200).json({"sucess" : true,
            "message":"user deleted"})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            "sucess": false,
            "message": error.message
        })
    }
}
exports.editUser = async (req, res) => {
    try {
        const userEdited = await User.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({"sucess" : true,
            "message":"user updated"})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            "sucess": false,
            "message": error.message
        })
    }
}