/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.29.155'],

  async redirects() {
    return [
      {
        source: '/fabric',
        destination: '/fabrics',
        permanent: true,
      },
      {
        source: '/ready_to_wear',
        destination: '/ready-to-wear',
        permanent: true,
      },
      {
        source: '/made_to_wear',
        destination: '/custom-tailoring?type=made-to-wear',
        permanent: true,
      },
      {
        source: '/be_spoke',
        destination: '/custom-tailoring?type=bespoke',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;