"use client";

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setDisplayMessage, setMyData, setOpenCreate } from "@/Redux/reducers/sectionswap";
import DisplayUser from "@/components/DisplayUser";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import BasicTable from "@/components/Table";
import SingleUser from "@/components/WithoutMatch";
import { TableInfo } from "@/interfaces";
// import SpanningTable from "@/components/Table";
import { fetchUser, getMyData } from "@/utils/functions";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const message = useAppSelector((state) => state.sectionSwap.message);
  const openMessage = useAppSelector(
    (state) => state.sectionSwap.displayMessage
  );
  const session = useSession();
  const dispatch = useAppDispatch();
  const myData = useAppSelector((state) => state.sectionSwap.mydata);

  // console.log(data);

  const fetchData = async () => {
    const p: string = await fetchUser();
    setData(JSON.parse(p));
  };

  const p = async (email: string) => {
    var c: string = await getMyData(email);

    var decode: {
      success: boolean;
      user: TableInfo;
    } = JSON.parse(c);
    if (decode.success) {
      dispatch(setMyData(decode.user));
    }
  };

  useEffect(() => {
    if (session.data?.user) {
      fetchData();
      p(`${session.data.user.email}`);
    }
    // const interval = setInterval(fetchData,10000);
    // return()=>clearInterval(interval);
  }, [session.data?.user]);

  return (
    <>
      <div className="">
        <Modal />

        <Snackbar open={openMessage} autoHideDuration={6000} onClose={()=>dispatch(setDisplayMessage(false))}>
        <Alert severity={`${message.type as AlertColor}`} sx={{ width: "100%" }}>
           {JSON.stringify(message.msg)}
          </Alert>
        </Snackbar>

        {/* {JSON.stringify(data)}  
      
      */}

        {/* <div className="pt-28"></div> */}
        <div className="pt-28 w-full max-w-screen-xl mx-auto  ">
          {/* {myData.alloted!==0 && JSON.stringify(myData)}
        
        */}

          {myData.alloted == 0 ? (
            <div className="font-sans  p-8 bg-slate-800">
              <div>
                You have not created your match yet.{" "}
                <button
                  className="text-blue-500"
                  onClick={() => dispatch(setOpenCreate(true))}
                >
                  Create Now
                </button>
              </div>
            </div>
          ) : myData.matched ? (
            <DisplayUser
              currentAllotedSection={myData.alloted}
              currentLookingForSections={myData.lookingFor}
             
              matchedUserEmail={myData.remoteUserId.email}
              matchedUserName={myData.remoteUserId.name}
             
           
              senderName={myData.name}
            />
          ) : (
            <SingleUser
              currentUserName={myData.name}
              currentUserEmail={myData.email}
              currentUserContact={myData.contact}
              currentAllotedSection={myData.alloted}
              currentLookingForSections={myData.lookingFor}
            />
          )}
          <BasicTable data={data} />
        </div>
      </div>
    </>
  );
}
