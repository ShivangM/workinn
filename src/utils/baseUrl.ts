const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_URL;
export default BASE_URL;
