module.exports = {
  apps: [
    {
      name: "dotbet-frontend",
      script: "npm start", // Replace with your main application file
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

