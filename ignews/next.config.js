module.exports = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};
