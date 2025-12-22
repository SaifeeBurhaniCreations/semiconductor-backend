import { Hono } from "hono";
import { pg } from "../db/postgres";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginRoute = new Hono();

loginRoute.post("/", async (c) => {
  const { email, password } = await c.req.json();

  const userRes = await pg.query(
    "SELECT id, password_hash FROM users WHERE email=$1 AND is_active=true",
    [email]
  );

  if (userRes.rowCount === 0) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const user = userRes.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const permRes = await pg.query(`
    SELECT DISTINCT p.code
    FROM permissions p
    JOIN role_permissions rp ON rp.permission_id = p.id
    JOIN user_roles ur ON ur.role_id = rp.role_id
    WHERE ur.user_id = $1
  `, [user.id]);

  const permissions = permRes.rows.map(r => r.code);

  const token = jwt.sign(
    {
      sub: user.id,
      permissions
    },
    process.env.JWT_SECRET!,
    { expiresIn: "20m" }
  );

  return c.json({ token });
});
