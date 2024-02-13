// page.tsx
'use client'
import React, { useState } from 'react';
import Schedule from './components/schedule';
import Standings from './components/standings';
// Import Link from react-router-dom
import Link from 'next/link';
import Teams from './teams';

const Home: React.FC = () => {
  const [showTeamsPopup, setShowTeamsPopup] = useState(false);

  const handleShowTeams = () => setShowTeamsPopup(true);
  const handleClosePopup = () => setShowTeamsPopup(false);

  const [currentView, setCurrentView] = useState<'schedule' | 'standings' | ''>('');
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const sports = ['Cricket', 'Volleyball','Basketball','Football','Tug of War','Badminton','Atheletics','Table Tennis','Lawn Tennis','Swimming','Chess','Carrom','Gym-Events'];

  const handleOpenView = (sport: string, view: 'schedule' | 'standings') => {
    setSelectedSport(sport);
    setCurrentView(view);
  };

  const handleClose = () => {
    setCurrentView('');
    setSelectedSport(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Flavium</h1>

  
      <button
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleShowTeams}
      >
      Our team
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {sports.map((sport) => (
          <div key={sport} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700">{sport}</h2>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
                onClick={() => handleOpenView(sport, 'schedule')}
              >
                Today's Schedule
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={() => handleOpenView(sport, 'standings')}
              >
                Past results
              </button>
            </div>
          </div>
        ))}
      </div>

      {showTeamsPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="w-3/4 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-white p-8 rounded-lg shadow-xl">
      <Teams />
      <button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={handleClosePopup}
      >
        Close
      </button>
    </div>
  </div>
)}

      {currentView && selectedSport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold">{selectedSport} {currentView === 'schedule' ? "Schedule" : "Standings"}</h3>
            {currentView === 'schedule' ? (
              <Schedule sport={selectedSport} />
            ) : (
              <Standings sport={selectedSport} />
            )}
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
