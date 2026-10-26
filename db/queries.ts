import pool from "./pool.ts";

export interface DbMessageRow {
  id: number;
  username: string;
  text: string;
  added: Date;
}

export interface Message {
  id: number;
  user: string;
  text: string;
  added: string;
}

export const convertDateToString = (d: Date | string | number): string => {
  const dateObj = d instanceof Date ? d : new Date(d);
  if (isNaN(dateObj.getTime())) {
    return new Date().toLocaleString("en-GB").split(", ")[0];
  }
  return dateObj.toLocaleString("en-GB").split(", ")[0];
};

export async function getAllMessages(): Promise<Message[]> {
  const { rows } = await pool.query<DbMessageRow>(
    "SELECT id, username, text, added FROM messages ORDER BY id ASC;"
  );
  return rows.map((row) => ({
    id: row.id,
    user: row.username,
    text: row.text,
    added: convertDateToString(row.added),
  }));
}

export async function getMessageByUser(username: string): Promise<Message | null> {
  const { rows } = await pool.query<DbMessageRow>(
    "SELECT id, username, text, added FROM messages WHERE username = $1 LIMIT 1;",
    [username]
  );
  if (rows.length === 0) return null;
  const row = rows[0];
  return {
    id: row.id,
    user: row.username,
    text: row.text,
    added: convertDateToString(row.added),
  };
}

export async function getMessageById(id: number): Promise<Message | null> {
  const { rows } = await pool.query<DbMessageRow>(
    "SELECT id, username, text, added FROM messages WHERE id = $1;",
    [id]
  );
  if (rows.length === 0) return null;
  const row = rows[0];
  return {
    id: row.id,
    user: row.username,
    text: row.text,
    added: convertDateToString(row.added),
  };
}

export async function createMessage(user: string, text: string, added?: Date): Promise<void> {
  if (added && !isNaN(added.getTime())) {
    await pool.query(
      "INSERT INTO messages (username, text, added) VALUES ($1, $2, $3);",
      [user, text, added]
    );
  } else {
    await pool.query(
      "INSERT INTO messages (username, text) VALUES ($1, $2);",
      [user, text]
    );
  }
}
