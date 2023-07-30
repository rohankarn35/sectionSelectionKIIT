
"use client"

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setMyData, setOpenCreate } from "@/Redux/reducers/sectionswap";
import DisplayUser from "@/components/DisplayUser";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import BasicTable from "@/components/Table";
import SingleUser from "@/components/WithoutMatch";
import { TableInfo } from "@/interfaces";
// import SpanningTable from "@/components/Table";
import { fetchUser, getMyData } from "@/utils/functions";
import { Alert, Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {


  const [data,setData] = useState([]);
  const message = useAppSelector((state)=>state.sectionSwap.message);
  const openMessage = useAppSelector((state)=>state.sectionSwap.displayMessage);
const session = useSession();
const dispatch = useAppDispatch();
const myData = useAppSelector((state)=>state.sectionSwap.mydata);
 
// console.log(data);


 const fetchData=async()=>{
  const p:string = await fetchUser();
  setData(JSON.parse(p));
}

const p = async(email:string)=>{
   var c:string =  await getMyData(email);

   var decode:{
    success:boolean,
    user:TableInfo
   } = JSON.parse(c);
   if(decode.success){
    dispatch(setMyData(decode.user))
   }

}

useEffect( ()=>{
    if(session.data?.user){
        fetchData();
         p(`${session.data.user.email}`);
        
    }
  // const interval = setInterval(fetchData,10000);
  // return()=>clearInterval(interval);  
},[session.data?.user])

 

  return (
    <>
    <div className=''>
  

      <Modal/>

      <Snackbar open={openMessage} autoHideDuration={6000} >
  <Alert  severity="success" sx={{ width: '100%' }}>
    {message}
  </Alert>
</Snackbar>

      {/* {JSON.stringify(data)}  
      
      */}


      {/* <div className="pt-28"></div> */}
    <div className="pt-28 w-full max-w-screen-xl mx-auto  ">
        {/* {myData.alloted!==0 && JSON.stringify(myData)}
        
        */}

{myData.alloted==0? <div className="font-sans  p-8 bg-slate-800">
    <div>You have not created your match yet. <button className="text-blue-500" onClick={()=>dispatch(setOpenCreate(true))}>Create Now</button></div>
    
    </div> :  myData.matched?<DisplayUser currentAllotedSection={0} currentLookingForSections={[1,2,3]} matchedUserContact="9826632" matchedUserEmail="ram@gmail.com" matchedUserName="Ranjit" remoteAllotedSection={2} remoteLookingForSections={[1,2,3]} senderName="Raj"/>  : <SingleUser currentUserName={myData.name} currentUserEmail={myData.email} currentUserContact={myData.contact} currentAllotedSection={myData.alloted} currentLookingForSections={myData.lookingFor} />}


    
    <BasicTable data={data}/>
    </div>

    </div>
    
    </>
  )
}
