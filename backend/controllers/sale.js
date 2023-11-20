const Sale = require('../models/Sale');
const cloudinary = require('../cloudinary');

exports.getSales = async(req, res) => {
  try {
    const sales = await Sale.find({}).populate('products.productId');
    res.json({
      status: 'success',
      data: sales 
    })
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.addNewSale = async(req, res) => {
  try {
    const { products, totalSalePrice } = req.body;
    const sales = new Sale({
      products,
      totalSalePrice
    })
    await sales.save()
    res.status(201).json({
      message: "success",
    })
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
