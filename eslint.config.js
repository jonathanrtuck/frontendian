import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "jsx-a11y/role-supports-aria-props": "off",
      "no-console": "warn",
      "react/button-has-type": "warn",
      "react/display-name": "error",
      "react/hook-use-state": "warn",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "warn",
        {
          children: "never",
          props: "never",
        },
      ],
      "react/jsx-no-leaked-render": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-sort-props": "warn",
      "react/no-access-state-in-setstate": "error",
      "react/no-array-index-key": "warn",
      "react/no-unstable-nested-components": "warn",
      "sort-keys": [
        "warn",
        "asc",
        {
          caseSensitive: false,
          natural: true,
        },
      ],
    },
  }
);
