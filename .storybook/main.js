const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  "webpackFinal": async (config, { configType }) => {
    config.module.rules.push(
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    );
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: ['.ts', '.tsx'],
        },
        use: [
          { loader: 'ts-loader' },
        ],
        include: path.resolve(__dirname, '../'),
      },
    );

    return config;
  },
}
