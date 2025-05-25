//import "./productCard.css"

/*export default function ProductCard(props){*/
   // console.log(props)
   /* return(
        <div className="card">
            <img className="productImage" src={props.picture}/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <h2>Price:${props.price}</h2>
            <button className="addToCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
        </div>
    )*/
  /* const product=props.product
   return(
    <div className="w-[300px] h-[400px] bg-gray-500 shadow-md rounded-lg m-2 flex flex-col">

    </div>
   )
}*/

export default function ProductCard({ product }) {
  return (
    <div className="w-[300px] h-[450px] bg-white shadow-lg rounded-lg overflow-hidden m-4 flex flex-col transition-transform transform hover:scale-105 duration-300">
      
      {/* Product Image */}
      <div className="h-[200px] bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          {product.altNames?.length > 0 && (
            <p className="text-sm text-gray-500 italic">
              Also known as: {product.altNames.join(", ")}
            </p>
          )}
          <p className="text-gray-600 text-sm mt-2">
            {product.description}
          </p>
        </div>

        {/* Pricing and Availability */}
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-green-700">Rs {product.price}</span>
            {product.labelledPrice > product.price && (
              <span className="text-sm line-through text-gray-500">Rs {product.labelledPrice}</span>
            )}
          </div>
          <p className={`text-sm mt-1 ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>
            {product.isAvailable ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Action Button */}
        <button
          className={`mt-4 w-full py-2 rounded-md text-white text-sm font-medium ${
            product.isAvailable ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!product.isAvailable}
        >
          {product.isAvailable ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

