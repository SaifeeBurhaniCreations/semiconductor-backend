import { Pool } from "pg";

export const pg = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// import { PrismaClient } from "@prisma/postgres"

// export const pg = new PrismaClient()