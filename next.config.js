const { resolve } = require("path");

const nextConfig = {
  experimental: {
    optimizeFonts: true,
  },
  webpack: (config) => {
    // src ディレクトリをエイリアスのルートに設定
    config.resolve.alias['~'] = resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
