import prisma from '../src/utils/prisma.js';
// Passwords are password when not encrypted
async function main() {
  console.log('Start seeding...');
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      displayName: 'admin',
      password: '$2b$10$04xyjuFXfrfEqjY.hyzWR.Cx3dtzHsf6T1.9hBcIzmCfrqL5tKg2S',
      role: 'ADMIN',
      settings: { create: {} },
    },
  });
  await prisma.user.upsert({
    where: { username: 'alice123' },
    update: {},
    create: {
      username: 'alice123',
      displayName: 'alice',
      password: '$2b$10$04xyjuFXfrfEqjY.hyzWR.Cx3dtzHsf6T1.9hBcIzmCfrqL5tKg2S',
      role: 'BASIC',
      sessions: {
        create: {
          startTime: '2024-01-05T18:00:00.000-04:00',
          endTime: '2024-01-06T22:00:00.000-04:00',
        },
      },
      settings: { create: {} },
    },
  });
  await prisma.user.upsert({
    where: { username: 'cvan4' },
    update: {},
    create: {
      username: 'cvan4',
      displayName: 'Chris Van',
      password: '$2b$10$04xyjuFXfrfEqjY.hyzWR.Cx3dtzHsf6T1.9hBcIzmCfrqL5tKg2S',
      role: 'BASIC',
      sessions: {
        create: {
          startTime: '2024-01-08T18:00:00.000-04:00',
          endTime: '2024-01-09T22:00:00.000-04:00',
        },
      },
      settings: { create: {} },
    },
  });
  await prisma.user.upsert({
    where: { username: 'bobby' },
    update: {},
    create: {
      username: 'bobby',
      displayName: 'Bob',
      password: '$2b$10$04xyjuFXfrfEqjY.hyzWR.Cx3dtzHsf6T1.9hBcIzmCfrqL5tKg2S',
      role: 'BASIC',
      sessions: {
        create: {
          startTime: '2024-01-08T17:00:00.000-04:00',
          endTime: '2024-01-09T22:00:00.000-04:00',
        },
      },
      settings: { create: {} },
    },
  });
  await prisma.user.upsert({
    where: { username: 'lazy@gmail.com' },
    update: {},
    create: {
      username: 'lazy@gmail.com',
      displayName: 'Lazy',
      password: '$2b$10$04xyjuFXfrfEqjY.hyzWR.Cx3dtzHsf6T1.9hBcIzmCfrqL5tKg2S',
      role: 'BASIC',
      settings: { create: {} },
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
