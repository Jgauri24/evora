// backend/controllers/dashboardController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
function monthLabel(date) {
  return date.toLocaleString("en-US", { month: "short" });
}

export async function getDashboardStats(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const [attendedCount, upcomingBookings, catCounts, attendance] = await Promise.all([
      prisma.booking.count({ where: { userId, status: "attended" } }),
      prisma.booking.findMany({
        where: { userId, event: { startAt: { gte: new Date() } }, status: "booked" },
        include: { event: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.event.groupBy({
        by: ["category"],
        where: { bookings: { some: { userId } } },
        _count: { category: true },
      }),
      prisma.booking.findMany({
        where: { userId, status: "attended" },
        include: { event: true },
      }),
    ]);

    const now = new Date();
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: monthLabel(d), count: 0 });
    }

    const attendanceMap = new Map(months.map((m) => [m.key, m]));
    attendance.forEach((b) => {
      const d = new Date(b.event.startAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (attendanceMap.has(key)) attendanceMap.get(key).count += 1;
    });

    const monthlyAttendance = months.map((m) => ({ month: m.label, count: m.count }));

    const categoryBreakdown = catCounts.map((c) => ({
      category: c.category,
      count: c._count.category,
    }));

    return res.json({
      totalEventsAttended: attendedCount,
      upcomingBookings,
      categoryBreakdown,
      monthlyAttendance,
    });
  } catch (e) {
    console.error("Error in getDashboardStats:", e);
    return next(e);
  }
}
