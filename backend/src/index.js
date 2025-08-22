import express from 'express';

import UserLogin from   './router/user/userLogin.router.js'; // Adjust the path as necessary
import PanditLogin from './router/pandit/panditLogin.router.js'; // Adjust the path as necessary
import PanditSignup from './router/pandit/panditSignup.router.js'; // Adjust the path as necessary  
import UserSignup from './router/user/userSignup.router.js'; // Adjust the path as necessary
import CompleteProfile from './router/pandit/compliteProfile.router.js';
import UserAddress from './router/user/userAddress.router.js';
import InitilizeCalender from './router/pandit/initalizeCalender.router.js'; // Adjust the path as necessary
import TimeBlock from './router/pandit/timeBlock.router.js'; // Adjust the path as necessary
import TimeAvailable from './router/pandit/timeAvaliable.router.js';
import Booking from  './router/user/booking.router.js' // Adjust the path as necessary
import CancelBooking from './router/user/cancelBooking.router.js'; // Adjust the path as necessary
import SearchByLocation from './router/user/searchByLocation.router.js'; // Adjust the path as necessary
import PanditProfile from './router/pandit/panditProfile.router.js'; // Adjust the path as necessary
import CompleteBooking from './router/pandit/completeBooking.router.js';
import AllPanditBooking from './router/pandit/allBooking.router.js' // Adjust the path as necessary
import AllUserBooking from './router/user/allBooking.router.js' // Adjust the path as necessary
import BookingCancel from  './router/pandit/bookingCancel.router.js'
import UserProfile from './router/user/userProfile.router.js'
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');});
  app.use('/api/v1/user',UserLogin);
  app.use('/api/v1/user',UserSignup); 
  app.use('/api/v1/user',UserAddress); // Adjust the path as necessary
  app.use('/api/v1/user',SearchByLocation); // Adjust the path as necessary
  app.use('/api/v1/user',AllUserBooking); // Adjust the path as necessary
  app.use('/api/v1/user',UserProfile);

  app.use('/api/v1',Booking); // Adjust the path as necessary
  app.use('/api/v1',CancelBooking); // Adjust the path as necessary

  app.use('/api/v1/pandit',PanditLogin); // Adjust the path as necessary
  app.use('/api/v1/pandit',PanditSignup ); // Adjust the path as necessary
  app.use('/api/v1/pandit',CompleteProfile); // Adjust the path as necessary
  app.use('/api/v1/pandit',InitilizeCalender); // Adjust the path as necessary
  app.use('/api/v1/pandit',TimeBlock); // Adjust the path as necessary
  app.use('/api/v1/pandit',TimeAvailable); // Adjust the path as necessary
  app.use('/api/v1/pandit',CompleteBooking); // Adjust the path as necessary
  app.use('/api/v1/pandit',AllPanditBooking); // Adjust the path as necessary
  app.use('/api/v1/pandit',BookingCancel);
 
  app.use('/api/v1/pandit',PanditProfile); // Adjust the path as necessary
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});