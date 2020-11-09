let Sale = require('./sales').Sale
let AbstractSalesStore = require('./sales').AbstractSalesStore


const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch(err){
        console.log(err)
    }
}

exports.MongooseSalesStore = class MongooseSalesStore extends AbstractSalesStore {

    async update(key, title, price, body) {
        await connectDB()
        let sale = await Sale.findOneAndUpdate({key: key},{
            title: title,
            price: price,
            body: body
        })
        await mongoose.disconnect()
        return sale

    }

    async create(key, title, price, body){
        // let getNext = await this.getNext()
        await connectDB()
        let count = await Sale.countDocuments({})
        //let count = getNext({})
        let sale = new Sale({
            key: count,
            title: title,
            price: price,
            body: body
        })
        await sale.save()
        await mongoose.disconnect()
        return sale

    }

    async read(key){
        await connectDB()
        const sale = await Sale.findOne({ key: key})
        await mongoose.disconnect()
        return sale
    }

    async destroy(key){
        await connectDB()
        const sale = await Sale.deleteOne({ key: key})
        await mongoose.disconnect()
        return sale
    }


    async findAllSales() {
        await connectDB()
        const sales = await Sale.find({})
        await mongoose.disconnect()
        return sales.map(sale => {
            return {
                key: sale.key,
                title: sale.title,
            }
        })
    }

    async count(){
        await connectDB()
        let count = await Sale.countDocuments({})
        await mongoose.disconnect()
        return count



    }
    // async getNext(sequenceName){
    //     let sequenceDocument = await Sale.findAndModify({
    //         query:{_id: sequenceName },
    //         update: {$inc:{sequence_value:1}},
    //         new:true
    //     });
    //     return sequenceDocument.sequence_value;
    // }


}