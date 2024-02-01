import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma.js';

const SALT_ROUNDS = 10;

// Creates a new user. Checks if username is unique, hashes passwrd,
// and creates user in db.
export async function handleCreateUser(req, reply) {
  let { username } = req.body;
  const { password } = req.body;
  // Validate data
  username = username.toLowerCase();
  // Error message  if user already exists
  const foundUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (foundUser) {
    return reply.code(401).send({
      message: 'User already exists with this username',
    });
  }
  // Hashes password and creates user in db
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        username,
        displayName: username,
        password: hash,
        role: 'BASIC',
      },
    });

    return reply.code(201).send(user);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

// Get users that match username
export async function handleGetUsers(req, reply) {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      id: true,
      displayName: true,
      role: true,
      sessions: true,
    },
  });
  return reply.code(200).send(users);
}

// Get user by username
export async function handleGetUserByUsername(req, reply) {
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      id: true,
      displayName: true,
      role: true,
    },
  });
  return reply.code(200).send(user);
}

// Updates existing user.
export async function handleUpdateUser(req, reply) {
  const { id } = req.params;
  let { username, password } = req.body;
  const { ...props } = req.body;
  // Validate data
  username = username.toLowerCase();
  // Hashes password and updates user in db
  try {
    // If new password, hash new.
    const oldUser = await prisma.user.findMany({
      where: {
        id,
      },
      select: {
        password: true,
        sessions: true,
      },
    });
    if (password !== oldUser?.password) {
      password = await bcrypt.hash(password, SALT_ROUNDS);
    }
    if (oldUser.length <= 0) return reply.code(404).send();
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        password,
        sessions: oldUser.sessions,
        refreshToken: oldUser.refreshToken,
        ...props,
      },
    });
    return reply.code(200).send(user);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

// Delete user that matches username
export async function handleDeleteUser(req, reply) {
  let { username } = req.params;
  // Validate data
  username = username.toLowerCase();
  // Check if user exists
  const foundUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!foundUser) {
    return reply.code(404).send({
      message: 'User not found',
    });
  }
  // Delete user
  await prisma.user.delete({
    where: {
      username,
    },
  });
  return reply.code(204).send();
}

// Get sessions that match username
export async function handleGetSessionsByUser(req, reply) {
  let { username } = req.params;
  // Validate data
  username = username.toLowerCase();
  // Check if user exists
  const foundUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!foundUser) {
    return reply.code(404).send({
      message: 'User not found',
    });
  }
  const sessions = await prisma.session.findMany({
    where: {
      username,
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

// Create sessions from user
export async function handlePostSessionsByUser(req, reply) {
  let { username } = req.params;
  const { startTime, endTime } = req.body;
  // Validate data
  username = username.toLowerCase();
  // Check if user exists
  const foundUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!foundUser) {
    return reply.code(404).send({
      message: 'User not found',
    });
  }
  // Create session
  try {
    const session = await prisma.session.create({
      data: {
        username,
        startTime,
        endTime,
      },
    });
    return reply.code(201).send(session);
  } catch (e) {
    return reply.code(500).send(e);
  }
}
