import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {



  const now = new Date();
  const eventsData = [
    {
      title: 'React Workshop',
      description: 'Hands-on React workshop for beginners.',
      category: 'Workshop',
      location: 'Online',
      startAt: new Date(now.getFullYear(), now.getMonth() + 1, 10, 10),
      endAt: new Date(now.getFullYear(), now.getMonth() + 1, 10, 13),
      price: 0,
      mode: 'online',
      capacity: 50,
      popularity: 21,
      imageUrl: '/images/react-workshop.jpg'
    },
    {
      title: 'City Jazz Concert',
      description: 'Live jazz with local bands.',
      category: 'Concert',
      location: 'Downtown Hall',
      startAt: new Date(now.getFullYear(), now.getMonth() + 1, 15, 19),
      endAt: new Date(now.getFullYear(), now.getMonth() + 1, 15, 22),
      price: 35,
      mode: 'offline',
      capacity: 200,
      popularity: 8,
      imageUrl: '/images/jazz.jpg'
    },
    {
      title: 'AI Summit',
      description: 'Trends in AI and ML.',
      category: 'Conference',
      location: 'Online',
      startAt: new Date(now.getFullYear(), now.getMonth() + 2, 1, 9),
      endAt: new Date(now.getFullYear(), now.getMonth() + 2, 1, 17),
      price: 99,
      mode: 'online',
      capacity: 300,
      popularity: 42,
      imageUrl: '/images/ai-summit.jpg'
    }
  ];

  await prisma.event.createMany({ data: eventsData });



const moreEvents = [
    {
      title: 'Photography Masterclass',
      description: 'Learn DSLR basics and composition techniques.',
      category: 'Workshop',
      location: 'Community Studio',
      startAt: new Date(now.getFullYear(), now.getMonth() + 1, 20, 14),
      endAt: new Date(now.getFullYear(), now.getMonth() + 1, 20, 17),
      price: 25,
      mode: 'offline',
      capacity: 30,
      popularity: 12,
      imageUrl: '/images/photo-class.jpg'
    },
    {
      title: 'Blockchain Expo',
      description: 'Global conference on blockchain technologies.',
      category: 'Conference',
      location: 'Tech Convention Center',
      startAt: new Date(now.getFullYear(), now.getMonth() + 2, 5, 10),
      endAt: new Date(now.getFullYear(), now.getMonth() + 2, 5, 18),
      price: 120,
      mode: 'offline',
      capacity: 500,
      popularity: 33,
      imageUrl: '/images/blockchain-expo.jpg'
    },
    {
      title: 'Stand-Up Comedy Night',
      description: 'Enjoy an evening of jokes and laughter.',
      category: 'Comedy',
      location: 'City Theater',
      startAt: new Date(now.getFullYear(), now.getMonth() + 1, 28, 19),
      endAt: new Date(now.getFullYear(), now.getMonth() + 1, 28, 21),
      price: 15,
      mode: 'offline',
      capacity: 150,
      popularity: 25,
      imageUrl: '/images/comedy-night.jpg'
    },
    {
      title: 'Yoga & Meditation Retreat',
      description: 'Relaxing half-day retreat for mental wellness.',
      category: 'Health',
      location: 'Green Garden Center',
      startAt: new Date(now.getFullYear(), now.getMonth() + 1, 30, 8),
      endAt: new Date(now.getFullYear(), now.getMonth() + 1, 30, 12),
      price: 10,
      mode: 'offline',
      capacity: 40,
      popularity: 19,
      imageUrl: '/images/yoga-retreat.jpg'
    },
    {
      title: 'Beginner Python Bootcamp',
      description: 'A crash course on Python programming.',
      category: 'Workshop',
      location: 'Online',
      startAt: new Date(now.getFullYear(), now.getMonth() + 1, 12, 18),
      endAt: new Date(now.getFullYear(), now.getMonth() + 1, 12, 21),
      price: 0,
      mode: 'online',
      capacity: 100,
      popularity: 44,
      imageUrl: '/images/python-bootcamp.jpg'
    },
    {
      title: 'Startup Pitch Day',
      description: 'Showcase your startup idea to investors.',
      category: 'Business',
      location: 'Innovation Hub',
      startAt: new Date(now.getFullYear(), now.getMonth() + 2, 12, 9),
      endAt: new Date(now.getFullYear(), now.getMonth() + 2, 12, 17),
      price: 50,
      mode: 'offline',
      capacity: 80,
      popularity: 27,
      imageUrl: '/images/pitch-day.jpg'
    },
    {
      title: 'Marathon 2025',
      description: 'City-wide marathon for fitness enthusiasts.',
      category: 'Sports',
      location: 'City Stadium',
      startAt: new Date(now.getFullYear(), now.getMonth() + 3, 1, 6),
      endAt: new Date(now.getFullYear(), now.getMonth() + 3, 1, 12),
      price: 20,
      mode: 'offline',
      capacity: 2000,
      popularity: 66,
      imageUrl: '/images/marathon.jpg'
    },
    {
      title: 'Night Sky Astronomy',
      description: 'Stargazing with telescopes and experts.',
      category: 'Education',
      location: 'Hilltop Observatory',
      startAt: new Date(now.getFullYear(), now.getMonth() + 2, 8, 20),
      endAt: new Date(now.getFullYear(), now.getMonth() + 2, 8, 23),
      price: 12,
      mode: 'offline',
      capacity: 100,
      popularity: 14,
      imageUrl: '/images/astronomy.jpg'
    },
    {
      title: 'Music Production Basics',
      description: 'Learn to produce beats and mixes.',
      category: 'Music',
      location: 'Online',
      startAt: new Date(now.getFullYear(), now.getMonth() + 2, 11, 16),
      endAt: new Date(now.getFullYear(), now.getMonth() + 2, 11, 18),
      price: 0,
      mode: 'online',
      capacity: 120,
      popularity: 37,
      imageUrl: '/images/music-production.jpg'
    },
    {
      title: 'Cultural Food Festival',
      description: 'Taste cuisines from around the world.',
      category: 'Festival',
      location: 'Central Park',
      startAt: new Date(now.getFullYear(), now.getMonth() + 2, 20, 11),
      endAt: new Date(now.getFullYear(), now.getMonth() + 2, 20, 20),
      price: 5,
      mode: 'offline',
      capacity: 300,
      popularity: 48,
      imageUrl: '/images/food-festival.jpg'
    },
    {
      title: 'Financial Planning 101',
      description: 'Basics of saving, investing, and budgeting.',
      category: 'Finance',
      location: 'Online',
      startAt: new Date(now.getFullYear(), now.getMonth() + 1, 7, 17),
      endAt: new Date(now.getFullYear(), now.getMonth() + 1, 7, 19),
      price: 0,
      mode: 'online',
      capacity: 200,
      popularity: 22,
      imageUrl: '/images/finance.jpg'
    },
    {
      title: 'Interior Design Meetup',
      description: 'Trends & styles for home decor.',
      category: 'Design',
      location: 'Design Studio Hall',
      startAt: new Date(now.getFullYear(), now.getMonth() + 3, 3, 10),
      endAt: new Date(now.getFullYear(), now.getMonth() + 3, 3, 14),
      price: 40,
      mode: 'offline',
      capacity: 70,
      popularity: 9,
      imageUrl: '/images/interior-design.jpg'
    },
    {
      title: 'Online Chess Tournament',
      description: 'Compete with players worldwide.',
      category: 'Sports',
      location: 'Online',
      startAt: new Date(now.getFullYear(), now.getMonth() + 1, 25, 17),
      endAt: new Date(now.getFullYear(), now.getMonth() + 1, 25, 20),
      price: 5,
      mode: 'online',
      capacity: 500,
      popularity: 59,
      imageUrl: '/images/chess-tournament.jpg'
    },
    {
      title: 'Creative Writing Workshop',
      description: 'Improve storytelling & writing techniques.',
      category: 'Workshop',
      location: 'Library Hall',
      startAt: new Date(now.getFullYear(), now.getMonth() + 2, 18, 10),
      endAt: new Date(now.getFullYear(), now.getMonth() + 2, 18, 13),
      price: 10,
      mode: 'offline',
      capacity: 40,
      popularity: 18,
      imageUrl: '/images/writing-workshop.jpg'
    },
    {
      title: 'Tech Career Fair',
      description: 'Meet recruiters from top tech companies.',
      category: 'Career',
      location: 'Convention Center',
      startAt: new Date(now.getFullYear(), now.getMonth() + 3, 10, 9),
      endAt: new Date(now.getFullYear(), now.getMonth() + 3, 10, 16),
      price: 0,
      mode: 'offline',
      capacity: 1000,
      popularity: 73,
      imageUrl: '/images/career-fair.jpg'
    }
  ];
  await prisma.event.createMany({ data: [...eventsData, ...moreEvents] });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });