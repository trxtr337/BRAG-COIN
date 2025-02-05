import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const [wallet] = useState("ton123456789");
  const [bets, setBets] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/battles/bets/${wallet}`) // ✅ Исправленный путь
      .then(res => setBets(res.data))
      .catch(err => console.error("Ошибка загрузки ставок:", err));
  }, []);
  

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold">👤 Профиль</h1>
      <h2 className="text-xl mt-6">💸 История ставок:</h2>
      <ul className="mt-4">
        {bets.length > 0 ? (
          bets.map((bet, index) => (
            <li key={index} className="p-4 border rounded-lg bg-gray-800 mt-2">
              <p>Ставка {bet.amount} BGC на голосование {bet.battleId}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-400">Ставок пока нет</p>
        )}
      </ul>

      <Link to="/" className="block mt-4 bg-blue-500 p-2 text-center rounded">Назад</Link>
    </div>
  );
}
