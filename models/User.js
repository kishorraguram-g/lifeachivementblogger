import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }]
}, { timestamps: true });

export const User = mongoose.models?.User || mongoose.model("User", userSchema);