import prisma from '../../utils/prisma.js';

// Get sessions that match username
export async function handleGetSessions(req, reply) {
  const sessions = await prisma.session.findMany({
    select: {
      id: true,
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

// Updates existing session.
export async function handleUpdateSession(req, reply) {
  const { id } = req.params;
  const {
    username, startTime, endTime, ...props
  } = req.body;
  // Validate data
  const validatedUsername = username.toLowerCase();
  if (startTime > endTime) {
    return reply.code(400).send({
      message: 'Start time cannot be after end time',
    });
  }
  // Check if user exists
  const foundUser = await prisma.user.findUnique({
    where: {
      username: validatedUsername,
    },
  });
  if (!foundUser) {
    return reply.code(404).send({
      message: 'User not found',
    });
  }
  // Update session
  try {
    const session = await prisma.session.update({
      where: {
        id,
      },
      data: {
        ...props,
        startTime,
        endTime,
        username: validatedUsername,
      },
    });
    return reply.code(200).send(session);
  } catch (e) {
    return reply.code(500).send(e);
  }
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
