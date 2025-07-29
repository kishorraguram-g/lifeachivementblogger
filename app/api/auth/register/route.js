import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  try {
    const { name, email, password } = await req.json();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    return Response.json({ success: true, user });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}