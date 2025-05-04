import { Link } from "react-router-dom"
import UserData from "./userData"


export default function Header(){
    return(
        <div className="bg-[#4545454] text-2xl flex justify-between items-center">
            <Link to="/">Home</Link>
            <Link to="/login">login</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}