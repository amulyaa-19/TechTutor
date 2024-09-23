const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "";
const path = require("path");

const { userRouter} = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin")


const app = express();
app.use(express.json());


app.use("/api/v1/user" , userRouter);
app.use("/api/v1/admin" , adminRouter);
app.use("/api/v1/course", courseRouter); 



app.listen(4001);