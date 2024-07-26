import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default("3333").transform((val) => parseInt(val, 10)),
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    throw new Error(_env.error.toString())
}

export const env = _env.data