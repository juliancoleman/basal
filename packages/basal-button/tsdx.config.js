const postcss = require('rollup-plugin-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [tailwindcss(), autoprefixer()],
        inject: true,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: false,
      }),
    );
    return config;
  },
};
