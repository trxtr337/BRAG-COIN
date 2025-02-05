import { useState } from "react";
import useBalance from "../hooks/useBalance";
import useBattles from "../hooks/useBattles";

export default function Home() {
  const [wallet, setWallet] = useState("ton123456789"); // Тестовый адрес
  const balance = useBalance(wallet);
  const battles = useBattles();

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold">🔥 BRAG-COIN 🔥</h1>
      <p className="mt-2 text-lg">💰 Баланс: <strong>{balance} BGC</strong></p>

      <input
        type="text"
        className="w-full mt-4 p-2 border rounded text-black"
        placeholder="Введите TON-адрес"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />

      <h2 className="text-xl mt-6">⚔️ Активные голосования:</h2>
      <ul className="mt-4">
        {battles.map((battle) => (
          <li key={battle.id} className="p-4 border rounded-lg bg-gray-800 mt-2">
            <p>{battle.question}</p>
            <button className="bg-blue-500 text-white p-2 mt-2 rounded w-full">
              Сделать ставку
            </button>
          </li>
        ))}
      </ul>

      <a href="/profile" className="block mt-4 bg-blue-500 p-2 text-center rounded">Перейти в профиль</a>
    </div>
  );
}
