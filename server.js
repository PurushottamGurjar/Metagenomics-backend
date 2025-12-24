import express from "express"
import cors from "cors"

const app=express();
app.use(express.json());
const PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("hi your server is working")
})

app


app.listen(PORT, ()=>{
    console.log(`Hi Purushottam , Your server is working fine on port ${PORT}`);
})