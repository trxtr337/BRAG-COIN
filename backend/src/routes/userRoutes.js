import express from "express";
import User from "../models/User.js"; // ✅ Импорт теперь работает

const router = express.Router();

router.get("/:wallet", async (req, res) => {
  const { wallet } = req.params;
  const user = await User.findOne({ wallet });
  res.json({ balance: user?.balance || 0 });
});

router.post("/register", async (req, res) => {
    const { wallet } = req.body;
  
    if (!wallet) {
      return res.status(400).json({ error: "Укажите кошелёк" });
    }
  
    try {
      let user = await User.findOne({ wallet });
  
      if (user) {
        return res.status(400).json({ error: "Пользователь уже существует" });
      }
  
      user = new User({ wallet, balance: 1000 });
      await user.save();
  
      res.json({ success: true, message: "Пользователь зарегистрирован!", balance: user.balance });
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  

  router.post("/withdraw", async (req, res) => {
    const { wallet, amount } = req.body;
  
    if (!wallet || !amount || amount <= 0) {
      return res.status(400).json({ error: "Некорректные данные вывода" });
    }
  
    try {
      const user = await User.findOne({ wallet });
  
      if (!user || user.balance < amount) {
        return res.status(400).json({ error: "Недостаточно средств!" });
      }
  
      user.balance -= amount;
      await user.save();
  
      res.json({ success: true, message: `Вывод ${amount} BGC успешно обработан!` });
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  

// Пополнение баланса (ТОКЕНЫ -> КОИНЫ)
router.post("/deposit", async (req, res) => {
    const { wallet, amount } = req.body;
    if (!wallet || !amount) return res.status(400).json({ error: "Неверные данные" });
  
    let user = await User.findOne({ wallet });
    if (!user) user = new User({ wallet, balance: 0 });
  
    user.balance += amount;
    await user.save();
    res.json({ success: true, newBalance: user.balance });
  });
  
  // Вывод средств (КОИНЫ -> ТОКЕНЫ)
  router.post("/withdraw", async (req, res) => {
    const { wallet, amount } = req.body;
    if (!wallet || !amount) return res.status(400).json({ error: "Неверные данные" });
  
    let user = await User.findOne({ wallet });
    if (!user || user.balance < amount) return res.status(400).json({ error: "Недостаточно средств" });
  
    user.balance -= amount;
    await user.save();
    res.json({ success: true, newBalance: user.balance });
  });

export default router; // ✅ Должен быть default export
