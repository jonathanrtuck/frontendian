import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    rules: {
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
  }),
];

export default eslintConfig;
