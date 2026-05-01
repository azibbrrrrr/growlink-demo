/* ── MOCK DATA ─────────────────────────────────────────────── */

export const STUDENT = {
  name:        "Ahmad Rizky",
  fullName:    "Ahmad Rizky Bin Zulkarnain",
  avatar:      "AR",
  email:       "ahmadrizky@email.com",
  phone:       "+60 12-345 6789",
  dob:         "14 March 2002",
  gender:      "Male",
  location:    "Petaling Jaya, Selangor",
  memberSince: "January 2026",
  language:    "English",
  bio:         "University student passionate about music and continuous learning. Currently taking piano and guitar lessons on weekends.",
  interests:   ["Piano", "Guitar", "Mathematics", "Coding"],
  bookings:    6,
  spent:       890,
  following:   3,
};

export const TEACHERS = [
  {
    id: 1, name: "Sarah Lim Xin Yi", skill: "Piano · Classical",
    rating: 4.9, reviews: 128, price: 60, dist: 1.2,
    mode: ["Online", "Physical"], avatar: "SL", top: true, verified: true, certified: true, bgCheck: true,
    bio: "Certified ABRSM Grade 8 pianist with 10 years teaching experience. Specializing in classical and contemporary styles for all ages.",
    exp: "10 years", lang: ["English", "Mandarin"], avail: "Mon – Sat", avgResponse: "< 1 hour",
    slots: ["Mon, 3 Mar · 10:00 AM", "Mon, 3 Mar · 2:00 PM", "Tue, 4 Mar · 10:00 AM"],
    x: "45%", y: "28%",
    pkgs: [
      { name: "Trial",    dur: "1 Session · 1 hr",      price: 30,  note: "First timers", id: "trial" },
      { name: "Standard", dur: "4 Sessions · 1 hr each", price: 200, note: "Save 10%",    id: "std"   },
      { name: "Premium",  dur: "8 Sessions · 1 hr each", price: 370, note: "Best value",  id: "prem"  },
    ],
  },
  {
    id: 2, name: "David Tan Wei Kiat", skill: "Guitar · Rock & Jazz",
    rating: 4.8, reviews: 94, price: 45, dist: 0.8,
    mode: ["Online", "Physical"], avatar: "DT", top: false, verified: true, certified: false, bgCheck: false,
    bio: "Passionate guitarist with experience in rock, jazz, blues and fingerstyle. Tailored lessons for beginners to advanced.",
    exp: "8 years", lang: ["English", "Malay"], avail: "Tue – Sun", avgResponse: "< 2 hours",
    slots: ["Wed, 5 Mar · 4:00 PM", "Thu, 6 Mar · 3:00 PM", "Sat, 8 Mar · 11:00 AM"],
    x: "22%", y: "55%",
    pkgs: [
      { name: "Trial",    dur: "1 Session · 1 hr",      price: 25,  note: "First timers", id: "trial" },
      { name: "Standard", dur: "4 Sessions · 1 hr each", price: 160, note: "Save 10%",    id: "std"   },
      { name: "Premium",  dur: "8 Sessions · 1 hr each", price: 300, note: "Best value",  id: "prem"  },
    ],
  },
  {
    id: 3, name: "Mei Ling Chua", skill: "Mandarin · HSK Prep",
    rating: 4.7, reviews: 67, price: 50, dist: 2.1,
    mode: ["Online"], avatar: "ML", top: false, verified: true, certified: true, bgCheck: false,
    bio: "Native Mandarin speaker and HSK certified instructor. Conversational and exam prep classes for all ages.",
    exp: "6 years", lang: ["Mandarin", "English", "Malay"], avail: "Mon – Fri", avgResponse: "Same day",
    slots: ["Mon, 3 Mar · 7:00 PM", "Tue, 4 Mar · 7:00 PM", "Thu, 6 Mar · 7:00 PM"],
    x: "68%", y: "60%",
    pkgs: [
      { name: "Trial",    dur: "1 Session · 1 hr",      price: 30,  note: "First timers", id: "trial" },
      { name: "Standard", dur: "4 Sessions · 1 hr each", price: 180, note: "Save 10%",    id: "std"   },
      { name: "Premium",  dur: "8 Sessions · 1 hr each", price: 340, note: "Best value",  id: "prem"  },
    ],
  },
  {
    id: 4, name: "Ali Imran Roslan", skill: "Mathematics · IGCSE",
    rating: 4.9, reviews: 201, price: 55, dist: 3.4,
    mode: ["Online", "Physical"], avatar: "AI", top: true, verified: true, certified: true, bgCheck: true,
    bio: "Former lecturer turned full-time tutor. Expert in IGCSE, SPM and university math. 95% of students improve by at least 2 grades.",
    exp: "12 years", lang: ["English", "Malay"], avail: "Weekends", avgResponse: "< 1 hour",
    slots: ["Sat, 8 Mar · 9:00 AM", "Sat, 8 Mar · 11:00 AM", "Sun, 9 Mar · 2:00 PM"],
    x: "74%", y: "30%",
    pkgs: [
      { name: "Trial",    dur: "1 Session · 1 hr",      price: 35,  note: "First timers", id: "trial" },
      { name: "Standard", dur: "4 Sessions · 1 hr each", price: 200, note: "Save 10%",    id: "std"   },
      { name: "Premium",  dur: "8 Sessions · 1 hr each", price: 380, note: "Best value",  id: "prem"  },
    ],
  },
  {
    id: 5, name: "Priya Sundaram", skill: "Coding · Python & Web",
    rating: 4.8, reviews: 53, price: 70, dist: 1.8,
    mode: ["Online"], avatar: "PS", top: false, verified: true, certified: false, bgCheck: false,
    bio: "Software engineer by day, coding coach by passion. Taught 50+ students from zero to building real apps.",
    exp: "5 years", lang: ["English", "Tamil"], avail: "Evenings", avgResponse: "< 3 hours",
    slots: ["Tue, 4 Mar · 8:00 PM", "Thu, 6 Mar · 8:00 PM", "Fri, 7 Mar · 8:00 PM"],
    x: "36%", y: "68%",
    pkgs: [
      { name: "Trial",    dur: "1 Session · 1 hr",      price: 40,  note: "First timers", id: "trial" },
      { name: "Standard", dur: "4 Sessions · 1 hr each", price: 250, note: "Save 10%",    id: "std"   },
      { name: "Premium",  dur: "8 Sessions · 1 hr each", price: 480, note: "Best value",  id: "prem"  },
    ],
  },
];

export const BOOKINGS = [
  {
    id: 1, teacher: "Sarah Lim Xin Yi", avatar: "SL", skill: "Piano",
    pkg: "Standard · 4 Sessions", date: "Mon, 3 Mar", time: "10:00 AM",
    mode: "Physical – Teacher's", status: "confirmed", fee: 200, session: "2/4",
    countdown: "Tomorrow", action: "upcoming",
  },
  {
    id: 2, teacher: "David Tan Wei Kiat", avatar: "DT", skill: "Guitar",
    pkg: "Trial Lesson", date: "Wed, 5 Mar", time: "4:00 PM",
    mode: "Online", status: "pending", fee: 25, session: "1/1",
    countdown: "3 days", action: "pending",
  },
  {
    id: 3, teacher: "Ali Imran Roslan", avatar: "AI", skill: "Mathematics",
    pkg: "Premium · 8 Sessions", date: "Sat, 1 Mar", time: "11:00 AM",
    mode: "Physical – Teacher's", status: "completed", fee: 380, session: "8/8",
    countdown: null, action: "review",
  },
];

export const ACTIVITY = [
  { id: 1, type: "booking",   text: "Booking confirmed — Sarah Lim for Piano on Mon, 3 Mar at 10:00 AM",      time: "Just now",   read: false, bookingId: 1 },
  { id: 2, type: "message",   text: "David Tan: 'Looking forward to our trial session on Wednesday!'",         time: "1h ago",     read: false, teacherId: 2 },
  { id: 3, type: "review",    text: "How was your class with Ali Imran? Leave a review to help others.",       time: "2h ago",     read: false, bookingId: 3 },
  { id: 4, type: "payment",   text: "Payment of RM 200 confirmed for Sarah Lim · Piano Standard",              time: "Yesterday",  read: true,  bookingId: 1 },
  { id: 5, type: "reminder",  text: "Reminder: Piano class with Sarah Lim tomorrow at 10:00 AM",              time: "Yesterday",  read: true,  bookingId: 1 },
  { id: 6, type: "milestone", text: "You completed your first lesson. Keep it up!",                            time: "3 days ago", read: true  },
];

export const MSGS = [
  { id: 1, name: "Sarah Lim Xin Yi",   avatar: "SL", last: "See you Monday! Please bring your music sheets.", time: "2h ago",     unread: 1, online: true  },
  { id: 2, name: "David Tan Wei Kiat", avatar: "DT", last: "Looking forward to our trial session!",           time: "Yesterday",  unread: 0, online: false },
  { id: 3, name: "Ali Imran Roslan",   avatar: "AI", last: "Great work on the last session, Ahmad!",          time: "3 days ago", unread: 0, online: false },
];

export const CHAT_HISTORY = [
  { from: "them", text: "Hi Ahmad! Confirming our Monday session at 10 AM at my place in Taman Desa.",          time: "10:02 AM", read: true },
  { from: "me",   text: "Hi Ms Sarah! Confirmed. Should I bring anything?",                                    time: "10:05 AM", read: true },
  { from: "them", text: "Please bring your music sheets for the Chopin piece. We will also work on sight-reading.", time: "10:07 AM", read: true },
  { from: "me",   text: "Perfect, I have been practising! See you Monday.",                                    time: "10:09 AM", read: true },
  { from: "them", text: "See you Monday! Please bring your music sheets.",                                     time: "10:10 AM", read: true },
];
