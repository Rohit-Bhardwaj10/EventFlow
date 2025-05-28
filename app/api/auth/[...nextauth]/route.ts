import { authOptions } from "@/lib/options";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// This file sets up the NextAuth authentication handler using the options defined in lib/options.ts.
// It exports the handler for both GET and POST requests, allowing NextAuth to handle authentication flows.
