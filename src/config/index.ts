const DEBUG = /^(development|dev|test)$/i.test(process.env.NODE_ENV);
const REDIS_URL = process.env.REDIS_URL as string;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;

const globalConfig = {
  DEBUG,
  REDIS_URL,
  SENDGRID_API_KEY,
};

export default globalConfig;
