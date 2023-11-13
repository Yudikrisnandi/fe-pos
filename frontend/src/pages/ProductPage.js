import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/product'

export default function ProductPage(){
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
    <div className="px-5 mt-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold leading-relaxed text-grey-800">Table Product</h3>
      </div>
      <table className="w-full border">
        <thead className="bg-violet-500">
          <tr className="text-sm font-medium font-semibold">
            <td className="text-white p-4 w-20">No</td>
            <td className="text-white text-left">Name</td>
            <td className="text-white text-left">Category</td>
            <td className="text-white text-left">Price</td>
            <td className="text-white text-left">Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr className={`${index % 2 === 0 ? "bg-slate-50" : "bg-slate-200" }`}>
              <td className="p-4">{index+1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
