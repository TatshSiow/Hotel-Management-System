var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/', async function(req, res, next) {
  const { user } = req.signedCookies;

  return res.render('itemlist.twig', { title: 'Express', user });
});

router.get('/fetch', async function(req, res, next) {
    const [rows,fields] = await mysql.execute(
        'SELECT `id`.`id`,`itemcode`.`itemcode`, `quantity`.`quantity`, `price`, `price`'
        'ORDER BY `id`.id DESC');
    
    return res.status(200).json({
        'status': true,
        'data': rows,
    });

module.exports = router;