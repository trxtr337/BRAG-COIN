import { useEffect, useState } from "react";
import axios from "axios";

export default function useBalance(wallet) {
  const [balance, setBalance] = useState(0);

  const fetchBalance = () => {
    axios.get(`http://localhost:5000/api/user/${wallet}`)
      .then(res => setBalance(res.data.balance))
      .catch(err => console.error("Ошибка загрузки баланса:", err));
  };

  useEffect(fetchBalance, [wallet]);

  return [balance, fetchBalance]; // 🔹 Возвращаем и баланс, и функцию обновления
}
