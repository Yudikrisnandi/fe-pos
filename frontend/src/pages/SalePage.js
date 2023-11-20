import { useQuery } from '@tanstack/react-query'
import { getSales } from '../api/sale'
import TableSale from '../components/TableSale'

export default function ProductPage(){
  const { isLoading, isError, data } = useQuery({
    queryKey:['sales'],
    queryFn:getSales,
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
        <h3 className="text-2xl font-semibold leading-relaxed text-grey-800">Sales Product</h3>
      </div>
      <TableSale data={data} />
    </div>
  )
}
