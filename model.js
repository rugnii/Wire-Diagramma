const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    autor: {type: mongoose.ObjectId, ref: 'User'},
    pages: [{type: mongoose.ObjectId, ref: 'Page'}],
    componentsUsed: [{type: mongoose.ObjectId, ref: 'Component Instance'}],
    connections: [{type: mongoose.ObjectId, ref: ''}],
    versionNumber: {type: String, ref: 'Version'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})

const userSchema = new mongoose.Schema({
    name: {givenName: {type: String, ref:'GivenName'}, lastName: {type: String, ref:'LastName'}},
    
    projects: [{type: mongoose.ObjectId, ref: 'Project'}]
})


const componentOptions = {discrimiatorKey: 'Type'}
const componentSchema = new mongoose.Schema({
    manufacturer: {type: mongoose.ObjectId, ref: 'manufacturer'},
    manufacturerProductNumber: {type: Number, ref: 'Manufacturer Product Number'},
    link: {type: String, ref: 'Link'},
    joints: [{type: mongoose.ObjectId, ref: 'Joint'}],
}, componentOptions)

const wireSchema = new mongoose.Schema({
    crossSection: {type: Number, ref: 'Wire Thickness'},
    jointA: {type: mongoose.ObjectId, ref: 'Joint'},
    jointB: {type: mongoose.ObjectId, ref: 'Joint'}
})

const cableSchema = new mongoose.Schema({
    manufacturer: {type: mongoose.ObjectId, ref: 'Manufacturer'},
    OrderId: {type: String, ref:'Order Id'},
    wires: [{type: mongoose.ObjectId, ref: 'Wire'}],
    ends: [{type: String}]
}, componentOptions)

const jointSchema = new mongoose.Schema({
    type: {type: mongoose.ObjectId, ref: 'Joint Type'}
})

const ref = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})

const jointTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})

const componentInstanceSchema = new mongoose.Schema({
    component: {type: mongoose.ObjectId, ref: 'Component'},
    nameInProject: {type: String, ref: 'Name'},
    connections: [{type: mongoose.ObjectId, ref: 'Conenction'}],
    scaleOnPage: {type: Number, ref: 'Scale'},
    positionOnPage: {x: {type: Number, ref: 'Scale'},y:{type: Number, ref: 'Scale'}},
    scaleOnOverview: {type: Number, ref: 'Scale'},
    positionOnOverview: {x: {type: Number, ref: 'Scale'},y:{type: Number, ref: 'Scale'}},
    positionInCabinet: {x: {type: Number, ref: 'Scale'},y:{type: Number, ref: 'Scale'}},
})

const pageSchema = new mongoose.Schema({
    title: {type: String, ref: 'Title'},
    number: {type: Number, ref: 'Number'},
    components: [{type: mongoose.ObjectId, ref: 'Component Instance'}],
})

const cabinetSchema = new mongoose.Schema({
    name: {type: String, ref: 'Name'},
    Plates: [{size: {x: {type: Number}, y: {type: Number}}, name: {type: Number}, shape:{type:String}}],
    manufacturer
})


const model = {
    project: mongoose.model('Project', projectSchema),
    page: mongoose.model('Page', pageSchema),
    component: mongoose.mode('Component', componentSchema),
    componentInstance: mongoose.model('Component Instance', componentInstanceSchema),
    joint: mongoose.model('Joint', jointSchema),
    jointType: mongoose.model('Joint Type', jointTypeSchema),
    cable: component.discrimiator()
}

model.cable = model.component.discrimiator('Cable', cableSchema)
model.connector = model.component.discrimiator('Connector', connectorSchema)


/*
 ______
|      | : [connector without gender] <> [connector without gender]
| comp | : [connector Male] <> [connetor Female] >> {cable} << [connector Male] <> [connector female] : | comp |
|______| : [connector female] <> {wire} <> [connector female] : |comp|




http://thecodebarbarian.com/2015/07/24/guide-to-mongoose-discriminators



         |      |       ____I___I____
_________|______|_______|             | 


types for components:


*/