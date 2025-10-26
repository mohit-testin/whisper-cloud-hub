import dotenv from "dotenv";
import * as schema from "@/_server/src/schema/index"
dotenv.config({
  path: "../../apps/server/.env",
});
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
