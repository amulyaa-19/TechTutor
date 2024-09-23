const{ Router  } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db")

const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "1234"

// adminRouter.use(adminMiddleware);

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

adminRouter.post('/course', function(req , res){
  res.json({
    message:"Course details"
  })
})

adminRouter.put('/course', function(req , res){
  res.json({
    message:"Change any course if admin wants"
  })
})

adminRouter.get('/course/bulk', function(req , res){
  res.json({
    message:"All courses get displayed"
  })
})

module.exports = {
  adminRouter: adminRouter
}