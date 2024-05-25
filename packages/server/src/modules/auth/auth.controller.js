import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma.js';

// Login user. Checks if user already exists, password matches
export async function handleLogin(req, reply) {
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
  // Create jwt access and refresh tokens
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };
  const accessToken = await reply.jwtSign(payload, { expiresIn: '15m' });
  const refreshToken = await reply.jwtSign(payload, { expiresIn: '7d' });
  // Save refresh token to current user in DB
  await prisma.user.update({
    where: { username: user.username },
    data: { refreshToken },
  });
  // Save refresh token as cookie so that client can request token
  reply.setCookie('refreshJWT', refreshToken, {
    path: '/',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  // Return access token, username, displayName, and role
  return {
    accessToken,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  };
}

// Logout. Clears cookies and DB refresh token. Client must delete accessToken
export async function handleLogout(req, reply) {
  const { cookies } = req;
  // No content to clear
  if (!cookies?.refreshJWT) return reply.code(204).send();
  // If refresh token in DB, clear DB
  const refreshToken = cookies.refreshJWT;
  const foundUser = await prisma.user.findUnique({
    where: { refreshToken },
  });
  if (foundUser) {
    // Clear DB refresh token
    await prisma.user.update({
      where: { refreshToken },
      data: { refreshToken: null },
    });
  }
  // Clear cookies
  reply.clearCookie('refreshJWT', {
    path: '/',
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  return reply.code(200).send();
}

//  Gives new access token if refresh token is still valid
export async function handleRefreshToken(req, reply) {
  const { cookies } = req;
  // Check if cookie exists with jwt
  if (!cookies?.refreshJWT) {
    return reply.code(401).send({
      message: 'No cookie',
    });
  }
  const refreshToken = cookies.refreshJWT;
  // Get if user has refresh token saved in DB
  const foundUser = await prisma.user.findUnique({
    where: { refreshToken },
  });
  // If no user found, error
  if (!foundUser) {
    return reply.code(403).send('No user found');
  }
  // Get user settings
  const userSettings = await prisma.setting.findUnique({
    where: {
      username: foundUser.username,
    },
  });
  // Evaluate JWT
  const payload = {
    id: foundUser.id,
    username: foundUser.username,
    role: foundUser.role,
  };
  req.jwt.verify(
    refreshToken,
    process.env.JWT_TOKEN_SECRET,
    (err, decoded) => {
      // Check if token is valid or token doesn't match user
      if (err || foundUser.username !== decoded.username) {
        return reply.code(403).send({ message: 'Invalid token' });
      }
      return reply.code(200);
    },
  );
  const accessToken = await reply.jwtSign(payload, { expiresIn: '15m' });
  return reply.code(200).send({
    accessToken,
    username: foundUser.username,
    displayName: foundUser.displayName,
    role: foundUser.role,
    theme: userSettings.theme,
    color: userSettings.color,
  });
}
