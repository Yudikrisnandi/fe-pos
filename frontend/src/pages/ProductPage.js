import { useQuery } from '@tanstack/react-query'
import { useState } from 'react' 
import { getProducts } from '../api/product'
import Button from '../components/Button';
import ProductTable from '../components/Table';
import FormAddProduct from '../components/FormAddProduct';

export default function ProductPage(){
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

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

  return(
    <div className="relative px-5 mt-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold leading-relaxed text-grey-800">Table Product</h3>
        <Button
          text="Add New Product"
          onClick={openModal}
        />
      </div>
      <ProductTable
        data={data}
        setEditProduct={setEditProduct}
        openModal={openModal}
      />
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        >
          <FormAddProduct
            data={editProduct}
            onClose={closeModal}
          />
        </div>
      )}
    </div>
  )
}
