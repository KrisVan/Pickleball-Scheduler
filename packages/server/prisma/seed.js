import prisma from '../src/utils/prisma.js';

async function main() {
  console.log('Start seeding...');
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      displayName: 'admin',
      password: 'password',
      role: 'ADMIN',
    },
  });
  await prisma.user.upsert({
    where: { username: 'alice123' },
    update: {},
    create: {
      username: 'alice123',
      displayName: 'alice',
      password: 'password1',
      role: 'BASIC',
      sessions: {
        create: {
          startTime: '2024-01-05T18:00:00.000-04:00',
          endTime: '2024-01-06T22:00:00.000-04:00',
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { username: 'cvan4' },
    update: {},
    create: {
      username: 'cvan4',
      displayName: 'Chris Van',
      password: 'password2',
      role: 'BASIC',
      sessions: {
        create: {
          startTime: '2024-01-08T18:00:00.000-04:00',
          endTime: '2024-01-09T22:00:00.000-04:00',
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { username: 'bobby' },
    update: {},
    create: {
      username: 'bobby',
      displayName: 'Bob',
      password: 'password3',
      role: 'BASIC',
      sessions: {
        create: {
          startTime: '2024-01-08T17:00:00.000-04:00',
          endTime: '2024-01-09T22:00:00.000-04:00',
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { username: 'lazy@gmail.com' },
    update: {},
    create: {
      username: 'lazy@gmail.com',
      displayName: 'Lazy',
      password: 'password4',
      role: 'BASIC',
    },
  });
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
