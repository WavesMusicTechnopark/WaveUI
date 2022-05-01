const path = require('path');

const externalUMD = [
  '@rflban/vdom',
];

module.exports = (env) => {
  const { mode = process.env.NODE_ENV || 'development' } = env;

  return {
    mode,
    entry: {
      index: './src/index.ts',
      styles: './src/index.scss',
      ['default-dark']: './src/tokens/default-dark.css',
    },
    externals: [
      function (context, request, callback) {
        if (externalUMD.includes(request)) {
          return callback(null, `umd ${request}`);
        }
        callback();
      },
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: {
        name: '@waveteam-parkvk/waveui',
        type: 'umd',
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules)/,
          resolve: {
            extensions: ['.ts', '.tsx'],
          },
          use: [
            { loader: 'ts-loader' },
          ],
        },
        {
          test: /\.(css)$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.scss$/i,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(ttf|otf|eot|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },
      ],
    },
  };
};
