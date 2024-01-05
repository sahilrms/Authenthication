const app=require('./app.js')
const port= process.env.PORT||6000;
app.listen(port,()=>{
    console.log(`server is active on port ${port}`)
})