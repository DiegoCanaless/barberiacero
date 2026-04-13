import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        backendToken?: string;
        user: any;
    }

    interface User {
        backendToken?: string;
        backendUser?: any;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        backendToken?: string;
        backendUser?: any;
    }
}
