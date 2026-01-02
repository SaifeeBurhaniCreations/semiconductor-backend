import jwt from "jsonwebtoken";
import crypto from "crypto";
import { CapabilityContext } from "../access/capabilityContext";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export function signAccessToken(payload: {
  userId: string;
  role: string;
  capabilities: CapabilityContext[];
  twoFA: boolean;
}) {
  return jwt.sign(
    {
      iss: "fab-control",
      aud: "fab-api",
      sub: payload.userId,
      role: payload.role,
      caps: payload.capabilities,
      twoFA: payload.twoFA,
      jti: crypto.randomUUID(),
    },
    ACCESS_SECRET,
    { expiresIn: "10m" }
  );
}

export function signRefreshToken(userId: string) {
  return jwt.sign(
    {
      iss: "fab-control",
      sub: userId,
      type: "refresh",
      jti: crypto.randomUUID(),
    },
    REFRESH_SECRET,
    { expiresIn: "30d" }
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
