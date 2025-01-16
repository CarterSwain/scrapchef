// src/components/Header.js
import React from 'react';
import LogoutButton from './LogoutButton.js';

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-lettuce text-white">
      <h1 className="text-xl font-bold">ScrapChef</h1>
      <div>
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;

