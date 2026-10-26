import net from "node:net";
import "dotenv/config";
import { Pool, type PoolConfig } from "pg";

// Disable family auto-selection so node:net does not hang on unreachable IPv6 routes
net.setDefaultAutoSelectFamily(false);

const connectionString = process.env.DATABASE_URL;

const poolConfig: PoolConfig = connectionString
  ? {
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: process.env.PGHOST || "localhost",
      user: process.env.PGUSER || "postgres",
      database: process.env.PGDATABASE || "message_board",
      password: process.env.PGPASSWORD,
      port: Number(process.env.PGPORT) || 5432,
    };

const pool = new Pool(poolConfig);

export default pool;
