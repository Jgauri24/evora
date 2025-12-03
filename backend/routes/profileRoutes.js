import { Router } from 'express';
import { authMiddleware} from '../middleware/authMiddleware.js';
import { updateProfile } from '../controllers/profileController.js';
import prisma from '../prismaClient.js';

const router = Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, avatar: true, role: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});
router.put('/profile', authMiddleware, updateProfile);

export default router;