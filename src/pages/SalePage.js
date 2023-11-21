import { useQuery } from '@tanstack/react-query'
import { getSales } from '../api/sale'
import TableSale from '../components/TableSale'

export default function SalePage(){
  const { isLoading, isError, data } = useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
  })

  if(isLoading){
    return <div>loading...</div>
  }

  if(isError){
    return <div>Error</div>
  }

  return(
    <div className="relative px-5 mt-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-semibold text-gray-800">Sales Page</h3>
      </div>
      <TableSale data={data}/>
    </div>
  )
}
