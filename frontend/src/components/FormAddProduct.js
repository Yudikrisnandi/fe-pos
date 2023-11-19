import Select from 'react-select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Button from '../components/Button'
import { createProduct, editProduct } from '../api/product'
import getFileNameFromUrl from '../utils/getFileNameFromUrl'

export default function FormAddProduct({ onClose, data }){
  const queryClient = useQueryClient()
  const [isEdited] = useState(data?._id || null);
  const [name, setName] = useState(data?.name || '');
  const [price, setPrice] = useState(data?.price || '');
  const [stock, setStock] = useState(data?.inStock || true);
  const [category, setCategory] = useState({label: data?.category, value: data?.category } || null);
  const options = [
    { value: '', label: 'All' },
    { value: 'Food', label: 'Food' },
    { value: 'Drink', label: 'Drink' }
  ]
  const [file, setFile] = useState(data?.image || null);

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['products'] })
    },
  })

  const editMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['products'] })
    },
  })

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectCategory = (selectedOption) => {
    setCategory(selectedOption);
  };
  
  async function handleSave(e){
    e.preventDefault()
    if(isEdited){
      await editMutation.mutate({
        id: data?._id,
        name,
        price,
        category: category.value,
        stock,
        image: file,
      })
    }else{
      await mutation.mutate({
        name,
        price,
        category: category.value,
        stock,
        image: file,
      })
    }
    onClose()
  }

  const loading = isEdited ? editMutation.isPending : mutation.isPending 
  const textButton = loading ? 'Loading...' : 'Save' 

  return(
    <div className="bg-white rounded p-4 w-3/12">
      <div className="flex items-center space-x-5 mb-3">
        <h3 className="font-bold text-2xl self-start text-gray-700 leading-relaxed">
          Add New Product
        </h3>
      </div>
      <form className="text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
        <div className="flex flex-col">
          <label className="font-semibold">Product Name</label>
          <input 
            type="text" 
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-md border-gray-300 rounded-md focus:outline-none text-gray-600i"
            placeholder="Product name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Price</label>
          <input 
            type="text" 
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-md border-gray-300 rounded-md focus:outline-none text-gray-600" 
            placeholder="Price" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Category</label>
          <Select 
            value={category}
            options={options} 
            onChange={handleSelectCategory}
            placeholder="All"
          />
        </div>
        <div class="flex flex-col">
          <div className="font-semibold">In Stock</div>
          <div className="flex space-x-3">
            <label>
              <input 
                type="radio" 
                name="stock" 
                checked={stock}
                value={true}
                onChange={() => setStock(true)}
              />
              Yes
            </label>
            <label for="no">
              <input 
                type="radio" 
                name="stock" 
                value={false}
                checked={!stock}
                onChange={() => setStock(false)}
              />
              No
            </label>
          </div>
        </div>
        <div class="flex flex-col">
          <label className="font-semibold" for="file">Category</label>
          <input 
            className="p-1 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-md border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Price" 
            id="file" 
            type="file"
            onChange={handleFileChange}
          />
          {file && (
            <div>
              <p>Current File: {file.name || getFileNameFromUrl(data.image)}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            text="Close"
            onClick={onClose}
          />

          <Button 
            text={textButton}
            onClick={handleSave}
          />
        </div>
      </form>
    </div>
  )
}
