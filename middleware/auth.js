const { getUser } = require('../service/auth'); // adjust path if needed

const restrictToLoggedinUserOnly = (req, res, next) => {
  
  // const token = req.headers["authorization"];
  const token = req.cookies?.uid; // read JWT from cookie

  if (!token) {

    return res.redirect('/signUp'); // no token → redirect to logi
  }
  const user = getUser(token); // decode/verify token

  if (!user) {
    return res.redirect('/login'); // invalid token → redirect to login
  }

  req.user = user; // store user info in request
  next(); // continue to route handler
};

const restricToroles = (roles = [] ) => {
return (req,res,next) => {
  if(!req.user){return res.redirect('/login')};

  if(!roles.includes(req.user.role)) return res.end('unauthorized');

  next();
};
};
module.exports = { restrictToLoggedinUserOnly , restricToroles };
