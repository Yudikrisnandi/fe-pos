export default function ProductCard({ 
  product
}){
  return(
    <div className="relative flex w-60 flex-col overflow-hidden rounded-lg border border-grey-100 bg-white show-md mb-4 p-3">
      <div className="flex overflow-hidden rounded-xl">
        <img 
          src={product.image} 
          alt={product.name} 
          clasName="h-40 w-60"
        />
      </div>
      <div className="mt-4">
        <h5 className="text-md fond-medium text-slate-900">{product.name}</h5>
      </div>
      <div className="flex item-center justify-between">
        <span className="text-xl font-bold text-slate-900">Rp{product.price}</span>
      </div>
    </div>
  )
}
