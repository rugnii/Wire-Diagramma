const mongoose = require('mongoose')


const wireColorSchema = new mongoose.Schema({
    name : {type: String},
    abbrevation : {type: String}
}),

const contactTypeSchema = new mongoose.Schema({
    name: {type: String},
    connectsTo: [{type: mongoose.ObjectId, ref: 'Contact Type'}]
})

const projectSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    autor: {type: mongoose.ObjectId, ref: 'User'},
    pages: [{type: mongoose.ObjectId, ref: 'Page'}],
    //componentsUsed: [{type: mongoose.ObjectId, ref: 'Component Instance'}],
    //connections: [{type: mongoose.ObjectId, ref: ''}],
    versionNumber: {type: String, ref: 'Version'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})

const userSchema = new mongoose.Schema({
    name: {givenName: {type: String, ref:'GivenName'}, lastName: {type: String, ref:'LastName'}},
    
    projects: [{type: mongoose.ObjectId, ref: 'Project'}]
})


const componentOptions = {discrimiatorKey: 'kind'}
const componentSchema = new mongoose.Schema({
    manufacturer: {type: mongoose.ObjectId, ref: 'manufacturer'},
    description: {type: String},
    manufacturerProductNumber: {type: Number, ref: 'Manufacturer Product Number'},
    link: {type: String, ref: 'Link'},
    terminals: [{
        name: {type: String},
        kind: {type: String, enum: ['plug', 'screw', 'push']}, 
        contacts: [{
            id: {type: String}, 
            type: {type: mongoose.ObjectId, ref: "Contact Type"},
            position: {type: String}}]}],
    connectors: [{name: {type: String}, contacts: [{id: {type: String}, type: {type: mongoose.ObjectId, ref: "Contact Type"}}]}],
    appearance: {type: String}  //SVG ?
    //subComponents: [{type: mongoose.ObjectId, Ref : 'Component'}], // do I need this?
}, componentOptions)

/*model.connector = model.component.discrimiator('Connector', connectorSchema)
model.terminal = model.component.discriminator('Terminal', terminalSchema)
model.actuator = model.component.discrimiator('Actuator', actuatorSchema)
model.inputComponent = model.component.discriminator('Input Component', inputComponentSchema)
model.relais = model.component.discrimiator('Relais', relaisSchema)
model.fuse = model.component.discrimiator('Fuse', fuseSchema)
model.cpu = model.component.discriminator('CPU', cpuSchema)
*/

const cableSchema = new mongoose.Schema({
    wires: [{name: {type: String}}],//{type: mongoose.ObjectId, ref: 'Wire'}],
    ends: [{type: String}]
}, componentOptions)

const terminalSchema = new mongoose.Schema({
    wires: [{name: {type: String}}],//{type: mongoose.ObjectId, ref: 'Wire'}],
    ends: [{type: String}]
}, componentOptions)

const actuatorSchema = new mongoose.Schema({
    wires: [{name: {type: String}}],//{type: mongoose.ObjectId, ref: 'Wire'}],
    ends: [{type: String}]
}, componentOptions)

const inputComponentSchema = new mongoose.Schema({
    wires: [{name: {type: String}}],//{type: mongoose.ObjectId, ref: 'Wire'}],
    ends: [{type: String}]
}, componentOptions)

const relaisSchema = new mongoose.Schema({
    wires: [{name: {type: String}}],//{type: mongoose.ObjectId, ref: 'Wire'}],
    ends: [{type: String}]
}, componentOptions)

const fuseSchema = new mongoose.Schema({
    wires: [{name: {type: String}}],//{type: mongoose.ObjectId, ref: 'Wire'}],
    ends: [{type: String}]
}, componentOptions)

const cpuSchema = new mongoose.Schema({
    wires: [{name: {type: String}}],//{type: mongoose.ObjectId, ref: 'Wire'}],
    ends: [{type: String}]
}, componentOptions)
/*
const jointSchema = new mongoose.Schema({
    type: {type: mongoose.ObjectId, ref: 'Joint Type'}
})
*/
const ref = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})
/*
const jointTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})
*/


const componentInstanceSchema = new mongoose.Schema({
    component: {type: mongoose.ObjectId, ref: 'Component'},
    project: {type: mongoose.ObjectId, ref: 'Project'},
    nameInProject: {type: String, ref: 'Name'},
    terminals: [{name: {type: String}, 
                type: {type: String, enum: ['Connector Male', 'Connector Female', 'Push', 'Screw']},
                joints: [
                    {number: {type: Number}, 
                    wire: {type: mongoose.ObjectId, ref: 'Wire Instance'}}
                ]}],
    scaleOnPage: {type: Number, ref: 'Scale'},
    positionOnPage: {x: {type: Number, ref: 'Scale'},y:{type: Number, ref: 'Scale'}},
    scaleOnOverview: {type: Number, ref: 'Scale'},
    positionOnOverview: {x: {type: Number, ref: 'Scale'},y:{type: Number, ref: 'Scale'}},
    positionInCabinet: {x: {type: Number, ref: 'Scale'},y:{type: Number, ref: 'Scale'}},
})

const wireInstanceSchema = new mongoose.Schema({
    project: {type: mongoose.ObjectId, ref: 'Project'},
    crossSection: {type: Number, ref: 'Wire Thickness'},
    color: {type: mongoose.ObjectId, ref: 'Wire Color'}, 
    name : {type : String},
    cable : {type : mongoose.ObjectId, ref : 'Component Instance'}
    //componentA: {type: mongoose.ObjectId, ref: 'Component'},
    //componentB: {type: mongoose.ObjectId, ref: 'Component'}
})

const pageSchema = new mongoose.Schema({
    title: {type: String, ref: 'Title'},
    number: {type: Number, ref: 'Number'},
    components: [{type: mongoose.ObjectId, ref: 'Component Instance'}],
    textBlocks: [{title: {type: String}, text: {type: String}, position: {type: String}}] 
})

const cabinetSchema = new mongoose.Schema({
    name: {type: String, ref: 'Name'},
    Plates: [{size: {x: {type: Number}, y: {type: Number}}, name: {type: Number}, shape:{type:String}}],
    manufacturer
})


const model = {
    project: mongoose.model('Project', projectSchema),
    page: mongoose.model('Page', pageSchema),
    component: mongoose.mode('Component', componentSchema),
    componentInstance: mongoose.model('Component Instance', componentInstanceSchema),
    //joint: mongoose.model('Joint', jointSchema),
    //jointType: mongoose.model('Joint Type', jointTypeSchema),
    wireColor : mongoose.model('Wire Color', wireColorSchema),
    wireInstance : mongoose.model('Wire Instance', wireInstanceSchema),
    contactType : mongoose.model('Contact Type', contactTypeSchema),

    //cable: component.discrimiator()
}

model.cable = model.component.discrimiator('Cable', cableSchema)
model.connector = model.component.discrimiator('Connector', connectorSchema)
model.terminal = model.component.discriminator('Terminal', terminalSchema)
model.actuator = model.component.discrimiator('Actuator', actuatorSchema)
model.inputComponent = model.component.discriminator('Input Component', inputComponentSchema)
model.relais = model.component.discrimiator('Relais', relaisSchema)
model.fuse = model.component.discrimiator('Fuse', fuseSchema)
model.cpu = model.component.discriminator('CPU', cpuSchema)

/*
 ______
|      | : [connector without gender] <> [connector without gender]
| comp | : [connector Male] <> [connetor Female] >> {cable} << [connector Male] <> [connector female] : | comp |
|______| : [connector female] <> {wire} <> [connector female] : |comp|




http://thecodebarbarian.com/2015/07/24/guide-to-mongoose-discriminators



         |      |       ____I___I____
_________|______|_______|             | 

general

types for components:
    Terminal
    Cable
    (Separate) Connector (eg. M12) // connectors that are part of a cable or a component don't count
    Actuator: Motor, Valve, Robot
    Sensor/Button/Switch
    Relais/Schütz
    Fuse/FI-Schutzschalter
    CPU
    Logic-Klemme/Master Module



Needed for in a project:

Project:
    Pages
    Component Instances ?

Page:
    Component Instances (name, connectors.wires, terminals.wires)

Component Instance:
    Name
    Component (type, manufacturer, name)
    Connetors[component.wire]
    Terminals[wire]


(query for BOM Component.find(Component Instances.type != terminal)).expand("Component Instance") ???

    
Needed for in Component Library

Component in all Types


*/