const jwt = require("jsonwebtoken");

const auth = {
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.token
      if (!token) return res.status(400).json({ msg: 'Invalid authentication.' })
      jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
        if (err)
          return res.status(400).json({ msg: 'Error Invalid authentication.' })
        req.user = user
        next()
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
} 

module.exports = auth
