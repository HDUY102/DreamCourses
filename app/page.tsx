"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useState } from "react";
import HeaderNav from "./components/HeaderNav";
export default function Home() {
  return (
    <div>
      <HeaderNav/>
      <Link href="/FileUpload">
        <Button variant="ghost">Upload File</Button>  
      </Link>
    </div>
  );
}
// export default function Home() {
//   const [file, setFile] = useState<File>()
//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
//     e.preventDefault()
//     if (!file) return
//     try{
//       const data= new FormData()
      
//       data.set('file', file)
//       const res = await fetch('/api/uploadFile',{
//         method: 'POST',
//         body: data
//       })
//       if(!res.ok) throw new Error(await res.text())
//     }catch(e:any){
//         console.log(e)
//     }
//   }
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input type="file" name="file"
//         onChange={(e)=> setFile(e.target.files?.[0])}/>
//         <input type="submit" value="Upload" />
//       </form>
//     </div>
//   );
// }
