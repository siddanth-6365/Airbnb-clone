const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser'); // for req.cookies

const { User } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const jwtSecret = "JWT_for_user_login";

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("tested api working");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.json({
      data: user,
      message: "User created successfully",
      status: StatusCodes.CREATED,
    });
  } catch (err) {
    console.log("error in register api :", err);
    throw new err();
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userbyemail = await User.findOne({
      email,
    });
   
    const Encryptedpass = userbyemail.password;
    const result = bcrypt.compareSync(password, Encryptedpass);
    if (result) {
      jwt.sign(
        { email: userbyemail.email, id: userbyemail._id , name:userbyemail.name},
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            data: userbyemail,
            message: "User found successfully",
            status: StatusCodes.ACCEPTED,
          });
        }
      );
    }
  } catch (err) {
    console.log("error in register api :", err);
    res.json({
      data: userbyemail,
      message: "User not found",
      status: StatusCodes.BAD_REQUEST,
    });
    throw err();
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});

app.listen(3000);
