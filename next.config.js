/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['ant.a59.mywebsitetransfer.com', 'zamzamwelfaretrust.com']
  },
  async redirects() {
    return [
      {
        source: '/old-subdomain/:path*',
        destination: 'http://www.newurl.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
