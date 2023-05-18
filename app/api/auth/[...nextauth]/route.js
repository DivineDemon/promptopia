import { connectDB } from "@/utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  async session({ session }) { },
  async signIn({ profile }) {
    try {
      await connectDB();
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  },
});

export { handler as GET, handler as POST };