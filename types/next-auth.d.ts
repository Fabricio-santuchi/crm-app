import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    companyId: string;
  }

  interface Session {
    user: {
      role: string;
      companyId: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    companyId: string;
  }
}
