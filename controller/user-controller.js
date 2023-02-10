import User from '../models/user.js';
import bcrypt from 'bcryptjs';
export const getAllUser = async(req,res,next)=> {
    let users;
    try{
           users= await User.find();
    }catch(err){
          console.log(err);
    }

    if(!users)
    {
        return res.status(404).json({messege:"no user found "});
    }

    return res.status(200).json({users});
};

export const signup=async(req,res,next)=>{

    const{name,email,password}=req.body;

    let existingUser;
    try{
             existingUser=await User.findOne({email});
    }catch(err)
    {
       return console.log(err);
    }
    if(existingUser)
    {
        res.status(400).json({messege:"user alreay exixts ! Login instead"});
    }

    const hashedpassword= bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password:hashedpassword,
        blogs:[]
    });

    try{
            await user.save();
    }catch(err){
          return  console.log(err);   
    }
    return res.status(201).json({user});
};

export const login = async(req,res,next)=>{

    const{email,password}=req.body;
    let existingUser;
    try{
             existingUser=await User.findOne({email});
    }catch(err)
    {
       return console.log(err);
    }
    if(!existingUser)
    {
        res.status(404).json({messege:"user non exist"});
    }

    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect)
    {
        return res.status(404).json({messege:"Wrong password"});
    }
    return res.status(200).json({messege:"login sucessful"});
}