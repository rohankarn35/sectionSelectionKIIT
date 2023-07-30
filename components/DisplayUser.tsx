import React from 'react';

const DisplayUser = ({
  senderName,
  matchedUserName,
  matchedUserEmail,
  matchedUserContact,
  currentAllotedSection,
  currentLookingForSections,
  remoteAllotedSection,
  remoteLookingForSections,
}:{
    senderName:string,matchedUserName:string;matchedUserEmail:string;matchedUserContact:string,currentAllotedSection:number;currentLookingForSections:number[];remoteAllotedSection:number;remoteLookingForSections:number[]
}) => {
  return (
    <div className="font-sans  p-8 bg-slate-800">
      <h1 className="text-3xl font-bold mb-4">Hey {senderName},</h1>
      <p className="text-lg mb-4">Congratulations! You have found a match for Section Swapping:</p>

      <div className="bg-slate-800 border rounded p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Details:</h2>
        <h3 className="text-lg mb-1">Name: {matchedUserName}</h3>
        <h3 className="text-lg mb-1">Email: {matchedUserEmail}</h3>
        <h3 className="text-lg mb-4">Contact: {matchedUserContact}</h3>

        <h2 className="text-xl font-semibold mb-2">Swapping Section Details:</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Your Details:</h3>
          <p className="text-lg mb-1">Alloted Section: {currentAllotedSection}</p>
          <p className="text-lg">Looking For Sections: {currentLookingForSections.join(", ")}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Matched User Details:</h3>
          <p className="text-lg mb-1">Alloted Section: {remoteAllotedSection}</p>
          <p className="text-lg">Looking For Sections: {remoteLookingForSections.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayUser;
