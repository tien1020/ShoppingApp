const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
    let options = {
        title: 'Sallie Shoppe',
        name: 'SallieShoppe',
        layout: 'default',
        styles : ['/stylesheets/style.css', '/stylesheets/style2.css']
    }
    res.render('index.hbs', options);
});

module.exports = router;