const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    hash: {
        type: String,
        required: false,
        minLength: 7
    },
    role: 
        {
            type: mongoose.ObjectId,
            ref: "Roles"
        }
    ,
    dateCreated: { 
        type: Date, 
        default: Date.now 
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    activated: Boolean
})
/* 'isModified' does not work here..
userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
*/
userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.generateRegisterToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.EMAIL_SECRET, {expiresIn: '2d'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.methods.generatePasswordToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.SET_PW_SECRET, {expiresIn: '1h'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await userModels.users.findOne({ email}).populate({path: 'role'})
    console.log(user)
    if (!user) {
        throw 'User not found'
    }
    const isPasswordMatch = await bcrypt.compare(password, user.hash)
    if (!isPasswordMatch) {
        throw 'Invalid login credentials'
    }
    return user
}

const userModels = {
    users : mongoose.model('Users', userSchema),
    roles : mongoose.model('Roles', roleSchema)
}

module.exports = userModels