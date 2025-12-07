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
router.post('/', authMiddleware, createEvent);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;