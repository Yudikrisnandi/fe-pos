import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/product'
import ProductCard from '../components/ProductCard'
import OrderDetail from '../components/OrderDetail'

const filters = ['All Menu', 'Food', 'Drink']

export default function MenuPage(){
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
    <div className="flex w-full h-screen text-grey-900">
      <div className="flex flex-col flex-1 p-4 overflow-auto border-r">
        <div className="flex">
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>
        <div className="relative flex items-center w-3/4 h-12 border rounded mt-3">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            className="peer h-full w-full outline-none text-sm text-grey-700 pr-2"
          />
        </div>
        <div className="my-3 flex flex-col">
          <h3 className="text-md font-semibold text-grey-900 my-2">Category</h3>
          <div className="flex space-x-2">
            {filters.map(item => (
              <div className="border px-4 py-3 rounded-full">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5">
          {data.map(product => (
            <ProductCard product={product}/>
          ))}
        </div>
      </div>
      <OrderDetail/>
    </div>
  )
}
