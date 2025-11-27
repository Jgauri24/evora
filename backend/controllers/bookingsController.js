import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function getMyBookings(req, res, next) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: { event: true }
    });
    return res.json(bookings);
  } catch (e) {
    return next(e);
  }
}

export async function cancelBooking(req, res, next) {
  try {
    const id = Number(req.params.id);
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking || booking.userId !== req.user.id)
      return res.status(404).json({ message: 'Booking not found' });

    await prisma.$transaction([
      prisma.booking.update({ where: { id }, data: { status: 'cancelled' } }),
      prisma.event.update({
        where: { id: booking.eventId },
        data: { capacity: { increment: 1 } }
      })
    ]);

    return res.status(200).json({ message: 'Cancelled' });
  } catch (e) {
    return next(e);
  }
}