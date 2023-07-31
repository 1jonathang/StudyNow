// this route maps to any page under localhost3000/api/auth*
import { authOptions } from "@/lib/nextauth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST }
