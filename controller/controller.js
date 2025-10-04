const SignUp = require("../models/authSignup");
const {setUser} = require('../service/auth');
const bcrypt = require('bcrypt');

const handleSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  // Step 1: Check if user already exists
  const existingUser = await SignUp.findOne({ email });

  if (existingUser) {
    return res.render('login', { msg: 'User already exists. Please log in.' });
  }
  
  // Step 2: Create the user if not found
  const user = await SignUp.create({
    name,
    email,
    password,
  });
 const token = setUser(user);
 res.cookie("uid" , token);

  return res.redirect('/home');

  // Step 3: Redirect or login the user after registration
 
};


const handleLogin = async (req , res) => {
  const {email , password} = req.body;
const user = await SignUp.findOne({
  email,
})
  if(!user){return res.json({msg : "invalid user"})};
// if(!user){ return res.render('login' , {msg : "invalid password or username"});
 console.log(user.password);
const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
   return res.render('login', { msg: "Invalid email or password" });
  }


const token = setUser(user);
res.cookie("uid", token, {
  httpOnly: true,  // frontend JS se access na ho
  // secure: true, // sirf HTTPS ke liye – abhi localhost pe ho toh mat lagao
});

// res.json({ token });
res.redirect('/home');
}

const logOut = (req, res) => {

  res.clearCookie('uid'); // 'uid' is the cookie name used for JWT
  res.redirect('/login'); // redirect to login page after logout
};



module.exports = {handleSignUp,handleLogin ,logOut};
