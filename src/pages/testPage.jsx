import { useState } from "react";

export default function TestPage(){
    const[count,setCount]=useState(0)
    const[status,setStatus]=useState("Passed")
   
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="w-[450px] h-[250px] shadow flex justify-center items-center">
                <button onClick={()=>{
                    setCount(count-1)
                }} className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer" >
                  -
                </button>
                <span className="text-[40px] font-bold text-center w-[100px] h-[40px] mx-[20px] flex justify-center items-center" >
                    {count}
                </span>
                <button onClick={()=>{
                    setCount(count+1)
                }} className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer" >
                  +
                </button>
            </div>
            <div className="w-[450px] h-[250px] shadow flex flex-col justify-center items-center">
                <span className="text-[40px] font-bold text-center w-[100px] h-[40px] mx-[20px] flex justify-center items-center" >
                    {status}
                </span>
                <div className="flex justify-center items-center">
                    <button onClick={()=>{
                        setStatus("Passed")
                    }} className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]" >
                        Passed
                    </button>
                    <button onClick={()=>{
                        setStatus("Failed")
                    }} className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]" >
                        Failed
                    </button>
                </div>
            </div>
        </div>
    )
}