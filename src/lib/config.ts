import "server-only";
import { parseEnv } from "./config-schema";

export const env = parseEnv(process.env);
