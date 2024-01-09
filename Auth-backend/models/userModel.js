const mongoose = require('mongoose')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [30, "Max length must be <30"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        maxLength: [50, "Max length must be <30"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    user_name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    bio: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, { timestamps: true })

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
    // If password is not modified then do not hash it
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    return next();
});
userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            { id: this._id, user_name: this.user_name },
            process.env.SECRET,
            { expiresIn: '24h' }
        )
    }
}



module.exports = mongoose.model("User", userSchema)