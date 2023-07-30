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
      <p className="text-lg mb-4">Your matching profile:</p>

      <div className="bg-gray-800 border rounded p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Your Details:</h2>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-500'>Name:</span> {currentUserName}</h3>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-500'>Email:</span> {currentUserEmail}</h3>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-500'>Contact:</span> {currentUserContact}</h3>
        <h3 className="text-lg  mb-2"><span className='font-bold text-cyan-500'>Alloted Section:</span> {currentAllotedSection}</h3>
        <p className="text-lg"><span className='font-bold text-cyan-500'>Looking For Sections:</span> {currentLookingForSections.join(", ")}</p>
      </div>
    </div>
  );
};

export default SingleUser;
