import {createClient} from "@supabase/supabase-js"

const url="https://zsipttvktiiuapanaxbl.supabase.co"
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaXB0dHZrdGlpdWFwYW5heGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NzQyNTgsImV4cCI6MjA2MjU1MDI1OH0.zR7FoKcL0wipYfaTwP9gwrIJNLbRPh77Nj7yJN6Czh8"

const supabase=createClient(url,key)

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("No file selected")
                return;
            }

            const timestamp= new Date().getTime()
           // const newName=timestamp + file.name
            const newName = `${timestamp}_${file.name}`;
            //console.log(typeof newName)

            supabase.storage.from("images").upload(newName,file,{
                upsert:false,
                cacheControl:"3600"
            }).then(()=>{
                const publicUrl=supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
            }).catch(
                (e)=>{
                    reject("Error occured in supabase connection")
                }
            )
        }
    )

    return mediaUploadPromise
}