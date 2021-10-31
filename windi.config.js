import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    variantOrder: [
        'first',
        'last',
        'odd',
        'even',
        'visited',
        'checked',
        'group-hover',
        'group-focus',
        'focus-within',
        'hover',
        'focus',
        'focus-visible',
        'active',
        'disabled',
    ],
    extract: {
        include: ['**/*.{tsx,css}'],
        exclude: ['node_modules', '.git', '.next/**/*'],
    },
    darkMode: false,
    theme: {
        extend: {},
    },
    plugins: [],
});
