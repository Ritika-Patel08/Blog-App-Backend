import express from "express";
import { AllBlogs ,AddBlog,updateBlog,getById,DeleteById,getByUserId} from "../controller/blog-controller";

const Blogrouter=express.Router();

Blogrouter.get("/",AllBlogs);
Blogrouter.post("/addblog",AddBlog);
Blogrouter.put("/update/:id",updateBlog);
Blogrouter.get("/:id",getById);
Blogrouter.delete("/:id",DeleteById);
Blogrouter.get("/user/:id",getByUserId);


export default Blogrouter;