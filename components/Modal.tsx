"use client"
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { pushLookingFor, setAllotedSection, setConfirmOpen, setDisplayMessage, setMessage, setOpenCreate, setUserContact } from '@/Redux/reducers/sectionswap'
import { section } from '@/utils'
import React, { useRef } from 'react'
import ConfirmModal from './ConfirmModal'



const Modal = () => {

    const open = useAppSelector((state)=>state.sectionSwap.openCreate);
    const dispatch = useAppDispatch();
    const allotedSection = useAppSelector((state)=>state.sectionSwap.allotedSection);
    const lookingFor = useAppSelector((state)=>state.sectionSwap.lookingFor);
     
    const p = useRef<HTMLInputElement>(null);
  return (
    <div className={`w-screen ${open?"":"hidden"}  flex items-center justify-center fixed flex-col left-0 right-0 top-0 h-screen bg-gray-900/90 p-2 md:p-3`}>
        <ConfirmModal/>
        <div className='py-5'>
            <button  onClick={()=>dispatch(setOpenCreate(false))} className='px-4 bg-red-600  py-1 rounded-md'>Close</button>
        </div>
      <div className='w-full h-full scrollbar-thin scrollbar-thumb-cyan-600 overflow-y-auto bg-black/60 p-2 md:p-5 lg:w-4/5 md:w-3/4'>
       <div className='flex py-10 justify-center bg-transparent '>
       <input ref={p} type="text" className='bg-transparent rounded-md border border-gray-700 py-2 px-10 text-center text-white' placeholder='WhatsApp No(Visible only in mail)' />
       </div>
        <h1 className={`mt-2 ml-2  `}>Select Alloted Section</h1>
       <div className='grid grid-cols-4 lg:grid-cols-8 p-2 mt-3 gap-1 grid-flow-row'>
       {section.map((val,index)=>{
            return  <button key={index} onClick={()=>dispatch(setAllotedSection(val))} className={`bg-gray-900 ${allotedSection==val && "bg-green-700"}  rounded-md  p-2`}>{val}</button>
        })}
       </div>
       <h1 className='mt-2 ml-2'>Select Alloted Section</h1>
       <div className='grid grid-cols-4 p-2 mt-3 lg:grid-cols-8 gap-1 grid-flow-row'>
       {section.map((val,index)=>{
            return  <button key={index} onClick={()=>dispatch(pushLookingFor(val))} className={`bg-gray-900 ${lookingFor.includes(val)?"bg-green-600":""}  rounded-md p-2`}>{val}</button>
        })}
       </div>
      <div className='w-full my-10 flex justify-center items-center'>
      <button onClick={()=>{
        if(allotedSection==0 || lookingFor.length<1 || p.current && p.current.value.length<10){
           dispatch(setMessage({msg:"Please fill your details corretly",type:"warning"}));
           dispatch(setDisplayMessage(true));
           return;

        }
        dispatch(setUserContact(p.current?.value.toString()))
        dispatch(setConfirmOpen(true));
      }} className='border border-slate-800 px-10 py-2 rounded-md'>Create </button>
      </div>
      </div>
    </div>
  )
}

export default Modal
