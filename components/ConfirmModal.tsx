
"use client"
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { setConfirmOpen, setDisplayMessage, setMessage, setOpenCreate } from '@/Redux/reducers/sectionswap';
import { handleOnConfirm } from '@/utils';
import { addUser } from '@/utils/functions';
import { useSession } from 'next-auth/react';
import React from 'react'

const ConfirmModal = () => {
    const dispatch = useAppDispatch();
    const openConfirm = useAppSelector((state)=>state.sectionSwap.confirmOpen);
    const alloted = useAppSelector((state)=>state.sectionSwap.allotedSection);
    const lookingfor = useAppSelector((state)=>state.sectionSwap.lookingFor);
    const contact = useAppSelector((state)=>state.sectionSwap.userContact);

    const session = useSession();
    const myData = useAppSelector((state)=>state.sectionSwap.mydata);


  return (
    <div className={`w-screen ${!openConfirm && "hidden"}  flex items-center justify-center fixed flex-col left-0 right-0 top-0 h-screen bg-gray-900/90 p-2 md:p-3`}>
      <div className='w-full lg:w-2/5 h-auto  md:w-2/3 rounded-md bg-gray-800'>
        <div className='w-full flex items-center justify-center py-5'>
        <h1 className='text-base font-bold lg:text-2xl'>Are you sure want to continue?</h1>
        </div>
        <div className='p-5 justify-center lg:text-xl  text-sm md:text-base  flex flex-col gap-2'>
            <p><span className='font-bold text-cyan-400'>Alloted</span> : {alloted} </p>
            <p><span className='font-bold text-cyan-400'>looking For </span>: {lookingfor.join(",")}</p>
            <p><span className='font-bold text-cyan-400'>Requested by</span> :{session.data?.user?.name}</p>
            <p><span className='font-bold text-cyan-400'>Email</span> :{session.data?.user?.email}</p>
            <p><span className='font-bold text-cyan-400'>Contact</span> :{contact} (Don't worry your contact won't be available to others users, it is sent to the matched user)</p>
        </div>
        <div className='flex flex-row justify-around my-5'>
            <button onClick={()=>dispatch(setConfirmOpen(false))} className='border font-bold text-red-400 hover:bg-red-700 hover:text-white border-gray-700 px-5 py-2 rounded-md'>Cancel</button>
            <button onClick={async()=>{

              console.log("mydata",myData);

              
              if(myData.alloted!==0){
                dispatch(setConfirmOpen(false))
                dispatch(setOpenCreate(false));
                dispatch(setMessage({
                  msg:"You have already created your Match,Please refresh the page",
                  type:"warning"
                }))
                dispatch(setDisplayMessage(true))
                return;
              }
              var res:boolean|Error =await handleOnConfirm(`${session.data?.user?.name}`,`${session.data?.user?.email}`,alloted,lookingfor,"9631627104")
              console.log("Response",res);
              if(res==true){
                dispatch(setConfirmOpen(false))
                dispatch(setOpenCreate(false));
                dispatch(setMessage({msg:"Created Sucessfully! Please refresh the page",type:"success"}))
                dispatch(setDisplayMessage(true))

              }else{
                dispatch(setConfirmOpen(false))
                dispatch(setOpenCreate(false));
                dispatch(setMessage({msg:"User might not available",type:"error"}))
                dispatch(setDisplayMessage(true))
              }
            }} className='border text-green-400
            font-bold border-gray-700 px-5 py-2 hover:bg-green-600 hover:text-white rounded-md'>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
