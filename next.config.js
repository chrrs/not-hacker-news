/** @type import('next').NextConfig */
module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
        config.plugins.push(new (require('windicss-webpack-plugin'))());
        return config;
    },
};
