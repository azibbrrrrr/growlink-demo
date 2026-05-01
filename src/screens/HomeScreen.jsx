import { useState, useEffect } from "react";
import { T, GRAD } from "../constants/tokens";
import { TEACHERS, BOOKINGS, MSGS } from "../constants/data";
import Icon from "../components/icons/Icon";
import {
  Avatar, Card, Pill, Stars,
  GradientHeader, SkeletonCard, Skeleton,
} from "../components/primitives";
import BottomNav from "../components/navigation/BottomNav";

// ── Per-state mock overrides ────────────────────────────────────

const STATE_META = {
  A: { name: "Zara Ahmad", avatar: "ZA", streak: 0, bookingCount: 0 },
  B: { name: "Hafiz Roslan", avatar: "HR", streak: 0, bookingCount: 3 },
  C: { name: "Ahmad Rizky", avatar: "AR", streak: 5, bookingCount: 6 },
};

// State A has no bookings; State B has 1 upcoming confirmed booking
const BOOKINGS_BY_STATE = {
  A: [],
  B: [BOOKINGS[0]],
  C: BOOKINGS,
};

// State A/B saved teachers sets (C uses real saved prop)
const SAVED_BY_STATE = {
  A: new Set(),
  B: new Set([1]),
  C: null, // uses live saved prop
};

const CHIPS_BY_INTENT = {
  learn: ["All", "Music", "Academic", "Language", "Sports", "Creative"],
  help:  ["All", "Cleaning", "Repairs", "Pet Care", "Tutoring", "Grooming"],
  work:  ["All", "Freelance", "Part-time", "Gigs", "Tutoring", "Events"],
};

const POPULAR_SKILLS = [
  { skill: "Piano",    count: 24 },
  { skill: "Guitar",   count: 18 },
  { skill: "Math",     count: 12 },
  { skill: "Mandarin", count: 9  },
  { skill: "Coding",   count: 7  },
  { skill: "Art",      count: 5  },
];

const INTENT_OPTIONS = [
  { id: "learn", label: "Learn / Create" },
  { id: "help",  label: "Get Help"       },
  { id: "work",  label: "Work / Earn"    },
];

// Teacher posts — shown in State C (follows 3 teachers)
const TEACHER_POSTS = [
  {
    id: 1, teacherId: 1, avatar: "SL", name: "Sarah Lim", skill: "Piano",
    time: "2h ago",
    text: "Practising slowly is the fastest way to learn. Speed comes after accuracy — not before. 🎹",
    tag: "Tip",
    tagColor: T.p600, tagBg: T.p100,
  },
  {
    id: 2, teacherId: 2, avatar: "DT", name: "David Tan", skill: "Guitar",
    time: "Yesterday",
    text: "New March slots available! Only 2 spots left on Saturday mornings. DM me to lock yours in. 🎸",
    tag: "Announcement",
    tagColor: T.amber, tagBg: T.amberL,
  },
  {
    id: 3, teacherId: 4, avatar: "AI", name: "Ali Imran", skill: "Math",
    time: "2 days ago",
    text: "IGCSE Paper 1 tip: always show your working, even if the answer seems obvious. Examiners award method marks. 📐",
    tag: "Tip",
    tagColor: T.p600, tagBg: T.p100,
  },
];

// ── HomeScreen ──────────────────────────────────────────────────

const HomeScreen = ({ userState = "C", onNav, onProfile, onChangeUser, saved: savedProp, onToggleSave, onQuickPeek, onQuickBook }) => {
  const [cat,     setCat]     = useState("All");
  const [sort,    setSort]    = useState("distance");
  const [intent,  setIntent]  = useState("learn");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, [userState]);

  // Reset cat when intent changes
  const changeIntent = (i) => { setIntent(i); setCat("All"); };

  const meta     = STATE_META[userState];
  const stateBookings = BOOKINGS_BY_STATE[userState];
  const saved    = SAVED_BY_STATE[userState] ?? savedProp;

  const upcomingLesson = stateBookings.find((b) => b.status === "confirmed");
  const recentBookings = stateBookings.filter((b) => b.status !== "cancelled");

  const featured       = TEACHERS.filter((t) => t.top);
  const savedTeachers  = TEACHERS.filter((t) => saved.has(t.id));
  const unread         = MSGS.reduce((s, m) => s + m.unread, 0);

  const chips = CHIPS_BY_INTENT[intent];

  const nearby = TEACHERS.slice().sort((a, b) =>
    sort === "distance" ? a.dist - b.dist :
    sort === "rating"   ? b.rating - a.rating :
    b.id - a.id
  ).filter((t) =>
    cat === "All" ||
    t.skill.toLowerCase().includes(cat.toLowerCase()) ||
    POPULAR_SKILLS.find((p) => p.skill === cat && t.skill.toLowerCase().includes(cat.toLowerCase()))
  );

  const getAvailLabel = (t) => {
    if (!t.slots || t.slots.length === 0) return null;
    const slot = t.slots[0];
    if (slot.includes("3 Mar") || slot.includes("4 Mar")) return "Avail Tomorrow";
    return "This week";
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <GradientHeader>
        {/* Top row: greeting + actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 500 }}>{greeting}</div>
                <div style={{ color: T.white, fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{meta.name}</div>
              </div>
            </div>
            {/* Streak + location row */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4, flexWrap: "nowrap" }}>
              {userState === "C" && meta.streak > 0 && (
                <>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.amber, whiteSpace: "nowrap" }}>🔥 {meta.streak}-day streak</span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>·</span>
                </>
              )}
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 500, whiteSpace: "nowrap" }}>📍 Near Petaling Jaya</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Switch user button */}
            <button
              onClick={onChangeUser}
              style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8, padding: "5px 9px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
              title="Switch user state"
            >
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

        {/* Search bar */}
        <button onClick={() => onNav("disc")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, padding: "10px 14px", cursor: "pointer" }}>
          <Icon n="srch" s={14} c="rgba(255,255,255,0.7)" />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Find skills, services, or teachers…</span>
          <div style={{ marginLeft: "auto", background: "rgba(255,255,255,0.2)", borderRadius: 7, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon n="sliders" s={11} c="rgba(255,255,255,0.8)" />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>Filter</span>
          </div>
        </button>
      </GradientHeader>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* ── Continue Learning (States B & C) ── */}
        {upcomingLesson && (
          <div style={{ padding: "12px 16px 0" }}>
            <div
              style={{
                background: `linear-gradient(135deg, ${T.p700} 0%, ${T.p600} 100%)`,
                borderRadius: 16,
                padding: "14px 14px 12px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* bg circle */}
              <div style={{ position: "absolute", right: -20, top: -20, width: 80, height: 80, borderRadius: 40, background: "rgba(255,255,255,0.07)" }} />
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>Continue Learning</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Avatar init={upcomingLesson.avatar} size={36} bg="rgba(255,255,255,0.2)" color="white" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "white", lineHeight: 1.2 }}>{upcomingLesson.teacher}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>{upcomingLesson.skill} · {upcomingLesson.date} at {upcomingLesson.time}</div>
                </div>
                {/* Countdown badge */}
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
                    <button key={b.id} onClick={() => t && onQuickBook(t)} style={{ flex: 1, background: "white", border: `1px solid ${T.border}`, borderRadius: 11, padding: "10px", cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <Avatar init={b.avatar} size={28} bg={T.p600} color="white" />
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: T.gray900, lineHeight: 1.2 }}>{b.teacher.split(" ")[0]}</div>
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
          {/* ── Intent Navigation row (all states) ── */}
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {INTENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => changeIntent(opt.id)}
                style={{
                  flex: 1,
                  padding: "7px 4px",
                  borderRadius: 10,
                  border: `1.5px solid ${intent === opt.id ? T.p600 : T.border}`,
                  background: intent === opt.id ? T.p600 : "white",
                  color: intent === opt.id ? "white" : T.gray600,
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all .15s",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* ── Context-aware Category Chips ── */}
          <div style={{ display: "flex", gap: 7, marginBottom: 12, overflowX: "auto", paddingBottom: 2 }}>
            {chips.map((c) => <Pill key={c} text={c} active={cat === c} onClick={() => setCat(c)} />)}
          </div>

          {/* ── Popular Near You tiles ── */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>Popular Near You</div>
              <span style={{ fontSize: 10, color: T.gray400 }}>Petaling Jaya</span>
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
              {POPULAR_SKILLS.map((p) => (
                <button
                  key={p.skill}
                  onClick={() => setCat(p.skill)}
                  style={{
                    flexShrink: 0,
                    background: cat === p.skill ? T.p600 : "white",
                    border: `1px solid ${cat === p.skill ? T.p600 : T.border}`,
                    borderRadius: 12,
                    padding: "8px 12px",
                    cursor: "pointer",
                    textAlign: "center",
                    minWidth: 72,
                    transition: "all .15s",
                  }}
                >
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

          {/* ── Compact Map link (replaces hero banner) ── */}
          <button
            onClick={() => onNav("disc")}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: "white", border: `1px solid ${T.border}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", marginBottom: 14, textAlign: "left" }}
          >
            <div style={{ width: 30, height: 30, borderRadius: 8, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon n="map" s={15} c={T.p600} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>Explore teachers on the map</div>
              <div style={{ fontSize: 10, color: T.gray400 }}>See who's available near Petaling Jaya</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Icon n="chev" s={13} c={T.gray300} />
            </div>
          </button>

          {/* ── Top Rated / Recommended ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>
              {userState === "A" ? "Top Rated Near You" : "Recommended For You"}
            </div>
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
                </div>
                <div style={{ padding: "10px 11px 12px" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: T.gray900, lineHeight: 1.2 }}>{t.name}</div>
                  <div style={{ fontSize: 9, color: T.gray400, margin: "2px 0 5px" }}>{t.skill}</div>
                  <Stars rating={t.rating} size={10} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                    <div style={{ fontSize: 12, fontWeight: 900, color: T.p600 }}>RM {t.price}<span style={{ fontSize: 9, fontWeight: 400, color: T.gray400 }}>/hr</span></div>
                    <div style={{ fontSize: 9, color: T.gray400 }}>{t.dist} km</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* ── Near You — with sort + availability ── */}
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
            const availLabel = getAvailLabel(t);
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
                    {/* Availability badge (States B & C) */}
                    {availLabel && userState !== "A" && (
                      <span style={{ fontSize: 8, background: "#F0FFF4", color: "#16A34A", borderRadius: 5, padding: "1px 6px", fontWeight: 600 }}>{availLabel}</span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 900, color: T.p600 }}>RM {t.price}</div>
                  <div style={{ fontSize: 9, color: T.gray400 }}>{t.dist} km</div>
                  <div style={{ marginTop: 2 }}><Stars rating={t.rating} size={9} /></div>
                </div>
              </Card>
            );
          })}
          {/* ── Teacher Posts Feed (State C) / Nudge card (States A & B) ── */}
          <div style={{ marginTop: 4, marginBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>Latest from Teachers</div>
              {userState === "C" && (
                <button style={{ fontSize: 11, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>See all</button>
              )}
            </div>

            {userState === "C" ? (
              /* Real feed — State C follows 3 teachers */
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
              /* Nudge card — States A & B (< 2 followed teachers) */
              <div style={{ background: T.p50, border: `1.5px dashed ${T.p200}`, borderRadius: 14, padding: "16px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon n="usr" s={17} c={T.p600} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.p800, marginBottom: 2 }}>Follow teachers to see their posts</div>
                  <div style={{ fontSize: 10, color: T.gray500, lineHeight: 1.4 }}>Tips, announcements, and updates from your teachers appear here.</div>
                </div>
                <button onClick={() => onNav("disc")} style={{ background: T.p600, border: "none", borderRadius: 9, padding: "7px 12px", fontSize: 10, fontWeight: 700, color: "white", cursor: "pointer", flexShrink: 0 }}>
                  Discover
                </button>
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
