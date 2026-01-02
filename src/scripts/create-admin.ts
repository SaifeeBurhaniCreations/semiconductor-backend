import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pg = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const EMAIL = "admin";
const PASSWORD = "password"; // change after first login

async function run() {
  const hash = await bcrypt.hash(PASSWORD, 12);

  const userRes = await pg.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     RETURNING id`,
    [EMAIL, hash]
  );

  const userId = userRes.rows[0].id;

  await pg.query(
    `INSERT INTO user_roles (user_id, role_id)
     SELECT $1, id FROM roles WHERE name = 'admin'`,
    [userId]
  );

  console.log("Admin user created:", EMAIL);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
