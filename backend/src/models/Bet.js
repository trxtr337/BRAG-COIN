import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
  wallet: String,
  battleId: Number,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Bet", betSchema);
