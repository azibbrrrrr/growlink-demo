import { T } from "./tokens";

/* ── NAVIGATION ITEMS ──────────────────────────────────────── */
export const NAV = [
  { id: "home", icon: "home", label: "Home"      },
  { id: "disc", icon: "map",  label: "Discover"  },
  { id: "bkgs", icon: "book", label: "Bookings"  },
  { id: "act",  icon: "act",  label: "Activity"  },
  { id: "msgs", icon: "msg",  label: "Messages"  },
];

/* ── DISCOVER CATEGORIES ───────────────────────────────────── */
export const CATEGORIES = ["All", "Music", "Language", "Academic", "Coding", "Sports", "Arts"];

/* ── ACTIVITY TYPE CONFIG ──────────────────────────────────── */
export const ACT_CFG = {
  booking:   { label: "Booking",   color: T.p600,    bg: T.p100    },
  message:   { label: "Message",   color: T.blue,    bg: T.blueL   },
  review:    { label: "Review",    color: T.amber,   bg: T.amberL  },
  payment:   { label: "Payment",   color: T.p500,    bg: T.p50     },
  reminder:  { label: "Reminder",  color: T.gray500, bg: T.gray100 },
  milestone: { label: "Milestone", color: T.green,   bg: T.greenL  },
};
