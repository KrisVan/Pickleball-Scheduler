import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma.js';

const SALT_ROUNDS = 10;

// Creates a new user. Checks if username is unique, hashes passwrd,
// and creates user in db.
export async function createUser(req, reply) {
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
export async function getUsers(req, reply) {
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

// Login user. Checks if user already exists, password matches
export async function login(req, reply) {
  let { username } = req.body;
  const { password } = req.body;
  // Validate user data.
  username = username.toLowerCase();
  // Get if user already exists
  const user = await prisma.user.findUnique({ where: { username } });
  // Check if password matches user
  const isMatch = user && (await bcrypt.compare(password, user.password));
  // If no user exists or user doesn't match password. invalid message
  if (!user || !isMatch) {
    return reply.code(401).send({
      message: 'Invalid username or password',
    });
  }
  // Get user info and create token
  const payload = {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
  };
  const token = req.jwt.sign(payload);
  // Set cookie so that client can request token
  reply.setCookie('access_token', token, {
    path: '/',
    httpOnly: true,
    secure: true,
  });
  // Return access token, username, displayName, and role
  return {
    accessToken: token,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  };
}

// Logout. Clears cookies from session
export async function logout(req, reply) {
  reply.clearCookie('access_token');
  return reply.send({ message: 'Logout successful' });
}
