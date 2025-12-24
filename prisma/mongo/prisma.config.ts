import { defineConfig } from "prisma/config";
import "dotenv/config"

const DB_URL=process.env.MONGO_URL


export default defineConfig({
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: DB_URL,
  },
});
