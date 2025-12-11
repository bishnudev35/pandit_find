import express from 'express';
import cors from 'cors';

// your routers...
import UserLogin from './router/user/userLogin.router.js';
/* ... other imports ... */
import ShowCalender from './router/pandit/showCalender.js';

const app = express();
const PORT = process.env.PORT || 5400;

app.use(express.json());

// ✅ Allowed origins (no trailing slash)
const allowedOrigins = [
  'https://pandit-find.vercel.app',
  'https://pandit-find-git-main-bishnudev35s-projects.vercel.app',
  'https://pandit-find-ezt2poj12-bishnudev35s-projects.vercel.app',
  'http://localhost:3000', // frontend dev origin (adjust if your dev port differs)
  'http://localhost:5400'  // if you serve frontend there in dev
];

// dynamic origin check to support credentials and multiple origins
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile clients, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  credentials: true, // allow cookies/credentials (only if you actually use them)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// make sure preflight (OPTIONS) is handled quickly
app.options('*', cors());

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

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
