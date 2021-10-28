module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
        config.plugins.push(new (require('windicss-webpack-plugin'))());
        return config;
    },
};
