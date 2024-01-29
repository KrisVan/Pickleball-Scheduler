import prisma from '../../utils/prisma.js';

// Get sessions that match username
export async function handleGetSessions(req, reply) {
  const sessions = await prisma.session.findMany({
    select: {
      creationDate: true,
      startTime: true,
      endTime: true,
      username: true,
      user: true,
    },
  });
  return reply.code(200).send(sessions);
}

// Get session that match session id
export async function handleGetSessionsBySessionID(req, reply) {
  const { sessionid } = req.params;
  const sessions = await prisma.session.findUnique({
    where: {
      id: sessionid,
    },
    select: {
      id: true,
      creationDate: true,
      startTime: true,
      endTime: true,
      username: true,
    },
  });
  return reply.code(200).send(sessions);
}

// Delete sessions that matches sessionid
export async function handleDeleteSession(req, reply) {
  const { sessionid } = req.params;
  await prisma.session.delete({
    where: {
      id: sessionid,
    },
  });
  return reply.code(204).send();
}
