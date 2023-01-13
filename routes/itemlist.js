var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/fetch', async function(req, res, next) {
  try {
    const [rows, fields] = await mysql.execute(
      'SELECT `id`, `itemcode`, `quantity`, `price` FROM `itemlist` ORDER BY `id` DESC'
    );
      
    const itemlist = rows.map(row => {
      return {
        id: row.id,
        itemcode: row.itemcode,
        quantity: row.quantity,
        price: row.price
      };
    });
  
    return res.status(200).json({
      'status': true,
      'data': itemlist,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      'status': false,
      'message': 'Error fetching item list',
    });
  }
});

module.exports = router;