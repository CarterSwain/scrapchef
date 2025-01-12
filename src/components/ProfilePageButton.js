import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePageButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/profile');
  };

  return (
    <button
      onClick={handleNavigate}
      className="fixed bottom-4 right-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
    >
      Go to Profile
    </button>
  );
};

export default ProfilePageButton;

