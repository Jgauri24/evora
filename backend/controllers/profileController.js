import prisma  from '../prismaClient.js';

export async function updateProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const { name, avatar } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { 
        ...(name && { name }),
        ...(avatar && { avatar })
      },
      select: { id: true, name: true, email: true, avatar: true, role: true }
    });
    
    return res.json(updatedUser);
  } catch (e) {
    return next(e);
  }
}