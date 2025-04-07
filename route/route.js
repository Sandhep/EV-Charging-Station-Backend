import express from 'express';
import UserController from '../controllers/UserController.js';
import {authenticateToken} from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/user',authenticateToken, UserController.getUser);
router.put('/user',authenticateToken, UserController.updateUser);
router.post('/login',UserController.userLogin);
router.post('/register',UserController.userRegister);
router.get('/stations',UserController.getStation);
router.post('/bookslot',authenticateToken,UserController.bookSlot);
router.get('/mybookings',authenticateToken,UserController.myBookings);
router.patch('/cancelbooking',authenticateToken,UserController.cancelBooking);
router.post('/notify',UserController.notify);
router.get('/getvehicles',authenticateToken,UserController.getVehicles);
router.post('/addvehicles',authenticateToken,UserController.addVehicles);
router.put('/updatevehicles',authenticateToken,UserController.updateVehicles);
router.delete('/deletevehicle',authenticateToken,UserController.deleteVehicle);
router.post('/payment',authenticateToken,UserController.payment);
router.get('/paymentdetails',authenticateToken,UserController.getpaymentDetails);

export default router;