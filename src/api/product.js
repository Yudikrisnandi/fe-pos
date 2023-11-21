import axios from 'axios'
const baseUrl = 'http://localhost:5000'

export async function getProducts(){
  try {
    const res = await axios.get(`${baseUrl}/api/v1/product`)
    return res.data.data
  }catch(err){
    return err
  }
}

export async function createProduct(data){
  try {
    const { name, price, category, image, stock } = data

    const formData = new FormData();
    formData.append('name', name)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('image', image)
    formData.append('inStock', stock)

    await axios.post(`${baseUrl}/api/v1/product`, formData)
  }catch(err){
    return err
  }
}

export async function deleteProduct(id){
  try {
    await axios.delete(`${baseUrl}/api/v1/product/${id}`)
  }catch(err){
    return err
  }
}

export async function editProduct(data){
  try {
    const { id, name, price, category, image, stock } = data

    const formData = new FormData();
    formData.append('name', name)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('image', image)
    formData.append('inStock', stock)

    await axios.post(`${baseUrl}/api/v1/product/${id}`, formData)
  }catch(err){
    return err
  }
}
