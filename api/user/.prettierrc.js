module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    overrides: [
        {
            files: '**/*.{yaml,yml}',
            options: {
                parser: 'yaml',
                tabWidth: 2,
            },
        },
        {
            files: '**/*.json',
            options: {
                parser: 'json',
            },
        },
        {
            files: '**/*.md',
            options: {
                parser: 'markdown',
            },
        },
    ],
};
