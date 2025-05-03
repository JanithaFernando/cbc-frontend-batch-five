import UserData from "./userData"


export default function Header(){
    return(
        <div className="bg-[#4545454] text-2xl">
            <h1 className="text-[100px] text-blue-500">Crystal Beauty Clear</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <UserData/> 
            
        </div>
    )
}