const{ Router  } = require("express");
const adminRouter = Router();

adminRouter.use(adminMiddleware);

adminRouter.post('/signup', function(req , res){
  res.json({
    message:"Signup endpoint"
  })
})

adminRouter.post('/signin', function(req , res){
  res.json({
    message:"Signin endpoint"
  })
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