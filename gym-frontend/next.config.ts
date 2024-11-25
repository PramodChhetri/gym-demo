const nextConfig = {
  experimental: {
    appDir: true, // Enable App Router
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/login',
      permanent: false,
    },
  ],
};

export default nextConfig;
