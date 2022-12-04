const Jwt = require("jsonwebtoken");

//AUTHENTICATION FOR ALL USERS
//Check for accesstoken in headers
//verify token 
//if verification is successful set the request user to the user object from jwt token
const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                res.status(403).json("Token is not valid");
            }else{
                req.user = user;
                console.log(user);
                next();
            }
        });
    }else{
        return res.status(401).json("User not authenticated");
    }
};

//authentication for user and admin
const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        //if current user is logged or if it is admin
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("permission denied")
        }
    });
}

//authentication for admin
const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        //if current user is logged or if it is admin
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("permission denied")
        }
    });
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};