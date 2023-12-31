import mongoose from "mongoose";

export interface initialState{
    allotedSection:number,
    lookingFor:number[],
    openCreate:boolean,
    confirmOpen:boolean,
    displayMessage:boolean
    message:{
        msg:string,
        type:string
    };
    mydata:TableInfo,
    loading:boolean,
    loadingIndex:number,
    userContact:string
   
}

export interface User{
    name:string;
    email:string;
    alloted:number,
    lookingFor:number[];
    matched:Boolean,
    contact:string
    remoteUserId:any
}


export interface remoteUserId{
    name:string,
    email:string,
    _id:string,
    matched:boolean
}
export interface TableInfo{
    name:string;
    email:string;
    contact:string;
    alloted:number;
    lookingFor:number[];
    _id:string,
    matched:Boolean,
    remoteUserId:remoteUserId
}