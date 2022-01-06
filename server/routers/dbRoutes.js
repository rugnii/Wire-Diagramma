const express = require('express')
const auth = require('../middleware/auth')
const dbService = require('../services/dbServices')

const router = express.Router()

const getModelNames = async(req, res) => {
    try {
        res.status(200).send(await dbService.getModelNames(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 
const getDocument = async(req, res) => {
    try {
        res.status(200).send(await dbService.getDocument(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 
const getFilters = async(req, res) => {
    try {
        res.status(200).send(await dbService.getFilters(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 
const getModel = async(req, res) => {
    try {
        res.status(200).send(await dbService.getModel(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 
const find = async(req, res) => {
    try {
        res.status(200).send(await dbService.find(req))
    } catch (error) {
        console.error(error)
        res.statusMessage = error  
        res.status(401).send(error)
    }
} 
const create = async(req, res) => {
    try {
        res.status(200).send(await dbService.create(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 
const update = async(req, res) => {
    try {
        res.status(200).send(await dbService.update(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 
const deleteDoc = async(req, res) => {
    try {
        res.status(200).send(await dbService.deleteDoc(req))
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 
const uploadImages = async(req, res) => {
    try {
        res.set("Content-Type", "text/plain");
        res.status(200).send(await dbService.uploadImages(req))
        //res.status(200).send()
    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 
const removeUploadedImage = async(req, res) => {
    try {
        res.status(200).send(await dbService.deleteUploadedImage(req))

    } catch (error) {
        res.statusMessage = error
        res.status(401).send(error)
    }
} 

router.get('/getModelNames',auth, getModelNames)
router.get('/getDocument/:id',auth, getDocument)
router.get('/getFilters',auth, getFilters)
router.get('/getModel/:name',auth, getModel)

router.post('/find',auth, find)
router.post('/create', auth, create)
router.post('/update', auth, update)
router.post('/deleteDoc', auth, deleteDoc)
router.post('/imageUpload', uploadImages)
router.delete('/imageUpload', removeUploadedImage)
router.get('/imageUpload', (req, res) => console.log(req))


module.exports = router
