export const EnvConfig = () => ({
  url: process.env.POSTGRES_URL,
  host: parseInt(process.env.POSTGRES_HOST),
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  name: process.env.POSTGRES_DATABASE,
});
