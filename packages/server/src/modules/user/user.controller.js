import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma.js';

const SALT_ROUNDS = 10;

// Creates a new user. Checks if email is unique, hashes passwrd,
// and creates user in db.
export async function createUser(req, reply) {
  const { email, displayName, password } = req.body;
  // Error message  if user already exists
  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (foundUser) {
    return reply.code(401).send({
      message: 'User already exists with this email',
    });
  }
  // Hashes password and creates user in db
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        email,
        displayName,
        password: hash,
        role: 'BASIC',
      },
    });

    return reply.code(201).send(user);
  } catch (e) {
    return reply.code(500).send(e);
  }
}
