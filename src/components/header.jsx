import { Link, useNavigate } from "react-router-dom"
import UserData from "./userData"


export default function Header(){
    const navigate=useNavigate()
    
    return(
        <header className="w-full h-[100px] shadow-2xl flex">
            <img onClick={()=>{
                navigate("/")
            }} src="/logo.png" alt="logo" className="w-[80px] h-[80px] object-cover top-0 left-0 m-2 cursor-pointer" />
            <div className="w-[calc(100%-160px)] h-full flex justify-center items-center">
                <Link to="/" className="text-[20px] font-bold mx-2">Home</Link>
                <Link to="/products" className="text-[20px] font-bold mx-2">Products</Link>
                <Link to="/about" className="text-[20px] font-bold mx-2">About</Link>
                <Link to="/contact" className="text-[20px] font-bold mx-2">Contact</Link>
            </div>
            <div className="w-[80px] bg-blue-600">
                
            </div>
        </header>
    )
}