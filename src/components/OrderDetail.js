import OrderItem from './OrderItem';
import { useMutation } from '@tanstack/react-query'
import { createSale } from '../api/sale'

export default function OrderDetail({
  orders = [],
  increment,
  decrement,
  setOrders,
}){
  const totalItems = orders.reduce((total, { quantity }) => total + quantity, 0)
  const totalPrice = orders.reduce((total, { price }) => total + price, 0)

  const mutation = useMutation({
    mutationFn: createSale,
  })

  function handlePayClick(){
    const payload = {
      products: orders.map(item => {
        return {
          productId: item._id,
          quantity: item.quantity,
        }
      }),
      totalSale: totalPrice
    }
    mutation.mutate(payload)
    setOrders([])
  }

  return(
    <aside className="flex flex-col w-96 justify-between">
      <div>
        <div className="py-4 px-6 border-b border-grey-200">
          <h3 className="font-semibold text-2xl text-grey-800">
            Order Detail
          </h3>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {orders.map(order => {
            return (
              <OrderItem
                increment={increment}
                decrement={decrement}
                product={order}
              />
            )
          })}
        </div>
      </div>
      <div className="px-6 pb-4 border-t border-grey-200">
        <div className="py-2">
          <div className="flex justify-between items-center py-1">
            <div className="text-md text-grey-400">Jumlah Items</div>
            <span className="font-semibold">{totalItems}</span>
          </div>
          <div className="flex justify-between items-center py-4 border-grey-200">
            <div className="text-sm text-gry-400">Total Bayar</div>
            <div className="text-lg fontt-semibold">{totalPrice}</div>
          </div>
          <button
            className="flex justify-center items-center py-4 px-6 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded w-full"
            onClick={handlePayClick}
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
      </aside>
    )
  }
