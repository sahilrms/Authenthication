const express= require("express")
const router = express.Router()
const {home,signup,login}=require('../controllers/userControllers.js')
const signupDataValidate= require('../middlewares/signupDataValidate.js')
const loginDataValidate=require("../middlewares/loginDataValidate.js")

router.get("/",home)
router.post("/signup",signupDataValidate,signup)
router.post("/login",loginDataValidate,login)
module.exports=router