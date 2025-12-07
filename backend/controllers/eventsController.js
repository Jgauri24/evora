import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function parseNumber(value, defaultValue) {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

export async function listEvents(req, res, next) {
  try {
    const {
      page = "1",
      limit = "10",
      search,
      category,
      dateFrom,
      dateTo,
      minPrice,
      maxPrice,
      // mode,
      sort,
    } = req.query;

    const pageNum = parseNumber(page, 1);
    const pageSize = parseNumber(limit, 10);
    const skip = (pageNum - 1) * pageSize;

    const where = {};

    // Search fix
    if (search && search.trim() !== "") {
      where.OR = [
        { title: { contains: search.trim() } },
        { description: { contains: search.trim() } },
      ];
    }

    if (category) where.category = category;
    // if (mode) where.mode = mode;

    // Date Fix
    if (dateFrom || dateTo) {
      where.startAt = {};
      const gte = dateFrom ? new Date(dateFrom) : undefined;
      const lte = dateTo ? new Date(dateTo) : undefined;

      if (gte instanceof Date && !isNaN(gte)) where.startAt.gte = gte;
      if (lte instanceof Date && !isNaN(lte)) where.startAt.lte = lte;
    }

    // Price Fix
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = Number(minPrice);
      if (maxPrice !== undefined) where.price.lte = Number(maxPrice);
    }

    const orderBy = (() => {
      switch (sort) {
        case "date":
          return { startAt: "asc" };
        case "price":
          return { price: "asc" };
        case "popularity":
          return { popularity: "desc" };
        default:
          return { createdAt: "desc" };
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
          popularity: true,
        },
      }),
    ]);

    return res.json({
      data,
      meta: {
        total,
        page: pageNum,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

export async function getEventById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return res.status(404).json({ message: "Event not found" });
    // Increment popularity on view (lightweight, ignore await)
    prisma.event
      .update({ where: { id }, data: { popularity: { increment: 1 } } })
      .catch(() => {});
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
          status: { in: ["booked", "attended"] },
        },
      });

      if (existingBooking) {
        throw Object.assign(new Error("You have already booked this event"), {
          status: 400,
        });
      }

      const event = await tx.event.findUnique({ where: { id: eventId } });
      if (!event)
        throw Object.assign(new Error("Event not found"), { status: 404 });
      if (event.capacity <= 0)
        throw Object.assign(new Error("Event full"), { status: 400 });

      const booking = await tx.booking.create({
        data: { userId, eventId, status: "booked" },
      });

      await tx.event.update({
        where: { id: eventId },
        data: { capacity: { decrement: 1 }, popularity: { increment: 1 } },
      });

      return booking;
    });
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
}


export async function createEvent(req, res, next) {
  try {
    const data = req.body;
    console.log('Creating event with data:', data);
    
    // Transform dates to Date objects
    const eventData = {
      ...data,
      startAt: new Date(data.startAt),
      endAt: new Date(data.endAt),
      price: Number(data.price),
      capacity: Number(data.capacity),
      mode: data.mode || 'offline' // Default to offline if not provided
    };
    
    const created = await prisma.event.create({ data: eventData });
    return res.status(201).json(created);
  } catch (e) {
    console.error('Error creating event:', e);
    return next(e);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.event.update({
      where: { id },
      data: req.body,
    });
    return res.json(updated);
  } catch (e) {
    if (e.code === "P2025")
      return res.status(404).json({ message: "Not found" });
    return next(e);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const id = Number(req.params.id);
    await prisma.event.delete({ where: { id } });
    return res.status(204).send();
  } catch (e) {
    if (e.code === "P2025")
      return res.status(404).json({ message: "Not found" });
    return next(e);
  }
}

