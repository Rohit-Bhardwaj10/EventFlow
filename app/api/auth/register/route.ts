import { NextRequest, NextResponse } from "next/server";
import user from "@/models/User";
import { dbConnect } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "email is already registered" },
        { status: 400 }
      );
    }

    const newUser = new user({ email, password });
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Failed to register the user" },
      { status: 500 }
    );
  }
};
