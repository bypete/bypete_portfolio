module.exports = {
    plugins: {
        'postcss-inline-svg': {
            paths: ['src/assets/svg/'],
        },
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
    },
};
