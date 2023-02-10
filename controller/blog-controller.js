import mongoose from "mongoose";
import Blog from "../models/blog";
import user from "../models/user";
import User from "../models/user";

export const AllBlogs= async(req,res,next)=>{

let blogs ;
try{
       blogs=await Blog.find();
}catch(err){
    console.log(err);
}
if(!blogs)
{
    return res.status(404).json({message:"Blog not Found"});
}
return res.status(200).json({blogs})
};

export const AddBlog=async(req,res,next)=>{
const {title, description, image, user}=req.body;
     //validation of user - that user exixts or not 
    let existingUser;
    try{
        existingUser=await User.findById(user)
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
    return res.status(400).json({message:"user not found by this id"});
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try
    {    const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();

    }catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
    return res.status(200).json((blog));
};

export const updateBlog=async(req,res,next)=>{
    const  blogId=req.params.id ;  
    const{title,description}=req.body;    
       
    let blog;
    try{
      blog= await Blog.findByIdAndUpdate(blogId,{
        title,
        description
      })
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"cannot update!"});
    }
   return res.status(200).json({blog});
};

export const getById=async(req,res,next)=>{
    const  blogid =req.params.id;
    let blog;
    try{
         blog=await Blog.findById(blogid)
    }catch(err){
        console.log(err);
    }
    if(!blog)
    {
        return res.status(404).json({message:"blog not found"});
    }
    return res.status(200).json({blog});
}

export const DeleteById=async(req,res,next)=>{
  const  blogid=req.params.id;

  let blog;
  try{
        blog= await Blog.findByIdAndRemove(blogid).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
  }catch(err){
        console.log(err);
  }
  if(!blog)
  {
    return res.status(400).json({message:"blog not exist"});
  }
  return res.status(200).json({message:"sucessfully deleted"});
};

export const getByUserId = async(req,res,next)=>{

   const userId=req.params.id;
    let userBlogs;
    try{
           userBlogs = await User.findById(userId).populate('blogs');
    }catch(err){
        console.log(err);
    }
    if(!userBlogs)
    {
        return res.status(200).json({message:"blog not found"});
    }
    return res.status(200).json({blogs:userBlogs});
}