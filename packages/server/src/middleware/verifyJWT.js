// Verifies if access token is valid
export const verifyJWT = (req, reply, next) => {
  const authHeader = req.headers.authorization; // "Bearer tokenString"
  if (!authHeader) return reply.status(401).send({ message: 'Authentication required' });
  const token = authHeader.split(' ')[1];
  req.jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return reply.status(403).send({ message: 'Invalid token' }); // Invalid token
      req.user = decoded.username;
      next();
      return reply.status(200);
    },
  );
  return reply.status(200);
};
