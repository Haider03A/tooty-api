module.exports = {
  apps: [
    {
      name: "tooty-api",
      script: "./index.js",
      watch: true,
      ignore_watch: ["node_modules", "logs", ".git", "tmp", "*.log"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

