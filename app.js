import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import Blogrouter from "./routes/blog-routes";

const app= express();
//middleware;
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",Blogrouter);

mongoose.connect('mongodb+srv://ritikapatel:m4L8BFxVCiTWnHS1@cluster0.gxizwu3.mongodb.net/?retryWrites=true&w=majority'
).then(()=>app.listen(5000))
.then(()=>console.log('connection succeed & listening at 5000'))
.catch( (err)=>console.log(err)) 

