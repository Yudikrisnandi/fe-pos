export default function Button({ 
  text, 
  className, 
  variant, 
  onClick, 
}) {
  const baseClasses = "flex justify-center items-center py-4 px-6 text-sm font-semibold text-white bg-violet-600 rounded hover:bg-violet-700"
  return (
  <button 
    onClick={onClick}
    className={`${baseClasses} 
    ${className}`}
  >
      {text}
    </button>
  )
}
