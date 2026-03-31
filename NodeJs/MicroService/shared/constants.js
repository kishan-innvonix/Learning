export default {
  PORTS: {
    GATEWAY: 3000,
    USERS: 3001,
    ORDERS: 3002,
    NOTIFICATIONS: 3003,
  },
  SERVICE_URLS: {
    USERS: process.env.USERS_SERVICE_URL || "http://localhost:3001",
    ORDERS: process.env.ORDERS_SERVICE_URL || "http://localhost:3002",
    NOTIFICATIONS:
      process.env.NOTIFICATIONS_SERVICE_URL || "http://localhost:3003",
  },
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey123",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
  RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://localhost",
  EXCHANGE_NAME: "order_events",
  QUEUES: {
    NOTIFICATIONS: "notifications_queue",
  },
};
