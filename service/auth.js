const jwt = require('jsonwebtoken');



const setUser = (user) => {
    return jwt.sign({
     _id : user._id,
     email : user.email,
     role : user.role, 
    }, 
    process.env.SECRET,
  {expiresIn :'5d'});
}

const getUser = (token) => {
    try {
      return  jwt.verify(token , process.env.SECRET);
    } catch (error) {
       return null; 
    }
    
}

module.exports = {setUser, getUser};