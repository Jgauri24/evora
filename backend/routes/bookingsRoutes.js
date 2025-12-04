import { Router } from 'express';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getMyBookings, cancelBooking, markAsAttended } from '../controllers/bookingsController.js';

const router = Router();

router.get('/', authMiddleware, getMyBookings);
router.delete('/:id', authMiddleware, cancelBooking);
router.patch('/:id/attend', authMiddleware, markAsAttended);

export default router;