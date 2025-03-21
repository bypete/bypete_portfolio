/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    singleQuote: true,
    printWidth: 80,
    bracketSpacing: true,
    semi: true,
    overrides: [
        {
            files: '*.mdx',
            options: {
                tabWidth: 4,
            },
        },
    ],
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    pluginSearchDirs: false,
    tailwindStylesheet: "./src/styles/global.css",
};
