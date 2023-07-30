import { TableInfo, initialState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";



const initialState:initialState={
    allotedSection:0,
    lookingFor:[],
    openCreate:false,
    confirmOpen:false,
    displayMessage:false,
    message:{
        msg:"",
        type:""
    },
    mydata:{
        _id:"",
        alloted:0,
        contact:"",
        email:"",
        lookingFor:[],
        matched:false,
        name:"",
       remoteUserId:{
        _id:"",
        email:"",
        name:"",
        matched:false
       }
    },
    loading:false,
    loadingIndex:-1,
    userContact:""

}

const sectionSwapSlice = createSlice({
    name:"SectionSwapSlice",
    initialState,
    reducers:{
        setAllotedSection:(state,action)=>{
            state.allotedSection = action.payload;
        },
        pushLookingFor:(state,action)=>{
            if(state.lookingFor.includes(action.payload)){
                state.lookingFor = state.lookingFor.filter((val)=>val!==action.payload)
            }else{
                state.lookingFor = state.lookingFor.concat(action.payload);  
            }
        },
        setConfirmOpen:(state,action)=>{
           state.confirmOpen = action.payload;
        },
        setOpenCreate:(state,action)=>{
            state.openCreate =action.payload;
        },
        setDisplayMessage:(state,action)=>{
            state.displayMessage = action.payload;
        },
        setMessage:(state,action)=>{
            state.message = action.payload;
        },
        setMyData:(state,{payload}:{payload:TableInfo})=>{
            state.mydata = payload
        },

        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setLoadingIndex:(state,action)=>{
            state.loadingIndex = action.payload;
        },

        setUserContact:(state,action)=>{
            state.userContact = action.payload;
        }




    }
});


export const { pushLookingFor,setConfirmOpen,setAllotedSection,setOpenCreate,setDisplayMessage,setMessage,setMyData,setLoading,setLoadingIndex,setUserContact} = sectionSwapSlice.actions;

export default sectionSwapSlice.reducer
