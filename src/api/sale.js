import axios from 'axios'
const baseUrl = 'http://localhost:5000'

export async function getSales(){
  try {
    const res = await axios.get(`${baseUrl}/api/v1/sale`)
    console.log('re', res)
    return res.data.data
  }catch(err){
    return err
  }
}

export async function createSale(data){
  try {
    const res = await axios.post(`${baseUrl}/api/v1/sale`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }catch(err){
    return err
  }
}

