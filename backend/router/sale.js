const express = require('express')
const router = express.Router()

const { 
  getSales, 
  addNewSale, 
} = require('../controllers/sale')

router.get('/', getSales)
router.post('/', addNewSale)

module.exports = router;
