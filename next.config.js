/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
  optimizeFonts: false,
  env: {
    user : process.env.user,
    password : process.env.password,
    MONGODB_URI : `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.ctwyecj.mongodb.net/textify-ocr`,
    MINDEE_API_KEY : process.env.MINDEE_API_KEY,
  },
};

module.exports = nextConfig
