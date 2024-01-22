const whitelist = [
  'https://www.yoursite.com',
  'http://0.0.0.0:5000',
  'http://localhost:3000'
];

export const corsOptions = {
  origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}
