import Select from 'react-select'
import { useState, useEffect } from 'react'
import { createProduct, editProduct } from '../api/product'
import getFileNameFromUrl from '../utils/getFileNameFromUrl'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function AddForm({ 
  data,
  close, 
  editedData,
}){
  console.log(data)
  const queryClient = useQueryClient();
  const [isEdited] = useState(data?._id || null)
  const [stock, setStock] = useState(data?.inStock || true)
  const [name, setName] = useState(data?.name || '')
  const [price, setPrice] = useState(data?.price || '')
  const [file, setFile] = useState(data?.image || null)
  const [category, setCategory] = useState(null)

  const options = [
    { label: 'Food', value: 'Food' },
    { label: 'Drink', value: 'Drink' },
  ]

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['products'] })
    }
  })

  const mutationEdit = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['products'] })
    }
  })

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleChangeCategory = (val) => {
    setCategory(val)
  }

  function handleSave(e){
    e.preventDefault()
    const payload = {
      name,
      price,
      image: file,
      stock,
      category: category.value,
    }

    if(isEdited){
      mutationEdit.mutate({ ...payload, id: data?._id, category: category.value })
    }else{
      mutation.mutate(payload)
    }
    close()
  }

  useEffect(() => {
    setCategory({ label: data?.category, value: data?.category })
  }, [data])

  return(
    <div className="bg-white rounded p-4 w-3/12">
      <h3 className="font-bold text-2xl mb-3">
        Add New Product
      </h3>
      <form className=" text-base leading-6 space-y-2">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold">Product Name</label>
          <input 
            type="text" 
            value={name}
            placeholder="Product Name"
            className="px-4 py-2 border focus:rign-gray-500 focus:border-gray-900 w-full text-md rounded-md focus:outline-none text-gray-600"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-semibold">Price</label>
          <input 
            type="text" 
            value={price}
            placeholder="Price"
            className="px-4 py-2 border focus:rign-gray-500 focus:border-gray-900 w-full text-md rounded-md focus:outline-none text-gray-600"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="font-semibold">Category</label>
          <Select
            options={options}
            placeholder="select"
            onChange={handleChangeCategory}
            value={category}
          />
        </div>
        <div className="flex flex-col">
          <div htmlFor="stock" className="font-semibold">In Stock</div>
          <div className="flex space-x-3">
            <label htmlFor="yes">
              <input 
                type="radio" 
                name="stock"
                checked={stock}
                value={true}
                onChange={() => setStock(true)}
              />
                Yes
            </label>
            <label>
              <input 
                type="radio" 
                name="stock"
                checked={!stock}
                value={false}
                onChange={() => setStock(false)}
              />
                No
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="file" className="font-semibold">Image</label>
          <input 
            type="file" 
            id="file"
            className="p-1 focus:ring-gray-500 focus:border-gray-900 w-full text-md rounded-md focus:outline-none text-gray-600"
            onChange={handleFileChange}
          />
          {file && (
            <p>Current File: {file.name || getFileNameFromUrl(data?.image)}</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="py-1 px-2 font-bold bg-red-400 rounded hover:bg-red-300 text-white"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="ml-2 py-1 px-2 font-bold bg-violet-700 rounded hover:bg-violet-600 text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
