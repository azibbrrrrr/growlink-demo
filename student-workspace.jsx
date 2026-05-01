import { useState, useRef, useEffect } from "react";

/* ================================================================
   GROWLINK · Student Workspace · v2.0
   All UI/UX improvements applied:
   - 5-step → 3-step booking flow
   - Quick Peek half-sheet on teacher tap
   - Quick Book for returning students
   - Saved teachers + Home section
   - Advanced filters in Discover
   - Verification badges
   - Teacher availability slots on profile
   - Contextual booking guidance
   - Calendar view in My Bookings
   - Actionable Activity feed
   - Chat: typing indicator + read receipts
   - Inline profile editing
   - Empty states everywhere
   - Pre-lesson checklist on confirmation
   - Unread badge on nav
   - Trust signals on payment
   - Micro-animations throughout
   - Skeleton loading states
   - Smart sort on Near You
================================================================ */

/* ── TOKENS ──────────────────────────────────────────────────── */
const T = {
    p900: "#0D2B22", p800: "#1A3C34", p700: "#2D5A4A", p600: "#2D6A4F",
    p500: "#3D8B6F", p400: "#52B788", p300: "#74C69D", p200: "#B7E4C7",
    p100: "#D8F3DC", p50: "#F0FDF4",
    amber: "#F59E0B", amberL: "#FEF3C7", amberD: "#D97706",
    red: "#EF4444", redL: "#FEE2E2",
    blue: "#3B82F6", blueL: "#EFF6FF",
    green: "#22C55E", greenL: "#DCFCE7",
    white: "#FFFFFF", surface: "#F5FBF7", card: "#FFFFFF", border: "#E2EDE7",
    gray50: "#F8FAF9", gray100: "#EFF2F0", gray200: "#D9E2DC",
    gray300: "#B0C4BB", gray400: "#7A9E8F", gray500: "#5A7A6B",
    gray600: "#3D5C4E", gray700: "#2D4A3A", gray900: "#0F1F18",
};
const GRAD = `linear-gradient(160deg,${T.p800} 0%,${T.p600} 55%,${T.p500} 100%)`;

/* ── DATA ────────────────────────────────────────────────────── */
const STUDENT = {
    name: "Ahmad Rizky", fullName: "Ahmad Rizky Bin Zulkarnain", avatar: "AR",
    email: "ahmadrizky@email.com", phone: "+60 12-345 6789",
    dob: "14 March 2002", gender: "Male", location: "Petaling Jaya, Selangor",
    memberSince: "January 2026", language: "English",
    bio: "University student passionate about music and continuous learning. Currently taking piano and guitar lessons on weekends.",
    interests: ["Piano", "Guitar", "Mathematics", "Coding"],
    bookings: 6, spent: 890, following: 3,
};

const TEACHERS = [
    {
        id: 1, name: "Sarah Lim Xin Yi", skill: "Piano · Classical", rating: 4.9, reviews: 128, price: 60, dist: 1.2,
        mode: ["Online", "Physical"], avatar: "SL", top: true, verified: true, certified: true, bgCheck: true,
        bio: "Certified ABRSM Grade 8 pianist with 10 years teaching experience. Specializing in classical and contemporary styles for all ages.",
        exp: "10 years", lang: ["English", "Mandarin"], avail: "Mon – Sat", avgResponse: "< 1 hour",
        slots: ["Mon, 3 Mar · 10:00 AM", "Mon, 3 Mar · 2:00 PM", "Tue, 4 Mar · 10:00 AM"],
        x: "45%", y: "28%",
        pkgs: [{ name: "Trial", dur: "1 Session · 1 hr", price: 30, note: "First timers", id: "trial" },
        { name: "Standard", dur: "4 Sessions · 1 hr each", price: 200, note: "Save 10%", id: "std" },
        { name: "Premium", dur: "8 Sessions · 1 hr each", price: 370, note: "Best value", id: "prem" }]
    },
    {
        id: 2, name: "David Tan Wei Kiat", skill: "Guitar · Rock & Jazz", rating: 4.8, reviews: 94, price: 45, dist: 0.8,
        mode: ["Online", "Physical"], avatar: "DT", top: false, verified: true, certified: false, bgCheck: false,
        bio: "Passionate guitarist with experience in rock, jazz, blues and fingerstyle. Tailored lessons for beginners to advanced.",
        exp: "8 years", lang: ["English", "Malay"], avail: "Tue – Sun", avgResponse: "< 2 hours",
        slots: ["Wed, 5 Mar · 4:00 PM", "Thu, 6 Mar · 3:00 PM", "Sat, 8 Mar · 11:00 AM"],
        x: "22%", y: "55%",
        pkgs: [{ name: "Trial", dur: "1 Session · 1 hr", price: 25, note: "First timers", id: "trial" },
        { name: "Standard", dur: "4 Sessions · 1 hr each", price: 160, note: "Save 10%", id: "std" },
        { name: "Premium", dur: "8 Sessions · 1 hr each", price: 300, note: "Best value", id: "prem" }]
    },
    {
        id: 3, name: "Mei Ling Chua", skill: "Mandarin · HSK Prep", rating: 4.7, reviews: 67, price: 50, dist: 2.1,
        mode: ["Online"], avatar: "ML", top: false, verified: true, certified: true, bgCheck: false,
        bio: "Native Mandarin speaker and HSK certified instructor. Conversational and exam prep classes for all ages.",
        exp: "6 years", lang: ["Mandarin", "English", "Malay"], avail: "Mon – Fri", avgResponse: "Same day",
        slots: ["Mon, 3 Mar · 7:00 PM", "Tue, 4 Mar · 7:00 PM", "Thu, 6 Mar · 7:00 PM"],
        x: "68%", y: "60%",
        pkgs: [{ name: "Trial", dur: "1 Session · 1 hr", price: 30, note: "First timers", id: "trial" },
        { name: "Standard", dur: "4 Sessions · 1 hr each", price: 180, note: "Save 10%", id: "std" },
        { name: "Premium", dur: "8 Sessions · 1 hr each", price: 340, note: "Best value", id: "prem" }]
    },
    {
        id: 4, name: "Ali Imran Roslan", skill: "Mathematics · IGCSE", rating: 4.9, reviews: 201, price: 55, dist: 3.4,
        mode: ["Online", "Physical"], avatar: "AI", top: true, verified: true, certified: true, bgCheck: true,
        bio: "Former lecturer turned full-time tutor. Expert in IGCSE, SPM and university math. 95% of students improve by at least 2 grades.",
        exp: "12 years", lang: ["English", "Malay"], avail: "Weekends", avgResponse: "< 1 hour",
        slots: ["Sat, 8 Mar · 9:00 AM", "Sat, 8 Mar · 11:00 AM", "Sun, 9 Mar · 2:00 PM"],
        x: "74%", y: "30%",
        pkgs: [{ name: "Trial", dur: "1 Session · 1 hr", price: 35, note: "First timers", id: "trial" },
        { name: "Standard", dur: "4 Sessions · 1 hr each", price: 200, note: "Save 10%", id: "std" },
        { name: "Premium", dur: "8 Sessions · 1 hr each", price: 380, note: "Best value", id: "prem" }]
    },
    {
        id: 5, name: "Priya Sundaram", skill: "Coding · Python & Web", rating: 4.8, reviews: 53, price: 70, dist: 1.8,
        mode: ["Online"], avatar: "PS", top: false, verified: true, certified: false, bgCheck: false,
        bio: "Software engineer by day, coding coach by passion. Taught 50+ students from zero to building real apps.",
        exp: "5 years", lang: ["English", "Tamil"], avail: "Evenings", avgResponse: "< 3 hours",
        slots: ["Tue, 4 Mar · 8:00 PM", "Thu, 6 Mar · 8:00 PM", "Fri, 7 Mar · 8:00 PM"],
        x: "36%", y: "68%",
        pkgs: [{ name: "Trial", dur: "1 Session · 1 hr", price: 40, note: "First timers", id: "trial" },
        { name: "Standard", dur: "4 Sessions · 1 hr each", price: 250, note: "Save 10%", id: "std" },
        { name: "Premium", dur: "8 Sessions · 1 hr each", price: 480, note: "Best value", id: "prem" }]
    },
];

const BOOKINGS = [
    {
        id: 1, teacher: "Sarah Lim Xin Yi", avatar: "SL", skill: "Piano", pkg: "Standard · 4 Sessions",
        date: "Mon, 3 Mar", time: "10:00 AM", mode: "Physical – Teacher's", status: "confirmed", fee: 200, session: "2/4",
        countdown: "Tomorrow", action: "upcoming"
    },
    {
        id: 2, teacher: "David Tan Wei Kiat", avatar: "DT", skill: "Guitar", pkg: "Trial Lesson",
        date: "Wed, 5 Mar", time: "4:00 PM", mode: "Online", status: "pending", fee: 25, session: "1/1",
        countdown: "3 days", action: "pending"
    },
    {
        id: 3, teacher: "Ali Imran Roslan", avatar: "AI", skill: "Mathematics", pkg: "Premium · 8 Sessions",
        date: "Sat, 1 Mar", time: "11:00 AM", mode: "Physical – Teacher's", status: "completed", fee: 380, session: "8/8",
        countdown: null, action: "review"
    },
];

const ACTIVITY = [
    { id: 1, type: "booking", text: "Booking confirmed — Sarah Lim for Piano on Mon, 3 Mar at 10:00 AM", time: "Just now", read: false, bookingId: 1 },
    { id: 2, type: "message", text: "David Tan: 'Looking forward to our trial session on Wednesday!'", time: "1h ago", read: false, teacherId: 2 },
    { id: 3, type: "review", text: "How was your class with Ali Imran? Leave a review to help others.", time: "2h ago", read: false, bookingId: 3 },
    { id: 4, type: "payment", text: "Payment of RM 200 confirmed for Sarah Lim · Piano Standard", time: "Yesterday", read: true, bookingId: 1 },
    { id: 5, type: "reminder", text: "Reminder: Piano class with Sarah Lim tomorrow at 10:00 AM", time: "Yesterday", read: true, bookingId: 1 },
    { id: 6, type: "milestone", text: "You completed your first lesson. Keep it up!", time: "3 days ago", read: true },
];

const MSGS = [
    { id: 1, name: "Sarah Lim Xin Yi", avatar: "SL", last: "See you Monday! Please bring your music sheets.", time: "2h ago", unread: 1, online: true },
    { id: 2, name: "David Tan Wei Kiat", avatar: "DT", last: "Looking forward to our trial session!", time: "Yesterday", unread: 0, online: false },
    { id: 3, name: "Ali Imran Roslan", avatar: "AI", last: "Great work on the last session, Ahmad!", time: "3 days ago", unread: 0, online: false },
];

const CHAT_HISTORY = [
    { from: "them", text: "Hi Ahmad! Confirming our Monday session at 10 AM at my place in Taman Desa.", time: "10:02 AM", read: true },
    { from: "me", text: "Hi Ms Sarah! Confirmed. Should I bring anything?", time: "10:05 AM", read: true },
    { from: "them", text: "Please bring your music sheets for the Chopin piece. We will also work on sight-reading.", time: "10:07 AM", read: true },
    { from: "me", text: "Perfect, I have been practising! See you Monday.", time: "10:09 AM", read: true },
    { from: "them", text: "See you Monday! Please bring your music sheets.", time: "10:10 AM", read: true },
];

const CATEGORIES = ["All", "Music", "Language", "Academic", "Coding", "Sports", "Arts"];

const ACT_CFG = {
    booking: { label: "Booking", color: T.p600, bg: T.p100 },
    message: { label: "Message", color: T.blue, bg: T.blueL },
    review: { label: "Review", color: T.amber, bg: T.amberL },
    payment: { label: "Payment", color: T.p500, bg: T.p50 },
    reminder: { label: "Reminder", color: T.gray500, bg: T.gray100 },
    milestone: { label: "Milestone", color: T.green, bg: T.greenL },
};

/* ── ICONS ───────────────────────────────────────────────────── */
const Ic = ({ n, s = 20, c = "currentColor", sw = 2, fill = "none" }) => {
    const paths = {
        home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></>,
        map: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
        book: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
        act: <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />,
        msg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
        usr: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
        back: <polyline points="15,18 9,12 15,6" />,
        bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
        star: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />,
        srch: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
        filt: <><line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" /></>,
        chk: <polyline points="20,6 9,17 4,12" />,
        x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
        send: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22,2 15,22 11,13 2,9 22,2" /></>,
        list: <><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></>,
        heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
        cal: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
        clk: <><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></>,
        card: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></>,
        lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
        chev: <polyline points="9,18 15,12 9,6" />,
        more: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>,
        tick: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" /></>,
        edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
        globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
        shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
        phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
        mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
        pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
        log: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
        help: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
        award: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></>,
        plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
        sliders: <><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></>,
        repeat: <><polyline points="17,1 21,5 17,9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7,23 3,19 7,15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></>,
        video: <><polygon points="23,7 16,12 23,17 23,7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></>,
        save: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
        check2: <circle cx="12" cy="12" r="10" />,
    };
    return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
            {paths[n]}
        </svg>
    );
};

/* ── PRIMITIVES ──────────────────────────────────────────────── */
const Av = ({ init, size = 36, bg = T.p600, color = "white", online = false }) => (
    <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ width: size, height: size, borderRadius: size / 2, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.33, fontWeight: 800, color, letterSpacing: "-0.02em" }}>{init}</div>
        {online && <div style={{ position: "absolute", bottom: 1, right: 1, width: 9, height: 9, borderRadius: 5, background: T.green, border: "2px solid white" }} />}
    </div>
);

const Stars = ({ rating, size = 11 }) => (
    <span style={{ fontSize: size, color: T.amber }}>
        {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
        <span style={{ color: T.gray400, marginLeft: 3, fontWeight: 500 }}>{rating}</span>
    </span>
);

const PBar = ({ v, max = 100, h = 5, color = T.p500, bg = T.p100 }) => (
    <div style={{ height: h, background: bg, borderRadius: h / 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(v / max) * 100}%`, background: color, borderRadius: h / 2, transition: "width .5s ease" }} />
    </div>
);

const StatusPill = ({ status }) => {
    const m = { confirmed: { bg: "#D1FAE5", c: "#065F46", l: "Confirmed" }, pending: { bg: T.amberL, c: "#92400E", l: "Pending" }, completed: { bg: T.blueL, c: "#0369A1", l: "Completed" }, cancelled: { bg: T.redL, c: "#991B1B", l: "Cancelled" } };
    const s = m[status] || m.confirmed;
    return <span style={{ background: s.bg, color: s.c, borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 700 }}>{s.l}</span>;
};

const Pill = ({ text, active, onClick, small = false }) => (
    <button onClick={onClick} style={{ padding: small ? "4px 10px" : "5px 13px", borderRadius: 20, border: active ? "none" : `1px solid ${T.border}`, cursor: "pointer", flexShrink: 0, background: active ? T.p600 : T.surface, color: active ? "white" : T.gray500, fontSize: small ? 9 : 10, fontWeight: active ? 700 : 500, transition: "all .15s" }}>{text}</button>
);

const Card = ({ children, style = {}, onClick }) => (
    <div onClick={onClick} style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", cursor: onClick ? "pointer" : "default", ...style }}>{children}</div>
);

const BackBtn = ({ onBack }) => (
    <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ic n="back" s={17} c="white" />
    </button>
);

const GradHeader = ({ children, pad = "36px 18px 18px" }) => (
    <div style={{ background: GRAD, padding: pad, flexShrink: 0 }}>{children}</div>
);

const Divider = ({ mx = 16 }) => <div style={{ height: 1, background: T.border, margin: `0 ${mx}px` }} />;

const EmptyState = ({ icon, title, sub, cta, onCta }) => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Ic n={icon} s={28} c={T.p400} />
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: T.gray900, marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 12, color: T.gray400, lineHeight: 1.6, marginBottom: 20 }}>{sub}</div>
        {cta && <button onClick={onCta} style={{ background: GRAD, border: "none", borderRadius: 12, padding: "10px 24px", fontSize: 12, fontWeight: 800, color: "white", cursor: "pointer", boxShadow: `0 4px 14px ${T.p600}40` }}>{cta}</button>}
    </div>
);

const VerifiedBadge = ({ type, size = "sm" }) => {
    const cfg = {
        verified: { label: "Verified ID", bg: "#EFF6FF", c: "#1D4ED8" },
        certified: { label: "Certified", bg: T.greenL, c: "#166534" },
        bgCheck: { label: "Background Check", bg: T.amberL, c: "#92400E" },
        top: { label: "Top Rated", bg: T.p100, c: T.p800 },
    };
    const s = cfg[type] || cfg.verified;
    return (
        <span style={{ background: s.bg, color: s.c, borderRadius: 6, padding: "2px 7px", fontSize: 8, fontWeight: 700, letterSpacing: "0.02em", display: "inline-flex", alignItems: "center", gap: 3 }}>
            <Ic n="chk" s={8} c={s.c} sw={3} />{s.label}
        </span>
    );
};

const Skel = ({ w = "100%", h = 14, r = 6, style = {} }) => (
    <div style={{ width: w, height: h, borderRadius: r, background: T.gray100, animation: "pulse 1.4s ease-in-out infinite", ...style }} />
);

const SkeletonCard = () => (
    <Card style={{ padding: "13px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, borderRadius: 21, background: T.gray100, animation: "pulse 1.4s ease-in-out infinite", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
                <Skel h={12} w="65%" style={{ marginBottom: 6 }} />
                <Skel h={10} w="45%" />
            </div>
            <div style={{ textAlign: "right" }}>
                <Skel h={14} w={50} style={{ marginBottom: 5 }} />
                <Skel h={9} w={36} />
            </div>
        </div>
    </Card>
);

/* ── BOTTOM NAV ──────────────────────────────────────────────── */
const NAV = [
    { id: "home", icon: "home", label: "Home" },
    { id: "disc", icon: "map", label: "Discover" },
    { id: "bkgs", icon: "book", label: "Bookings" },
    { id: "act", icon: "act", label: "Activity" },
    { id: "msgs", icon: "msg", label: "Messages" },
];

const BotNav = ({ active, onNav, unread = 0 }) => (
    <div style={{ display: "flex", background: T.white, borderTop: `1px solid ${T.border}`, boxShadow: "0 -4px 24px rgba(0,0,0,0.07)", flexShrink: 0, paddingBottom: 4 }}>
        {NAV.map(it => (
            <button key={it.id} onClick={() => onNav(it.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 0 4px", background: "none", border: "none", cursor: "pointer", color: active === it.id ? T.p600 : T.gray400, transition: "color .15s", position: "relative" }}>
                <div style={{ width: 40, height: 26, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: active === it.id ? T.p100 : "transparent", transition: "background .15s", position: "relative" }}>
                    <Ic n={it.icon} s={18} c={active === it.id ? T.p600 : T.gray400} />
                    {it.id === "msgs" && unread > 0 && (
                        <div style={{ position: "absolute", top: -2, right: -2, minWidth: 16, height: 16, borderRadius: 8, background: T.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "white", border: "1.5px solid white", padding: "0 3px", animation: "popIn .3s cubic-bezier(0.34,1.56,0.64,1)" }}>
                            {unread}
                        </div>
                    )}
                </div>
                <span style={{ fontSize: 9, fontWeight: active === it.id ? 700 : 400 }}>{it.label}</span>
            </button>
        ))}
    </div>
);

/* ── QUICK PEEK SHEET ────────────────────────────────────────── */
const QuickPeekSheet = ({ teacher: t, saved, onToggleSave, onClose, onBook, onFullProfile }) => {
    const [show, setShow] = useState(false);
    useEffect(() => { setTimeout(() => setShow(true), 20); }, []);
    const close = () => { setShow(false); setTimeout(onClose, 280); };
    const isSaved = saved.has(t.id);

    return (
        <div style={{ position: "absolute", inset: 0, zIndex: 300 }}>
            <div onClick={close} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", opacity: show ? 1 : 0, transition: "opacity .28s" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: T.card, borderRadius: "22px 22px 0 0", padding: "0 18px 20px", boxShadow: "0 -12px 40px rgba(0,0,0,0.15)", transform: show ? "translateY(0)" : "translateY(100%)", transition: "transform .28s cubic-bezier(0.34,1.1,0.64,1)" }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: T.border, margin: "10px auto 16px" }} />

                {/* Teacher hero row */}
                <div style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ position: "relative" }}>
                        <Av init={t.avatar} size={54} bg={T.p600} color="white" />
                        {t.top && <div style={{ position: "absolute", bottom: -2, right: -2, background: T.amber, borderRadius: 6, padding: "1px 5px", fontSize: 7, fontWeight: 700, color: "white" }}>TOP</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 900, color: T.gray900, letterSpacing: "-0.02em" }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: T.gray500, marginBottom: 5 }}>{t.skill}</div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                            {t.verified && <VerifiedBadge type="verified" />}
                            {t.certified && <VerifiedBadge type="certified" />}
                        </div>
                    </div>
                    <button onClick={() => onToggleSave(t.id)} style={{ width: 36, height: 36, borderRadius: 18, background: isSaved ? T.redL : T.gray50, border: `1px solid ${isSaved ? T.red + "40" : T.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Ic n="heart" s={16} c={isSaved ? T.red : T.gray400} fill={isSaved ? T.red : "none"} />
                    </button>
                </div>

                {/* Stats strip */}
                <div style={{ display: "flex", background: T.surface, borderRadius: 12, padding: "10px 0", marginBottom: 14, border: `1px solid ${T.border}` }}>
                    {[{ v: `★ ${t.rating}`, l: `${t.reviews} reviews` }, { v: `RM ${t.price}/hr`, l: "Starting price" }, { v: `${t.dist} km`, l: "Distance" }].map((s, i) => (
                        <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>{s.v}</div>
                            <div style={{ fontSize: 9, color: T.gray400, marginTop: 1 }}>{s.l}</div>
                        </div>
                    ))}
                </div>

                {/* Next available */}
                {t.slots?.length > 0 && (
                    <div style={{ background: T.p50, borderRadius: 12, padding: "10px 13px", marginBottom: 14, border: `1px solid ${T.p200}` }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: T.p700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>Next Available Slots</div>
                        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                            {t.slots.slice(0, 3).map(sl => (
                                <button key={sl} onClick={() => { close(); setTimeout(() => onBook(t, t.pkgs[1]), 320); }} style={{ background: "white", border: `1px solid ${T.p300}`, borderRadius: 8, padding: "4px 9px", fontSize: 9, fontWeight: 600, color: T.p700, cursor: "pointer" }}>{sl}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mode chips */}
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                    {t.mode.map(m => <span key={m} style={{ background: T.p100, color: T.p700, borderRadius: 7, padding: "3px 9px", fontSize: 9, fontWeight: 600 }}>{m}</span>)}
                    <span style={{ background: T.gray100, color: T.gray500, borderRadius: 7, padding: "3px 9px", fontSize: 9 }}>Responds {t.avgResponse}</span>
                </div>

                {/* CTAs */}
                <button onClick={() => { close(); setTimeout(() => onBook(t, t.pkgs[1]), 320); }} style={{ width: "100%", background: GRAD, border: "none", borderRadius: 13, padding: "12px", fontSize: 13, fontWeight: 800, color: "white", cursor: "pointer", marginBottom: 8, boxShadow: `0 4px 14px ${T.p600}40` }}>
                    Book Now
                </button>
                <button onClick={() => { close(); setTimeout(() => onFullProfile(t), 320); }} style={{ width: "100%", background: "none", border: `1.5px solid ${T.border}`, borderRadius: 13, padding: "11px", fontSize: 12, fontWeight: 700, color: T.p700, cursor: "pointer" }}>
                    View Full Profile
                </button>
            </div>
        </div>
    );
};

/* ── HOME SCREEN ─────────────────────────────────────────────── */
const HomeScreen = ({ onNav, onTeacher, onProfile, saved, onToggleSave, onQuickPeek, onQuickBook }) => {
    const [cat, setCat] = useState("All");
    const [sort, setSort] = useState("distance");
    const [loading, setLoading] = useState(true);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t); }, []);

    const featured = TEACHERS.filter(t => t.top);
    const savedTeachers = TEACHERS.filter(t => saved.has(t.id));
    const nearby = TEACHERS.slice().sort((a, b) =>
        sort === "distance" ? a.dist - b.dist :
            sort === "rating" ? b.rating - a.rating :
                sort === "new" ? b.id - a.id : a.dist - b.dist
    );
    const unread = MSGS.reduce((s, m) => s + m.unread, 0);
    const hasRecentTeacher = BOOKINGS.find(b => b.status !== "cancelled");

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <GradHeader>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 500 }}>Good morning</div>
                        <div style={{ color: T.white, fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{STUDENT.name}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button onClick={() => onNav("act")} style={{ position: "relative", width: 38, height: 38, borderRadius: 19, background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Ic n="bell" s={17} c="white" />
                            {unread > 0 && <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: 4, background: T.amber, border: "1.5px solid rgba(255,255,255,0.8)" }} />}
                        </button>
                        <button onClick={onProfile} style={{ border: "none", cursor: "pointer", padding: 0, background: "none" }}>
                            <Av init="AR" size={38} bg="rgba(255,255,255,0.25)" color="white" />
                        </button>
                    </div>
                </div>
                <button onClick={() => onNav("disc")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, padding: "10px 14px", cursor: "pointer" }}>
                    <Ic n="srch" s={14} c="rgba(255,255,255,0.7)" />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Find a teacher or skill near you…</span>
                    <div style={{ marginLeft: "auto", background: "rgba(255,255,255,0.2)", borderRadius: 7, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
                        <Ic n="sliders" s={11} c="rgba(255,255,255,0.8)" />
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>Filter</span>
                    </div>
                </button>
            </GradHeader>

            <div style={{ flex: 1, overflowY: "auto" }}>
                {/* Categories */}
                <div style={{ display: "flex", gap: 7, padding: "12px 16px 8px", overflowX: "auto" }}>
                    {CATEGORIES.map(c => <Pill key={c} text={c} active={cat === c} onClick={() => setCat(c)} />)}
                </div>

                <div style={{ padding: "0 16px" }}>
                    {/* Quick Book for returning students */}
                    {hasRecentTeacher && (
                        <Card style={{ padding: "13px 14px", marginBottom: 12, background: T.p50, border: `1px solid ${T.p200}` }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: T.p800, marginBottom: 10 }}>Book Again</div>
                            <div style={{ display: "flex", gap: 10 }}>
                                {BOOKINGS.filter(b => b.status !== "cancelled").slice(0, 2).map(b => {
                                    const t = TEACHERS.find(t => t.name === b.teacher);
                                    return (
                                        <button key={b.id} onClick={() => t && onQuickBook(t)} style={{ flex: 1, background: "white", border: `1px solid ${T.border}`, borderRadius: 11, padding: "10px", cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                                <Av init={b.avatar} size={28} bg={T.p600} color="white" />
                                                <div>
                                                    <div style={{ fontSize: 10, fontWeight: 700, color: T.gray900, lineHeight: 1.2 }}>{b.teacher.split(" ")[0]}</div>
                                                    <div style={{ fontSize: 9, color: T.gray400 }}>{b.skill}</div>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                <Ic n="repeat" s={10} c={T.p600} />
                                                <span style={{ fontSize: 9, fontWeight: 700, color: T.p600 }}>Book Again</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </Card>
                    )}

                    {/* Saved teachers */}
                    {savedTeachers.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: T.gray900 }}>Saved Teachers</div>
                                <button style={{ fontSize: 11, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>See all</button>
                            </div>
                            <div style={{ display: "flex", gap: 10 }}>
                                {savedTeachers.map(t => (
                                    <button key={t.id} onClick={() => onQuickPeek(t)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
                                        <div style={{ position: "relative" }}>
                                            <Av init={t.avatar} size={44} bg={T.p600} color="white" />
                                            <div style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, background: T.red, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid white" }}>
                                                <Ic n="heart" s={8} c="white" fill="white" />
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 9, color: T.gray600, fontWeight: 600 }}>{t.name.split(" ")[0]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hero banner */}
                    <div style={{ background: GRAD, borderRadius: 16, padding: "16px 18px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", right: -16, top: -16, width: 90, height: 90, borderRadius: 45, background: "rgba(255,255,255,0.06)" }} />
                        <div style={{ position: "absolute", right: 20, bottom: -20, width: 60, height: 60, borderRadius: 30, background: "rgba(255,255,255,0.04)" }} />
                        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.55)", marginBottom: 5, letterSpacing: "0.06em", textTransform: "uppercase" }}>Featured</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: "white", lineHeight: 1.25, marginBottom: 10 }}>Find Your Perfect<br />Teacher Today</div>
                        <button onClick={() => onNav("disc")} style={{ background: T.amber, border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 11, fontWeight: 800, color: "white", cursor: "pointer" }}>Explore Map</button>
                    </div>

                    {/* Top Rated */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.gray900 }}>Top Rated</div>
                        <button onClick={() => onNav("disc")} style={{ fontSize: 11, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>See all</button>
                    </div>
                    <div style={{ display: "flex", gap: 10, overflowX: "auto", marginBottom: 16, paddingBottom: 2 }}>
                        {loading ? [1, 2].map(i => (
                            <div key={i} style={{ width: 158, flexShrink: 0, borderRadius: 14, border: `1px solid ${T.border}`, overflow: "hidden" }}>
                                <div style={{ height: 68, background: T.gray100, animation: "pulse 1.4s ease-in-out infinite" }} />
                                <div style={{ padding: "10px 11px 12px" }}>
                                    <Skel h={11} w="70%" style={{ marginBottom: 6 }} />
                                    <Skel h={9} w="50%" style={{ marginBottom: 6 }} />
                                    <Skel h={10} w="80%" />
                                </div>
                            </div>
                        )) : featured.map(t => (
                            <Card key={t.id} onClick={() => onQuickPeek(t)} style={{ width: 158, flexShrink: 0, padding: 0, overflow: "hidden", animation: "fadeIn .3s ease" }}>
                                <div style={{ height: 68, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                    <Av init={t.avatar} size={42} bg="rgba(255,255,255,0.25)" color="white" />
                                    <div style={{ position: "absolute", top: 7, right: 7, background: T.amber, borderRadius: 6, padding: "2px 6px", fontSize: 8, fontWeight: 700, color: "white" }}>TOP</div>
                                    <button onClick={e => { e.stopPropagation(); onToggleSave(t.id); }} style={{ position: "absolute", top: 7, left: 7, width: 22, height: 22, borderRadius: 11, background: "rgba(0,0,0,0.25)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Ic n="heart" s={11} c={saved.has(t.id) ? "#f87171" : "rgba(255,255,255,0.9)"} fill={saved.has(t.id) ? "#f87171" : "none"} />
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

                    {/* Near You — with smart sort */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.gray900 }}>Near You</div>
                        <button onClick={() => onNav("disc")} style={{ fontSize: 11, fontWeight: 700, color: T.p600, background: "none", border: "none", cursor: "pointer" }}>Map view</button>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>
                        {[["distance", "Nearest"], ["rating", "Top Rated"], ["new", "Newest"]].map(([k, l]) => (
                            <Pill key={k} text={l} active={sort === k} onClick={() => setSort(k)} small />
                        ))}
                    </div>
                    {loading ? [1, 2, 3].map(i => <SkeletonCard key={i} />) : nearby.map(t => (
                        <Card key={t.id} onClick={() => onQuickPeek(t)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", marginBottom: 8, animation: "fadeIn .3s ease" }}>
                            <div style={{ position: "relative" }}>
                                <Av init={t.avatar} size={42} bg={T.p600} color="white" />
                                <button onClick={e => { e.stopPropagation(); onToggleSave(t.id); }} style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: 9, background: saved.has(t.id) ? T.red : T.card, border: `1px solid ${saved.has(t.id) ? T.red : T.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Ic n="heart" s={9} c={saved.has(t.id) ? "white" : T.gray300} fill={saved.has(t.id) ? "white" : "none"} />
                                </button>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>{t.name}</div>
                                    {t.verified && <Ic n="chk" s={10} c={T.blue} sw={2.5} />}
                                </div>
                                <div style={{ fontSize: 10, color: T.gray500, marginBottom: 4 }}>{t.skill}</div>
                                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                    {t.mode.map(m => <span key={m} style={{ fontSize: 8, background: T.p100, color: T.p700, borderRadius: 5, padding: "1px 6px", fontWeight: 600 }}>{m}</span>)}
                                </div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 900, color: T.p600 }}>RM {t.price}</div>
                                <div style={{ fontSize: 9, color: T.gray400 }}>{t.dist} km</div>
                                <div style={{ marginTop: 2 }}><Stars rating={t.rating} size={9} /></div>
                            </div>
                        </Card>
                    ))}
                    <div style={{ height: 20 }} />
                </div>
            </div>
            <BotNav active="home" onNav={onNav} unread={MSGS.reduce((s, m) => s + m.unread, 0)} />
        </div>
    );
};

/* ── DISCOVER SCREEN ─────────────────────────────────────────── */
const DiscoverScreen = ({ onNav, onQuickPeek, saved, onToggleSave }) => {
    const [view, setView] = useState("map");
    const [sel, setSel] = useState(null);
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({ cat: "All", priceMax: 200, minRating: 0, mode: "all", dist: 10 });

    const filtered = TEACHERS.filter(t => {
        const matchCat = filters.cat === "All" || t.skill.toLowerCase().includes(filters.cat.toLowerCase());
        const matchSearch = search === "" || t.name.toLowerCase().includes(search.toLowerCase()) || t.skill.toLowerCase().includes(search.toLowerCase());
        const matchPrice = t.price <= filters.priceMax;
        const matchRating = t.rating >= filters.minRating;
        const matchMode = filters.mode === "all" || (filters.mode === "online" && t.mode.includes("Online")) || (filters.mode === "physical" && t.mode.includes("Physical"));
        const matchDist = t.dist <= filters.dist;
        return matchCat && matchSearch && matchPrice && matchRating && matchMode && matchDist;
    });

    const activeFilters = (filters.priceMax < 200 ? 1 : 0) + (filters.minRating > 0 ? 1 : 0) + (filters.mode !== "all" ? 1 : 0) + (filters.dist < 10 ? 1 : 0);

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <GradHeader>
                <div style={{ fontSize: 17, fontWeight: 800, color: "white", marginBottom: 10 }}>Discover</div>
                <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", borderRadius: 12, padding: "9px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
                        <Ic n="srch" s={13} c="rgba(255,255,255,0.6)" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Teacher, subject, skill…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "white", fontFamily: "'DM Sans',sans-serif" }} />
                        {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}><Ic n="x" s={13} c="rgba(255,255,255,0.6)" /></button>}
                    </div>
                    <button onClick={() => setShowFilter(v => !v)} style={{ position: "relative", width: 40, height: 40, borderRadius: 10, background: showFilter ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
                        <Ic n="sliders" s={16} c={showFilter ? T.p700 : "white"} />
                        {activeFilters > 0 && <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: 8, background: T.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "white" }}>{activeFilters}</div>}
                    </button>
                </div>
            </GradHeader>

            {/* Filter panel */}
            {showFilter && (
                <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "14px 16px", flexShrink: 0, animation: "slideDown .2s ease" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 12 }}>Filters</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                        <div>
                            <div style={{ fontSize: 10, color: T.gray500, fontWeight: 600, marginBottom: 6 }}>Max Price: RM {filters.priceMax}/hr</div>
                            <input type="range" min={20} max={200} value={filters.priceMax} onChange={e => setFilters(f => ({ ...f, priceMax: +e.target.value }))} style={{ width: "100%", accentColor: T.p600 }} />
                        </div>
                        <div>
                            <div style={{ fontSize: 10, color: T.gray500, fontWeight: 600, marginBottom: 6 }}>Min Distance: {filters.dist} km</div>
                            <input type="range" min={1} max={20} value={filters.dist} onChange={e => setFilters(f => ({ ...f, dist: +e.target.value }))} style={{ width: "100%", accentColor: T.p600 }} />
                        </div>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 10, color: T.gray500, fontWeight: 600, marginBottom: 6 }}>Min Rating</div>
                        <div style={{ display: "flex", gap: 6 }}>
                            {[0, 4, 4.5, 4.8].map(r => (
                                <button key={r} onClick={() => setFilters(f => ({ ...f, minRating: r }))} style={{ padding: "4px 10px", borderRadius: 8, border: `1px solid ${filters.minRating === r ? T.p600 : T.border}`, background: filters.minRating === r ? T.p100 : "none", cursor: "pointer", fontSize: 9, fontWeight: 600, color: filters.minRating === r ? T.p700 : T.gray500 }}>
                                    {r === 0 ? "Any" : `${r}+`}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 10, color: T.gray500, fontWeight: 600, marginBottom: 6 }}>Lesson Mode</div>
                        <div style={{ display: "flex", gap: 6 }}>
                            {[["all", "All"], ["online", "Online"], ["physical", "Physical"]].map(([k, l]) => (
                                <button key={k} onClick={() => setFilters(f => ({ ...f, mode: k }))} style={{ padding: "4px 10px", borderRadius: 8, border: `1px solid ${filters.mode === k ? T.p600 : T.border}`, background: filters.mode === k ? T.p100 : "none", cursor: "pointer", fontSize: 9, fontWeight: 600, color: filters.mode === k ? T.p700 : T.gray500 }}>{l}</button>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setFilters({ cat: "All", priceMax: 200, minRating: 0, mode: "all", dist: 10 })} style={{ flex: 1, padding: "8px", background: "none", border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 11, fontWeight: 700, color: T.gray500, cursor: "pointer" }}>Reset</button>
                        <button onClick={() => setShowFilter(false)} style={{ flex: 2, padding: "8px", background: GRAD, border: "none", borderRadius: 10, fontSize: 11, fontWeight: 800, color: "white", cursor: "pointer" }}>Show {filtered.length} Teachers</button>
                    </div>
                </div>
            )}

            {/* Category + View toggle */}
            <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 7, padding: "10px 16px 8px", overflowX: "auto" }}>
                    {CATEGORIES.map(c => <Pill key={c} text={c} active={filters.cat === c} onClick={() => setFilters(f => ({ ...f, cat: c }))} />)}
                </div>
                <div style={{ display: "flex", padding: "0 16px 10px", gap: 8 }}>
                    {[{ id: "map", icon: "map", label: "Map View" }, { id: "list", icon: "list", label: "List View" }].map(v => (
                        <button key={v.id} onClick={() => setView(v.id)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "7px", borderRadius: 10, cursor: "pointer", background: v.id === view ? T.p600 : T.surface, color: v.id === view ? "white" : T.gray500, fontSize: 11, fontWeight: 700, border: v.id === view ? "none" : `1px solid ${T.border}` }}>
                            <Ic n={v.icon} s={14} c={v.id === view ? "white" : T.gray400} />{v.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAP */}
            {view === "map" && (
                <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "#E4EFE8" }}>
                        {[...Array(8)].map((_, i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 13}%`, height: 1, background: "rgba(0,0,0,0.04)" }} />)}
                        {[...Array(7)].map((_, i) => <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 16}%`, width: 1, background: "rgba(0,0,0,0.04)" }} />)}
                        <div style={{ position: "absolute", top: "40%", left: 0, right: 0, height: 9, background: "rgba(255,255,255,0.8)", borderRadius: 2 }} />
                        <div style={{ position: "absolute", top: "65%", left: 0, right: 0, height: 6, background: "rgba(255,255,255,0.65)", borderRadius: 2 }} />
                        <div style={{ position: "absolute", left: "33%", top: 0, bottom: 0, width: 8, background: "rgba(255,255,255,0.7)" }} />
                        <div style={{ position: "absolute", left: "60%", top: 0, bottom: 0, width: 6, background: "rgba(255,255,255,0.55)" }} />
                        <div style={{ position: "absolute", top: "10%", left: "5%", width: 58, height: 38, borderRadius: 12, background: "rgba(74,198,134,0.2)" }} />
                        <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 78, height: 48, borderRadius: 16, background: "rgba(74,198,134,0.15)" }} />
                        <div style={{ position: "absolute", top: "50%", left: "43%", transform: "translate(-50%,-50%)" }}>
                            <div style={{ width: 48, height: 48, borderRadius: 24, border: `2px solid rgba(59,130,246,0.2)`, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3B82F6", border: "3px solid white", boxShadow: "0 2px 8px rgba(59,130,246,0.5)" }} />
                        </div>
                        {filtered.map(t => (
                            <div key={t.id} onClick={() => setSel(sel?.id === t.id ? null : t)} style={{ position: "absolute", top: t.y, left: t.x, transform: "translate(-50%,-100%)", zIndex: sel?.id === t.id ? 10 : 5, cursor: "pointer" }}>
                                {sel?.id === t.id && (
                                    <div style={{ background: T.white, borderRadius: 10, padding: "5px 9px", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", marginBottom: 4, whiteSpace: "nowrap", border: `2px solid ${T.p600}`, fontSize: 10, fontWeight: 800, color: T.p800 }}>
                                        {t.name.split(" ")[0]} · RM {t.price}/hr
                                    </div>
                                )}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ background: sel?.id === t.id ? T.p600 : T.p500, color: "white", borderRadius: "50% 50% 50% 0", width: sel?.id === t.id ? 34 : 26, height: sel?.id === t.id ? 34 : 26, transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: sel?.id === t.id ? `0 4px 12px ${T.p600}60` : "none", transition: "all .2s", flexShrink: 0 }}>
                                        <span style={{ transform: "rotate(45deg)", fontSize: sel?.id === t.id ? 11 : 9, fontWeight: 800 }}>{t.avatar[0]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: T.card, borderRadius: "20px 20px 0 0", boxShadow: "0 -8px 30px rgba(0,0,0,0.10)", padding: "10px 16px 0" }}>
                        <div style={{ width: 36, height: 4, borderRadius: 2, background: T.border, margin: "0 auto 12px" }} />
                        {sel ? (
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                    <Av init={sel.avatar} size={48} bg={T.p600} color="white" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>{sel.name}</div>
                                            {sel.verified && <Ic n="chk" s={11} c={T.blue} sw={2.5} />}
                                        </div>
                                        <div style={{ fontSize: 11, color: T.gray500, marginBottom: 3 }}>{sel.skill}</div>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <Stars rating={sel.rating} /><span style={{ fontSize: 10, color: T.gray400 }}>({sel.reviews})</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: 16, fontWeight: 900, color: T.p600 }}>RM {sel.price}</div>
                                        <div style={{ fontSize: 9, color: T.gray400 }}>/ hour</div>
                                    </div>
                                </div>
                                <button onClick={() => onQuickPeek(sel)} style={{ width: "100%", background: GRAD, border: "none", borderRadius: 12, padding: "12px", fontSize: 12, fontWeight: 800, color: "white", cursor: "pointer", marginBottom: 14, boxShadow: `0 4px 14px ${T.p600}40` }}>
                                    View & Book
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 10 }}>{filtered.length} teachers nearby</div>
                                <div style={{ display: "flex", gap: 10, paddingBottom: 14 }}>
                                    {filtered.slice(0, 3).map(t => (
                                        <div key={t.id} onClick={() => setSel(t)} style={{ flex: 1, background: T.surface, borderRadius: 12, padding: "10px", border: `1px solid ${T.border}`, cursor: "pointer" }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{t.name.split(" ")[0]}</div>
                                            <div style={{ fontSize: 9, color: T.gray400, margin: "2px 0 5px" }}>{t.skill.split(" · ")[0]}</div>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span style={{ fontSize: 11, fontWeight: 900, color: T.p600 }}>RM {t.price}</span>
                                                <span style={{ fontSize: 9, color: T.gray400 }}>★{t.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* LIST */}
            {view === "list" && (
                <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
                    <div style={{ fontSize: 11, color: T.gray400, marginBottom: 10 }}>{filtered.length} teachers found</div>
                    {filtered.length === 0 ? (
                        <EmptyState icon="srch" title="No teachers found" sub="Try adjusting your filters or search a different subject." cta="Clear Filters" onCta={() => setFilters({ cat: "All", priceMax: 200, minRating: 0, mode: "all", dist: 10 })} />
                    ) : filtered.map(t => (
                        <Card key={t.id} onClick={() => onQuickPeek(t)} style={{ display: "flex", gap: 12, padding: "13px 14px", marginBottom: 8, alignItems: "flex-start" }}>
                            <div style={{ position: "relative" }}>
                                <Av init={t.avatar} size={48} bg={T.p600} color="white" />
                                {t.top && <div style={{ position: "absolute", top: -4, right: -4, background: T.amber, borderRadius: 5, padding: "1px 4px", fontSize: 7, fontWeight: 700, color: "white" }}>TOP</div>}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>{t.name}</div>
                                    {t.verified && <Ic n="chk" s={10} c={T.blue} sw={2.5} />}
                                    {t.certified && <Ic n="award" s={10} c={T.green} sw={2} />}
                                </div>
                                <div style={{ fontSize: 10, color: T.gray500, marginBottom: 4 }}>{t.skill}</div>
                                <Stars rating={t.rating} size={10} /><span style={{ fontSize: 9, color: T.gray400, marginLeft: 4 }}>({t.reviews})</span>
                                <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                                    {t.mode.map(m => <span key={m} style={{ fontSize: 8, background: T.p100, color: T.p700, borderRadius: 5, padding: "2px 6px", fontWeight: 600 }}>{m}</span>)}
                                    <span style={{ fontSize: 8, background: T.gray100, color: T.gray500, borderRadius: 5, padding: "2px 6px" }}>{t.dist} km</span>
                                </div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{ fontSize: 15, fontWeight: 900, color: T.p600 }}>RM {t.price}</div>
                                <div style={{ fontSize: 9, color: T.gray400 }}>/hour</div>
                                <div style={{ marginTop: 5 }}>
                                    <button onClick={e => { e.stopPropagation(); onToggleSave(t.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                                        <Ic n="heart" s={14} c={saved.has(t.id) ? T.red : T.gray300} fill={saved.has(t.id) ? T.red : "none"} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                    <div style={{ height: 16 }} />
                </div>
            )}
            {view === "list" && <BotNav active="disc" onNav={onNav} unread={MSGS.reduce((s, m) => s + m.unread, 0)} />}
        </div>
    );
};

/* ── TEACHER PROFILE ─────────────────────────────────────────── */
const TeacherProfile = ({ teacher: t, onBack, onBook, saved, onToggleSave }) => {
    const [tab, setTab] = useState("about");
    const isSaved = saved.has(t.id);

    const REVIEWS = [
        { name: "Lim Kai Xin", rating: 5, date: "Feb 2026", text: "Absolutely wonderful teacher — patient and explains concepts clearly. My child improved so much in just 4 sessions." },
        { name: "Razif Mukhtar", rating: 5, date: "Jan 2026", text: "Professional and punctual. Lessons are well-structured. Highly recommend." },
        { name: "Tan Sock Ping", rating: 4, date: "Jan 2026", text: "Great knowledge and teaching style. Pace can be a bit fast, but overall very positive." },
    ];

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ background: GRAD, padding: "36px 16px 0", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <BackBtn onBack={onBack} />
                    <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: "white" }}>Teacher Profile</div>
                    <button onClick={() => onToggleSave(t.id)} style={{ width: 34, height: 34, borderRadius: 17, background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Ic n="heart" s={16} c={isSaved ? T.amber : "white"} fill={isSaved ? T.amber : "none"} sw={2} />
                    </button>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-end", paddingBottom: 0 }}>
                    <div style={{ position: "relative" }}>
                        <Av init={t.avatar} size={66} bg="rgba(255,255,255,0.25)" color="white" />
                        {t.top && <div style={{ position: "absolute", bottom: -2, right: -2, background: T.amber, borderRadius: 7, padding: "2px 6px", fontSize: 8, fontWeight: 700, color: "white" }}>TOP</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 17, fontWeight: 900, color: "white", letterSpacing: "-0.02em" }}>{t.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 2 }}>{t.skill}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                            {t.verified && <VerifiedBadge type="verified" />}
                            {t.certified && <VerifiedBadge type="certified" />}
                            {t.bgCheck && <VerifiedBadge type="bgCheck" />}
                            {t.top && <VerifiedBadge type="top" />}
                        </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "white" }}>RM {t.price}</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>/hour</div>
                    </div>
                </div>
                <div style={{ display: "flex", background: "rgba(0,0,0,0.15)", borderRadius: "12px 12px 0 0", marginTop: 14 }}>
                    {[{ v: t.exp, l: "Experience" }, { v: t.avail, l: "Availability" }, { v: t.avgResponse, l: "Response" }].map((s, i) => (
                        <div key={i} style={{ flex: 1, padding: "9px 6px", textAlign: "center", borderRight: i < 2 ? `1px solid rgba(255,255,255,0.1)` : "none" }}>
                            <div style={{ color: "white", fontSize: i === 0 ? 11 : 9, fontWeight: 800, lineHeight: 1.2 }}>{s.v}</div>
                            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 8, marginTop: 1 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: "flex", background: T.card, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
                {["about", "services", "reviews"].map(tb => (
                    <button key={tb} onClick={() => setTab(tb)} style={{ flex: 1, padding: "11px", background: "none", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, textTransform: "capitalize", color: tab === tb ? T.p700 : T.gray400, borderBottom: tab === tb ? `2px solid ${T.p600}` : "2px solid transparent" }}>{tb}</button>
                ))}
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
                {tab === "about" && (
                    <>
                        <Card style={{ padding: 14, marginBottom: 12 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>About</div>
                            <div style={{ fontSize: 12, color: T.gray700, lineHeight: 1.6 }}>{t.bio}</div>
                            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                                {t.lang.map(l => <span key={l} style={{ background: T.p100, color: T.p700, borderRadius: 7, padding: "3px 9px", fontSize: 9, fontWeight: 600 }}>{l}</span>)}
                            </div>
                        </Card>

                        {/* Availability slots — new feature */}
                        <Card style={{ padding: 14, marginBottom: 12, border: `1.5px solid ${T.p200}`, background: T.p50 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: T.p800 }}>Next Available</div>
                                <span style={{ fontSize: 9, color: T.gray400 }}>Tap to book directly</span>
                            </div>
                            {t.slots?.map(sl => (
                                <button key={sl} onClick={() => onBook(t, t.pkgs[1])} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: "white", border: `1px solid ${T.p300}`, borderRadius: 10, padding: "9px 12px", marginBottom: 7, cursor: "pointer", textAlign: "left" }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <Ic n="cal" s={14} c={T.p600} />
                                    </div>
                                    <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: T.gray900 }}>{sl}</span>
                                    <div style={{ background: T.p600, borderRadius: 8, padding: "4px 10px", fontSize: 9, fontWeight: 700, color: "white" }}>Book</div>
                                </button>
                            ))}
                        </Card>

                        <Card style={{ padding: 14, marginBottom: 12 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 10 }}>Lesson Modes</div>
                            {t.mode.map(m => (
                                <div key={m} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Ic n={m === "Online" ? "globe" : "home"} s={14} c={T.p600} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{m}</div>
                                        <div style={{ fontSize: 9, color: T.gray400 }}>{m === "Online" ? "Google Meet / Zoom" : "Teacher's or Student's place"}</div>
                                    </div>
                                </div>
                            ))}
                        </Card>
                        <Card style={{ padding: 14, marginBottom: 12 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Rating Breakdown</div>
                            {[{ s: 5, p: 88 }, { s: 4, p: 9 }, { s: 3, p: 2 }, { s: 2, p: 1 }, { s: 1, p: 0 }].map(r => (
                                <div key={r.s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                                    <span style={{ fontSize: 9, color: T.gray500, width: 8 }}>{r.s}</span>
                                    <span style={{ fontSize: 9, color: T.amber }}>★</span>
                                    <div style={{ flex: 1 }}><PBar v={r.p} max={100} h={5} /></div>
                                    <span style={{ fontSize: 9, color: T.gray400, width: 22, textAlign: "right" }}>{r.p}%</span>
                                </div>
                            ))}
                        </Card>
                    </>
                )}
                {tab === "services" && (
                    <>
                        <div style={{ fontSize: 11, color: T.gray400, lineHeight: 1.5, marginBottom: 12 }}>Select a package to begin booking. A 25% deposit confirms your slot.</div>
                        {t.pkgs.map((pkg, i) => (
                            <Card key={pkg.id} onClick={() => onBook(t, pkg)} style={{ padding: 14, marginBottom: 10, border: `2px solid ${i === 1 ? T.p400 : T.border}`, background: i === 1 ? T.p50 : T.card, cursor: "pointer" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>{pkg.name}</div>
                                            {i === 1 && <span style={{ background: T.p100, color: T.p700, borderRadius: 5, padding: "1px 6px", fontSize: 8, fontWeight: 700 }}>POPULAR</span>}
                                            {i === 2 && <span style={{ background: T.amberL, color: T.amberD, borderRadius: 5, padding: "1px 6px", fontSize: 8, fontWeight: 700 }}>BEST VALUE</span>}
                                        </div>
                                        <div style={{ fontSize: 10, color: T.gray400, marginTop: 2 }}>{pkg.dur}</div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: 16, fontWeight: 900, color: T.p600 }}>RM {pkg.price}</div>
                                        <div style={{ fontSize: 9, color: T.gray400 }}>{pkg.note}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <div style={{ background: i === 1 ? T.p600 : T.surface, border: i === 1 ? "none" : `1px solid ${T.border}`, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 700, color: i === 1 ? "white" : T.p600 }}>Book This</div>
                                </div>
                            </Card>
                        ))}
                    </>
                )}
                {tab === "reviews" && (
                    <>
                        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 14 }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 34, fontWeight: 900, color: T.gray900, lineHeight: 1 }}>{t.rating}</div>
                                <Stars rating={t.rating} size={13} />
                                <div style={{ fontSize: 9, color: T.gray400, marginTop: 3 }}>{t.reviews} reviews</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                {[{ s: 5, p: 88 }, { s: 4, p: 9 }, { s: 3, p: 2 }, { s: 2, p: 1 }, { s: 1, p: 0 }].map(r => (
                                    <div key={r.s} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                        <span style={{ fontSize: 8, color: T.gray400, width: 8 }}>{r.s}</span>
                                        <div style={{ flex: 1 }}><PBar v={r.p} max={100} h={5} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {REVIEWS.map((r, i) => (
                            <Card key={i} style={{ padding: "12px 14px", marginBottom: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <Av init={r.name[0] + r.name.split(" ").slice(-1)[0][0]} size={30} bg={T.gray200} color={T.gray600} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{r.name}</div>
                                        <div style={{ fontSize: 9, color: T.gray400 }}>{r.date} · Verified Booking</div>
                                    </div>
                                    <Stars rating={r.rating} size={10} />
                                </div>
                                <div style={{ fontSize: 11, color: T.gray700, lineHeight: 1.55 }}>{r.text}</div>
                            </Card>
                        ))}
                    </>
                )}
                <div style={{ height: 14 }} />
            </div>
            <div style={{ padding: "10px 16px 14px", background: T.card, borderTop: `1px solid ${T.border}` }}>
                <button onClick={() => onBook(t, t.pkgs[1])} style={{ width: "100%", background: GRAD, border: "none", borderRadius: 14, padding: 13, fontSize: 14, fontWeight: 800, color: "white", cursor: "pointer", boxShadow: `0 6px 20px ${T.p600}50` }}>
                    Book a Lesson
                </button>
            </div>
        </div>
    );
};

/* ── BOOKING FLOW (3 STEPS) ──────────────────────────────────── */
const StepBar3 = ({ active }) => (
    <div style={{ display: "flex", padding: "10px 16px", gap: 4, flexShrink: 0, background: T.card, borderBottom: `1px solid ${T.border}` }}>
        {["Package & Schedule", "Review & Pay", "Confirmation"].map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 4, borderRadius: 2, background: i <= active ? T.p600 : T.border, marginBottom: 4, transition: "background .3s" }} />
                <div style={{ fontSize: 8, color: i <= active ? T.p600 : T.gray300, fontWeight: i <= active ? 700 : 400, textAlign: "center" }}>{s}</div>
            </div>
        ))}
    </div>
);

/* STEP 1: Package + Mode + Date/Time (all combined) */
const BookStep1 = ({ teacher: t, initPkg, onNext, onBack }) => {
    const [pkg, setPkg] = useState(initPkg || t.pkgs[1]);
    const [mode, setMode] = useState("Online");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const days = [{ d: "Mon", n: 3 }, { d: "Tue", n: 4 }, { d: "Wed", n: 5 }, { d: "Thu", n: 6 }, { d: "Fri", n: 7 }, { d: "Sat", n: 8 }, { d: "Sun", n: 9 }];
    const times = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "7:00 PM"];
    const blocked = ["11:00 AM", "3:00 PM"];
    const modes = t.mode.includes("Physical") ? ["Online", "Physical – Teacher's", "Physical – Student's"] : ["Online"];
    const ready = date && time;

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <GradHeader>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <BackBtn onBack={onBack} />
                    <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Book a Lesson</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 12px" }}>
                    <Av init={t.avatar} size={34} bg="rgba(255,255,255,0.3)" color="white" />
                    <div>
                        <div style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{t.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>{t.skill}</div>
                    </div>
                </div>
            </GradHeader>
            <StepBar3 active={0} />
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>

                {/* Package */}
                <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Package</div>
                {t.pkgs.map((p, i) => (
                    <button key={p.id} onClick={() => setPkg(p)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: pkg.id === p.id ? T.p50 : T.card, borderRadius: 12, padding: "10px 12px", marginBottom: 7, border: `2px solid ${pkg.id === p.id ? T.p500 : T.border}`, cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
                        <div style={{ width: 18, height: 18, borderRadius: 9, border: `2px solid ${pkg.id === p.id ? T.p600 : T.gray300}`, background: pkg.id === p.id ? T.p600 : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {pkg.id === p.id && <Ic n="chk" s={10} c="white" sw={3} />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{p.name}</span>
                                {i === 1 && <span style={{ background: T.p100, color: T.p700, borderRadius: 4, padding: "1px 5px", fontSize: 7, fontWeight: 700 }}>POPULAR</span>}
                            </div>
                            <div style={{ fontSize: 9, color: T.gray400, marginTop: 1 }}>{p.dur}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 13, fontWeight: 900, color: T.p600 }}>RM {p.price}</div>
                            <div style={{ fontSize: 8, color: T.gray400 }}>{p.note}</div>
                        </div>
                    </button>
                ))}

                {/* Mode */}
                <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8, marginTop: 6 }}>Lesson Mode</div>
                <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
                    {modes.map(m => (
                        <button key={m} onClick={() => setMode(m)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "9px 4px", borderRadius: 11, border: `1.5px solid ${mode === m ? T.p500 : T.border}`, background: mode === m ? T.p50 : T.surface, cursor: "pointer", transition: "all .15s" }}>
                            <div style={{ width: 26, height: 26, borderRadius: 8, background: mode === m ? T.p600 : T.gray100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Ic n={m === "Online" ? "globe" : "pin"} s={13} c={mode === m ? "white" : T.gray400} />
                            </div>
                            <span style={{ fontSize: 8, fontWeight: mode === m ? 700 : 500, color: mode === m ? T.p700 : T.gray500, textAlign: "center", lineHeight: 1.2 }}>{m.replace("Physical – ", "")}</span>
                        </button>
                    ))}
                </div>

                {/* Date */}
                <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Date — March 2026</div>
                <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
                    {days.map(d => (
                        <button key={d.n} onClick={() => setDate(d)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 2px", borderRadius: 11, border: "none", cursor: "pointer", background: date?.n === d.n ? T.p600 : T.surface, border: date?.n === d.n ? "none" : `1px solid ${T.border}`, transition: "all .15s" }}>
                            <span style={{ fontSize: 8, color: date?.n === d.n ? "rgba(255,255,255,0.7)" : T.gray400 }}>{d.d}</span>
                            <span style={{ fontSize: 14, fontWeight: 800, color: date?.n === d.n ? "white" : T.gray900 }}>{d.n}</span>
                        </button>
                    ))}
                </div>

                {/* Time */}
                <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Time Slot</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
                    {times.map(tm => {
                        const isBlocked = blocked.includes(tm);
                        const isSel = time === tm;
                        return (
                            <button key={tm} onClick={() => !isBlocked && setTime(tm)} style={{ padding: "8px 4px", borderRadius: 10, border: "none", cursor: isBlocked ? "not-allowed" : "pointer", textAlign: "center", background: isSel ? T.p600 : isBlocked ? T.gray50 : T.surface, color: isSel ? "white" : isBlocked ? T.gray300 : T.gray900, fontSize: 10, fontWeight: isSel ? 800 : 500, border: isSel ? "none" : isBlocked ? `1px solid ${T.gray100}` : `1px solid ${T.border}`, opacity: isBlocked ? 0.5 : 1, transition: "all .15s" }}>
                                {tm}
                                {isBlocked && <div style={{ fontSize: 7, color: T.gray300, marginTop: 1 }}>Booked</div>}
                            </button>
                        );
                    })}
                </div>
                <div style={{ height: 20 }} />
            </div>
            <div style={{ padding: "10px 16px 14px" }}>
                <button disabled={!ready} onClick={() => onNext({ pkg, mode, date, time })} style={{ width: "100%", background: ready ? GRAD : "rgba(0,0,0,0.08)", border: "none", borderRadius: 14, padding: 13, fontSize: 13, fontWeight: 800, color: ready ? "white" : T.gray300, cursor: ready ? "pointer" : "not-allowed", transition: "all .2s", boxShadow: ready ? `0 6px 20px ${T.p600}45` : "none" }}>
                    {ready ? "Next: Review & Pay" : "Select date and time to continue"}
                </button>
            </div>
        </div>
    );
};

/* STEP 2: Review + Remarks + Payment */
const BookStep2 = ({ teacher: t, booking, onNext, onBack }) => {
    const [remarks, setRemarks] = useState("");
    const [method, setMethod] = useState("fpx");
    const [paying, setPaying] = useState(false);
    const [feeOpen, setFeeOpen] = useState(false);
    const MAX = 200;
    const deposit = Math.round(booking.pkg.price * 0.25);
    const platFee = Math.round(booking.pkg.price * 0.05);
    const transport = booking.mode?.includes("Student") ? 10 : 0;
    const total = booking.pkg.price + platFee + transport;

    const pay = () => { setPaying(true); setTimeout(() => { setPaying(false); onNext({ ...booking, remarks, method }); }, 2000); };

    const methods = [
        { id: "fpx", label: "Online Banking (FPX)", sub: "Maybank, CIMB, RHB & more", icon: "globe" },
        { id: "ewallet", label: "e-Wallet", sub: "Touch 'n Go, Boost, GrabPay", icon: "phone" },
        { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex", icon: "card" },
    ];

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <GradHeader>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <BackBtn onBack={onBack} />
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Review & Pay</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>Step 2 of 3</div>
                    </div>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                        <Ic n="lock" s={12} c="rgba(255,255,255,0.7)" />
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>SSL Secured</span>
                    </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.13)", borderRadius: 14, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, marginBottom: 1 }}>Deposit Due Now</div>
                    <div style={{ color: "white", fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em" }}>RM {deposit}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 }}>{booking.pkg.name} · {t.name}</div>
                </div>
            </GradHeader>
            <StepBar3 active={1} />

            <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
                {/* Booking summary (collapsible) */}
                <button onClick={() => setFeeOpen(v => !v)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", marginBottom: 8 }}>
                    <Card style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>Booking Summary</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <span style={{ fontSize: 13, fontWeight: 900, color: T.p600 }}>RM {total}</span>
                                <Ic n="chev" s={14} c={T.gray400} sw={2} style={{ transform: feeOpen ? "rotate(90deg)" : "rotate(-90deg)" }} />
                            </div>
                        </div>
                        {feeOpen && (
                            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                                {[["Teacher", t.name], ["Package", booking.pkg.name], ["Mode", booking.mode], ["Date", `${booking.date?.d}, Mar ${booking.date?.n}`], ["Time", booking.time]].map(([k, v]) => (
                                    <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                        <span style={{ fontSize: 10, color: T.gray500 }}>{k}</span>
                                        <span style={{ fontSize: 10, fontWeight: 600, color: T.gray900 }}>{v}</span>
                                    </div>
                                ))}
                                <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 8, marginTop: 8 }}>
                                    {[["Lesson Fee", `RM ${booking.pkg.price}`], ["Platform Fee (5%)", `RM ${platFee}`], transport ? ["Transport Fee", `RM ${transport}`] : null, ["Total Amount", `RM ${total}`]].filter(Boolean).map(([k, v]) => (
                                        <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                            <span style={{ fontSize: 10, color: T.gray500 }}>{k}</span>
                                            <span style={{ fontSize: 10, fontWeight: 700, color: T.gray900 }}>{v}</span>
                                        </div>
                                    ))}
                                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: `1px solid ${T.border}` }}>
                                        <span style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Deposit (25%)</span>
                                        <span style={{ fontSize: 13, fontWeight: 900, color: T.p600 }}>RM {deposit}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                                        <span style={{ fontSize: 9, color: T.gray400 }}>Remaining (due before class)</span>
                                        <span style={{ fontSize: 9, color: T.gray400 }}>RM {total - deposit}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </button>

                {/* Remarks */}
                <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 6 }}>Remarks <span style={{ fontSize: 10, color: T.gray400, fontWeight: 400 }}>(optional)</span></div>
                <div style={{ background: T.card, borderRadius: 13, border: `1.5px solid ${remarks.length > 0 ? T.p400 : T.border}`, padding: "11px 13px", marginBottom: 8, transition: "border-color .2s" }}>
                    <textarea value={remarks} onChange={e => setRemarks(e.target.value.slice(0, MAX))} placeholder="Any notes for the teacher, learning goals, or special requests…" style={{ width: "100%", minHeight: 60, border: "none", outline: "none", resize: "none", fontSize: 11, color: T.gray900, background: "transparent", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.5, boxSizing: "border-box" }} />
                    <div style={{ textAlign: "right", fontSize: 9, color: remarks.length > 180 ? T.red : T.gray300 }}>{remarks.length}/{MAX}</div>
                </div>

                {/* Payment methods */}
                <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Payment Method</div>
                {methods.map(m => (
                    <button key={m.id} onClick={() => setMethod(m.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: method === m.id ? T.p50 : T.card, borderRadius: 12, padding: "10px 13px", marginBottom: 7, border: `2px solid ${method === m.id ? T.p500 : T.border}`, cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
                        <div style={{ width: 18, height: 18, borderRadius: 9, border: `2px solid ${method === m.id ? T.p600 : T.gray300}`, background: method === m.id ? T.p600 : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {method === m.id && <Ic n="chk" s={10} c="white" sw={3} />}
                        </div>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: method === m.id ? T.p100 : T.gray50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Ic n={m.icon} s={14} c={method === m.id ? T.p600 : T.gray400} />
                        </div>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{m.label}</div>
                            <div style={{ fontSize: 9, color: T.gray400 }}>{m.sub}</div>
                        </div>
                    </button>
                ))}

                {/* Trust signals */}
                <div style={{ display: "flex", gap: 8, marginTop: 10, marginBottom: 4 }}>
                    {[{ icon: "lock", txt: "256-bit SSL" }, { icon: "shield", txt: "PCI Compliant" }, { icon: "chk", txt: "Secure via Stripe" }].map(({ icon, txt }) => (
                        <div key={txt} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: T.surface, borderRadius: 9, padding: "8px 4px", border: `1px solid ${T.border}` }}>
                            <Ic n={icon} s={12} c={T.green} sw={2} />
                            <span style={{ fontSize: 7, fontWeight: 700, color: T.gray500, textAlign: "center" }}>{txt}</span>
                        </div>
                    ))}
                </div>
                <div style={{ height: 16 }} />
            </div>
            <div style={{ padding: "10px 16px 14px" }}>
                <button onClick={pay} disabled={paying} style={{ width: "100%", background: paying ? "rgba(0,0,0,0.08)" : GRAD, border: "none", borderRadius: 14, padding: 14, fontSize: 14, fontWeight: 800, color: paying ? T.gray400 : "white", cursor: paying ? "not-allowed" : "pointer", boxShadow: paying ? "none" : `0 6px 20px ${T.p600}45`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .2s" }}>
                    {paying ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: 8, animation: "spin .8s linear infinite" }} /> Processing…</> : `Pay RM ${deposit} Deposit`}
                </button>
            </div>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
    );
};

/* STEP 3: Confirmation + Pre-lesson checklist */
const BookStep3 = ({ teacher: t, booking, onDone }) => {
    const [show, setShow] = useState(false);
    const [checks, setChecks] = useState({});
    useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
    const deposit = Math.round(booking.pkg.price * 0.25);
    const ref = `GRW-2026-${Math.floor(Math.random() * 90000 + 10000)}`;
    const isOnline = booking.mode === "Online";

    const checkItems = isOnline
        ? ["Ensure a stable internet connection", "Test your camera and microphone", "Set a reminder 5 minutes before", "Prepare your notebook or materials"]
        : ["Save the teacher's address to your maps", "Allow extra time for travel", "Set a reminder 15 minutes before", "Bring any required materials or notes"];

    const doneCount = Object.values(checks).filter(Boolean).length;

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: GRAD, overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 24px", textAlign: "center" }}>
                    <div style={{ width: 88, height: 88, borderRadius: 44, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transform: show ? "scale(1)" : "scale(0.5)", opacity: show ? 1 : 0, transition: "all .5s cubic-bezier(0.34,1.56,0.64,1)" }}>
                        <div style={{ width: 70, height: 70, borderRadius: 35, background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Ic n="tick" s={34} c={T.p600} sw={2.5} />
                        </div>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "white", marginBottom: 6, letterSpacing: "-0.02em", transform: show ? "translateY(0)" : "translateY(20px)", opacity: show ? 1 : 0, transition: "all .5s .1s ease" }}>Booking Confirmed</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, transform: show ? "translateY(0)" : "translateY(20px)", opacity: show ? 1 : 0, transition: "all .5s .2s ease" }}>
                        Your lesson with {t.name.split(" ")[0]} is confirmed.<br />RM {deposit} deposit received.
                    </div>
                </div>

                <div style={{ padding: "0 20px 20px" }}>
                    {/* Receipt */}
                    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 18, padding: 18, border: "1px solid rgba(255,255,255,0.2)", marginBottom: 16, transform: show ? "translateY(0)" : "translateY(30px)", opacity: show ? 1 : 0, transition: "all .5s .3s ease" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Booking Receipt</div>
                        {[["Teacher", t.name], ["Package", booking.pkg.name], ["Date", `${booking.date?.d}, Mar ${booking.date?.n}, 2026`], ["Time", booking.time], ["Mode", booking.mode], ["Deposit Paid", `RM ${deposit}`], ["Reference", ref]].map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{k}</span>
                                <span style={{ fontSize: 10, fontWeight: 600, color: "white" }}>{v}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pre-lesson checklist */}
                    <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: 16, border: "1px solid rgba(255,255,255,0.18)", transform: show ? "translateY(0)" : "translateY(30px)", opacity: show ? 1 : 0, transition: "all .5s .4s ease" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: "white" }}>Lesson Prep Checklist</div>
                            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{doneCount}/{checkItems.length}</span>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <PBar v={doneCount} max={checkItems.length} h={4} color="rgba(255,255,255,0.9)" bg="rgba(255,255,255,0.2)" />
                        </div>
                        {checkItems.map((item, i) => (
                            <button key={i} onClick={() => setChecks(c => ({ ...c, [i]: !c[i] }))} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: "6px 0", textAlign: "left" }}>
                                <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checks[i] ? "transparent" : "rgba(255,255,255,0.4)"}`, background: checks[i] ? "rgba(255,255,255,0.9)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>
                                    {checks[i] && <Ic n="chk" s={11} c={T.p600} sw={3} />}
                                </div>
                                <span style={{ fontSize: 11, color: checks[i] ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.85)", textDecoration: checks[i] ? "line-through" : "none", transition: "all .2s" }}>{item}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ padding: "0 20px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={onDone} style={{ background: "white", border: "none", borderRadius: 14, padding: 13, fontSize: 13, fontWeight: 800, color: T.p800, cursor: "pointer" }}>View My Bookings</button>
                <button onClick={() => onDone("home")} style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: 12, fontSize: 12, fontWeight: 700, color: "white", cursor: "pointer" }}>Back to Home</button>
            </div>
        </div>
    );
};

/* ── MY BOOKINGS (with Calendar View + Contextual Guidance) ─── */
const BookingsScreen = ({ onNav }) => {
    const [filter, setFilter] = useState("all");
    const [bkgView, setBkgView] = useState("list");
    const filters = ["all", "confirmed", "pending", "completed"];
    const filtered = filter === "all" ? BOOKINGS : BOOKINGS.filter(b => b.status === filter);

    // Calendar data
    const MONTH = Array.from({ length: 31 }, (_, i) => i + 1);
    const bookedDates = { 3: "confirmed", 5: "pending", 1: "completed" };

    const CtaForBooking = ({ b }) => {
        if (b.action === "upcoming") return (
            <div style={{ display: "flex", gap: 7, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
                <button style={{ flex: 1, background: T.p100, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.p700, cursor: "pointer" }}>Message Teacher</button>
                <button style={{ flex: 1, background: T.amberL, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.amberD, cursor: "pointer" }}>Set Reminder</button>
            </div>
        );
        if (b.action === "pending") return (
            <div style={{ display: "flex", gap: 7, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
                <button style={{ flex: 1, background: T.gray100, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.gray600, cursor: "pointer" }}>Cancel Request</button>
                <button style={{ flex: 1, background: T.blueL, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.blue, cursor: "pointer" }}>Message Teacher</button>
            </div>
        );
        if (b.action === "review") return (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
                <button style={{ width: "100%", background: T.amberL, border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 800, color: T.amberD, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Ic n="star" s={12} c={T.amberD} fill={T.amberD} />
                    Leave a Review
                </button>
            </div>
        );
        return null;
    };

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <GradHeader>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "white" }}>My Bookings</div>
                    <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setBkgView("list")} style={{ width: 32, height: 32, borderRadius: 9, background: bkgView === "list" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Ic n="list" s={15} c={bkgView === "list" ? T.p700 : "rgba(255,255,255,0.8)"} />
                        </button>
                        <button onClick={() => setBkgView("cal")} style={{ width: 32, height: 32, borderRadius: 9, background: bkgView === "cal" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Ic n="cal" s={15} c={bkgView === "cal" ? T.p700 : "rgba(255,255,255,0.8)"} />
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", background: filter === f ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)", color: filter === f ? T.p800 : "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, textTransform: "capitalize", flexShrink: 0 }}>
                            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </GradHeader>

            <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                    {[{ v: STUDENT.bookings, l: "Total Booked" }, { v: `RM ${STUDENT.spent}`, l: "Total Spent" }, { v: "2", l: "Upcoming" }].map((s, i) => (
                        <Card key={i} style={{ padding: "11px 8px", textAlign: "center" }}>
                            <div style={{ fontSize: 16, fontWeight: 900, color: T.p600, lineHeight: 1 }}>{s.v}</div>
                            <div style={{ fontSize: 9, color: T.gray400, marginTop: 3 }}>{s.l}</div>
                        </Card>
                    ))}
                </div>

                {bkgView === "cal" ? (
                    <Card style={{ padding: 14, marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>March 2026</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 10 }}>
                            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                <div key={i} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: T.gray400, padding: "2px 0" }}>{d}</div>
                            ))}
                            {/* Offset for March (starts Sat — skip 5 */}
                            {[...Array(5)].map((_, i) => <div key={`e${i}`} />)}
                            {MONTH.map(d => {
                                const status = bookedDates[d];
                                const dotColor = status === "confirmed" ? T.p400 : status === "pending" ? T.amber : status === "completed" ? T.blue : null;
                                return (
                                    <div key={d} style={{ textAlign: "center", padding: "4px 1px", borderRadius: 7, background: status ? T.p50 : "none", position: "relative" }}>
                                        <span style={{ fontSize: 10, fontWeight: status ? 700 : 400, color: status ? T.p700 : T.gray500 }}>{d}</span>
                                        {dotColor && <div style={{ width: 5, height: 5, borderRadius: 3, background: dotColor, margin: "1px auto 0" }} />}
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            {[["confirmed", T.p400, "Confirmed"], ["pending", T.amber, "Pending"], ["completed", T.blue, "Completed"]].map(([k, c, l]) => (
                                <div key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <div style={{ width: 7, height: 7, borderRadius: 4, background: c }} />
                                    <span style={{ fontSize: 9, color: T.gray500 }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                ) : null}

                {filtered.length === 0 ? (
                    <EmptyState icon="book" title="No bookings yet" sub="Discover teachers near you and book your first lesson." cta="Explore Teachers" onCta={() => onNav("disc")} />
                ) : filtered.map(b => (
                    <Card key={b.id} style={{ marginBottom: 10, overflow: "hidden" }}>
                        <div style={{ height: 4, background: b.status === "confirmed" ? T.p400 : b.status === "pending" ? T.amber : b.status === "completed" ? T.blue : T.red, transition: "background .2s" }} />
                        <div style={{ padding: "12px 14px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                <Av init={b.avatar} size={40} bg={T.p600} color="white" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>{b.teacher}</div>
                                    <div style={{ fontSize: 10, color: T.gray500 }}>{b.skill} · {b.pkg}</div>
                                </div>
                                <StatusPill status={b.status} />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                                {[{ i: "cal", v: b.date }, { i: "clk", v: b.time }, { i: "pin", v: b.mode.replace("Physical – ", "") }, { i: "book", v: `Session ${b.session}` }].map((r, i) => (
                                    <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                        <Ic n={r.i} s={10} c={T.gray400} />
                                        <span style={{ fontSize: 10, color: T.gray600 }}>{r.v}</span>
                                    </div>
                                ))}
                            </div>
                            {b.countdown && (
                                <div style={{ marginTop: 7, display: "inline-flex", alignItems: "center", gap: 4, background: b.action === "upcoming" ? T.greenL : T.amberL, borderRadius: 7, padding: "3px 8px" }}>
                                    <Ic n="clk" s={10} c={b.action === "upcoming" ? T.green : T.amberD} />
                                    <span style={{ fontSize: 9, fontWeight: 700, color: b.action === "upcoming" ? T.green : T.amberD }}>{b.countdown}</span>
                                </div>
                            )}
                            <CtaForBooking b={b} />
                        </div>
                    </Card>
                ))}
                <div style={{ height: 16 }} />
            </div>
            <BotNav active="bkgs" onNav={onNav} unread={MSGS.reduce((s, m) => s + m.unread, 0)} />
        </div>
    );
};

/* ── ACTIVITY (Actionable) ───────────────────────────────────── */
const ActivityScreen = ({ onNav }) => {
    const [activity, setActivity] = useState(ACTIVITY);
    const [rating, setRating] = useState(0);
    const markRead = (id) => setActivity(a => a.map(x => x.id === id ? { ...x, read: true } : x));

    const InlineActions = ({ a }) => {
        if (a.type === "booking") return (
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <button style={{ flex: 1, background: T.p100, border: "none", borderRadius: 8, padding: "5px 8px", fontSize: 9, fontWeight: 700, color: T.p700, cursor: "pointer" }}>Message Teacher</button>
                <button style={{ flex: 1, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "5px 8px", fontSize: 9, fontWeight: 700, color: T.gray700, cursor: "pointer" }}>View Booking</button>
            </div>
        );
        if (a.type === "message") return (
            <button onClick={() => onNav("msgs")} style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 5, background: T.blueL, border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 9, fontWeight: 700, color: T.blue, cursor: "pointer" }}>
                <Ic n="msg" s={10} c={T.blue} /> Reply
            </button>
        );
        if (a.type === "review") return (
            <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 10, color: T.gray500, marginBottom: 4 }}>Rate your experience:</div>
                <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                        <button key={s} onClick={() => setRating(s)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                            <span style={{ fontSize: 22, color: s <= rating ? T.amber : T.gray200 }}>★</span>
                        </button>
                    ))}
                    {rating > 0 && <button style={{ background: T.amberL, border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 9, fontWeight: 700, color: T.amberD, cursor: "pointer", marginLeft: 4 }}>Submit</button>}
                </div>
            </div>
        );
        if (a.type === "reminder") return (
            <button style={{ marginTop: 8, background: T.gray100, border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 9, fontWeight: 700, color: T.gray600, cursor: "pointer" }}>
                View Lesson Details
            </button>
        );
        return null;
    };

    const grouped = { today: activity.slice(0, 3), earlier: activity.slice(3) };
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <GradHeader>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "white" }}>Activity</div>
                    <button onClick={() => setActivity(a => a.map(x => ({ ...x, read: true })))} style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}>Mark all read</button>
                </div>
            </GradHeader>
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
                {activity.every(a => a.read) && activity.length === 0 ? (
                    <EmptyState icon="bell" title="All caught up" sub="No new activity. Explore and book a teacher to get started." cta="Discover Teachers" onCta={() => onNav("disc")} />
                ) : Object.entries(grouped).map(([group, items]) => (
                    <div key={group}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.gray400, letterSpacing: "0.06em", marginBottom: 8, marginTop: group === "earlier" ? 16 : 0, textTransform: "uppercase" }}>{group === "today" ? "Today" : "Earlier"}</div>
                        {items.map(a => {
                            const cfg = ACT_CFG[a.type] || ACT_CFG.reminder;
                            return (
                                <div key={a.id} onClick={() => markRead(a.id)} style={{ background: a.read ? T.card : T.p50, borderRadius: 13, padding: "12px 13px", marginBottom: 7, border: `1px solid ${a.read ? T.border : T.p200}`, transition: "background .2s" }}>
                                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                        <div style={{ width: 30, height: 30, borderRadius: 9, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <span style={{ fontSize: 8, fontWeight: 800, color: cfg.color, letterSpacing: "0.03em" }}>{cfg.label.slice(0, 3).toUpperCase()}</span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 11, fontWeight: a.read ? 400 : 700, color: T.gray900, lineHeight: 1.4 }}>{a.text}</div>
                                            <div style={{ fontSize: 9, color: T.gray400, marginTop: 3 }}>{a.time}</div>
                                            <InlineActions a={a} />
                                        </div>
                                        {!a.read && <div style={{ width: 8, height: 8, borderRadius: 4, background: T.p600, flexShrink: 0, marginTop: 4 }} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
                <div style={{ height: 16 }} />
            </div>
            <BotNav active="act" onNav={onNav} unread={MSGS.reduce((s, m) => s + m.unread, 0)} />
        </div>
    );
};

/* ── MESSAGES ────────────────────────────────────────────────── */
const MessagesScreen = ({ onNav, onChat }) => {
    const unread = MSGS.reduce((s, m) => s + m.unread, 0);
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <GradHeader>
                <div style={{ fontSize: 17, fontWeight: 800, color: "white", marginBottom: 12 }}>Messages</div>
                <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "9px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Ic n="srch" s={14} c="rgba(255,255,255,0.6)" />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Search conversations…</span>
                </div>
            </GradHeader>
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
                {MSGS.length === 0 ? (
                    <EmptyState icon="msg" title="No messages yet" sub="Book a lesson and start a conversation with your teacher." cta="Book a Lesson" onCta={() => onNav("disc")} />
                ) : MSGS.map(m => (
                    <Card key={m.id} onClick={() => onChat(m)} style={{ display: "flex", gap: 12, padding: "13px 14px", marginBottom: 8, cursor: "pointer", background: m.unread > 0 ? T.p50 : T.card, border: `1px solid ${m.unread > 0 ? T.p200 : T.border}` }}>
                        <Av init={m.avatar} size={44} bg={T.p600} color="white" online={m.online} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                                <div style={{ fontSize: 13, fontWeight: m.unread > 0 ? 800 : 700, color: T.gray900 }}>{m.name}</div>
                                <div style={{ fontSize: 9, color: T.gray300 }}>{m.time}</div>
                            </div>
                            <div style={{ fontSize: 11, color: m.unread > 0 ? T.gray700 : T.gray400, fontWeight: m.unread > 0 ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.last}</div>
                        </div>
                        {m.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: 10, background: T.p600, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "white", flexShrink: 0 }}>{m.unread}</div>}
                    </Card>
                ))}
            </div>
            <BotNav active="msgs" onNav={onNav} unread={unread} />
        </div>
    );
};

/* ── CHAT (Typing + Read Receipts) ──────────────────────────── */
const ChatScreen = ({ contact, onClose }) => {
    const [msgs, setMsgs] = useState(CHAT_HISTORY);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

    const send = () => {
        if (!input.trim()) return;
        setMsgs(p => [...p, { from: "me", text: input.trim(), time: "Now", read: false }]);
        setInput("");
        // Simulate teacher typing response
        setTimeout(() => setTyping(true), 800);
        setTimeout(() => {
            setTyping(false);
            setMsgs(p => [...p, { from: "them", text: "Got it! See you then.", time: "Now", read: true }]);
        }, 3000);
    };

    const ReadReceipt = ({ msg }) => {
        if (msg.from !== "me") return null;
        return (
            <div style={{ textAlign: "right", marginTop: 2, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3 }}>
                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.55)" }}>{msg.time}</span>
                <span style={{ fontSize: 8, color: msg.read ? T.p300 : "rgba(255,255,255,0.4)" }}>{msg.read ? "✓✓" : "✓"}</span>
            </div>
        );
    };

    return (
        <div style={{ position: "absolute", inset: 0, zIndex: 200, display: "flex", flexDirection: "column", background: T.gray50 }}>
            <div style={{ background: GRAD, padding: "36px 16px 14px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <BackBtn onBack={onClose} />
                    <Av init={contact.avatar} size={36} bg="rgba(255,255,255,0.25)" color="white" online={contact.online} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "white" }}>{contact.name}</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>
                            {typing ? (
                                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    Typing
                                    <span style={{ display: "flex", gap: 2, marginLeft: 2 }}>
                                        {[0, 1, 2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.7)", animation: `typingDot .8s ease-in-out ${i * 0.2}s infinite` }} />)}
                                    </span>
                                </span>
                            ) : contact.online ? "Online" : "Recently active"}
                        </div>
                    </div>
                    <Ic n="more" s={18} c="rgba(255,255,255,0.7)" />
                </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
                {msgs.map((m, i) => {
                    const showDate = i === 0 || msgs[i - 1]?.from !== m.from;
                    return (
                        <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start", marginBottom: showDate ? 10 : 4 }}>
                            <div style={{ maxWidth: "78%" }}>
                                <div style={{ background: m.from === "me" ? T.p600 : "white", color: m.from === "me" ? "white" : T.gray900, borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 13px", boxShadow: m.from === "me" ? `0 3px 12px ${T.p600}40` : "0 2px 8px rgba(0,0,0,0.06)", border: m.from !== "me" ? `1px solid ${T.border}` : "none" }}>
                                    <div style={{ fontSize: 12, lineHeight: 1.5 }}>{m.text}</div>
                                    {m.from !== "me" && <div style={{ fontSize: 8, color: T.gray300, marginTop: 3, textAlign: "right" }}>{m.time}</div>}
                                </div>
                                <ReadReceipt msg={m} />
                            </div>
                        </div>
                    );
                })}
                {typing && (
                    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                        <div style={{ background: "white", borderRadius: "18px 18px 18px 4px", padding: "10px 14px", border: `1px solid ${T.border}`, display: "flex", gap: 4, alignItems: "center" }}>
                            {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: T.gray300, animation: `typingDot .8s ease-in-out ${i * 0.2}s infinite` }} />)}
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
            <div style={{ display: "flex", gap: 8, padding: "10px 14px 14px", background: "white", borderTop: `1px solid ${T.border}`, alignItems: "flex-end" }}>
                <div style={{ flex: 1, background: T.surface, borderRadius: 20, padding: "9px 14px", border: `1px solid ${T.border}` }}>
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message…" style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 12, color: T.gray900, fontFamily: "'DM Sans',sans-serif" }} />
                </div>
                <button onClick={send} style={{ width: 40, height: 40, borderRadius: 20, background: T.p600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 3px 10px ${T.p600}50` }}>
                    <Ic n="send" s={15} c="white" />
                </button>
            </div>
            <style>{`
        @keyframes typingDot{0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-5px);opacity:1}}
      `}</style>
        </div>
    );
};

/* ── PROFILE (Inline Editing) ────────────────────────────────── */
const ProfileScreen = ({ onBack }) => {
    const [editing, setEditing] = useState(null);
    const [data, setData] = useState({ ...STUDENT });
    const [saved, setSaved] = useState(false);

    const Field = ({ icon, label, field, borderTop = false }) => {
        const isEditing = editing === field;
        return (
            <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: T.gray50, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Ic n={icon} s={15} c={T.gray400} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 9, color: T.gray400, fontWeight: 600, marginBottom: 2 }}>{label}</div>
                        {isEditing ? (
                            <input value={data[field]} onChange={e => setData(d => ({ ...d, [field]: e.target.value }))} autoFocus style={{ width: "100%", border: "none", borderBottom: `2px solid ${T.p500}`, outline: "none", fontSize: 12, fontWeight: 600, color: T.gray900, background: "transparent", padding: "1px 0", fontFamily: "'DM Sans',sans-serif" }} />
                        ) : (
                            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray900 }}>{data[field]}</div>
                        )}
                    </div>
                    <button onClick={() => {
                        if (isEditing) { setEditing(null); setSaved(true); setTimeout(() => setSaved(false), 2000); }
                        else setEditing(field);
                    }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                        {isEditing ? <Ic n="chk" s={16} c={T.p600} sw={2.5} /> : <Ic n="edit" s={14} c={T.gray300} />}
                    </button>
                </div>
                {borderTop && <Divider />}
            </div>
        );
    };

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ background: GRAD, padding: "36px 16px 0", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <BackBtn onBack={onBack} />
                    <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: "white" }}>My Profile</div>
                    {saved && <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                        <Ic n="chk" s={12} c="white" sw={2.5} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>Saved</span>
                    </div>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 20 }}>
                    <div style={{ position: "relative", marginBottom: 12 }}>
                        <div style={{ width: 76, height: 76, borderRadius: 38, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "white", border: "3px solid rgba(255,255,255,0.4)" }}>AR</div>
                        <button style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, background: T.amber, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white", cursor: "pointer" }}>
                            <Ic n="edit" s={12} c="white" />
                        </button>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "white", letterSpacing: "-0.02em" }}>{data.fullName}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>{data.email}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Member since {data.memberSince}</div>
                    <div style={{ display: "flex", gap: 0, background: "rgba(0,0,0,0.18)", borderRadius: 14, marginTop: 16, overflow: "hidden", width: "100%" }}>
                        {[{ v: STUDENT.bookings, l: "Lessons" }, { v: `RM ${STUDENT.spent}`, l: "Spent" }, { v: STUDENT.following, l: "Following" }].map((s, i) => (
                            <div key={i} style={{ flex: 1, padding: "10px 4px", textAlign: "center", borderRight: i < 2 ? `1px solid rgba(255,255,255,0.1)` : "none" }}>
                                <div style={{ color: "white", fontSize: 13, fontWeight: 900 }}>{s.v}</div>
                                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 8, marginTop: 1 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
                <div style={{ padding: "10px 16px 6px", fontSize: 10, color: T.gray400 }}>Tap the edit icon on any field to update it.</div>

                <div style={{ background: T.card, marginBottom: 8 }}>
                    <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900, letterSpacing: "0.03em" }}>Personal Information</div></div>
                    <Divider />
                    <Field icon="usr" label="Full Name" field="fullName" />
                    <Divider /><Field icon="mail" label="Email" field="email" />
                    <Divider /><Field icon="phone" label="Phone" field="phone" />
                    <Divider /><Field icon="cal" label="Date of Birth" field="dob" />
                    <Divider /><Field icon="usr" label="Gender" field="gender" />
                    <Divider /><Field icon="pin" label="Location" field="location" />
                </div>

                <div style={{ background: T.card, marginBottom: 8 }}>
                    <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>About Me</div></div>
                    <Divider />
                    <div style={{ padding: "12px 16px" }}>
                        {editing === "bio" ? (
                            <div>
                                <textarea value={data.bio} onChange={e => setData(d => ({ ...d, bio: e.target.value }))} autoFocus style={{ width: "100%", minHeight: 80, border: `1.5px solid ${T.p400}`, borderRadius: 10, padding: 10, fontSize: 11, color: T.gray900, background: T.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", resize: "none", lineHeight: 1.5, boxSizing: "border-box" }} />
                                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                    <button onClick={() => setEditing(null)} style={{ flex: 1, background: T.gray100, border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 700, color: T.gray600, cursor: "pointer" }}>Cancel</button>
                                    <button onClick={() => { setEditing(null); setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{ flex: 2, background: GRAD, border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 700, color: "white", cursor: "pointer" }}>Save Bio</button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <div style={{ flex: 1, fontSize: 11, color: T.gray700, lineHeight: 1.6 }}>{data.bio}</div>
                                <button onClick={() => setEditing("bio")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
                                    <Ic n="edit" s={14} c={T.gray300} />
                                </button>
                            </div>
                        )}
                    </div>
                    <Divider />
                    <div style={{ padding: "12px 16px 14px" }}>
                        <div style={{ fontSize: 10, color: T.gray400, fontWeight: 600, marginBottom: 8 }}>Learning Interests</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {data.interests.map(tag => (
                                <span key={tag} style={{ background: T.p100, color: T.p700, borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 600 }}>{tag}</span>
                            ))}
                            <button style={{ background: "none", border: `1px dashed ${T.border}`, borderRadius: 8, padding: "4px 10px", fontSize: 10, color: T.gray400, cursor: "pointer" }}>+ Add</button>
                        </div>
                    </div>
                </div>

                <div style={{ background: T.card, marginBottom: 8 }}>
                    <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Following ({STUDENT.following})</div></div>
                    <Divider />
                    {TEACHERS.slice(0, 3).map((t, i) => (
                        <div key={t.id}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px" }}>
                                <Av init={t.avatar} size={38} bg={T.p600} color="white" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>{t.name}</div>
                                    <div style={{ fontSize: 10, color: T.gray500 }}>{t.skill}</div>
                                </div>
                                <Stars rating={t.rating} size={10} />
                            </div>
                            {i < 2 && <Divider />}
                        </div>
                    ))}
                </div>

                <div style={{ background: T.card, marginBottom: 8 }}>
                    <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Preferences</div></div>
                    <Divider />
                    {[{ icon: "globe", label: "Language", value: data.language }, { icon: "bell", label: "Notifications", value: "All on" }, { icon: "shield", label: "Privacy", value: "Visible to teachers" }].map((r, i) => (
                        <div key={i}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px" }}>
                                <div style={{ width: 32, height: 32, borderRadius: 9, background: T.gray50, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Ic n={r.icon} s={15} c={T.gray400} />
                                </div>
                                <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: T.gray900 }}>{r.label}</div><div style={{ fontSize: 10, color: T.gray400 }}>{r.value}</div></div>
                                <Ic n="chev" s={14} c={T.gray300} />
                            </div>
                            {i < 2 && <Divider />}
                        </div>
                    ))}
                </div>

                <div style={{ background: T.card, marginBottom: 8 }}>
                    <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Account</div></div>
                    <Divider />
                    {[{ icon: "help", label: "Help & Support", sub: "FAQs, contact us" }, { icon: "shield", label: "Terms & Privacy", sub: "View our policies" }].map((r, i) => (
                        <div key={i}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", cursor: "pointer" }}>
                                <div style={{ width: 32, height: 32, borderRadius: 9, background: T.gray50, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Ic n={r.icon} s={15} c={T.gray400} />
                                </div>
                                <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: T.gray900 }}>{r.label}</div><div style={{ fontSize: 10, color: T.gray400 }}>{r.sub}</div></div>
                                <Ic n="chev" s={14} c={T.gray300} />
                            </div>
                            <Divider />
                        </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", cursor: "pointer" }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: T.redL, border: `1px solid ${T.red}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Ic n="log" s={15} c={T.red} />
                        </div>
                        <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: T.red }}>Sign Out</div></div>
                    </div>
                </div>
                <div style={{ height: 24 }} />
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════════════════
   APP SHELL
════════════════════════════════════════════════════════════ */
export default function GrowlinkStudentApp() {
    const [screen, setScreen] = useState("home");
    const [saved, setSaved] = useState(new Set());
    const [selT, setSelT] = useState(null);
    const [bookT, setBookT] = useState(null);
    const [bookStep, setBookStep] = useState(1);
    const [bookData, setBookData] = useState({});
    const [initPkg, setInitPkg] = useState(null);
    const [quickPeek, setQuickPeek] = useState(null);
    const [chatC, setChatC] = useState(null);

    const toggleSave = (id) => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
    const openTeacher = (t) => { setSelT(t); setQuickPeek(null); setScreen("teacher"); };
    const openPeek = (t) => setQuickPeek(t);
    const startBook = (t, pkg) => { setBookT(t); setInitPkg(pkg); setBookData({}); setBookStep(1); setQuickPeek(null); setScreen("booking"); };

    const goHome = (dest = "bkgs") => {
        setScreen(dest); setSelT(null); setBookT(null); setBookStep(1); setBookData({});
    };

    const unread = MSGS.reduce((s, m) => s + m.unread, 0);

    return (
        <div style={{ minHeight: "100vh", background: "#080F0B", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:0;height:0;}
        button,input,textarea{font-family:'DM Sans',sans-serif;}
        ::placeholder{color:rgba(255,255,255,0.4);}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
      `}</style>

            <div style={{ width: 375, height: 812, borderRadius: 48, border: "10px solid #1A2E24", boxShadow: "0 0 0 2px #0D1F17,0 32px 80px rgba(0,0,0,0.7)", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", background: T.surface }}>
                {/* Notch */}
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 28, background: "#1A2E24", borderRadius: "0 0 20px 20px", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "#0D1F17" }} />
                    <div style={{ width: 40, height: 5, borderRadius: 3, background: "#0D1F17" }} />
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", paddingTop: 0 }}>
                    {/* Chat overlay */}
                    {chatC && <ChatScreen contact={chatC} onClose={() => setChatC(null)} />}

                    {/* Quick Peek overlay */}
                    {quickPeek && (
                        <QuickPeekSheet
                            teacher={quickPeek}
                            saved={saved}
                            onToggleSave={toggleSave}
                            onClose={() => setQuickPeek(null)}
                            onBook={startBook}
                            onFullProfile={openTeacher}
                        />
                    )}

                    {/* Profile */}
                    {screen === "profile" && <ProfileScreen onBack={() => setScreen("home")} onNav={setScreen} />}

                    {/* Booking flow (3 steps) */}
                    {screen === "booking" && bookStep === 1 && (
                        <BookStep1 teacher={bookT} initPkg={initPkg} onBack={() => setScreen(selT ? "teacher" : "home")} onNext={d => { setBookData(d); setBookStep(2); }} />
                    )}
                    {screen === "booking" && bookStep === 2 && (
                        <BookStep2 teacher={bookT} booking={bookData} onBack={() => setBookStep(1)} onNext={d => { setBookData(d); setBookStep(3); }} />
                    )}
                    {screen === "booking" && bookStep === 3 && (
                        <BookStep3 teacher={bookT} booking={bookData} onDone={goHome} />
                    )}

                    {/* Teacher profile */}
                    {screen === "teacher" && selT && (
                        <TeacherProfile teacher={selT} onBack={() => setScreen(screen === "teacher" ? "disc" : "home")} onBook={startBook} saved={saved} onToggleSave={toggleSave} />
                    )}

                    {/* Main screens */}
                    {screen === "home" && (
                        <HomeScreen
                            onNav={setScreen}
                            onTeacher={openTeacher}
                            onProfile={() => setScreen("profile")}
                            saved={saved}
                            onToggleSave={toggleSave}
                            onQuickPeek={openPeek}
                            onQuickBook={(t) => startBook(t, t.pkgs[1])}
                        />
                    )}
                    {screen === "disc" && (
                        <DiscoverScreen
                            onNav={setScreen}
                            onQuickPeek={openPeek}
                            saved={saved}
                            onToggleSave={toggleSave}
                        />
                    )}
                    {screen === "bkgs" && <BookingsScreen onNav={setScreen} />}
                    {screen === "act" && <ActivityScreen onNav={setScreen} />}
                    {screen === "msgs" && <MessagesScreen onNav={setScreen} onChat={c => setChatC(c)} />}
                </div>
            </div>

            <div style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%) rotate(90deg)", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.12)", textTransform: "uppercase", userSelect: "none" }}>
                Growlink · Student Workspace · v2.0
            </div>
        </div>
    );
}
