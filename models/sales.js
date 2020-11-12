exports.AbstractSalesStore = class AbstractSalesStore {
    async close() { }
    async update(key, title, price, body){ }
    async create(key, title, price, body){ }
    async read(key){ }
    async destroy(key){ }
    async keyList(){ }
    async count(){ }
}

const mongoose = require('mongoose')

const SaleSchema = new mongoose.Schema({
    key: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Minimum Title length is 3 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']

    },
    body: {
        type: String,
        required: [true, 'Description is required']
    }
})


exports.Sale = mongoose.model('sales', SaleSchema)