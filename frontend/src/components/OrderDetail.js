import OrderItem from './OrderItem';
import Button from './Button';
import { addNewSales } from '../api/sale'
import { useMutation } from '@tanstack/react-query'

export default function OrderDetail({ 
  orders = [], 
  incrementOrderItem,
  decrementOrderItem,
}){
  const totalPrice  = orders.reduce((totalPrice, { price }) => totalPrice + price, 0)
  const totalItem = orders.reduce((total , { quantity}) => total + quantity, 0)

  const mutation = useMutation({
    mutationFn: addNewSales,
    onSuccess: () => {
      console.log('success')
    },
  })

  function handlePayClick(){
    const payload = {
      products: orders.map(item => {
        return {
          productId: item._id,
          quantity: item.quantity,
        }
      }),
      totalSalePrice: totalPrice
    }
    mutation.mutate(payload)
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
          {orders.map((order, index)=> (
          <OrderItem 
            product={order} 
            index={index}
            incrementOrderItem={incrementOrderItem} 
            decrementOrderItem={decrementOrderItem} 
          />
          ))}
        </div>
      </div>
      <div className="px-6 pb-4 border-t border-grey-200">
        <div className="py-2 border-b">
          <div className="flex justify-between items-center py-1">
            <div className="text-md text-grey-400">Items</div>
            <span className="font-semibold">{totalItem}</span>
          </div>
          <div className="flex justify-between items-center py-4 border-grey-200">
            <div className="text-sm text-gry-400">Total</div>
            <div className="text-lg fontt-semibold">{totalPrice}</div>
          </div>
          <Button text="Bayar Sekarang" className="w-full" onClick={handlePayClick}/>
        </div>
      </div>
      </aside>
    )
  }
