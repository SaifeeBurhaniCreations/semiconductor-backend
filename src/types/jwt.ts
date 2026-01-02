// src/types/jwt.ts

import { CapabilityContext } from "./capability";

export type AccessTokenPayload = {
  iss: string;
  aud: string;
  sub: string;
  role: string;
  caps: CapabilityContext[];
  twoFA: boolean;
  jti: string;
  iat: number;
  exp: number;
};

export type RefreshTokenPayload = {
  iss: string;
  sub: string;
  type: "refresh";
  jti: string;
  iat: number;
  exp: number;
};
