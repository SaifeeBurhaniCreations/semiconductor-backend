import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type AuthToken = {
  sub: string;
  role: string;
  twoFactorVerified?: boolean;
};

export const verifyToken = (token: string): AuthToken =>
  jwt.verify(token, JWT_SECRET) as AuthToken;
