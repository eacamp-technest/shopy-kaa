module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
        ],
        alias: {
          assets: './src/assets',
          components: './src/components',
          configs: './src/configs',
          router: './src/router',
          screens: './src/screens',
          theme: './src/theme',
          types: './src/types',
          // constants: './src/constants',
          // hooks: './src/hooks',
          // helpers: './src/helpers',
          // services: './src/services',
          // store: './src/store',
          // utils: './src/utils',
        },
      },
    ],
  ],
};