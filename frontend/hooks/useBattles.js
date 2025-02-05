import { useEffect, useState } from "react";
import axios from "axios";

export default function useBattles() {
  const [battles, setBattles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/battles")
      .then(res => {
        console.log("Голосования загружены:", res.data); // ✅ Отладка
        setBattles(res.data);
      })
      .catch(err => console.error("Ошибка загрузки голосований:", err));
  }, []);

  return battles;
}
