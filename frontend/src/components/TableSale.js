import moment from 'moment'
export default function TableSale({ data }){
  return(
    <table className="w-full border">
      <thead className="bg-violet-500">
        <tr className="text-sm font-medium font-semibold">
          <td className="text-white p-4 w-20">No</td>
          <td className="text-white text-left">Date</td>
          <td className="text-white text-left">Total Product</td>
          <td className="text-white text-left">Total Item</td>
          <td className="text-white text-left">Sales Total</td>
        </tr>
      </thead>
      <tbody>
        {data.map((sale, index) => {
          const totalItem = sale.products.reduce((total, { quantity }) => total + quantity, 0);
          return(
            <tr className={`${index % 2 === 0 ? "bg-slate-50" : "bg-slate-200" }`}>
              <td className="p-4">{index+1}</td>
              <td className="w-1/3">{moment(sale.saleDate).format("DD MMMM YYYY")}</td>
              <td>{sale.products.length}</td>
              <td>{totalItem}</td>
              <td>{sale.totalSalePrice}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
