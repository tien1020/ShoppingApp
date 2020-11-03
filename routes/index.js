const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        res.render('index', {
            title: 'Sallie Shoppe',
            name: 'SallieShoppe',
            layout: 'default',
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
            isHomeActive: 'active'
        })
    }catch(err){
        next(err)
    }
});

module.exports = router;