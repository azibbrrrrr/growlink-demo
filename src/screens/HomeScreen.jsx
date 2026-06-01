import { useState, useEffect, useRef } from "react";
import { T, GRAD } from "../constants/tokens";
import { TEACHERS, BOOKINGS, MSGS } from "../constants/data";
import Icon from "../components/icons/Icon";
import {
  Avatar, Card, Pill, Stars,
  GradientHeader, SkeletonCard, Skeleton,
} from "../components/primitives";
import BottomNav from "../components/navigation/BottomNav";

// ── Static data ─────────────────────────────────────────────────

const STATE_META = {
  A: { name: "Zara Ahmad",   avatar: "ZA", streak: 0, bookingCount: 0 },
  B: { name: "Hafiz Roslan", avatar: "HR", streak: 0, bookingCount: 3 },
  C: { name: "Ahmad Rizky",  avatar: "AR", streak: 5, bookingCount: 6 },
};

const BOOKINGS_BY_STATE = {
  A: [],
  B: [BOOKINGS[0]],
  C: BOOKINGS,
};

const SAVED_BY_STATE = {
  A: new Set(),
  B: new Set([1]),
  C: null,
};

const INTENT_OPTIONS = [
  { id: "learn", label: "Learn / Create" },
  { id: "help",  label: "Get Help"       },
  { id: "work",  label: "Work / Earn"    },
];

// L1 category chips per intent — with teacher counts
const CHIPS_BY_INTENT = {
  learn: [
    { label: "All", count: null },
    { label: "Music",    count: 67 },
    { label: "Academic", count: 48 },
    { label: "Language", count: 31 },
    { label: "Sports",   count: 22 },
    { label: "Creative", count: 19 },
    { label: "Spiritual",count: 8  },
    { label: "Tech",     count: 14 },
  ],
  help: [
    { label: "All", count: null },
    { label: "Cleaning", count: 31 },
    { label: "Repairs",  count: 19 },
    { label: "Pet Care", count: 12 },
    { label: "Tutoring", count: 10 },
    { label: "Grooming", count: 8  },
    { label: "Moving",   count: 5  },
  ],
  work: [
    { label: "All", count: null },
    { label: "Freelance",  count: 28 },
    { label: "Part-time",  count: 22 },
    { label: "Gigs",       count: 17 },
    { label: "Events",     count: 11 },
    { label: "Tutoring",   count: 9  },
    { label: "Delivery",   count: 7  },
  ],
};

// L2 subcategory chips per category (Mode C drill-down)
const SUBCATS = {
  Music:     ["Piano", "Guitar", "Violin", "Vocals", "Drums", "DJ"],
  Academic:  ["Math", "Science", "English", "Physics", "Chemistry", "History"],
  Language:  ["Mandarin", "Japanese", "Korean", "French", "Malay", "Arabic"],
  Sports:    ["Football", "Swimming", "Tennis", "Badminton", "Yoga", "Gym"],
  Creative:  ["Drawing", "Painting", "Photography", "Animation", "Pottery"],
  Spiritual: ["Quran", "Meditation", "Yoga", "Mindfulness"],
  Tech:      ["Coding", "Web Dev", "Data", "AI", "Cybersecurity"],
  Cleaning:  ["House", "Office", "Carpet", "Windows", "Deep Clean"],
  Repairs:   ["Plumbing", "Electrical", "Appliances", "Painting"],
  "Pet Care":["Dog Walking", "Grooming", "Sitting", "Training"],
  Tutoring:  ["IGCSE", "SPM", "University", "Primary"],
  Grooming:  ["Haircut", "Beard", "Facial", "Nails"],
  Freelance: ["Design", "Writing", "Marketing", "Development"],
  "Part-time":["Retail", "F&B", "Admin", "Customer Service"],
  Gigs:      ["Delivery", "Photography", "Events", "Handyman"],
};

// Popular skills per intent (F-25 intent-aware)
const POPULAR_BY_INTENT = {
  learn: [
    { skill: "Piano",    count: 24 },
    { skill: "Guitar",   count: 18 },
    { skill: "Math",     count: 12 },
    { skill: "Mandarin", count: 9  },
    { skill: "Coding",   count: 7  },
    { skill: "Art",      count: 5  },
  ],
  help: [
    { skill: "Cleaning", count: 31 },
    { skill: "Repairs",  count: 19 },
    { skill: "Pet Care", count: 12 },
    { skill: "Tutoring", count: 10 },
    { skill: "Grooming", count: 8  },
    { skill: "Moving",   count: 5  },
  ],
  work: [
    { skill: "Freelance", count: 28 },
    { skill: "Part-time", count: 22 },
    { skill: "Gigs",      count: 17 },
    { skill: "Events",    count: 11 },
    { skill: "Tutoring",  count: 9  },
    { skill: "Delivery",  count: 7  },
  ],
};

// Search autocomplete data — all 3 levels
const AUTOCOMPLETE_DATA = [
  { text: "Piano",            sub: "Music · 24 teachers near you",       intent: "learn" },
  { text: "Guitar",           sub: "Music · 18 teachers near you",       intent: "learn" },
  { text: "Math",             sub: "Academic · 12 teachers near you",    intent: "learn" },
  { text: "Mandarin",         sub: "Language · 9 teachers near you",     intent: "learn" },
  { text: "Violin",           sub: "Music · 7 teachers near you",        intent: "learn" },
  { text: "IGCSE Math",       sub: "Academic · 8 teachers near you",     intent: "learn" },
  { text: "Coding",           sub: "Creative · 7 teachers near you",     intent: "learn" },
  { text: "Personal Trainer", sub: "Sports · 6 trainers near you",       intent: "learn" },
  { text: "House Cleaning",   sub: "Services · 31 providers near you",   intent: "help"  },
  { text: "Pet Care",         sub: "Services · 12 providers near you",   intent: "help"  },
  { text: "Freelance Design", sub: "Work/Earn · 28 listings near you",   intent: "work"  },
];

const RECENT_SEARCHES = [
  "Piano near Petaling Jaya",
  "Math tutor IGCSE",
  "Guitar lessons online",
];

const LOCATIONS = [
  "Petaling Jaya",
  "Kuala Lumpur",
  "Subang Jaya",
  "Shah Alam",
  "Cheras",
  "Bangsar",
];

const TEACHER_POSTS = [
  { id: 1, avatar: "SL", name: "Sarah Lim",  skill: "Piano", time: "2h ago",      text: "Practising slowly is the fastest way to learn. Speed comes after accuracy — not before. 🎹", tag: "Tip",          tagColor: T.p600, tagBg: T.p100   },
  { id: 2, avatar: "DT", name: "David Tan",  skill: "Guitar", time: "Yesterday",  text: "New March slots available! Only 2 spots left on Saturday mornings. DM me to lock yours in. 🎸", tag: "Announcement", tagColor: T.amber, tagBg: T.amberL },
  { id: 3, avatar: "AI", name: "Ali Imran",  skill: "Math",   time: "2 days ago", text: "IGCSE Paper 1 tip: always show your working, even if the answer seems obvious. Examiners award method marks. 📐", tag: "Tip", tagColor: T.p600, tagBg: T.p100 },
];

// ── Helpers ──────────────────────────────────────────────────────

const getAvailLabel = (t) => {
  if (!t.slots?.length) return null;
  const s = t.slots[0];
  if (s.includes("3 Mar") || s.includes("4 Mar")) return "Avail Tomorrow";
  return "This week";
};

const getPriceLabel = (t) => {
  const min = Math.min(...t.pkgs.map((p) => p.price));
  return `from RM ${min}`;
};

const isOnlineOnly = (t) => t.mode.length === 1 && t.mode[0] === "Online";

// ── HomeScreen ───────────────────────────────────────────────────

const HomeScreen = ({ userState = "C", onNav, onProfile, onChangeUser, saved: savedProp, onToggleSave, onQuickPeek, onQuickBook, onCompare, compareList = [], onSaveSearch }) => {
  const [cat,        setCat]        = useState("All");
  const [subcat,     setSubcat]     = useState("All");
  const [sort,       setSort]       = useState("distance");
  const [intent,     setIntent]     = useState("learn");
  const [loading,    setLoading]    = useState(true);
  const [showMoreChips, setShowMoreChips] = useState(false);

  // Search overlay
  const [showSearch,    setShowSearch]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const searchInputRef = useRef(null);

  // Location modal
  const [showLocation,  setShowLocation]  = useState(false);
  const [location,      setLocation]      = useState("Petaling Jaya");

  // Filter sheet
  const [showFilter,    setShowFilter]    = useState(false);
  const [fIntent,       setFIntent]       = useState("all");
  const [fCats,         setFCats]         = useState([]);
  const [fPriceMax,     setFPriceMax]     = useState(200);
  const [fDistMax,      setFDistMax]      = useState(15);
  const [fRating,       setFRating]       = useState(0);
  const [fMode,         setFMode]         = useState("all");
  const [fAvail,        setFAvail]        = useState("any");
  const [saveSearchOpen, setSaveSearchOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState("Piano teachers under RM 60");
  const [toast, setToast] = useState("");

  // Applied filter badge count
  const filterCount = (fIntent !== "all" ? 1 : 0) + fCats.length + (fPriceMax < 200 ? 1 : 0) + (fDistMax < 15 ? 1 : 0) + (fRating > 0 ? 1 : 0) + (fMode !== "all" ? 1 : 0) + (fAvail !== "any" ? 1 : 0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, [userState]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) searchInputRef.current.focus();
  }, [showSearch]);

  const changeIntent = (i) => { setIntent(i); setCat("All"); setSubcat("All"); setShowMoreChips(false); };
  const changeCat    = (c) => { setCat(c); setSubcat("All"); setShowMoreChips(false); };

  const meta          = STATE_META[userState];
  const stateBookings = BOOKINGS_BY_STATE[userState];
  const saved         = SAVED_BY_STATE[userState] ?? savedProp;

  const upcomingLesson = stateBookings.find((b) => b.status === "confirmed");
  const recentBookings = stateBookings.filter((b) => b.status !== "cancelled");
  const featured       = TEACHERS.filter((t) => t.top);
  const savedTeachers  = TEACHERS.filter((t) => saved.has(t.id));
  const unread         = MSGS.reduce((s, m) => s + m.unread, 0);

  const chips        = CHIPS_BY_INTENT[intent];
  const chipsVisible = chips.slice(0, 5);
  const chipsHidden  = chips.slice(5);
  const subcats      = cat !== "All" ? (SUBCATS[cat] || []) : [];

  const popularSkills = POPULAR_BY_INTENT[intent];

  const nearby = TEACHERS.slice().sort((a, b) =>
    sort === "distance" ? a.dist - b.dist :
    sort === "rating"   ? b.rating - a.rating :
    b.id - a.id
  ).filter((t) => {
    if (cat === "All") return true;
    if (subcat !== "All") return t.skill.toLowerCase().includes(subcat.toLowerCase());
    return t.skill.toLowerCase().includes(cat.toLowerCase());
  });

  const suggestions = searchQuery
    ? AUTOCOMPLETE_DATA.filter((d) => d.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const resetFilters = () => { setFIntent("all"); setFCats([]); setFPriceMax(200); setFDistMax(15); setFRating(0); setFMode("all"); setFAvail("any"); };
  const saveSearch = () => {
    onSaveSearch?.(saveSearchName || "Saved teacher search");
    setToast("Search saved! You'll be alerted when new teachers match.");
    setSaveSearchOpen(false);
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* ── Search overlay ─────────────────────────────────────── */}
      {showSearch && (
        <div style={{ position: "absolute", inset: 0, zIndex: 300, background: T.surface, display: "flex", flexDirection: "column" }}>
          {/* Search header */}
          <div style={{ background: GRAD, padding: "44px 16px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => { setShowSearch(false); setSearchQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <Icon n="back" s={20} c="white" />
              </button>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 12, padding: "9px 12px" }}>
                <Icon n="srch" s={14} c="rgba(255,255,255,0.7)" />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find skills, services, or teachers…"
                  style={{ flex: 1, background: "none", border: "none", outline: "none", color: "white", fontSize: 12, fontFamily: "inherit" }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    <Icon n="x" s={13} c="rgba(255,255,255,0.6)" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
            {!searchQuery ? (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gray400, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Recent Searches</div>
                {RECENT_SEARCHES.map((s, i) => (
                  <button key={i} onClick={() => setSearchQuery(s)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 0", background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer", textAlign: "left" }}>
                    <Icon n="clk" s={14} c={T.gray300} />
                    <span style={{ fontSize: 13, color: T.gray700 }}>{s}</span>
                    <Icon n="chev" s={13} c={T.gray200} style={{ marginLeft: "auto" }} />
                  </button>
                ))}
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gray400, letterSpacing: "0.06em", textTransform: "uppercase", margin: "18px 0 10px" }}>Popular Searches</div>
                {AUTOCOMPLETE_DATA.slice(0, 5).map((d, i) => (
                  <button key={i} onClick={() => { setShowSearch(false); setSearchQuery(""); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 0", background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer", textAlign: "left" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: T.p50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon n="srch" s={13} c={T.p600} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.gray900 }}>{d.text}</div>
                      <div style={{ fontSize: 10, color: T.gray400 }}>{d.sub}</div>
                    </div>
                  </button>
                ))}
              </>
            ) : (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gray400, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Results</div>
                {suggestions.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: T.gray400, fontSize: 13 }}>No results for "{searchQuery}"</div>
                ) : suggestions.map((d, i) => (
                  <button key={i} onClick={() => { setShowSearch(false); setSearchQuery(""); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 0", background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer", textAlign: "left" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: T.p50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon n="srch" s={13} c={T.p600} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.gray900 }}>{d.text}</div>
                      <div style={{ fontSize: 10, color: T.gray400 }}>{d.sub}</div>
                    </div>
                    <Icon n="chev" s={13} c={T.gray200} />
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Location modal ─────────────────────────────────────── */}
      {showLocation && (
        <div style={{ position: "absolute", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end" }}>
          <div onClick={() => setShowLocation(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "relative", width: "100%", background: "white", borderRadius: "20px 20px 0 0", padding: "20px 16px 32px", zIndex: 1 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: T.gray200, margin: "0 auto 16px" }} />
            <div style={{ fontSize: 14, fontWeight: 800, color: T.gray900, marginBottom: 4 }}>Change Location</div>
            <div style={{ fontSize: 11, color: T.gray500, marginBottom: 16 }}>Showing teachers near this area</div>
            {LOCATIONS.map((loc) => (
              <button key={loc} onClick={() => { setLocation(loc); setShowLocation(false); }} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon n="pin" s={14} c={location === loc ? T.p600 : T.gray400} />
                  <span style={{ fontSize: 13, fontWeight: location === loc ? 700 : 500, color: location === loc ? T.p600 : T.gray700 }}>{loc}</span>
                </div>
                {location === loc && <Icon n="chk" s={14} c={T.p600} sw={2.5} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Filter bottom sheet ────────────────────────────────── */}
      {toast && (
        <div style={{ position: "absolute", left: 18, right: 18, top: 42, zIndex: 360, background: T.gray900, color: T.white, borderRadius: 13, padding: "11px 13px", fontSize: 11, fontWeight: 800, boxShadow: "0 10px 30px rgba(0,0,0,0.22)" }}>{toast}</div>
      )}

      {showFilter && (
        <div style={{ position: "absolute", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end" }}>
          <div onClick={() => setShowFilter(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "relative", width: "100%", background: "white", borderRadius: "20px 20px 0 0", maxHeight: "85%", display: "flex", flexDirection: "column", zIndex: 1 }}>
            {/* Sheet header */}
            <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: T.gray200, margin: "0 auto 12px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.gray900 }}>Filter</div>
                <button onClick={resetFilters} style={{ fontSize: 12, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>Reset all</button>
              </div>
            </div>

            {/* Scrollable filters */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>

              {/* Intent */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.gray600, marginBottom: 10 }}>Intent</div>
                <div style={{ display: "flex", gap: 7 }}>
                  {[["all", "All"], ["learn", "Learn / Create"], ["help", "Get Help"], ["work", "Work / Earn"]].map(([v, l]) => (
                    <button key={v} onClick={() => setFIntent(v)} style={{ flex: 1, padding: "7px 4px", borderRadius: 9, border: `1.5px solid ${fIntent === v ? T.p600 : T.border}`, background: fIntent === v ? T.p600 : "white", color: fIntent === v ? "white" : T.gray600, fontSize: 9, fontWeight: 700, cursor: "pointer", transition: "all .15s" }}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.gray600, marginBottom: 10 }}>Categories</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {(CHIPS_BY_INTENT[fIntent === "all" ? "learn" : fIntent] || []).filter((c) => c.label !== "All").map((c) => {
                    const active = fCats.includes(c.label);
                    return (
                      <button key={c.label} onClick={() => setFCats((prev) => active ? prev.filter((x) => x !== c.label) : [...prev, c.label])} style={{ padding: "6px 12px", borderRadius: 9, border: `1.5px solid ${active ? T.p600 : T.border}`, background: active ? T.p50 : "white", color: active ? T.p700 : T.gray600, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                        {c.label} {c.count && <span style={{ color: active ? T.p400 : T.gray300, fontSize: 9 }}>({c.count})</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price range */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.gray600 }}>Max Price</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.p600 }}>RM 20 – RM {fPriceMax}</div>
                </div>
                <input type="range" min={20} max={500} step={10} value={fPriceMax} onChange={(e) => setFPriceMax(+e.target.value)} style={{ width: "100%", accentColor: T.p600 }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: T.gray300, marginTop: 4 }}>
                  <span>RM 20</span><span>RM 500</span>
                </div>
              </div>

              {/* Distance */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.gray600 }}>Max Distance</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.p600 }}>{fDistMax} km</div>
                </div>
                <input type="range" min={1} max={30} step={1} value={fDistMax} onChange={(e) => setFDistMax(+e.target.value)} style={{ width: "100%", accentColor: T.p600 }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: T.gray300, marginTop: 4 }}>
                  <span>1 km</span><span>30 km</span>
                </div>
              </div>

              {/* Rating */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.gray600, marginBottom: 10 }}>Minimum Rating</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 3, 4, 4.5].map((r) => (
                    <button key={r} onClick={() => setFRating(r)} style={{ flex: 1, padding: "7px 4px", borderRadius: 9, border: `1.5px solid ${fRating === r ? T.amber : T.border}`, background: fRating === r ? "#FFFBEB" : "white", color: fRating === r ? T.amber : T.gray500, fontSize: r === 0 ? 10 : 9, fontWeight: 700, cursor: "pointer" }}>
                      {r === 0 ? "Any" : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.gray600, marginBottom: 10 }}>Lesson Mode</div>
                <div style={{ display: "flex", gap: 7 }}>
                  {[["all", "All"], ["online", "Online only"], ["physical", "Physical only"]].map(([v, l]) => (
                    <button key={v} onClick={() => setFMode(v)} style={{ flex: 1, padding: "7px 4px", borderRadius: 9, border: `1.5px solid ${fMode === v ? T.blue : T.border}`, background: fMode === v ? T.blueL : "white", color: fMode === v ? T.blue : T.gray600, fontSize: 9, fontWeight: 700, cursor: "pointer" }}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.gray600, marginBottom: 10 }}>Availability</div>
                <div style={{ display: "flex", gap: 7 }}>
                  {[["any", "Any time"], ["today", "Today"], ["week", "This week"]].map(([v, l]) => (
                    <button key={v} onClick={() => setFAvail(v)} style={{ flex: 1, padding: "7px 4px", borderRadius: 9, border: `1.5px solid ${fAvail === v ? T.p600 : T.border}`, background: fAvail === v ? T.p50 : "white", color: fAvail === v ? T.p700 : T.gray600, fontSize: 9, fontWeight: 700, cursor: "pointer" }}>{l}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply button */}
            <div style={{ padding: "12px 16px 20px", borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
              {saveSearchOpen && (
                <div style={{ marginBottom: 10, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 10 }}>
                  <div style={{ fontSize: 10, color: T.gray500, fontWeight: 800, marginBottom: 6 }}>Saved search name</div>
                  <input value={saveSearchName} onChange={(e) => setSaveSearchName(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${T.border}`, background: T.card, borderRadius: 10, padding: "9px 10px", color: T.gray900, fontSize: 11, outline: "none", fontFamily: "inherit" }} />
                </div>
              )}
              <button onClick={() => setShowFilter(false)} style={{ width: "100%", background: T.p600, border: "none", borderRadius: 12, padding: "13px 0", fontSize: 13, fontWeight: 800, color: "white", cursor: "pointer" }}>
                Apply Filters{filterCount > 0 ? ` · ${filterCount} active` : ""}
              </button>
              <button onClick={() => saveSearchOpen ? saveSearch() : setSaveSearchOpen(true)} style={{ width: "100%", background: "none", border: `1.5px solid ${T.border}`, borderRadius: 12, padding: "11px 0", fontSize: 12, fontWeight: 800, color: T.p700, cursor: "pointer", marginTop: 8 }}>
                Save this search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Gradient header ───────────────────────────────────── */}
      <GradientHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 500 }}>{greeting}</div>
            <div style={{ color: T.white, fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{meta.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4, flexWrap: "nowrap" }}>
              {userState === "C" && meta.streak > 0 && (
                <>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.amber, whiteSpace: "nowrap" }}>🔥 {meta.streak}-day streak</span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>·</span>
                </>
              )}
              {/* Tappable location (F-03) */}
              <button onClick={() => setShowLocation(true)} style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: 500, whiteSpace: "nowrap" }}>📍 Near {location}</span>
                <Icon n="chev" s={9} c="rgba(255,255,255,0.4)" />
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={onChangeUser} style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8, padding: "5px 9px", cursor: "pointer" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>State {userState}</span>
            </button>
            <button onClick={() => onNav("act")} style={{ position: "relative", width: 38, height: 38, borderRadius: 19, background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon n="bell" s={17} c="white" />
              {unread > 0 && <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: 4, background: T.amber, border: "1.5px solid rgba(255,255,255,0.8)" }} />}
            </button>
            <button onClick={onProfile} style={{ border: "none", cursor: "pointer", padding: 0, background: "none" }}>
              <Avatar init={meta.avatar} size={38} bg="rgba(255,255,255,0.25)" color="white" />
            </button>
          </div>
        </div>

        {/* Search bar — opens overlay on tap */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setShowSearch(true)} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, padding: "10px 14px", cursor: "pointer" }}>
            <Icon n="srch" s={14} c="rgba(255,255,255,0.7)" />
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Find skills, services, or teachers…</span>
          </button>
          {/* Filter button with active badge */}
          <button onClick={() => setShowFilter(true)} style={{ position: "relative", background: filterCount > 0 ? "white" : "rgba(255,255,255,0.18)", border: filterCount > 0 ? "none" : "1px solid rgba(255,255,255,0.25)", borderRadius: 11, padding: "10px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            <Icon n="sliders" s={13} c={filterCount > 0 ? T.p600 : "rgba(255,255,255,0.8)"} />
            <span style={{ fontSize: 9, color: filterCount > 0 ? T.p600 : "rgba(255,255,255,0.8)", fontWeight: 700 }}>Filter</span>
            {filterCount > 0 && (
              <div style={{ position: "absolute", top: -5, right: -5, width: 16, height: 16, borderRadius: 8, background: T.red, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>
                <span style={{ fontSize: 8, fontWeight: 900, color: "white", lineHeight: 1 }}>{filterCount}</span>
              </div>
            )}
          </button>
        </div>
      </GradientHeader>

      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* ── Continue Learning (States B & C) ── */}
        {upcomingLesson && (
          <div style={{ padding: "12px 16px 0" }}>
            <div style={{ background: `linear-gradient(135deg,${T.p700} 0%,${T.p600} 100%)`, borderRadius: 16, padding: "14px 14px 12px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -20, top: -20, width: 80, height: 80, borderRadius: 40, background: "rgba(255,255,255,0.07)" }} />
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>Continue Learning</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Avatar init={upcomingLesson.avatar} size={36} bg="rgba(255,255,255,0.2)" color="white" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "white", lineHeight: 1.2 }}>{upcomingLesson.teacher}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>{upcomingLesson.skill} · {upcomingLesson.date} at {upcomingLesson.time}</div>
                </div>
                <div style={{ background: T.amber, borderRadius: 8, padding: "4px 9px", flexShrink: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: "white" }}>{upcomingLesson.countdown}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => onNav("msgs")} style={{ flex: 1, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 9, padding: "7px 0", fontSize: 11, fontWeight: 700, color: "white", cursor: "pointer" }}>Message</button>
                <button onClick={() => onNav("bkgs")} style={{ flex: 1, background: "white", border: "none", borderRadius: 9, padding: "7px 0", fontSize: 11, fontWeight: 700, color: T.p700, cursor: "pointer" }}>View Booking</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Book Again (States B & C) ── */}
        {recentBookings.length > 0 && (
          <div style={{ padding: "12px 16px 0" }}>
            <Card style={{ padding: "13px 14px", background: T.p50, border: `1px solid ${T.p200}` }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: T.p800, marginBottom: 10 }}>Book Again</div>
              <div style={{ display: "flex", gap: 10 }}>
                {recentBookings.slice(0, 2).map((b) => {
                  const t = TEACHERS.find((t) => t.name === b.teacher);
                  return (
                    <button key={b.id} onClick={() => t && onQuickBook(t)} style={{ flex: 1, background: "white", border: `1px solid ${T.border}`, borderRadius: 11, padding: "10px", cursor: "pointer", textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <Avatar init={b.avatar} size={28} bg={T.p600} color="white" />
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: T.gray900 }}>{b.teacher.split(" ")[0]}</div>
                          <div style={{ fontSize: 9, color: T.gray400 }}>{b.skill}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon n="repeat" s={10} c={T.p600} />
                        <span style={{ fontSize: 9, fontWeight: 700, color: T.p600 }}>Book Again</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        <div style={{ padding: "12px 16px 0" }}>

          {/* ── Intent Navigation row ── */}
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {INTENT_OPTIONS.map((opt) => (
              <button key={opt.id} onClick={() => changeIntent(opt.id)} style={{ flex: 1, padding: "7px 4px", borderRadius: 10, border: `1.5px solid ${intent === opt.id ? T.p600 : T.border}`, background: intent === opt.id ? T.p600 : "white", color: intent === opt.id ? "white" : T.gray600, fontSize: 10, fontWeight: 700, cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {opt.label}
              </button>
            ))}
          </div>

          {/* ── L1 Category Chips with count badges + More ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: subcats.length > 0 ? 8 : 12, overflowX: showMoreChips ? "visible" : "auto", flexWrap: showMoreChips ? "wrap" : "nowrap" }}>
            {(showMoreChips ? chips : chipsVisible).map((c) => (
              <button key={c.label} onClick={() => changeCat(c.label)} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 4, padding: c.label === "All" ? "6px 13px" : "6px 10px", borderRadius: 20, border: `1.5px solid ${cat === c.label ? T.p600 : T.border}`, background: cat === c.label ? T.p600 : "white", cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: cat === c.label ? "white" : T.gray700 }}>{c.label}</span>
                {c.count && <span style={{ fontSize: 9, fontWeight: 700, color: cat === c.label ? "rgba(255,255,255,0.75)" : T.gray400 }}>{c.count}</span>}
              </button>
            ))}
            {!showMoreChips && chipsHidden.length > 0 && (
              <button onClick={() => setShowMoreChips(true)} style={{ flexShrink: 0, padding: "6px 10px", borderRadius: 20, border: `1.5px solid ${T.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.gray500 }}>+{chipsHidden.length}</span>
                <span style={{ fontSize: 9, color: T.gray400 }}>More</span>
              </button>
            )}
            {showMoreChips && (
              <button onClick={() => setShowMoreChips(false)} style={{ flexShrink: 0, padding: "6px 10px", borderRadius: 20, border: `1.5px solid ${T.border}`, background: T.gray50, cursor: "pointer" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.gray500 }}>Less</span>
              </button>
            )}
          </div>

          {/* ── L2 Subcategory chips (Mode C drill-down) ── */}
          {subcats.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
                <button onClick={() => setSubcat("All")} style={{ flexShrink: 0, padding: "5px 11px", borderRadius: 16, border: `1.5px solid ${subcat === "All" ? T.p400 : T.border}`, background: subcat === "All" ? T.p100 : "white", cursor: "pointer" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: subcat === "All" ? T.p700 : T.gray500 }}>All {cat}</span>
                </button>
                {subcats.map((s) => (
                  <button key={s} onClick={() => setSubcat(s)} style={{ flexShrink: 0, padding: "5px 11px", borderRadius: 16, border: `1.5px solid ${subcat === s ? T.p600 : T.border}`, background: subcat === s ? T.p600 : "white", cursor: "pointer" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: subcat === s ? "white" : T.gray600 }}>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── AI Suggestions banner (State A only — F-14) ── */}
          {userState === "A" && (
            <div style={{ background: `linear-gradient(135deg,#1E3A5F 0%,#2D5A8E 100%)`, borderRadius: 14, padding: "14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 18 }}>✨</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "white", marginBottom: 2 }}>Not sure what you need?</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>Tell us your goal and we'll find the right teacher.</div>
              </div>
              <button onClick={() => onNav("disc")} style={{ background: "white", border: "none", borderRadius: 9, padding: "7px 12px", fontSize: 10, fontWeight: 700, color: "#1E3A5F", cursor: "pointer", flexShrink: 0 }}>Try it</button>
            </div>
          )}

          {/* ── Popular Near You tiles (intent-aware — F-25) ── */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>Popular Near You</div>
              <span style={{ fontSize: 10, color: T.gray400 }}>{location}</span>
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
              {popularSkills.map((p) => (
                <button key={p.skill} onClick={() => setCat(p.skill)} style={{ flexShrink: 0, background: cat === p.skill ? T.p600 : "white", border: `1px solid ${cat === p.skill ? T.p600 : T.border}`, borderRadius: 12, padding: "8px 12px", cursor: "pointer", textAlign: "center", minWidth: 72, transition: "all .15s" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: cat === p.skill ? "white" : T.gray900, marginBottom: 3 }}>{p.skill}</div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: cat === p.skill ? "rgba(255,255,255,0.75)" : T.p600 }}>{p.count} nearby</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Saved Teachers (States B & C) ── */}
          {savedTeachers.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>Saved Teachers</div>
                <button style={{ fontSize: 11, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>See all</button>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {savedTeachers.map((t) => (
                  <button key={t.id} onClick={() => onQuickPeek(t)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
                    <div style={{ position: "relative" }}>
                      <Avatar init={t.avatar} size={44} bg={T.p600} color="white" />
                      <div style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, background: T.red, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid white" }}>
                        <Icon n="heart" s={8} c="white" fill="white" />
                      </div>
                    </div>
                    <span style={{ fontSize: 9, color: T.gray600, fontWeight: 600 }}>{t.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Compact Map link ── */}
          <button onClick={() => onNav("disc")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: "white", border: `1px solid ${T.border}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", marginBottom: 14, textAlign: "left" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon n="map" s={15} c={T.p600} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>Explore teachers on the map</div>
              <div style={{ fontSize: 10, color: T.gray400 }}>See who's available near {location}</div>
            </div>
            <div style={{ marginLeft: "auto" }}><Icon n="chev" s={13} c={T.gray300} /></div>
          </button>

          {/* ── Top Rated / Recommended ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>{userState === "A" ? "Top Rated Near You" : "Recommended For You"}</div>
            <button onClick={() => onNav("disc")} style={{ fontSize: 11, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>See all</button>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", marginBottom: 16, paddingBottom: 2 }}>
            {loading ? [1, 2].map((i) => (
              <div key={i} style={{ width: 158, flexShrink: 0, borderRadius: 14, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                <div style={{ height: 68, background: T.gray100, animation: "pulse 1.4s ease-in-out infinite" }} />
                <div style={{ padding: "10px 11px 12px" }}>
                  <Skeleton h={11} w="70%" style={{ marginBottom: 6 }} />
                  <Skeleton h={9}  w="50%" style={{ marginBottom: 6 }} />
                  <Skeleton h={10} w="80%" />
                </div>
              </div>
            )) : featured.map((t) => (
              <Card key={t.id} onClick={() => onQuickPeek(t)} style={{ width: 158, flexShrink: 0, padding: 0, overflow: "hidden", animation: "fadeIn .3s ease" }}>
                <div style={{ height: 68, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <Avatar init={t.avatar} size={42} bg="rgba(255,255,255,0.25)" color="white" />
                  <div style={{ position: "absolute", top: 7, right: 7, background: T.amber, borderRadius: 6, padding: "2px 6px", fontSize: 8, fontWeight: 700, color: "white" }}>TOP</div>
                  <button onClick={(e) => { e.stopPropagation(); onToggleSave(t.id); }} style={{ position: "absolute", top: 7, left: 7, width: 22, height: 22, borderRadius: 11, background: "rgba(0,0,0,0.25)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon n="heart" s={11} c={saved.has(t.id) ? "#f87171" : "rgba(255,255,255,0.9)"} fill={saved.has(t.id) ? "#f87171" : "none"} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onCompare?.(t); }} style={{ position: "absolute", bottom: 7, right: 7, background: compareList.includes(t.id) ? T.p600 : "rgba(255,255,255,0.9)", border: "none", borderRadius: 8, padding: "3px 6px", fontSize: 8, fontWeight: 900, color: compareList.includes(t.id) ? "white" : T.p700 }}>
                    Compare
                  </button>
                </div>
                <div style={{ padding: "10px 11px 12px" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: T.gray900, lineHeight: 1.2 }}>{t.name}</div>
                  <div style={{ fontSize: 9, color: T.gray400, margin: "2px 0 5px" }}>{t.skill}</div>
                  <Stars rating={t.rating} size={10} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                    {/* F-19: "from RM XX" pricing */}
                    <div style={{ fontSize: 11, fontWeight: 900, color: T.p600 }}>{getPriceLabel(t)}</div>
                    <div style={{ fontSize: 9, color: T.gray400 }}>{t.dist} km</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* ── Near You — sort + availability + response time ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>Near You</div>
            <button onClick={() => onNav("disc")} style={{ fontSize: 11, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>Map view</button>
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>
            {[["distance", "Nearest"], ["rating", "Top Rated"], ["new", "Newest"]].map(([k, l]) => (
              <Pill key={k} text={l} active={sort === k} onClick={() => setSort(k)} small />
            ))}
          </div>
          {loading ? [1, 2, 3].map((i) => <SkeletonCard key={i} />) : nearby.map((t) => {
            const availLabel  = getAvailLabel(t);
            const onlineOnly  = isOnlineOnly(t);
            return (
              <Card key={t.id} onClick={() => onQuickPeek(t)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", marginBottom: 8, animation: "fadeIn .3s ease" }}>
                <div style={{ position: "relative" }}>
                  <Avatar init={t.avatar} size={42} bg={T.p600} color="white" />
                  <button onClick={(e) => { e.stopPropagation(); onToggleSave(t.id); }} style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: 9, background: saved.has(t.id) ? T.red : T.card, border: `1px solid ${saved.has(t.id) ? T.red : T.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon n="heart" s={9} c={saved.has(t.id) ? "white" : T.gray300} fill={saved.has(t.id) ? "white" : "none"} />
                  </button>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>{t.name}</div>
                    {t.verified && <Icon n="chk" s={10} c={T.blue} sw={2.5} />}
                  </div>
                  <div style={{ fontSize: 10, color: T.gray500, marginBottom: 4 }}>{t.skill}</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {t.mode.map((m) => <span key={m} style={{ fontSize: 8, background: T.p100, color: T.p700, borderRadius: 5, padding: "1px 6px", fontWeight: 600 }}>{m}</span>)}
                    {availLabel && userState !== "A" && (
                      <span style={{ fontSize: 8, background: "#F0FFF4", color: "#16A34A", borderRadius: 5, padding: "1px 6px", fontWeight: 600 }}>{availLabel}</span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  {/* F-19: from RM pricing */}
                  <div style={{ fontSize: 12, fontWeight: 900, color: T.p600 }}>{getPriceLabel(t)}</div>
                  {/* F-20: response time for online-only, distance for physical */}
                  <div style={{ fontSize: 9, color: T.gray400 }}>
                    {onlineOnly ? `${t.avgResponse} reply` : `${t.dist} km`}
                  </div>
                  <div style={{ marginTop: 2 }}><Stars rating={t.rating} size={9} /></div>
                  <button onClick={(e) => { e.stopPropagation(); onCompare?.(t); }} style={{ marginTop: 5, background: compareList.includes(t.id) ? T.p600 : T.p100, border: "none", borderRadius: 8, padding: "4px 7px", fontSize: 8, fontWeight: 900, color: compareList.includes(t.id) ? "white" : T.p700 }}>
                    Compare
                  </button>
                </div>
              </Card>
            );
          })}

          {/* ── Teacher Posts Feed / Nudge card ── */}
          <div style={{ marginTop: 4, marginBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>Latest from Teachers</div>
              {userState === "C" && <button style={{ fontSize: 11, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>See all</button>}
            </div>
            {userState === "C" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TEACHER_POSTS.map((post) => (
                  <Card key={post.id} style={{ padding: "12px 13px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
                      <Avatar init={post.avatar} size={30} bg={T.p600} color="white" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{post.name}</span>
                          <span style={{ fontSize: 8, fontWeight: 700, color: post.tagColor, background: post.tagBg, borderRadius: 5, padding: "2px 6px" }}>{post.tag}</span>
                        </div>
                        <div style={{ fontSize: 9, color: T.gray400 }}>{post.skill} · {post.time}</div>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: T.gray700, lineHeight: 1.5 }}>{post.text}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <div style={{ background: T.p50, border: `1.5px dashed ${T.p200}`, borderRadius: 14, padding: "16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon n="usr" s={17} c={T.p600} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.p800, marginBottom: 2 }}>Follow teachers to see their posts</div>
                  <div style={{ fontSize: 10, color: T.gray500, lineHeight: 1.4 }}>Tips, announcements, and updates from your teachers appear here.</div>
                </div>
                <button onClick={() => onNav("disc")} style={{ background: T.p600, border: "none", borderRadius: 9, padding: "7px 12px", fontSize: 10, fontWeight: 700, color: "white", cursor: "pointer", flexShrink: 0 }}>Discover</button>
              </div>
            )}
          </div>

          <div style={{ height: 20 }} />
        </div>
      </div>

      <BottomNav active="home" onNav={onNav} unread={unread} />
    </div>
  );
};

export default HomeScreen;
