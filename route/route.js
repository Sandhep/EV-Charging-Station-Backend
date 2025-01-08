import express from 'express';
import UserController from '../controllers/UserController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/test', UserController.gettest);
router.get('/user',authenticateToken, UserController.getUser);
router.post('/login',UserController.userLogin);
router.post('/register',UserController.userRegister);
router.get('/stations',UserController.getStation);
router.post('/bookslot',authenticateToken,UserController.bookSlot);
router.get('/mybookings',authenticateToken,UserController.myBookings);
router.delete('/cancelbooking',authenticateToken,UserController.cancelBooking);
router.post('/notify',UserController.notify);

export default router;