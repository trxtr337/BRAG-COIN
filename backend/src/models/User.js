import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  balance: { type: Number, default: 1000 }, // Баланс в игровых коинах
});

// ✅ Добавляем default export
const User = mongoose.model("User", userSchema);
export default User;
