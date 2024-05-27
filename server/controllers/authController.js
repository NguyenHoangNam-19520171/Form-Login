const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = require("../util/token")

let refreshTokens = []
const authController = {
    // REGISTER
    registerUser: async(req, res) =>{
        try{
            const sait = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,sait);

            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            })

            const user = await newUser.save()
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // REGISTER
    loginUser: async(req, res) =>{
        try{
            const user = await User.findOne({username: req.body.username})
            if(!user){
                return res.status(404).json("Wrong username!")
            }
            else{
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if(!validPassword){
                   return res.status(404).json("Wrong password!")
                }
                if(user && validPassword){
                    const accessToken = createToken.createAccessToken({
                        id: user.id,
                        admin: user.admin,   
                    })
                    const refreshToken = createToken.createRefreshToken({
                        id: user.id,
                        admin: user.admin,   
                    })
                    refreshTokens.push(refreshToken)
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict"
                    }) 
                    const {password, ...others} = user._doc
                    res.status(200).json({...others, accessToken});
                }   
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // REFRESH
    requestRefreshToken: async(req, res) =>{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            return res.status(401).json("You are not authenticated");
        }
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) =>{
            if(err){
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token)=> token !== refreshToken)
            const newAccessToken = createToken.createAccessToken({
                id: user.id,
                admin: user.admin,   
            })
            const newRefreshToken = createToken.createRefreshToken({
                id: user.id,
                admin: user.admin,   
            })
            refreshTokens.push(newRefreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            }) 
            res.status(200).json({newAccessToken});
        })
    },

    // LOGOUT
    userLogout: async(req, res) => {
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out")
    }
}

module.exports = authController