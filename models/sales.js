const mongoose = require('mongoose')
require('mongoose-double')(mongoose)

//const SchemaTypes = mongoose.Schema
const SaleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Minimum Title length is 3 characters']
    },
    price: {
        type: String,
        required: [true, 'Price is required']

    },
    body: {
        type: String,
        required: [true, 'Description is required']
    }
})

SaleSchema.set('toObject', {getters: true, virtuals: true})

exports.Sale = mongoose.model('sales', SaleSchema)