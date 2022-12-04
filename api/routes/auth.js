const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const Jwt = require("jsonwebtoken");

//REGISTER ROUTE
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.ENCRYPTION_SECRET)
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(401).json("No User Found")
        }
        else {
            const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.ENCRYPTION_SECRET);
            const dbPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
            if (dbPassword == req.body.password) {

                const accessToken = Jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: "3d" });

                //add accessToken to response body
                const {password, ...others } = user._doc;
                res.status(200).json({...others,accessToken});
            } else {
                res.status(401).json("Wrong Credentials");
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;