const { Router } = require("express");
const { userModel, purchaseModel } = require("../db");
const userRouter = Router();

const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

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
   const { email , password } = req.body;

  //  Todo: Ideally password should be hashed, and hence you cant comprare the user provided password adn the database password

   const user= await userModel.findOne({
    email:email,
    password:password
   });

   if(user){
    const token = jwt.sign({
      id: user._id
    }, JWT_USER_PASSWORD);

    // Do cookie based logic

    res.json({
      token:token
    })
   }else{
    res.status(403).json({
      message:"Incorrect credentials"
    })
   }
})

  userRouter.get("/purchases" ,userMiddleware, async function(req,res){
    const userId = req.userId;
    const purchases = await purchaseModel.find({
      userId
    })

    res.json({
      purchases
    })
  })

module.exports = {
  userRouter: userRouter
}