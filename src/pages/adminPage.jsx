import { Link, Routes,Route } from 'react-router-dom'

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex">
            <div className="w-[300px] h-full bg-blue-600 flex flex-col">
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/reviews">Reviews</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full bg-green-600">
                <Routes path="/*">
                    <Route path="/products" element={<h1>Products</h1>}/>
                    <Route path="/users" element={<h1>Users</h1>}/>
                    <Route path="/orders" element={<h1>Orders</h1>}/>
                    <Route path="/reviews" element={<h1>Reviews</h1>}/>
                    <Route path="/*" element={<h1>404 Not Found</h1>}/>
                </Routes>
            </div>
        </div>
    )
}