const{ Router  } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db")

const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.use(adminMiddleware);

adminRouter.post('/signup', async function(req , res){
  const { email, password, firstName, lastName } = req.body;
      //Todo : adding zod validation
      // hash the password so plaintext is not stored in db
   await adminModel.create({
      email: email,
      password:password,
      firstName:firstName,
      lastName: lastName
    })

    res.json({
      message:"Signup succeeded"
    })
})

adminRouter.post('/signin', async function(req , res){
  const { email , password } = req.body;

  //  Todo: Ideally password should be hashed, and hence you cant comprare the user provided password adn the database password

   const admin = await adminModel.findOne({
    email:email,
    password:password
   });

   if(admin){
    const token = jwt.sign({
      id: admin._id
    }, JWT_ADMIN_PASSWORD);

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

adminRouter.post('/course', adminMiddleware, async function(req , res){
  const adminId = req.userId;
  const{ title, description, imageUrl, price} = req.body;

  await courseModel.create({
    title: title, 
    description: description, 
    imageUrl: imageUrl, 
    price: price, 
    creatorId: adminId
   })

  res.json({
    message:"Course created",
    courseId: course._id
  })
})

adminRouter.put('/course',adminMiddleware, async function(req , res){
  const adminId = req.userId;
  const{ title, description , imageUrl , price, courseId } = req.body;

const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get('/course/bulk',adminMiddleware,async function(req , res){
  const adminId = req.userId;
  const course = await courseModel.find({
    creatorId:adminId
  })
  res.json({
    message:"Coures updated",
    courses
  })
})

module.exports = {
  adminRouter: adminRouter
}