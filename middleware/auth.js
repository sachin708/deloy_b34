
var jwt = require('jsonwebtoken');
const auth = (req, res, next)=>{
  
     const token = req.headers.authorization;
     if(token){
        jwt.verify(token, 'shhhhh', (err, decoded)=> {
            if(decoded){
                 console.log(decoded);
                req.body.userID = decoded.userID
                req.body.username = decoded.username
                next();
            } else {
                res.json({err})
            }
          });
     } else {
        res.json({msg:"please login"})
    }
};

module.exports = {
    auth
}