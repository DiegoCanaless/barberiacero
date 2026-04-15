import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            try {
                // 🔥 LLAMAR A TU BACKEND
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        google_id: account?.providerAccountId,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    console.error("Error backend:", data);
                    return false;
                }

                if (!data.token || !data.user) {
                    return false;
                }


                // 👉 Guardamos datos del backend
                user.backendToken = data.token;
                user.backendUser = data.user;

                return true;

            } catch (error) {
                console.error("Error en signIn:", error);
                return false;
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token.backendToken = user.backendToken;
                token.backendUser = user.backendUser;
            }
            return token;
        },

        async session({ session, token }) {
            session.backendToken = token.backendToken;
            session.user = token.backendUser;
            return session;
        },
    },

    pages: {
        signIn: "/",
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
