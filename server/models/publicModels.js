const mongoose = require('mongoose')

const shoeModelSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    series: {type: mongoose.ObjectId, ref: 'Shoe Serie'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    primaryMaterial: {type: mongoose.ObjectId, ref: 'Material'},
    cut: {type: mongoose.ObjectId, ref: 'Shoe Cut'},
    /*characteristics: {type: String, text: true, ref:'Description Block'},
    year: {type: String, text: true, ref:'Year'},
    materials: {
        outsoleMaterial: {type: mongoose.ObjectId, ref: 'Material'},
        midsoleMaterial: {type: mongoose.ObjectId, ref: 'Material'},
        technology: {type: mongoose.ObjectId, ref: 'Technology'},
        upperMainMaterial: {type: mongoose.ObjectId, ref: 'Material'},
        upperSecondaryMaterial: {type: mongoose.ObjectId, ref: 'Material'},
        lacesMaterial: {type: mongoose.ObjectId, ref: 'Material'},
        liningMaterial: {type: mongoose.ObjectId, ref: 'Material'}
    },
    flaws: [{type: mongoose.ObjectId, ref: 'Flaw'}],
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    links: [{type: mongoose.ObjectId, ref: 'Link'}],
    notes: {type: String, text: true, ref:'Notes Block'},*/
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const shoeSeriesSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    acronym: {type: String, text: true, ref:'Acronym'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    characteristics: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const shoeSectionSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    characteristics: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const shoeCutSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    characteristics: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const shoePairsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    model: {type: mongoose.ObjectId, ref: 'Shoe Model'},
    size: {type: Number, ref: 'Size (US)'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    notes: {type: String, text: true, ref:'Notes Block'},
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const shoeSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    interventionStage: {type: mongoose.ObjectId, ref: 'Intervention Stage'},
    shoePair_HIDDEN_: {type: mongoose.ObjectId, ref: 'Shoe Model'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    notes: {type: String, text: true, ref:'Notes Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const interventionsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    time: {type: Number, ref: 'Time in Minutes'},
    //interventionStage: {type: mongoose.ObjectId, ref: 'Intervention Stage'},
    flawsWorkedWith: [{type: mongoose.ObjectId, ref: 'Flaw'}],
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    shoe: {type: mongoose.ObjectId, ref: 'Shoe'},
    steps: [{    
        process: {type: mongoose.ObjectId, ref: 'Intervention Type'},
        tools: [{type: mongoose.ObjectId, ref: 'Tool'}],
        supplies: [{type: mongoose.ObjectId, ref: 'Supply'}],
        description: {type: String, text: true, ref:'Description Block'}, 
        time: {type: Number, ref: 'Time for Step'}
    }],
    //skills: [{type: mongoose.ObjectId, ref: 'Skill'}],
    evaluation: {
        aesthetics: {type: Number, ref: 'Visual Result Rating'},
        sustainability: {type: Number, ref: 'Sustainability Rating'},
        durability: {type: Number, ref: 'Durability Rating'}, 
        time: {type: Number, ref: 'Time Rating'},
        processPotential: {type: Number, ref: 'Potential for improvment Rating'},
        result: {type: mongoose.ObjectId, ref: 'Result Rating'},
        automationPotential: {type: Number, ref: 'Automation Potential Rating'},
    },
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    notes: {type: String, text: true, ref:'Notes Block'},
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const interventionStageSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    order: {type: Number, ref: 'Order'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const imagesSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    propertyOfPch: {type: Boolean, ref: 'Property of PCH'},
    imagePath: {type: String, text: true, ref:'Image Path'},
    description: {type: String, text: true, ref:'Description Block'},
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const videosShema= new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    propertyOfPch: {type: Boolean, ref: 'Property of PCH'},
    videoPath: {type: String, text: true, ref:'Video Path'},
    description: {type: String, text: true, ref:'Description Block'},
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const materialsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    description: {type: String, text: true, ref:'Description Block'},
    composition: {type: String, text: true, ref:'Composition Block'},
    treatments: [{type: mongoose.ObjectId, ref: 'Material Treatment'}],
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const flawsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    shoe: {type: mongoose.ObjectId, ref: 'Shoe'},
    flawType: {type: mongoose.ObjectId, ref: 'Flaw Type'},
    positionOnShoe: {type: mongoose.ObjectId, ref: 'Shoe Section'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    description: {type: String, text: true, ref:'Description Block'},
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const flawTypesSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const interventionPrototypesSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    flawTypes: [{type: mongoose.ObjectId, ref: 'Flaw Type'}],
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    video: {type: mongoose.ObjectId, ref: 'Video'},
    applicableFor: [{type: mongoose.ObjectId, ref: 'Shoe Model'}],
    steps: [{    
        process: {type: mongoose.ObjectId, ref: 'Intervention Type'},
        tools: [{type: mongoose.ObjectId, ref: 'Tool'}],
        supplies: [{type: mongoose.ObjectId, ref: 'Supply'}],
        description: {type: String, text: true, ref:'Description Block'}, 
        time: {type: Number, ref: 'Time for Step'},
        images: [{type: mongoose.ObjectId, ref: 'Image'}]
    }],
    evaluation: {
        aesthetics: {type: Number, ref: 'Visual Result Rating'},
        sustainability: {type: Number, ref: 'Sustainability Rating'},
        durability: {type: Number, ref: 'Durability Rating'}, 
        time: {type: Number, ref: 'Time Rating'},
        processPotential: {type: Number, ref: 'Potential for improvment Rating'},
        result: {type: mongoose.ObjectId, ref: 'Result Rating'},
        automationPotential: {type: Number, ref: 'Automation Potential Rating'},
    },
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    notes: {type: String, text: true, ref:'Notes Block'},
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    //location: {type: mongoose.ObjectId, ref: 'Location'},
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const toolsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    description: {type: String, text: true, ref:'Description Block'},
    available: {type: Number, ref: 'Quantity Available'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    manufacturer: {type: mongoose.ObjectId, ref: 'Manufacturer'},
    vendor: {type: mongoose.ObjectId, ref: 'Vendor'}, // Link
    manufacturerId: {type: String, text: true, ref:'Manufacturer Id'},
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}

})
const suppliesSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    description: {type: String, text: true, ref:'Description Block'},
    available: {type: Number, ref: 'Quantity Available'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    manufacturer: {type: mongoose.ObjectId, ref: 'Manufacturer'},
    vendor: {type: mongoose.ObjectId, ref: 'Vendor'}, // Link
    manufacturerId: {type: String, text: true, ref:'Manufacturer Id'},
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const materialTestSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    description: {type: String, text: true, ref:'Description Block'},
    tools: [{type: mongoose.ObjectId, ref: 'Tool'}],
    supplies: [{type: mongoose.ObjectId, ref: 'Supply'}],
    archived: {type: Boolean, ref: 'Archived'},
    evaluation: {
        aesthetics: {type: Number, ref: 'Visual Result Rating'},
        sustainability: {type: Number, ref: 'Sustainability Rating'},
        durability: {type: Number, ref: 'Durability Rating'}
    },
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}

})
const testSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    video: {type: mongoose.ObjectId, ref: 'Video'},
    group: {type: mongoose.ObjectId, ref: 'Group'},
    keyFindings: {type: String, text: true, ref: 'Description Block'},
    description: {type: String, text: true, ref:'Description Block'},
    tools: [{type: mongoose.ObjectId, ref: 'Tool'}],
    supplies: [{type: mongoose.ObjectId, ref: 'Supply'}],
    components: [{type: mongoose.ObjectId, ref: 'Gen One Component'}],
    archived: {type: Boolean, ref: 'Archived'},
    evaluation: {
        aesthetics: {type: Number, ref: 'Visual Result Rating'},
        sustainability: {type: Number, ref: 'Sustainability Rating'},
        durability: {type: Number, ref: 'Durability Rating'}
    },
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}

})
const manufacturerSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    website: {type: mongoose.ObjectId, ref: 'Link'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const vendorSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    website: {type: mongoose.ObjectId, ref: 'Link'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})

const tagsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const linksSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    url: {type: String, text: true, ref:'URL'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const groupSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    group: {type: mongoose.ObjectId, ref: 'Group'},
    modelType: {type: String, ref: 'Model Type'},
    order: {type: Number, ref: 'Order'},
    //showOnMainPage: {type: Boolean, ref:'Show on main page?'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})

const interventionTypeSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const resultRatingSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const genOneProcessSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    group: {type: mongoose.ObjectId, ref: 'Group'},
    automationGrade: {type: mongoose.ObjectId, ref: 'Automation Grade'},
    components: [{type: mongoose.ObjectId, ref: 'Gen One Component'}],
    description: {type: String, text: true, ref:'Description Block'},
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const genOneComponentSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    description: {type: String, text: true, ref:'Description Block'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    subcomponents: [{type: mongoose.ObjectId, ref: 'Gen One Component'}],
    manufacturer: {type: mongoose.ObjectId, ref: 'Manufacturer'},
    vendor: {type: mongoose.ObjectId, ref: 'Vendor'}, // Link
    manufacturerId: {type: String, text: true, ref:'Manufacturer Id'},
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const automationGradeSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const conceptSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    group: {type: mongoose.ObjectId, ref: 'Group'},
    components: [{type: mongoose.ObjectId, ref: 'Gen One Component'}],
    description: {type: String, text: true, ref:'Description Block'},
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const blogPostSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    group: {type: mongoose.ObjectId, ref: 'Group'},
    video: {type: mongoose.ObjectId, ref: 'Video'},
    description: {type: String, text: true, ref:'Description Block'},
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    tags: [{type: mongoose.ObjectId, ref: 'Tag', index: true}],
    archived: {type: Boolean, ref: 'Archived'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
/*const  = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})*/

let models = {
    interventions: mongoose.model('Intervention', interventionsSchema),
    shoe : mongoose.model('Shoe', shoeSchema), 
    shoePairs : mongoose.model('Shoe Pair', shoePairsSchema),
    flaws: mongoose.model('Flaw', flawsSchema),
    flawTypes: mongoose.model('Flaw Type', flawTypesSchema),
    shoeModels : mongoose.model('Shoe Model', shoeModelSchema),
    shoeSeries : mongoose.model('Shoe Serie', shoeSeriesSchema),
    shoeSection : mongoose.model('Shoe Section', shoeSectionSchema),
    shoeCut : mongoose.model('Shoe Cut', shoeCutSchema), 
    interventionStages: mongoose.model('Intervention Stage', interventionStageSchema),
    images: mongoose.model('Image', imagesSchema),
    videos: mongoose.model('Video', videosShema),
    materials: mongoose.model('Material', materialsSchema),
    tools: mongoose.model('Tool', toolsSchema),
    supplies: mongoose.model('Supply', suppliesSchema),
    materialTest : mongoose.model('Material Test', materialTestSchema),
    tests : mongoose.model('Test', testSchema),
    manufacturers: mongoose.model('Manufacturer', manufacturerSchema),
    vendors: mongoose.model('Vendor', vendorSchema),
    //materialTreatments: mongoose.model('Material Treatment', materialTreatmentsSchema),
    //locations: mongoose.model('Location', locationsSchema),
    tags: mongoose.model('Tag', tagsSchema),
    links: mongoose.model('Link', linksSchema),
    groups: mongoose.model('Group', groupSchema),
    //technology: mongoose.model('Technology', technologySchema),
    //skills: mongoose.model('Skill', skillsSchema),
    resultRating: mongoose.model('Result Rating', resultRatingSchema),
    interventionType: mongoose.model('Intervention Type', interventionTypeSchema),
    interventionPrototype: mongoose.model('Intervention Prototype',interventionPrototypesSchema),
    genOneProcess: mongoose.model('Gen One Process', genOneProcessSchema),
    genOneComponent: mongoose.model('Gen One Component', genOneComponentSchema),
    automationGrade: mongoose.model('Automation Grade', automationGradeSchema),
    concepts: mongoose.model('Concept', conceptSchema),
    blogPosts: mongoose.model('Blog Post', blogPostSchema)
    //ideation: mongoose.model('Ideation', ideationSchema)
}
module.exports = models


/*const technologySchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const skillsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const ideationSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    notes: {type: String, text: true, ref:'Description Block'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    images: [{type: mongoose.ObjectId, ref: 'Image'}],
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const materialTreatmentsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    description: {type: String, text: true, ref:'Description Block'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    tools: [{type: mongoose.ObjectId, ref: 'Tool'}],
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})
const locationsSchema = new mongoose.Schema({
    title: {type: String, text: true, ref: 'Title'},
    keyImage: {type: mongoose.ObjectId, ref: 'Image'},
    order: {type: Number, ref: 'Step'},
    dimensions: {type: String, text: true, ref:'Measurements'},
    description: {type: String, text: true, ref:'Description Block'},
    lastModified: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}},
    dateCreated: {by: {type: String, ref:'Users'}, date: {type: Date, default: Date.now, ref: 'Date'}}
})*/