const { prisma } = require('../src/db');

async function seed() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.user.deleteMany();

  // Seed authors with books
  await prisma.user.create({
    data: {
      name: 'J.R.R. Tolkien',
      bio: 'Creator of Middle-earth and author of The Lord of the Rings.',
      email: "jrr@example.com",
      password: "jrr@1234"
    },
  });

  
  console.log('✅ Database seeded successfully!');
}

seed()
  .catch(err => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
