const jwt = require("jsonwebtoken");

const createToken ={

  createAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_KEY, {expiresIn: '30s'})
  },

  createRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_KEY, {expiresIn: '5d'})
  }
}


module.exports = createToken
