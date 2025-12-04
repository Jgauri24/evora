import { Router } from 'express';
import { authMiddleware} from '../middleware/authMiddleware.js';
import { updateProfile } from '../controllers/profileController.js';
import prisma from '../prismaClient.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: req.user.id },
      select: { 
        id: true, name: true, email: true, avatar: true, role: true, 
        bio: true, phone: true, location: true,
        instagram: true, twitter: true, linkedin: true
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});
router.put('/', authMiddleware, updateProfile);

export default router;