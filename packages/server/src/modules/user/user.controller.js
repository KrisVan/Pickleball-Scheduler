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
