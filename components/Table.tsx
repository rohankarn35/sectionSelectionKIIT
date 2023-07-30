"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableInfo } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { acceptUser } from '@/utils/functions';
import { setDisplayMessage, setLoading, setLoadingIndex, setMessage } from '@/Redux/reducers/sectionswap';

export default function BasicTable({data}:{data:TableInfo[]}) {
    const myData = useAppSelector((state)=>state.sectionSwap.mydata);
    const loading = useAppSelector((state)=>state.sectionSwap.loading);
    const LoadingIndex = useAppSelector((state)=>state.sectionSwap.loadingIndex);
    const dispatch = useAppDispatch();
  return (
    <TableContainer sx={{backgroundColor:"black",color:"wheat"}} color='white' component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow   sx={{color:"white"}}  >
            <TableCell sx={{color:"white",fontWeight:"bold",fontFamily:"sans-serif" }} >Requested Name</TableCell>
            <TableCell sx={{color:"white",fontWeight:"bold",fontFamily:"sans-serif" }} align="right">Email</TableCell>
           
            <TableCell sx={{color:"white",fontWeight:"bold",fontFamily:"sans-serif" }} align="right">Alloted</TableCell>
            <TableCell sx={{color:"white",fontWeight:"bold",fontFamily:"sans-serif" }} align="right">looking For</TableCell>
            <TableCell sx={{color:"white",fontWeight:"bold",fontFamily:"sans-serif" }} align="right">Accept Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((v,index) => (
            <TableRow
              key={index}
              className='text-white'
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{color:"white"}} component="th" scope="row">
                {v.name}
              </TableCell>
              <TableCell sx={{color:"white"}} align="right">{v.email}</TableCell>
            
              <TableCell sx={{color:"white"}} align="right">{v.alloted}</TableCell>
              <TableCell sx={{color:"white"}} align="right">{v.lookingFor.join(",")}</TableCell>
              <TableCell sx={{color:"white"}} align="right">
                {v.matched==true? <button disabled className='bg-cyan-900 rounded-md text-white px-4 py-2 '>Matched: {v.remoteUserId.name}</button>:myData._id==v._id? <button disabled className='bg-green-900 text-white disabled:bg-gray-600 rounded-md px-4 py-2'>You</button>  :
                <button onClick={async()=>{
                    if(myData.alloted==0) {
                        dispatch(setMessage({msg:"Create your match first,If you have already created then refresh first and try again!",type:"warning"}));
                        dispatch(setDisplayMessage(true));
                        return;

                    }

                    if(v.lookingFor.includes(myData.alloted) && myData.lookingFor.includes(v.alloted)){
                        dispatch(setLoadingIndex(index));
                        dispatch(setLoading(true));
                        
                        const c:string = await acceptUser(myData._id,myData.name,myData.email,v._id,v.name,v.email,myData.alloted,myData.lookingFor,v.alloted,v.lookingFor,myData.contact,v.contact);

                        const decode:{
                           success:boolean,
                           message:string
                        } = JSON.parse(c);
                        if(decode.success){
                            dispatch(setMessage({msg:decode.message,type:"success"}));
                        dispatch(setDisplayMessage(true));
                        }else{
                            dispatch(setMessage({msg:decode.message,type:"error"}));
                            dispatch(setDisplayMessage(true));
                        }
                        dispatch(setLoadingIndex(-1));
                        dispatch(setLoading(false));
                        
                    }else{
                        dispatch(setMessage({
                            msg:"Match Not Found,Make sure , the requirement match for both of you",
                            type:"error"
                        }));
                        dispatch(setDisplayMessage(true));
                    }

                    console.log(myData._id,myData.name,myData.email,v._id,v.name,v.email)
                    // console.log(c);
                }} disabled={myData.matched==true} className='bg-green-900 disabled:bg-gray-600  text-white rounded-md px-4 py-2 '>{LoadingIndex==index && loading ? "Accepting":"Accept"}</button>}
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
