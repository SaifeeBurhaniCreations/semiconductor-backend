import { defineConfig } from "prisma/config";
import "dotenv/config"

const DB_URL=process.env.POSTGRES_URL


export default defineConfig({
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // provider: "postgresql",
    url: DB_URL,
  },
});
