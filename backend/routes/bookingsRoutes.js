import { Router } from 'express';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getMyBookings, cancelBooking } from '../controllers/bookingsController.js';

const router = Router();

router.get('/', authMiddleware, getMyBookings);
router.delete('/:id', authMiddleware, cancelBooking);

export default router;