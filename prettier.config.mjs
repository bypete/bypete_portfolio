/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    singleQuote: true,
    printWidth: 80,
    bracketSpacing: true,
    semi: true,
    overrides: [
        {
            files: '*.md',
            options: {
                tabWidth: 4,
            },
        },
    ],
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    tailwindConfig: './tailwind.config.mjs',
    pluginSearchDirs: false,
};
