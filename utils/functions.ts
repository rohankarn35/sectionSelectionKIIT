"use server";

import Users from "@/models/CreateEvent";
import connectDB from "./connect-db";
import { User } from "@/interfaces";
import { sendMail } from "./nodemailer";

// name:{type:String,required:true},
// alloted:{type:Number,required:true},
// email:{type:String,required:true},
// lookingFor:{type:[],required:true},
// matched:{type:Boolean,required:true},
// contact:{type:String,required:true}

export const fetchUser = async (): Promise<string> => {
  try {
    await connectDB();
    const user = await Users.find({});
    console.log("first", user);

    return JSON.stringify(user);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch");
  }
};

export const getMyData = async (email: string): Promise<string> => {
  try {
    await connectDB();
    const user = await Users.findOne<User>({ email: email });
    if (user) {
      return JSON.stringify({ success: true, user: user });
    }
    return JSON.stringify({ success: false });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ success: false });
  }
};

const updateUser = async (
  currentUserId: string,
  remoteUserId: string,
  remoteUserName: string,
  remoteEmail: string
) => {
  // const updateUser = await Users.findOneAndUpdate({_id:currentUserId,matched:false},{$set:{matched:true,remoteUserId:{
  //     name:remoteUserName,
  //     email:remoteEmail,
  //     _id:remoteUserId
  // }}});

  const updateUser = await Users.findOneAndUpdate(
    { _id: currentUserId, matched: false },
    {
      $set: {
        matched: true,
        remoteUserId: {
          name: remoteUserName,
          email: remoteEmail,
          _id: remoteUserId,
        },
      },
    }
  );
  // console.log(updateUser)

  // return updateUser.count;
  console.log(updateUser);

  return updateUser;
};

const reverst = async (currentUserId: string) => {
  // const updateUser = await Users.findOneAndUpdate({_id:currentUserId,matched:false},{$set:{matched:true,remoteUserId:{
  //     name:remoteUserName,
  //     email:remoteEmail,
  //     _id:remoteUserId
  // }}});

  const revertUser = await Users.findOneAndUpdate(
    { _id: currentUserId, matched: true },
    { $set: { matched: false, remoteUserId: null } }
  );

  // console.log(updateUser)

  // return updateUser.count;
  console.log(revertUser);

  return revertUser;
};

export const acceptUser = async (
  currentUserId: string,
  currentName: string,
  currentEmail: string,
  remoteUserId: string,
  remoteUserName: string,
  remoteEmail: string,
  currentAlloted:number,
  currentLookingFor:number[],
  remoteAlloted:number,
  remoteLookingFor:number[],
  currentUserContact:string,
  remoteUserContact:string

):Promise<string> => {
  try {
    await connectDB();

    console.log(
      currentUserId,
      currentName,
      currentEmail,
      remoteUserId,
      remoteEmail,
      remoteUserName
    );

    // const user1Filter = { _id: currentUserId }; // Replace 'user1_id' with the actual ID of the first user
    // const user1Update = { matched: true,remoteUserId:{
    //     name:"ram bhai",
    //     email:remoteEmail,
    //     _id:remoteUserId
    // } };
    // const user2Filter = { _id: remoteUserId }; // Replace 'user2_id' with the actual ID of the second user
    // const user2Update = { matched: true,remoteUserId:{
    //     name:"shyambhai",
    //     email:currentEmail,
    //     _id:currentUserId

    // } };

    // Perform the updateMany operation using Mongoose

    // console.log(`${result.modifiedCount} users updated.`);
    const promise = await Promise.all([
      updateUser(remoteUserId, currentUserId, currentName, currentEmail),
    ]).then(async (d) => {
      console.log("dddd", d);
      if (d[0] == null) {
        return JSON.stringify({
          success: false,
          message: "User is not available,Please refresh",
        });
      }
      const mine = await updateUser(
        currentUserId,
        remoteUserId,
        remoteUserName,
        remoteEmail
      );
      console.log("mine", mine);
      if (mine == null) {
        await reverst(remoteUserId);
        return JSON.stringify({
          success: false,
          message: "User is not available,Please refresh",
        });
      }
      await sendMail(currentEmail,currentName,remoteEmail,remoteUserContact,remoteUserName,currentAlloted,currentLookingFor,remoteAlloted,remoteLookingFor);
      await sendMail(remoteEmail,remoteUserName,currentEmail,currentUserContact,currentName,remoteAlloted,remoteLookingFor,currentAlloted,currentLookingFor);
      return JSON.stringify({
        success: true,
        message: "You have sucessfully matched Found",
      });
    });
    console.log("promise", promise);
    return promise;
  } catch (error) {
    console.log(error);
    return JSON.stringify({success:false,message:"Internal Error"})
  }
};

export const addUser = async (
  name: string,
  email: string,
  alloted: number,
  lookingFor: number[],
  contact: string
): Promise<boolean | Error> => {
  try {
    console.log("connected");
    await connectDB();

    const user = await Users.findOne({ email: email });
    if (user) {
      return false;
    }
    await Users.create<User>({
      email: email,
      alloted: alloted,
      contact: contact,
      lookingFor: lookingFor,
      name: name,
      matched: false,
      remoteUserId: null,
    })
      .then((data) => {
        console.log("Created", data);
        return true;
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Something went wrong");
      });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
