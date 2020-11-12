const express = require('express')
const router = express.Router()
let salesStore = require('../app').salesStore

router.get('/add',async (req, res, next)=>{
    try {
        res.render('add_sale', {
            isCreate: true,
            title: 'Add an Item',
            saleKey: await salesStore.count(),
            isHomeActive: "",
            isAddSaleActive: 'active'

        })
    } catch(err) {
        next(err)
    }
})

router.post('/save', async (req, res, next) => {
    try {
        let sale;
        if(req.body.saveMethod === 'create')
            sale = await salesStore.create(req.body.saleKey, req.body.title, req.body.price, req.body.body)
        else
            sale = await salesStore.update(req.body.saleKey, req.body.title, req.body.price, req.body.body)
        res.redirect('/sales/view?key='+ req.body.saleKey)
    } catch (err){
        next(err)
    }
})

router.get('/view', async(req, res, next) => {
    try {
        let sale = await salesStore.read(req.query.key)
        res.render('view_sale', {
            title: "Listing Product",
            saleTitle: sale.title,
            salePrice: sale.price,
            saleKey: sale.key,
            saleBody: sale.body


        })
    } catch(err){
        next(err)
    }
})

router.get('/edit', async (req, res, next)=>{
    try {
        let sale = await salesStore.read(req.query.key)
        res.render('edit_sale', {
            isCreate: false,
            title: "Edit Product",
            saleTitle: sale.title,
            salePrice: sale.price,
            saleKey: sale.key,
            saleBody: sale.body

        })
    } catch(err){
        next(err)
    }
})

router.get('/delete', async (req, res, next)=>{
    try{
        let sale = await salesStore.read(req.query.key)
        res.render('delete_sale', {
            title: "Delete Product",
            saleTitle: sale.title,
            salePrice: sale.price,
            saleKey: sale.key,
            saleBody: sale.body


        })

    }
    catch (err){
        next(err)
    }
})

router.get('/destroy', async function(req, res, next) {
    try{
        let sale = await salesStore.destroy(req.query.key)
        res.redirect('/sales/viewList')
    }
    catch (err){
        next(err)
    }
})

router.get('/viewList', async function(req, res, next) {

    try {
        let allSales = await salesStore.findAllSales()
        res.render('view_list', {
            title: 'Your Listings',
            saleList: allSales,
            isViewListActive: 'active'
        })
    } catch(err){
        next(err)
    }
})

module.exports = router;