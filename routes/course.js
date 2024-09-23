const { Router } = require("express");
const courseRouter = Router();

  courseRouter.get("/preview", function(req, res){
    res.json({
      message:"All courses"
      })
  })
  
  
  
  courseRouter.post("/purchase" , function( req , res){
    res.json({
      message:"purchase endpoint"
    })
  })


module.exports = {
  courseRouter:courseRouter
}