import { IconName } from './components/Icon';

/* ============================ TYPES ============================ */
export type Grad = readonly [string, string];

export type Pkg = {
  id: string;
  name: string;
  dur: string;
  price: number;
  trial?: boolean;
  save?: string;
};

export type Teacher = {
  id: string;
  name: string;
  role: string;
  short: string;
  cat: string;
  tags: string[];
  rating: number;
  reviews: number;
  dist: string;
  yrs: string;
  students: string;
  response: string;
  verified: boolean;
  top: boolean;
  grad: Grad;
  initials: string;
  bio: string;
  packages: Pkg[];
};

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  teacher: string;
  pkg: string;
  dur: string;
  date: string;
  time: string;
  mode: string;
  status: BookingStatus;
  price: number;
  when: 'upcoming' | 'past';
};

export type Review = {
  id: number;
  name: string;
  when: string;
  stars: number;
  initials: string;
  grad: Grad;
  body: string;
};

export type Category = { key: string; icon: IconName };

/* ============================ HELPERS ============================ */
export function money(n: number, sym?: string) {
  return (sym || 'RM') + n.toLocaleString('en-US');
}

/* ============================ DATA ============================ */
export const TEACHERS: Teacher[] = [
  {
    id: 'nisha', name: 'Nisha Rao', role: 'Violin Teacher', short: 'Violin Lessons',
    cat: 'Music', tags: ['Classical', 'Beginner Friendly', 'All Age Groups'],
    rating: 4.9, reviews: 128, dist: '250 m', yrs: '5+', students: '320+', response: '98%',
    verified: true, top: true, grad: ['#5AE29A', '#1F9D63'], initials: 'NR',
    bio: 'Classical violinist with 8+ years of teaching experience. I teach all age groups and levels with a personalized, patient approach that keeps lessons joyful.',
    packages: [
      { id: 'trial', name: 'Trial Lesson', dur: '30 min', price: 499, trial: true },
      { id: 'single', name: 'Single Lesson', dur: '60 min', price: 1200 },
      { id: 'pack4', name: 'Starter Pack', dur: '4 × 60 min', price: 4400, save: 'Save 8%' },
    ],
  },
  {
    id: 'arjun', name: 'Arjun K.', role: 'Maths Tutor', short: 'Maths Tutor', cat: 'Tutoring',
    tags: ['Algebra', 'Exam Prep'], rating: 4.8, reviews: 96, dist: '400 m', yrs: '6+', students: '210+', response: '95%',
    verified: true, top: false, grad: ['#7CC8FF', '#2A6FDB'], initials: 'AK',
    bio: 'Helping students fall back in love with mathematics through clear, confidence-building sessions.',
    packages: [
      { id: 'trial', name: 'Trial Lesson', dur: '30 min', price: 399, trial: true },
      { id: 'single', name: 'Single Lesson', dur: '60 min', price: 900 },
    ],
  },
  {
    id: 'meera', name: 'Meera S.', role: 'Yoga Coach', short: 'Yoga Coach', cat: 'Fitness',
    tags: ['Vinyasa', 'Beginner Friendly'], rating: 4.9, reviews: 142, dist: '650 m', yrs: '7+', students: '480+', response: '99%',
    verified: true, top: true, grad: ['#FFC98C', '#E08A12'], initials: 'MS',
    bio: 'Breath-led yoga for every body. Mornings by the lake or in-studio, your pace.',
    packages: [
      { id: 'trial', name: 'Drop-in Class', dur: '45 min', price: 350, trial: true },
      { id: 'single', name: 'Private Session', dur: '60 min', price: 800 },
    ],
  },
  {
    id: 'rohan', name: 'Rohan P.', role: 'Logo Designer', short: 'Logo Design', cat: 'Design',
    tags: ['Branding', 'Illustration'], rating: 4.8, reviews: 74, dist: '1.2 km', yrs: '9+', students: '120+', response: '92%',
    verified: false, top: false, grad: ['#C9B8FF', '#7A5AF8'], initials: 'RP',
    bio: 'Independent brand designer. I help small studios find a mark they are proud of.',
    packages: [
      { id: 'trial', name: 'Intro Call', dur: '30 min', price: 0, trial: true },
      { id: 'single', name: 'Design Sprint', dur: '90 min', price: 1500 },
    ],
  },
  {
    id: 'lena', name: 'Lena T.', role: 'Piano Teacher', short: 'Piano Lessons', cat: 'Music',
    tags: ['Jazz', 'Theory'], rating: 4.7, reviews: 58, dist: '820 m', yrs: '4+', students: '90+', response: '94%',
    verified: true, top: false, grad: ['#8FE0C4', '#287A57'], initials: 'LT',
    bio: 'Jazz pianist & teacher. We start from the songs you already love.',
    packages: [
      { id: 'trial', name: 'Trial Lesson', dur: '30 min', price: 450, trial: true },
      { id: 'single', name: 'Single Lesson', dur: '60 min', price: 1100 },
    ],
  },
  {
    id: 'sam', name: 'Sam W.', role: 'Guitar Coach', short: 'Guitar Lessons', cat: 'Music',
    tags: ['Acoustic', 'Songwriting'], rating: 4.9, reviews: 88, dist: '1.5 km', yrs: '8+', students: '260+', response: '97%',
    verified: true, top: true, grad: ['#FF9F9F', '#DC4B50'], initials: 'SW',
    bio: 'From first chord to first song in weeks. Acoustic & electric, all ages.',
    packages: [
      { id: 'trial', name: 'Trial Lesson', dur: '30 min', price: 420, trial: true },
      { id: 'single', name: 'Single Lesson', dur: '60 min', price: 1000 },
    ],
  },
];

export const teacherById = (id: string) => TEACHERS.find((t) => t.id === id);

export const CATEGORIES: Category[] = [
  { key: 'Tutoring', icon: 'book' }, { key: 'Music', icon: 'music' },
  { key: 'Fitness', icon: 'dumbbell' }, { key: 'Design', icon: 'palette' },
  { key: 'Writing', icon: 'pen' }, { key: 'More', icon: 'grid' },
];

export const FILTERS = ['All', 'Teachers', 'Music', 'Fitness', 'Services', 'Opportunities'];

export const REVIEWS: Review[] = [
  { id: 1, name: 'Ananya P.', when: '2 weeks ago', stars: 5, initials: 'AP', grad: ['#9BEDC2', '#1F9D63'],
    body: 'Nisha ma’am is patient and explains concepts so well. My daughter loves her classes and actually practices now!' },
  { id: 2, name: 'Vikram D.', when: '1 month ago', stars: 5, initials: 'VD', grad: ['#7CC8FF', '#2A6FDB'],
    body: 'Booked a trial and signed up the same week. Genuinely the best teacher we found on Growlink.' },
  { id: 3, name: 'Priya M.', when: '1 month ago', stars: 4, initials: 'PM', grad: ['#FFC98C', '#E08A12'],
    body: 'Lovely, encouraging sessions. Came home humming the tune from her first lesson.' },
  { id: 4, name: 'Kabir N.', when: '2 months ago', stars: 5, initials: 'KN', grad: ['#C9B8FF', '#7A5AF8'],
    body: 'Flexible with timing and very professional. Highly recommend the starter pack.' },
];

export const REVIEW_DIST = [{ s: 5, p: 86 }, { s: 4, p: 10 }, { s: 3, p: 3 }, { s: 2, p: 1 }, { s: 1, p: 0 }];

export const BOOKINGS: Booking[] = [
  { id: 'b1', teacher: 'nisha', pkg: 'Single Lesson', dur: '60 min', date: 'Wed, 21 May', time: '10:30 AM', mode: 'In-Person', status: 'confirmed', price: 1360, when: 'upcoming' },
  { id: 'b2', teacher: 'meera', pkg: 'Private Session', dur: '60 min', date: 'Fri, 23 May', time: '07:00 AM', mode: 'In-Person', status: 'pending', price: 920, when: 'upcoming' },
  { id: 'b3', teacher: 'arjun', pkg: 'Single Lesson', dur: '60 min', date: 'Mon, 12 May', time: '05:30 PM', mode: 'Online', status: 'completed', price: 1020, when: 'past' },
  { id: 'b4', teacher: 'sam', pkg: 'Trial Lesson', dur: '30 min', date: 'Thu, 08 May', time: '06:00 PM', mode: 'Online', status: 'cancelled', price: 420, when: 'past' },
];

export const DAYS = [
  { dow: 'Mon', d: 19 }, { dow: 'Tue', d: 20 }, { dow: 'Wed', d: 21 }, { dow: 'Thu', d: 22 },
  { dow: 'Fri', d: 23 }, { dow: 'Sat', d: 24 }, { dow: 'Sun', d: 25 },
];
export const TIMES = ['09:00 AM', '10:30 AM', '12:00 PM', '04:00 PM', '05:30 PM', '07:00 PM'];

export const STATUS_META: Record<BookingStatus, { label: string; c: string; bg: string }> = {
  pending: { label: 'Pending', c: '#E08A12', bg: '#FBEFD7' },
  confirmed: { label: 'Confirmed', c: '#2A6FDB', bg: '#E7F0FD' },
  completed: { label: 'Completed', c: '#1F9D63', bg: '#E4F7EC' },
  cancelled: { label: 'Cancelled', c: '#DC4B50', bg: '#FBE9E9' },
};

export const THREADS = [
  { id: 'nisha', last: 'See you on Wednesday! Bring your…', time: '4h', unread: 2, ctx: 'Violin Lesson · Wed 21 May' },
  { id: 'meera', last: 'Sure, morning works great 🌞', time: '1d', unread: 0, ctx: 'Yoga · Fri 23 May' },
  { id: 'arjun', last: 'Thanks for the lesson!', time: '3d', unread: 0, ctx: 'Maths · completed' },
];
