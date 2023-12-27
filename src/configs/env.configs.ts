interface EnvType {
  APP_CONTEXT_PATH: string,
  PORT: number
}

export const {
  APP_CONTEXT_PATH,
  PORT
} : EnvType = process.env as unknown as EnvType;
