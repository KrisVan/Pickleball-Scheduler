import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'minimal' });

async function main() {
  console.log('Start seeding...');
  await prisma.player.upsert({
    where: { username: 'alice123' },
    update: {},
    create: {
      username: 'alice123',
      displayName: 'alice',
      sessions: {
        create: {
          startTime: '2024-01-05T18:00:00.000-04:00',
          endTime: '2024-01-06T22:00:00.000-04:00',
        },
      },
    },
  });
  await prisma.player.upsert({
    where: { username: 'cvan' },
    update: {},
    create: {
      username: 'cvan',
      displayName: 'Chris Van Der',
      sessions: {
        create: {
          startTime: '2024-01-08T18:00:00.000-04:00',
          endTime: '2024-01-09T22:00:00.000-04:00',
        },
      },
    },
  });
  await prisma.player.upsert({
    where: { username: 'bob' },
    update: {},
    create: {
      username: 'bob',
      displayName: 'Bobby',
      sessions: {
        create: {
          startTime: '2024-01-08T17:00:00.000-04:00',
          endTime: '2024-01-09T22:00:00.000-04:00',
        },
      },
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
