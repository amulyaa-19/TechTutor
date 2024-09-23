const express = require("express");
const mongoose = require("mongoose");


const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin")


const app = express();
app.use(express.json());


app.use("/api/v1/user" , userRouter);
app.use("/api/v1/admin" , adminRouter);
app.use("/api/v1/course", courseRouter); 

async function main(){
await mongoose.connect("mongodb+srv://srivastavaamulya19:Amulya19@cluster0.dukem.mongodb.net/techTutor")
app.listen(4001);
}

main();
