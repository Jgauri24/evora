import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function parseNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export async function listEvents(req, res, next) {
  try {
    const {
      page = '1',
      limit = '10',
      search,
      category,
      dateFrom,
      dateTo,
      minPrice,
      maxPrice,
      mode,
      sort
    } = req.query;

    const pageNum = parseNumber(page, 1);
    const pageSize = parseNumber(limit, 10);
    const skip = (pageNum - 1) * pageSize;

    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } }
      ];
    }
    if (category) where.category = String(category);
    if (mode) where.mode = String(mode);
    if (dateFrom || dateTo) {
      where.startAt = {};
      if (dateFrom) where.startAt.gte = new Date(dateFrom);
      if (dateTo) where.startAt.lte = new Date(dateTo);
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseNumber(minPrice, 0);
      if (maxPrice) where.price.lte = parseNumber(maxPrice, Number.MAX_SAFE_INTEGER);
    }

    const orderBy = (() => {
      switch (sort) {
        case 'date':
          return { startAt: 'asc' };
        case 'price':
          return { price: 'asc' };
        case 'popularity':
          return { popularity: 'desc' };
        default:
          return { createdAt: 'desc' };
      }
    })();

    const [total, data] = await Promise.all([
      prisma.event.count({ where }),
      prisma.event.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          category: true,
          location: true,
          startAt: true,
          price: true,
          imageUrl: true,
          popularity: true
        }
      })
    ]);

    return res.json({
      data,
      meta: {
        total,
        page: pageNum,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (e) {
    return next(e);
  }
}

export async function getEventById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    // Increment popularity on view (lightweight, ignore await)
    prisma.event.update({ where: { id }, data: { popularity: { increment: 1 } } }).catch(() => {});
    return res.json(event);
  } catch (e) {
    return next(e);
  }
}

export async function bookEvent(req, res, next) {
  const eventId = Number(req.params.id);
  const userId = req.user.id;
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Check if user already booked this event
      const existingBooking = await tx.booking.findFirst({
        where: { 
          userId, 
          eventId,
          status: { in: ['booked', 'attended'] }
        }
      });
      
      if (existingBooking) {
        throw Object.assign(new Error('You have already booked this event'), { status: 400 });
      }

      const event = await tx.event.findUnique({ where: { id: eventId } });
      if (!event) throw Object.assign(new Error('Event not found'), { status: 404 });
      if (event.capacity <= 0)
        throw Object.assign(new Error('Event full'), { status: 400 });

      const booking = await tx.booking.create({
        data: { userId, eventId, status: 'booked' }
      });

      await tx.event.update({
        where: { id: eventId },
        data: { capacity: { decrement: 1 }, popularity: { increment: 1 } }
      });

      return booking;
    });
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
}

// Admin optional endpoints
export async function createEvent(req, res, next) {
  try {
    const data = req.body;
    const created = await prisma.event.create({ data });
    return res.status(201).json(created);
  } catch (e) {
    return next(e);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.event.update({ where: { id }, data: req.body });
    return res.json(updated);
  } catch (e) {
    if (e.code === 'P2025') return res.status(404).json({ message: 'Not found' });
    return next(e);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const id = Number(req.params.id);
    await prisma.event.delete({ where: { id } });
    return res.status(204).send();
  } catch (e) {
    if (e.code === 'P2025') return res.status(404).json({ message: 'Not found' });
    return next(e);
  }
}