var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/fetch', async function(req, res, next) {
  
    const [rows, fields] = await mysql.execute(
      'SELECT `id`, `itemcode`, `quantity`, `price` FROM `itemlist` ORDER BY `itemlist` .id DESC'
    );
  
    return res.status(200).json({
        'status': true,
        'data': rows,
    });
});

module.exports = router;