const UModels = require('../models/userModels')
const sendEmail = require('./sendEmail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const getConfirm = async (req) => {
    console.log("confirming..")
    const token = req.headers["x-access-token"];
    if(token == null) throw 'no token send with the request'
    const data = jwt.verify(token, process.env.EMAIL_SECRET)
    const user = await UModels.users.findOneAndUpdate({_id:data._id}, {activated: true})
    if(user == null) throw 'no user found for the token'
    console.log(`found user ${user} and confirmed token`)
    const accessToken = await user.generatePasswordToken()
    const {password, tokens, ...userWithoutPw} = user.toObject
    //console.log(...userWithoutPw)
    //return {...userWithoutPw, accessToken}
    return {user, accessToken}
}
const invite = async (req) => {
    // Create a new user
    console.log("new user being invited "+ req.name)
    await approveRole(req.user, 'admin')
    const roleObject = await UModels.roles.findOne({name: req.body.role})
    if(roleObject._id){
        const user = new UModels.users({
            email: req.body.email,
            name: req.body.name,
            role: roleObject._id,
            activated: false
        })
        console.log("user created")
        console.log(user)
        try{
            await user.save()
            const token = await user.generateRegisterToken()
            let emailSent = await sendEmail(user.email, user.name, token)
        } catch (err) {
            console.log('error while saving user or sending email' +err)
        }

        return{ message: `User ${user.name} created successfully. An invitaion email was sent to ${user.email}`}
    } else throw 'role does not exist'
}

const setPassword = async (req) => {
    const token = req.headers["x-access-token"];
    const {_id} = jwt.verify(token, process.env.SET_PW_SECRET)
    const hash = await bcrypt.hash(req.body.password, 10)
    const user = await UModels.users.findOneAndUpdate({_id:_id}, {
        name: req.body.name, 
        hash: hash,
        tokens: []
    })
    await user.save()
    return user.name
}

const login = async(req) => {
    //Login a registered user
    console.log('gettin log-in request...')
    const { email, password } = req.body
    const user = await UModels.users.findByCredentials(email, password)
    if (!user) {
        throw 'Login failed! Check authentication credentials'
    }
    console.log("credentials found")
    const accessToken = await user.generateAuthToken()
    console.log('new access token created '+ accessToken)
    //const userWithoutPw = {name: user.name, email: user.email}
    const {hash, tokens, role, ...userWithoutPw} = user.toObject()
    userWithoutPw.role = role.name
    console.log("login works??!")
    return {...userWithoutPw, accessToken}
}
/*r
router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})
*/
const logout = async (req) => {
    // Log user out of the application
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
    })
    await req.user.save()
    return true
}

const logoutAll = async(req) => {
    // Log user out of all devices
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
}
const approveRole = async (user, role) => {
    const roleObject = await UModels.roles.findOne({_id: user.role})
    if(roleObject.name === role) { 
        return
    } 
    else throw 'only allowed for admins' 
}

module.exports = {
    getConfirm,
    invite,
    setPassword,
    login,
    logout,
    logoutAll
}