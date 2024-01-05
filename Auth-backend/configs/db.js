const mongoose= require('mongoose');
const connectToDB = async () =>{
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>console.log("Mongo Db connected")).catch((err)=>{
        console.log("error is "+err)
        process.exit(1)
    })
}
module.exports= connectToDB;