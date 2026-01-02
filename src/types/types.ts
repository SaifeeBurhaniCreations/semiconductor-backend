import { MiddlewareHandler } from "hono";
export type AppEnv = {
  Variables: {
    user: {
      id: string;
      role: string;
      capabilities: string[];
      twoFactorVerified: boolean;
    };
  };
};

export type MiddlewareWrapper = MiddlewareHandler<AppEnv>;


export type JwtPayload = {
  sub: string;
  roles: string[];
  permissions: string[];
};
