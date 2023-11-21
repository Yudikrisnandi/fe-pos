import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/product'
import AddForm from '../components/AddForm'
import TableProduct from '../components/TableProduct'

export default function ProductPage(){
  const [showModal, setShowModal] = useState(false)
  const [editedData, setEditedData] = useState(null)
  const { isLoading, isError, data } = useQuery({
    queryKey:['products'],
    queryFn:getProducts,
  })

  if(isLoading){
    return <div>loading...</div>
  }

  if(isError){
    return <div>something when wrong</div>
  }

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setEditedData(null)
    setShowModal(false);
  } 

  return(
    <div className="px-5 mt-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold leading-relaxed text-grey-800">Table Product</h3>
        <button
          className="flex justify-center items-center py-4 px-6 text-sm font-semibold text-white bg-violet-600 rounded hover:bg-violet-700"
          onClick={openModal}
        >
          Add Product
        </button>
      </div>
      <TableProduct 
        data={data} 
        openModal={openModal}
        setEditedData={setEditedData} 
      />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <AddForm 
            data={editedData}
            close={closeModal}
            editedData={editedData}
          />
        </div>
      )}
    </div>
  )
}
