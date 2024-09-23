const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin")


const app = express();
app.use(express.json());


app.use("/api/v1/user" , userRouter);
app.use("/api/v1/admin" , adminRouter);
app.use("/api/v1/course", courseRouter); 

app.listen(4001);

