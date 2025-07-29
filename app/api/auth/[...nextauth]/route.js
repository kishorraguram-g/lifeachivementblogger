import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// Extract database name from connection string
const uri = process.env.DB_URL;
const dbName = "achivements";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        let client;
        try {
          client = new MongoClient(uri);
          await client.connect();
          const db = client.db(dbName);
          const usersCollection = db.collection("users");
            console.log(credentials.email);
          const user = await usersCollection.findOne({ 
            email: credentials.email 
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return { 
            id: user._id.toString(),
            name: user.name,
            email: user.email
          };

        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        } finally {
          if (client) await client.close();
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  }
});

export { handler as GET, handler as POST };