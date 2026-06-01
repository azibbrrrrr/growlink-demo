import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { BOOKINGS, MSGS, STUDENT, MATERIALS } from "../constants/data";
import { TEACHERS } from "../constants/data";
import Icon from "../components/icons/Icon";
import { Avatar, Card, StatusPill, GradientHeader, EmptyState } from "../components/primitives";
import BottomNav from "../components/navigation/BottomNav";
import SafetyBar from "../components/overlays/SafetyBar";
import SafetyCheckInScreen from "./SafetyCheckInScreen";

const BOOKED_DATES = { 3: "confirmed", 5: "pending", 1: "completed" };
const MONTH = Array.from({ length: 31 }, (_, i) => i + 1);

const BookingsScreen = ({ onNav, onProgress, onOpenMaterials }) => {
  const { T } = useTheme();
  const [filter,     setFilter]     = useState("all");
  const [bkgView,    setBkgView]    = useState("list");
  const [showMaterials, setShowMaterials] = useState(null); // teacherId fallback modal
  const [showSafety, setShowSafety] = useState(false);
  const [sosActive,  setSosActive]  = useState(false);
  const filters  = ["all", "confirmed", "pending", "completed"];
  const filtered = filter === "all" ? BOOKINGS : BOOKINGS.filter((b) => b.status === filter);
  const unread   = MSGS.reduce((s, m) => s + m.unread, 0);

  // Confirmed physical booking = show safety bar
  const activePhysical = BOOKINGS.find((b) => b.status === "confirmed" && b.mode?.includes("Physical"));

  const getTeacherForBooking = (b) => TEACHERS.find((t) => t.name === b.teacher);

  const CtaForBooking = ({ b }) => {
    const teacher = getTeacherForBooking(b);
    const hasMaterials = !!MATERIALS[teacher?.id]?.files?.length;
    const hasProgress  = teacher && (b.status === "completed" || b.status === "confirmed");

    if (b.action === "upcoming") return (
      <div>
        <div style={{ display: "flex", gap: 7, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
          <button style={{ flex: 1, background: T.p100, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.p700, cursor: "pointer" }}>Message</button>
          <button style={{ flex: 1, background: T.amberL, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.amberD, cursor: "pointer" }}>Reminder</button>
          {hasMaterials && <button onClick={() => onOpenMaterials ? onOpenMaterials(b) : setShowMaterials(teacher.id)} style={{ flex: 1, background: T.blueL, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.blue, cursor: "pointer" }}>Materials</button>}
        </div>
        {b.mode?.includes("Physical") && (
          <button onClick={() => setShowSafety(true)} style={{ width: "100%", marginTop: 6, background: T.greenL, border: `1px solid ${T.green}40`, borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.green, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <span>🛡️</span> Safety mode active · Location shared
          </button>
        )}
      </div>
    );
    if (b.action === "pending") return (
      <div style={{ display: "flex", gap: 7, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
        <button style={{ flex: 1, background: T.gray100, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.gray600, cursor: "pointer" }}>Cancel</button>
        <button style={{ flex: 1, background: T.blueL, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.blue, cursor: "pointer" }}>Message</button>
      </div>
    );
    if (b.action === "review") return (
      <div>
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
          <button style={{ width: "100%", background: T.amberL, border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 800, color: T.amberD, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <Icon n="star" s={12} c={T.amberD} fill={T.amberD} />Leave a Review
          </button>
        </div>
        {hasProgress && teacher && (
          <button onClick={() => onProgress && onProgress(b)} style={{ width: "100%", marginTop: 6, background: T.p50, border: `1px solid ${T.p200}`, borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 700, color: T.p700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            View Progress
          </button>
        )}
        {hasMaterials && (
          <button onClick={() => onOpenMaterials ? onOpenMaterials(b) : setShowMaterials(teacher.id)} style={{ width: "100%", marginTop: 6, background: T.blueL, border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 700, color: T.blue, cursor: "pointer" }}>
            View Materials
          </button>
        )}
      </div>
    );
    return null;
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* ── Safety modal ── */}
      {showSafety && <SafetyCheckInScreen onClose={() => setShowSafety(false)} />}

      {showSafety && sosActive && (
        <div style={{ position: "absolute", inset: 0, zIndex: 300, display: "flex", alignItems: "flex-end" }}>
          <div onClick={() => setShowSafety(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "relative", width: "100%", background: "white", borderRadius: "20px 20px 0 0", padding: "20px 16px 28px", zIndex: 1 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: T.gray200, margin: "0 auto 16px" }} />
            {sosActive ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🚨</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.red, marginBottom: 4 }}>Alerting emergency contacts…</div>
                <div style={{ fontSize: 12, color: T.gray500, marginBottom: 16 }}>Nur Aina has been notified with your location and teacher details.</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setSosActive(false); setShowSafety(false); }} style={{ flex: 1, background: T.gray100, border: "none", borderRadius: 12, padding: 12, fontSize: 13, fontWeight: 700, color: T.gray600, cursor: "pointer" }}>Cancel</button>
                  <button style={{ flex: 1, background: T.red, border: "none", borderRadius: 12, padding: 12, fontSize: 13, fontWeight: 800, color: "white", cursor: "pointer" }}>Call 999</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: T.greenL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🛡️</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.gray900 }}>Safety Mode Active</div>
                    <div style={{ fontSize: 11, color: T.gray500 }}>Lesson active · Location shared with Nur Aina</div>
                  </div>
                </div>
                <div style={{ background: T.p50, borderRadius: 12, padding: "12px", marginBottom: 14, fontSize: 11, color: T.p800, lineHeight: 1.5 }}>
                  Your location is being shared with your emergency contact during this physical lesson. You can stop sharing at any time.
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setShowSafety(false)} style={{ flex: 2, background: T.p600, border: "none", borderRadius: 12, padding: 12, fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer" }}>Got it</button>
                  <button onClick={() => setSosActive(true)} style={{ flex: 1, background: T.redL, border: `1px solid ${T.red}`, borderRadius: 12, padding: 12, fontSize: 12, fontWeight: 800, color: T.red, cursor: "pointer" }}>SOS</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Materials modal ── */}
      {showMaterials && (
        <div style={{ position: "absolute", inset: 0, zIndex: 300, display: "flex", alignItems: "flex-end" }}>
          <div onClick={() => setShowMaterials(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "relative", width: "100%", background: "white", borderRadius: "20px 20px 0 0", padding: "20px 16px 28px", maxHeight: "70%", zIndex: 1 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: T.gray200, margin: "0 auto 16px" }} />
            <div style={{ fontSize: 14, fontWeight: 800, color: T.gray900, marginBottom: 4 }}>Lesson Materials</div>
            {MATERIALS[showMaterials]?.homework && (
              <div style={{ background: T.amberL, borderRadius: 10, padding: "10px 12px", marginBottom: 14, display: "flex", gap: 8 }}>
                <Icon n="book" s={14} c={T.amberD} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.amberD, marginBottom: 2 }}>Homework</div>
                  <div style={{ fontSize: 11, color: T.gray700, lineHeight: 1.4 }}>{MATERIALS[showMaterials].homework}</div>
                </div>
              </div>
            )}
            {(MATERIALS[showMaterials]?.files || []).map((f) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: f.type === "pdf" ? T.redL : T.blueL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
                  {f.type === "pdf" ? "📄" : "🖼️"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.gray900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                  <div style={{ fontSize: 9, color: T.gray400 }}>{f.date}</div>
                </div>
                <button style={{ background: T.p50, border: `1px solid ${T.p200}`, borderRadius: 8, padding: "5px 10px", fontSize: 10, fontWeight: 700, color: T.p600, cursor: "pointer" }}>Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <GradientHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "white" }}>My Bookings</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ id: "list", icon: "list" }, { id: "cal", icon: "cal" }].map((v) => (
              <button key={v.id} onClick={() => setBkgView(v.id)} style={{ width: 32, height: 32, borderRadius: 9, background: bkgView === v.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon n={v.icon} s={15} c={bkgView === v.id ? T.p700 : "rgba(255,255,255,0.8)"} />
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", background: filter === f ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)", color: filter === f ? T.p800 : "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, textTransform: "capitalize", flexShrink: 0 }}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </GradientHeader>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[{ v: STUDENT.bookings, l: "Total Booked" }, { v: `RM ${STUDENT.spent}`, l: "Total Spent" }, { v: "2", l: "Upcoming" }].map((s, i) => (
            <div key={i} style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "11px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: T.p600, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: T.gray400, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {activePhysical && (
          <SafetyBar contactName={STUDENT.emergencyContact?.name || "your emergency contact"} onCheckIn={() => setShowSafety(true)} />
        )}

        {/* Calendar view */}
        {bkgView === "cal" && (
          <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>March 2026</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 10 }}>
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: T.gray400, padding: "2px 0" }}>{d}</div>
              ))}
              {[...Array(5)].map((_, i) => <div key={`e${i}`} />)}
              {MONTH.map((d) => {
                const status = BOOKED_DATES[d];
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
          </div>
        )}

        {/* Booking list */}
        {filtered.length === 0 ? (
          <EmptyState icon="book" title="Your first lesson is one tap away." sub="Discover teachers near you and book your first lesson." cta="Explore Teachers" onCta={() => onNav("disc")} />
        ) : filtered.map((b) => (
          <Card key={b.id} style={{ marginBottom: 10, overflow: "hidden" }}>
            <div style={{ height: 4, background: b.status === "confirmed" ? T.p400 : b.status === "pending" ? T.amber : b.status === "completed" ? T.blue : T.red, transition: "background .2s" }} />
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Avatar init={b.avatar} size={40} bg={T.p600} color="white" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>{b.teacher}</div>
                  <div style={{ fontSize: 10, color: T.gray500 }}>{b.skill} · {b.pkg}</div>
                </div>
                <StatusPill status={b.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                {[{ i: "cal", v: b.date }, { i: "clk", v: b.time }, { i: "pin", v: b.mode.replace("Physical – ", "") }, { i: "book", v: `Session ${b.session}` }].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <Icon n={r.i} s={10} c={T.gray400} />
                    <span style={{ fontSize: 10, color: T.gray600 }}>{r.v}</span>
                  </div>
                ))}
              </div>
              {b.countdown && (
                <div style={{ marginTop: 7, display: "inline-flex", alignItems: "center", gap: 4, background: b.action === "upcoming" ? T.greenL : T.amberL, borderRadius: 7, padding: "3px 8px" }}>
                  <Icon n="clk" s={10} c={b.action === "upcoming" ? T.green : T.amberD} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: b.action === "upcoming" ? T.green : T.amberD }}>{b.countdown}</span>
                </div>
              )}
              <CtaForBooking b={b} />
            </div>
          </Card>
        ))}
        <div style={{ height: 16 }} />
      </div>
      <BottomNav active="bkgs" onNav={onNav} unread={unread} />
    </div>
  );
};

export default BookingsScreen;
