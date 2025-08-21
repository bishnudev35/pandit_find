import express from 'express';

import UserLogin from   './router/userLogin.router.js'; // Adjust the path as necessary
import PanditLogin from './router/panditLogin.router.js'; // Adjust the path as necessary
import PanditSignup from './router/panditSignup.router.js'; // Adjust the path as necessary  
import UserSignup from './router/userSignup.router.js'; // Adjust the path as necessary
import CompleteProfile from './router/compliteProfile.router.js';
import UserAddress from './router/userAddress.router.js';
import InitilizeCalender from './router/initalizeCalender.router.js'; // Adjust the path as necessary
import TimeBlock from './router/timeBlock.router.js'; // Adjust the path as necessary
import TimeAvailable from './router/timeAvaliable.router.js';
import Booking from  './router/booking.router.js' // Adjust the path as necessary
import CancelBooking from './router/cancelBooking.js'; // Adjust the path as necessary
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');});
  app.use('/api/v1/user',UserLogin);
  app.use('/api/v1/user',UserSignup); 
  app.use('/api/v1/user',UserAddress); // Adjust the path as necessary


  app.use('/api/v1',Booking); // Adjust the path as necessary
  app.use('/api/v1',CancelBooking); // Adjust the path as necessary

  app.use('/api/v1/pandit',PanditLogin); // Adjust the path as necessary
  app.use('/api/v1/pandit',PanditSignup ); // Adjust the path as necessary
  app.use('/api/v1/pandit',CompleteProfile); // Adjust the path as necessary
  app.use('/api/v1/pandit',InitilizeCalender); // Adjust the path as necessary
  app.use('/api/v1/pandit',TimeBlock); // Adjust the path as necessary
  app.use('/api/v1/pandit',TimeAvailable); // Adjust the path as necessary

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});