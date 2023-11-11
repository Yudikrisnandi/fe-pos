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
