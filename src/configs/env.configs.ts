export enum ENV_LIST {
  DEV = 'dev',
  PROD = 'prod',
}

interface EnvType {
  NODE_ENV: ENV_LIST;
  APP_CONTEXT_PATH: string;
  PORT: number;
}

export const { NODE_ENV, APP_CONTEXT_PATH, PORT }: EnvType = process.env as unknown as EnvType;
