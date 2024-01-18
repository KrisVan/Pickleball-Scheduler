import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma.js';

const SALT_ROUNDS = 10;

// Creates a new user. Checks if username is unique, hashes passwrd,
// and creates user in db.
export async function createUser(req, reply) {
  // var { username, password } = req.body;
  var username = req.body.username;
  const password = req.body.password;
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

// Login user. Checks if user already exists, password matches
export async function login(req, reply) {
  var username = req.body.username;
  const password = req.body.password;
  // Validate user data.
  username = username.toLowerCase();
  // Check if user already exists
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
  // Return access token
  return { accessToken: token };
}
