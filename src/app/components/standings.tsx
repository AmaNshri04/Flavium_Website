import React, {useEffect, useState} from 'react';

interface StandingsProps {
  id: number;
  date: string;
  team1: string;
  team2: string;
 Winner : string;
}

const Standings = ({ sport }: { sport: string }) => {
  const [matches, setMatches] = useState<StandingsProps[]>([]);

  useEffect(() => {
      fetch(`/data/${sport}.json`)
          .then((response) => response.json())
          .then((data) => setMatches(data.standings))
          .catch((error) => console.error("Fetching error:", error));
  }, [sport]);

return (
  <div className="overflow-x-auto">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today's Standings for {sport}</h2>
    <table className="min-w-full table-auto">
      <thead className="bg-gray-200">
        <tr> 
          <th className="px-4 py-2 text-left text-gray-600">Date</th>
          <th className="px-4 py-2 text-left text-gray-600">Match</th>
          <th className="px-4 py-2 text-left text-gray-600">Winner</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match, index) => (
          <tr className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="border px-4 py-2 text-gray-700">{match.date}</td>
            <td className="border px-4 py-2 text-gray-700">{match.team1} vs {match.team2}</td>
            <td className="border px-4 py-2 text-gray-700">{match.Winner}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default Standings;

