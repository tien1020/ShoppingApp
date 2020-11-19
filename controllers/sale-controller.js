let Sale = require('../models/sales').Sale

exports.saleController = {

    add: async (req, res, next) => {
        try {
            res.render('sales/add_sale', {
                isCreate: true,
                title: 'Add an Item',
                isAddSaleActive: 'active'

            })
        }catch(error){
            next(error)
        }
    },
    save: async (req, res, next)=>{
        try{
            let sale
            if(req.body.saveMethod === 'create'){
                sale = await create(req.body.title, req.body.price, req.body.body)
            } else
                sale = await update(req.body.objectId, req.body.title, req.body.price, req.body.body)
            res.redirect(`/sales/view?id=${sale.id}`)
        }catch(error){
            next(error)
        }
    },

    view: async (req, res, next) => {
        try{
            const sale = await Sale.findOne({_id: req.query.id.trim()})
            res.render('sales/view_sale', {
                title: "Listing Product",
                objectId: req.query.id,
                saleTitle: sale.title,
                salePrice: sale.price,
                saleBody: sale.body
            })

        } catch (error) {
            next(error)
        }
    },




    edit: async (req, res, next) => {
        try{
            let sale = await Sale.findOne({_id: req.query.id.trim()})
            res.render('sales/edit_sale', {
                isCreate: false,
                title: "Edit Product",
                objectId: req.query.id,
                saleTitle: sale.title,
                salePrice: sale.price,
                saleBody: sale.body
            })

        } catch (error) {
            next(error)
        }
    },

    deletePage: async (req, res, next) => {
        try{
            const sale = await Sale.findOne({_id: req.query.id.trim()})
            res.render('sales/delete_sale', {
                title: "Delete Product",
                objectId: req.query.id,
                saleTitle: sale.title,
                salePrice: sale.price,
                //saleBody: sale.body
            })

        } catch (error) {
            next(error)
        }
    },


    destroy : async (req, res, next) => {
        try{
            const sale = await Sale.deleteOne({_id : req.query.id.trim()})
            req.flash('success', 'Product deleted successfully.')
            res.redirect('/sales/viewAll')
        } catch (err) {
            next(err)
        }
    },

    viewAll: async (req, res, next) => {
        try {
            let sales = await Sale.find({})
            let allSales = sales.map(sale => {
                return {
                    objectId: sale.id,
                    title: sale.title
                }
            })
            res.render('sales/view_list', {
                title: 'Your Listings',
                saleList: allSales,
                isViewListActive: 'active'
            })
        }catch(error){
            next(error)
        }
    }
}

create = async (title, price, body) =>{
    let sale = new Sale({
        title: title,
        price: price,
        body: body
    })
    sale = await sale.save()
    return sale;
}

update = async (id, title, price, body)=>{
    id = id.trim()
    let sale = await Sale.findByIdAndUpdate({ _id: id },{title: title, price: price, body: body}, {new: true})
    return sale;
}

