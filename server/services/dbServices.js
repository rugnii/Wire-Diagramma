const models = require('../models/publicModels')
const mongoose = require('mongoose')
const fs = require('fs')
const util = require('util')
const mkdirAsync = util.promisify(fs.mkdir)
const rmdirAsync = util.promisify(fs.rmdir)
const renameAsync = util.promisify(fs.rename)
const readdirAsync = util.promisify(fs.readdir)
const unlinkAsync = util.promisify(fs.unlink)

const deleteFolderWithObjects = async (path) => {
    const files = await readdirAsync(path)
    for(let file of files){
        console.log('deleting' + file)
        await unlinkAsync(path + '/' + file)
    } 
    return await rmdirAsync(path)
}

const getModelByName = function(name) {
    return models[Object.keys(models).filter(model => models[model].modelName === name)]
}

const getModelNames = async () => {
    const names = []
    for(let model of Object.keys(models)){
        names.push(models[model].modelName)
        //console.log(models[model].modelName)
       //console.log(await getModel({body:{modelName: models[model].modelName}}))
    }
    return names
}
const getDocument = async (req) => {

}
const getFilters = async (req) => {
    return await getModelNames()
}
const getModel = async (req) => {

    //const modelKey = Object.keys(models).filter(model => models[model].modelName === req.params.name)
    //console.log(models[modelKey].schema.obj)
    const fullModel = getModelByName(req.params.name)
    const model = fullModel.schema.obj
    const structure = {} 
    const getNestedObjectStructure = function (object, list) {
        let subModel = {type: 'Object', list: list, subStructure: {}}
        if(list){
            object = object[0]
        }
        for(let key of Object.keys(object)){
            if('type' in object[key]){
                subModel.subStructure[key] = {
                    type: object[key].type.name,
                    name: object[key].ref,
                    list: false
                }
            } else if(Array.isArray(object[key])){
                if('type' in object[key][0]){
                    subModel.subStructure[key] = {
                        type: object[key][0].type.name,
                        name: object[key][0].ref,
                        list: true
                    }
                }
            }
        }
        return subModel
    }
    for(let attrKey of  Object.keys(model)){
        //console.log(model[attrKey])
        if(attrKey !== 'lastModified' && attrKey !== 'dateCreated'){
            let type = ''
            let list = false
            let name = ''
            if('type' in model[attrKey]){
                type = model[attrKey].type.name
            } else if(Array.isArray(model[attrKey])){
                if('type' in model[attrKey][0]){
                    type = model[attrKey][0].type.name,
                    list = true
                } else if(typeof model[attrKey][0] == 'object') {
                    structure[attrKey] = getNestedObjectStructure(model[attrKey], true)
                }
            } else if(typeof model[attrKey] == 'object'){
                structure[attrKey] = getNestedObjectStructure(model[attrKey], false)
            }
            if(model[attrKey].ref){
                name = model[attrKey].ref
            } else if(Array.isArray(model[attrKey])){
                if(model[attrKey][0].ref){
                    name = model[attrKey][0].ref
                    list = true
                }
            }
            structure[attrKey] = structure[attrKey] ? structure[attrKey] : {type: type, name: name, list: list}
        }
    }

    return structure
}
const find = async (req) => {
    let results = []
    let matchingTags = []
    if(req.body.query.$text) {
        const tagModel = getModelByName('Tag')
        res = await tagModel.find(req.body.query).select('_id')
    
        for(let t of res) {
            matchingTags.push(t._id)
        }
    }
    if(req.body.filter !== undefined) {
        if(req.body.filter.length === 0 && req.body.query.$text) {
            req.body.filter = await getModelNames()
        }
        for(let ref of req.body.filter) {
            const model = getModelByName(ref)
            if(!model) {throw "model not found "+ref}
            const query = model.schema.obj.tags && matchingTags.length > 0 ? {$or:[req.body.query, {tags: {$in: matchingTags}}]} : req.body.query
            let result = await model.find(query).populate(req.body.populate).select(req.body.select).sort(req.body.sort).limit(req.body.limit)
            //result = await model.find(req.body.query).populate(req.body.populate).select(req.body.select).sort(req.body.sort).limit(req.body.limit)
            //let result = await model.find(req.body.query).populate(req.body.populate).select(req.body.select).sort(req.body.sort).limit(req.body.limit)
            let resultsAsObjects = []
            for(let res of result) {
                let entry = res.toObject()
                entry.collection = ref
                resultsAsObjects.push(entry)
            }

            results = results.concat(resultsAsObjects)
        }
    }
    //console.log(results)
    return results
}
const create = async (req) => {
    if(req.body.collection){

        const model = getModelByName(req.body.collection)
        console.log('creating new document...')
        console.log(req.body.doc)
        // check if it has a file to be moved to a final destination
        if(req.body.doc.tmpImagePath){
            const id = mongoose.Types.ObjectId()
            req.body.doc._id = id
            const imgName = req.body.doc.filename.replace('JPG', 'jpg').replace('PNG', 'png').replace('#', '_').replace('?','-').replace('jpeg', 'jpg')
            //await mkdirAsync('../static/images/'+id,  { recursive: true })
            await renameAsync(`./tmp/${req.body.doc.tmpImagePath}`, `./static/images/${id.toString()}`)
            req.body.doc.imagePath = imgName
        }
        if(req.body.doc.tmpVideoPath){
            const id = mongoose.Types.ObjectId()
            req.body.doc._id = id
            const imgName = req.body.doc.filename.replace('#', '_').replace('?','-')
            //await mkdirAsync('../static/images/'+id,  { recursive: true })
            await renameAsync(`./tmp/${req.body.doc.tmpVideoPath}`, `./static/videos/${id.toString()}`)
            req.body.doc.videoPath = imgName
        }
        req.body.doc.dateCreated = {by: req.user.name}
        return await model.create(req.body.doc)
    }
}
const update = async (req) => {
    if(req.body.collection){
        const model = getModelByName(req.body.collection)
        req.body.doc.lastModified = {by: req.user.name, 'date': Date.now()}
        if(req.body.doc.tmpImagePath){
            if(fs.existsSync(`./static/images/${req.body.doc._id}`)) {
                await deleteFolderWithObjects(`./static/images/${req.body.doc._id}`)
            } else console.log('file did not exist yet')
            if(fs.existsSync(`./tmp/${req.body.doc.tmpImagePath}`)){
                await renameAsync(`./tmp/${req.body.doc.tmpImagePath}`, `./static/images/${req.body.doc._id}`)
            } else console.log('file could not be moved')
            req.body.doc.imagePath = req.body.doc.filename
        }
        if(req.body.doc.tmpVideoPath){
            if(fs.existsSync(`./static/videos/${req.body.doc._id}`)) {
                await deleteFolderWithObjects(`./static/videos/${req.body.doc._id}`)
            } else console.log('file did not exist yet')
            if(fs.existsSync(`./tmp/${req.body.doc.tmpVideoPath}`)){
                await renameAsync(`./tmp/${req.body.doc.tmpVideoPath}`, `./static/videos/${req.body.doc._id}`)
            } else console.log('file could not be moved')
            req.body.doc.videoPath = req.body.doc.filename
        }
        const update = await model.updateOne({_id: req.body.doc._id}, req.body.doc)
        if(req.body.doc.tmpImagePath) {
            const imgName = req.body.doc.filename.replace('JPG', 'jpg').replace('PNG', 'png').replace('#', '_').replace('?','-').replace('jpeg', 'jpg')
            update.imagePath = imgName
        }
        if(req.body.doc.tmpVideoPath) {
            const imgName = req.body.doc.filename.replace('#', '_').replace('?','-')
            update.videoPath = imgName
        }
        return update
    }

}
const deleteDoc = async (req) => {
    if(req.body.type) {
        console.log(req.body)
        if(req.body.type === 'Image') await deleteFolderWithObjects(`./static/images/${req.body.id}`)
        if(req.body.type === 'Shoe Pair') {
            const refModel = getModelByName('Shoe')
            const response = await refModel.deleteMany({shoePair_HIDDEN_: req.body.id})
            console.log(response)
        }
        const model = getModelByName(req.body.type)
        return await model.deleteOne({_id: req.body.id})
    }
}
const uploadImages = async (req) => {
    console.log("getting upload request")
    console.log(req)
    if(req.files){
        console.log(req.files)
        //if(Array.isArray(req.files.image) || ){
            const id = mongoose.Types.ObjectId()
            await mkdirAsync('./tmp/'+id,  { recursive: true })
            if(Array.isArray(req.files.image)) {
                for(let img of req.files.image) {
                    const imgName = img.name.replace('JPG', 'jpg').replace('PNG', 'png').replace('#', '_').replace('?','-').replace('jpeg', 'jpg')
                    console.log('moving image '+imgName)
                    await img.mv(`./tmp/${id}/${imgName}`)
                }
            } else {
                const imgName = req.files.image.name.replace('#', '_').replace('?','-')
                console.log('moving video '+imgName)
                await req.files.image.mv(`./tmp/${id}/${imgName}`)
            }
            return id.toString()
        //}
    }
}
const deleteUploadedImage = async (req) => {
    if(req.body){
        console.log(req)
        return await deleteFolderWithObjects('./tmp/'+req.body)
    }
}
module.exports = {
    getModelNames,
    getDocument,
    getFilters,
    getModel,
    find,
    create,
    update,
    deleteDoc,
    uploadImages,
    deleteUploadedImage
}