// const bcrypt = require('bcrypt')
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require('../models/userModel.js')
exports.home = (req, res) => {
    res.send("Welcome to app")
}

exports.login = async (req, res) => {
    const { user_name, password } = req.body
    try {
        const user = await User
            .findOne({
                user_name
            })
            .select("+password");
        // If user is null or the password is incorrect return response with error message
        if (!user || !(await bcrypt.compare(password, user.password))) {
            // bcrypt.compare returns boolean value
            return res.status(400).json({
                success: true,
                message: "invalid credentials"
            });
        }
        
        const token = user.jwtToken();
        user.password = undefined;

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000, //24hr
            httpOnly: true //  not able to modify  the cookie in client side
        };

        res.cookie("token", token, cookieOption); //to store token in cookie of response
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

exports.signup = async (req, res) => {
    const { name, user_name, email, password, bio } = req.body
    try {
        const userInfo = new User(req.body);
        // userSchema "pre" middleware functions for "save" will hash the password using bcrypt
        // before saving the data into the database
        const result = await userInfo.save();
        return res.status(200).json({
            success: true,
            data: result
        });

    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `Account already exist with the provided email ${email} 😒`
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }

    }

}