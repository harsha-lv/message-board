#! /usr/bin/env node

import pool from "./pool.ts";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT NOT NULL,
  username VARCHAR(255) NOT NULL,
  added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username, added)
VALUES
  ('Hi there!', 'harsha', CURRENT_TIMESTAMP),
  ('Hello World!', 'vaibhav', CURRENT_TIMESTAMP);
`;

async function main(): Promise<void> {
  console.log("Seeding database...");
  try {
    await pool.query(SQL);
    console.log("Database seeded successfully.");
  } finally {
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error("Failed to seed database:", error);
  process.exitCode = 1;
});
