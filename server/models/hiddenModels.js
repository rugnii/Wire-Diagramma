const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    name: {type: String, ref: 'Name'},
    prop: {type: String, ref: 'Prop'}
});

let models = {
    components: mongoose.model('Component', componentSchema)
}
module.exports = models;