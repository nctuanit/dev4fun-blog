module.exports = {
  apps: [
    {
      name: 'dev4fun-blog',
      script: 'server.js',
      cwd: '/var/www/dev4fun-blog/deploy',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3101,
        HOSTNAME: '0.0.0.0',
      },
      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/var/log/pm2/dev4fun-blog-error.log',
      out_file: '/var/log/pm2/dev4fun-blog-out.log',
      merge_logs: true,
      // Restart policy
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',
      // Watch (disable in production)
      watch: false,
    },
  ],
};
