import { Router } from 'express';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';
import {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  bookEvent
} from '../controllers/eventsController.js';

const router = Router();

// Public
router.get('/', listEvents);
router.get('/:id', getEventById);

// Protected booking
router.post('/:id/book', authMiddleware, bookEvent);

// Optional admin
router.post('/', authMiddleware, adminOnly, createEvent);
router.put('/:id', authMiddleware, adminOnly, updateEvent);
router.delete('/:id',authMiddleware, adminOnly, deleteEvent);

export default router;