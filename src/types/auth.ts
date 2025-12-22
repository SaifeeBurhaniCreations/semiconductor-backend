export type JwtPayload = {
  sub: string;
  roles: string[];
  permissions: string[];
};
