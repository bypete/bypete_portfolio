module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-inline-svg': {
            paths: ['src/assets/svg/'],
        },
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
    },
};
