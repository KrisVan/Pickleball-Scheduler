const {
    defineConfig,
} = require("eslint/config");

const globals = require("globals");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {},
    },

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    )),

    plugins: {
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
    },

    rules: {
        "max-len": ["error", {
            code: 120,
            ignoreComments: true,
        }],

        "no-console": "off",
        "no-restricted-exports": "off",
        "import/extensions": "off",
        "import/prefer-default-export": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
    },

    settings: {
        react: {
            version: "detect",
        },
    },
}, {
    files: ["**/*.test.jsx"],

    rules: {
        "no-undef": "off",
    },
}, {
    languageOptions: {
        globals: {
            ...globals.node,
        },

        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    files: ["**/*.jsx", "**/.eslintrc.{cjs,js,jsx}"],
}]);
