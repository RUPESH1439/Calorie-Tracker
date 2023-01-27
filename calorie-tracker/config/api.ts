const isProduction = process.env.NODE_ENV === 'production'
const config = {
  baseURL: isProduction ? "http://localhost:3000" : "http://localhost:3000",

}

export default config