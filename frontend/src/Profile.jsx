import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useBalance from "../hooks/useBalance"; // ✅ Подключаем хук для баланса

export default function Profile() {
  const [wallet] = useState("ton123456789");
  const [bets, setBets] = useState([]);
  const [balance, fetchBalance] = useBalance(wallet); // ✅ Баланс

  // Функция вывода средств
  const handleWithdraw = () => {
    const amount = prompt("Введите сумму для вывода:");

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Введите корректную сумму!");
      return;
    }

    axios.post("http://localhost:5000/api/user/withdraw", {
      wallet,
      amount,
    })
    .then(res => {
      alert(res.data.message);
      fetchBalance(); // ✅ Обновляем баланс после вывода
    })
    .catch(err => alert("Ошибка при выводе средств!"));
  };

  // Загрузка истории ставок
  useEffect(() => {
    axios.get(`http://localhost:5000/api/battles/bets/${wallet}`)
      .then(res => setBets(res.data))
      .catch(err => console.error("Ошибка загрузки ставок:", err));
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold">👤 Профиль</h1>
      
      {/* 💰 Баланс */}
      <p className="mt-2 text-lg">💰 Баланс: <strong>{balance} BGC</strong></p>

      {/* 🔹 Кнопка вывода средств */}
      <button 
        className="bg-red-500 text-white p-2 mt-4 rounded w-full hover:bg-red-600"
        onClick={handleWithdraw}
      >
        Вывести средства
      </button>

      {/* 📜 История ставок */}
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

      {/* 🔙 Кнопка назад */}
      <Link to="/" className="block mt-4 bg-blue-500 p-2 text-center rounded hover:bg-blue-600">
        Назад
      </Link>
    </div>
  );
}
