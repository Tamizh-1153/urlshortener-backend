const User = require("../models/user")
const jwt = require("jsonwebtoken")
var nodemailer = require("nodemailer")
require('dotenv').config()

const register = async (req, res) => {
  
  const user = await User.create({ ...req.body })
  const token = user.generateJWT()
  res.json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.send("Please provide valid email address and password")
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.json({message:"User not found"})
  }
  
  console.log(password,user.password);

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return res.json({message:"Incorrect password"})
  }

  const token = user.generateJWT()
  res.json({ user: { name: user.name }, token })
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const token = user.generateJWT()
    user.token = token
    await user.save()
    console.log(user)
    const resetLink = `${process.env.FRONTEND_URL}/api/v1/reset_password/${user._id}/${token}`

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })

    var mailOptions = {
      from: 'tamizh1153@gmail.com',
      to: email,
      subject: "Password reset ",
      text: resetLink,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent: " + info.response)
      }
    })

    res.json({message:'Reset Link sent via email',resetLink})
  } catch (err) {
    res.send(err)
  }
}

const resetPassword = async (req, res) => {
  const { id, token } = req.params
  const { password } = req.body

  const user = await User.findOne({ _id: id})

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }
  if (user.token != token) {
    return res.status(404).json({ message: "Invalid token" })
  }
  
   
   user.password = password
   user.token = ""
   await user.save()
   console.log(user);
  res.json({ message: "password reset success" })
}

module.exports = { forgotPassword, resetPassword, login, register }
