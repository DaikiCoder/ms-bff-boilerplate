import winston from 'winston';
import { ENV_LIST, NODE_ENV } from '../env.configs';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = NODE_ENV || ENV_LIST.DEV;
  const isDevelopment = env === ENV_LIST.DEV;
  return isDevelopment ? 'debug' : 'http';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }), 
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${removeUnicodeAndANSI(info.message)}`)
);

function removeUnicodeAndANSI(msg: string) {
  const message = JSON.stringify(msg);
  const withoutEscapeUnicode = message.replace(/\\u[\dA-Fa-f]{4}/g, (match) => {
    const charCode = parseInt(match.slice(2), 16);
    return String.fromCharCode(charCode);
  });
  const withoutEscapeANSI = withoutEscapeUnicode.replace(/\\u001b\[[0-9;]*m/g, '');
  const withoutQuotesAndNewline = withoutEscapeANSI.replace(/["\\n]/g, '');


  return withoutQuotesAndNewline;
}

const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
