import { parseEnv, z } from "znv"

export const env = parseEnv(process.env, {
    ENVIRONMENT: z.enum(["production", "development", "test"]).default("development")
})

export type Env = typeof env