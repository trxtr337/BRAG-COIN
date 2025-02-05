import express from "express";
import Bet from "../models/Bet.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, question: "Apple vs Android" },
    { id: 2, question: "Bitcoin vs Ethereum" },
    { id: 3, question: "Dogecoin vs Solana" }
  ]);
});

router.get("/bets/:wallet", async (req, res) => {
    try {
      const bets = await Bet.find({ wallet: req.params.wallet });
      res.json(bets);
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  

  router.post("/bet", async (req, res) => {
    const { wallet, battleId, amount } = req.body;
  
    console.log("Получен запрос на ставку:", { wallet, battleId, amount });
  
    if (!wallet || !battleId || !amount || amount <= 0) {
      console.error("❌ Некорректные данные ставки:", req.body);
      return res.status(400).json({ error: "Некорректные данные ставки" });
    }
  
    try {
      const user = await User.findOne({ wallet });
  
      if (!user) {
        console.error("❌ Пользователь не найден:", wallet);
        return res.status(404).json({ error: "Пользователь не найден" });
      }
  
      if (user.balance < amount) {
        console.error("❌ Недостаточно средств! Баланс:", user.balance, "Ставка:", amount);
        return res.status(400).json({ error: "Недостаточно средств!" });
      }
  
      user.balance -= amount;
      await user.save();
  
      const bet = new Bet({ wallet, battleId, amount });
      await bet.save();
  
      console.log("✅ Ставка принята:", bet);
      res.json({ success: true, message: `Ставка ${amount} BGC принята! Новый баланс: ${user.balance}` });
    } catch (error) {
      console.error("❌ Ошибка при обработке ставки:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });

export default router;
