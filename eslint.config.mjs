// eslint.config.mjs
import js from "@eslint/js";
import next from "eslint-config-next";

const esConfig = [
  js.configs.recommended,
  ...next(),
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      "no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-key": "warn",
    },
  },
];

export default esConfig;
