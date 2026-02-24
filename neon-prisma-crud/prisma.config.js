require('dotenv').config();
const { defineConfig } = require('prisma/config');
const { PrismaNeon } = require('@prisma/adapter-neon');

module.exports = defineConfig({
  earlyAccess: true,
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node prisma/seed.js',
  },
  adapter: async () => {
    return new PrismaNeon({
      connectionString: process.env.DATABASE_URL,
    });
  },
});
