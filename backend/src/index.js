import express from 'express';
import cors from 'cors';

// routers (keep your imports as-is)
import UserLogin from './router/user/userLogin.router.js';
/* ... all other imports ... */
import ShowCalender from './router/pandit/showCalender.js';

const app = express();
const PORT = process.env.PORT || 5400;

app.use(express.json());

// Allowed origins (no trailing slash)
const allowedOrigins = [
  'https://pandit-find.vercel.app',
  'https://pandit-find-git-main-bishnudev35s-projects.vercel.app',
  'https://pandit-find-ezt2poj12-bishnudev35s-projects.vercel.app',
  'http://localhost:3000',
  'http://localhost:5400'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server/postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept']
}));

// IMPORTANT: respond to preflight using a pattern accepted by path-to-regexp
app.options('/*', cors());

// ---- routes ----
app.use('/api/v1/user', UserLogin);
app.use('/api/v1/user', UserSignup);
app.use('/api/v1/user', UserAddress);
app.use('/api/v1/user', SearchByLocation);
app.use('/api/v1/user', AllUserBooking);
app.use('/api/v1/user', UserProfile);
app.use('/api/v1/user', ReputedPandit);
app.use('/api/v1/user', Booking);
app.use('/api/v1/user', getPanditCalender);
app.use('/api/v1/user', CancelBooking);

app.use('/api/v1/pandit', PanditLogin);
app.use('/api/v1/pandit', PanditSignup);
app.use('/api/v1/pandit', CompleteProfile);
app.use('/api/v1/pandit', InitilizeCalender);
app.use('/api/v1/pandit', TimeBlock);
app.use('/api/v1/pandit', TimeAvailable);
app.use('/api/v1/pandit', CompleteBooking);
app.use('/api/v1/pandit', AllPanditBooking);
app.use('/api/v1/pandit', BookingCancel);
app.use('/api/v1/pandit', PanditProfile);
app.use('/api/v1/pandit', ShowCalender);

// Basic error handler for CORS rejections (so server doesn't crash themlessly)
app.use((err, req, res, next) => {
  if (err && err.message && err.message.startsWith('CORS')) {
    return res.status(403).json({ error: err.message });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
