import React from 'react';

interface MatchDetailsProps {
  currentUserName: string;
  currentUserEmail: string;
  currentUserContact: string;
  currentAllotedSection: number;
  currentLookingForSections: number[];
}

const SingleUser: React.FC<MatchDetailsProps> = ({
  currentUserName,
  currentUserEmail,
  currentUserContact,
  currentAllotedSection,
  currentLookingForSections,
}) => {
  return (
    <div className="font-sans bg-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
      <p className="text-lg mb-4">You have found a match for Section Swapping:</p>

      <div className="bg-gray-800 border rounded p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Your Details:</h2>
        <h3 className="text-lg mb-1">Name: {currentUserName}</h3>
        <h3 className="text-lg mb-1">Email: {currentUserEmail}</h3>
        <h3 className="text-lg mb-1">Contact: {currentUserContact}</h3>
        <h3 className="text-lg font-semibold mb-2">Alloted Section: {currentAllotedSection}</h3>
        <p className="text-lg">Looking For Sections: {currentLookingForSections.join(", ")}</p>
      </div>
    </div>
  );
};

export default SingleUser;
