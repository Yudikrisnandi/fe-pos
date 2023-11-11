const Product = require('../models/Product');

exports.getProducts = async(req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      status: 'success',
      data: products
    })
  }catch(err){
    res.json(err)
  }
}

exports.createProduct= async(req, res) => {
  try {
    const product = {
      name: "Vegetable Salad",
      price: 45000,
      category: "food",
      active: true,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
    await Product.create(product)
    res.status(201).json(product)
  }catch(err){
    res.json(err)
  }
}
