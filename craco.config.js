const path = require("path");

module.exports = {
  babel: {
    plugins: ["@emotion/babel-plugin"],
    presets: [
      [
        "@babel/preset-react",
        {
          importSource: "@emotion/react",
          runtime: "automatic",
        },
      ],
    ],
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
