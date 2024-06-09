import { createClient } from "@libsql/client/web";
import * as env from "../../env.js";

export const turso = createClient({
  url: env.TURSO_DB_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

async function getAll () {
  return await turso.execute("SELECT * FROM notes");
};

async function get (id: string) {
  return await turso.execute({
    sql: "SELECT * FROM notes WHERE id = ?",
    args: [id],
  });
};