/*import { useState } from "react";

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
}*/

import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";
export default function TestPage(){

    const[image,setImage]=useState(null)

    
    function fileUpload(){
      mediaUpload(image).then(
        (res)=>{
            console.log(res)
        }
      ).catch(
        (res)=>{
            console.log(res)
        }
      )
      
    }

    return(
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" 
            onChange={(e)=>{
               //console.log(e.target.files)
               setImage(e.target.files)
            }}
            />
            <button onClick={fileUpload} className="bg-green-500 text-white font-bold py-2 px-4 rounded">Upload</button>
        </div>
    )
}