export default function OrderDetail(){
  return(
    <aside className="flex flex-col w-96 justify-between">
      <div>
        <div className="py-4 px-6 border-b border-grey-200">
          <h3 className="font-semibold text-2xl text-grey-800">
            Order Detail
          </h3>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          list product order
        </div>
      </div>
      <div className="px-6 pb-4 border-t border-grey-200">
        <div className="py-2 border-b border-dashed">
          <div className="flex justify-between items-center py-1">
            <div className="text-md text-grey-400">Items</div>
            <span className="font-semibold">5</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="flex gap-x-1 items-center">
              <div className="text-md text-gray-400">Tax</div>
            </span>
            <span className="text-sm text-gray-300">10%</span>
          </div>
          <div className="flex justify-between items-center py-4 border-grey-200">
            <div className="text-sm text-gry-400">Total</div>
            <div className="text-lg fontt-semibold">35000</div>
          </div>
        </div>
      </div>
      </aside>
    )
  }
