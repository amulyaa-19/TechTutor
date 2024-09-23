const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded; // Store decoded token for further use
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


  userRouter.post('/signup',async function(req , res){
    const { email, password, firstName, lastName } = req.body;
      //Todo : adding zod validation
      // hash the password so plaintext is not stored in db
   await userModel.create({
      email: email,
      password:password,
      firstName:firstName,
      lastName: lastName
    })

    res.json({
      message:"Signup succeeded"
    })
  })
  
  userRouter.post('/signin',async function(req , res){
   

    res.json({
      message:"Signin endpoint"
    })
  })

  userRouter.get("/mypurchases" , function(req,res){
    res.json({
      message:"My purchased courses"
    })
  })

module.exports = {
  userRouter: userRouter
}