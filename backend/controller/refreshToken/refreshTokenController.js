const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../../model/user');

module.exports.handleRefreshToken = async function(req, res){

    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.status(401).json({message: "Unauthorized"});
    }

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken});
    if(!foundUser){
        return res.status(401).json({message: "Unauthorized"});
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err || foundUser._id.toString() !== decoded.userId){
            return res.status(401).json({message: "Unauthorized"});
        }

        const accessToken = jwt.sign({userId: foundUser._id} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });



        return res.json({accessToken});

    });
}