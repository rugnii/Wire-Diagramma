const express = require('express')
const auth = require('../middleware/auth')
//const jwt = require('jsonwebtoken')
const config = require('../config')
const userService = require('../services/userServices')

const router = express.Router()


const getInvite = function (req, res) {
    res.send(config.userRoles)
}

const getConfirm = async (req, res) => {
    try {
        res.status(200).send(await userService.getConfirm(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
}
const invite = async (req, res) => {
    // Create a new user
    try {
        res.status(200).send(await userService.invite(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
}
const setPassword = async (req, res) => {
    try {
        res.status(200).send(await userService.setPassword(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
}

const login = async(req, res) => {
    //Login a registered user
    try {
        res.status(200).send(await userService.login(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
}
/*
router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})
*/
const logout = async (req, res) => {
    // Log user out of the application
    try {
        res.status(200).send(await userService.logout(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
}

const logoutAll = async(req) => {
    try {
        res.status(200).send(await userService.logoutAll(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
    // Log user out of all devices
}

router.get('/invite', getInvite)
router.get('/confirm', getConfirm)
router.post('/invite', auth, invite)
router.post('/setPassword', setPassword)
router.post('/login', login)
router.post('/logout', auth, logout)
router.post('/logoutall', auth, logoutAll)

module.exports = router