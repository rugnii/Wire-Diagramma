const jwt = require('jsonwebtoken')
const User = require('../models/userModels').users

const auth = async(req, res, next) => {
    const token = req.headers["x-access-token"];
    try {
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        console.log("authentification failed")
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth