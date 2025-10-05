import express from 'express';
import cors from 'cors';

import UserLogin from './router/user/userLogin.router.js';
import PanditLogin from './router/pandit/panditLogin.router.js';
import PanditSignup from './router/pandit/panditSignup.router.js';
import UserSignup from './router/user/userSignup.router.js';
import CompleteProfile from './router/pandit/compliteProfile.router.js';
import UserAddress from './router/user/userAddress.router.js';
import InitilizeCalender from './router/pandit/initalizeCalender.router.js';
import TimeBlock from './router/pandit/timeBlock.router.js';
import TimeAvailable from './router/pandit/timeAvaliable.router.js';
import Booking from './router/user/booking.router.js';
import CancelBooking from './router/user/cancelBooking.router.js';
import SearchByLocation from './router/user/searchByLocation.router.js';
import PanditProfile from './router/pandit/panditProfile.router.js';
import CompleteBooking from './router/pandit/completeBooking.router.js';
import AllPanditBooking from './router/pandit/allBooking.router.js';
import AllUserBooking from './router/user/allBooking.router.js';
import BookingCancel from './router/pandit/bookingCancel.router.js';
import UserProfile from './router/user/userProfile.router.js';
import ReputedPandit from './router/user/reputedPandit.router.js';
import getPanditCalender from './router/user/getPanditCalender.router.js';

const app = express();
const PORT = process.env.PORT || 5400; // ✅ better to use 5400 (3000 is frontend)

app.use(express.json());

// ✅ FIXED: correct frontend origin
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// Routes
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

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
