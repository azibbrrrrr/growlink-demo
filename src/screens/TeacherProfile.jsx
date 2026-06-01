import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { MATERIALS } from "../constants/data";
import Icon from "../components/icons/Icon";
import { Avatar, Card, Stars, ProgressBar, VerifiedBadge, BackButton } from "../components/primitives";

const REVIEWS = [
  { name: "Lim Kai Xin",   rating: 5, date: "Feb 2026", text: "Absolutely wonderful teacher — patient and explains concepts clearly. My child improved so much in just 4 sessions." },
  { name: "Razif Mukhtar", rating: 5, date: "Jan 2026", text: "Professional and punctual. Lessons are well-structured. Highly recommend." },
  { name: "Tan Sock Ping", rating: 4, date: "Jan 2026", text: "Great knowledge and teaching style. Pace can be a bit fast, but overall very positive." },
];

const RATING_BREAKDOWN = [{ s: 5, p: 88 }, { s: 4, p: 9 }, { s: 3, p: 2 }, { s: 2, p: 1 }, { s: 1, p: 0 }];

const TeacherProfile = ({ teacher: t, onBack, onBook, saved, onToggleSave, initialTab = "about", onCompare, compareList = [] }) => {
  const { T, GRAD } = useTheme();
  const [tab, setTab] = useState(initialTab);
  const isSaved = saved.has(t.id);
  const materials = MATERIALS[t.id]?.files || [];
  const homework  = MATERIALS[t.id]?.homework || null;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: GRAD, padding: "36px 16px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <BackButton onBack={onBack} />
          <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: "white" }}>Teacher Profile</div>
          {onCompare && (
            <button onClick={() => onCompare(t)} style={{ height: 34, borderRadius: 17, background: compareList.includes(t.id) ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", padding: "0 11px", fontSize: 10, fontWeight: 900, color: compareList.includes(t.id) ? T.p700 : "white" }}>
              Compare
            </button>
          )}
          <button onClick={() => onToggleSave(t.id)} style={{ width: 34, height: 34, borderRadius: 17, background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon n="heart" s={16} c={isSaved ? T.amber : "white"} fill={isSaved ? T.amber : "none"} sw={2} />
          </button>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
          <div style={{ position: "relative" }}>
            <Avatar init={t.avatar} size={66} bg="rgba(255,255,255,0.25)" color="white" />
            {t.top && <div style={{ position: "absolute", bottom: -2, right: -2, background: T.amber, borderRadius: 7, padding: "2px 6px", fontSize: 8, fontWeight: 700, color: "white" }}>TOP</div>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 900, color: "white", letterSpacing: "-0.02em" }}>{t.name}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 2 }}>{t.skill}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
              {t.verified  && <VerifiedBadge type="verified" />}
              {t.certified && <VerifiedBadge type="certified" />}
              {t.bgCheck   && <VerifiedBadge type="bgCheck" />}
              {t.top       && <VerifiedBadge type="top" />}
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "white" }}>RM {t.price}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>/hour</div>
          </div>
        </div>
        <div style={{ display: "flex", background: "rgba(0,0,0,0.15)", borderRadius: "12px 12px 0 0", marginTop: 14 }}>
          {[{ v: t.exp, l: "Experience" }, { v: t.avail, l: "Availability" }, { v: t.avgResponse, l: "Response" }].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "9px 6px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div style={{ color: "white", fontSize: i === 0 ? 11 : 9, fontWeight: 800, lineHeight: 1.2 }}>{s.v}</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 8, marginTop: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: T.card, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        {["about", "services", "reviews", "materials"].map((tb) => (
          <button key={tb} onClick={() => setTab(tb)} style={{ flex: 1, padding: "11px", background: "none", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, textTransform: "capitalize", color: tab === tb ? T.p700 : T.gray400, borderBottom: tab === tb ? `2px solid ${T.p600}` : "2px solid transparent" }}>{tb}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {tab === "about" && (
          <>
            <Card style={{ padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>About</div>
              <div style={{ fontSize: 12, color: T.gray700, lineHeight: 1.6 }}>{t.bio}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                {t.lang.map((l) => <span key={l} style={{ background: T.p100, color: T.p700, borderRadius: 7, padding: "3px 9px", fontSize: 9, fontWeight: 600 }}>{l}</span>)}
              </div>
            </Card>
            <Card style={{ padding: 14, marginBottom: 12, border: `1.5px solid ${T.p200}`, background: T.p50 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: T.p800 }}>Next Available</div>
                <span style={{ fontSize: 9, color: T.gray400 }}>Tap to book directly</span>
              </div>
              {t.slots?.map((sl) => (
                <button key={sl} onClick={() => onBook(t, t.pkgs[1])} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: "white", border: `1px solid ${T.p300}`, borderRadius: 10, padding: "9px 12px", marginBottom: 7, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon n="cal" s={14} c={T.p600} /></div>
                  <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: T.gray900 }}>{sl}</span>
                  <div style={{ background: T.p600, borderRadius: 8, padding: "4px 10px", fontSize: 9, fontWeight: 700, color: "white" }}>Book</div>
                </button>
              ))}
            </Card>
            <Card style={{ padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 10 }}>Lesson Modes</div>
              {t.mode.map((m) => (
                <div key={m} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: T.p100, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n={m === "Online" ? "globe" : "home"} s={14} c={T.p600} /></div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{m}</div>
                    <div style={{ fontSize: 9, color: T.gray400 }}>{m === "Online" ? "Google Meet / Zoom" : "Teacher's or Student's place"}</div>
                  </div>
                </div>
              ))}
            </Card>
            <Card style={{ padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Rating Breakdown</div>
              {RATING_BREAKDOWN.map((r) => (
                <div key={r.s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: 9, color: T.gray500, width: 8 }}>{r.s}</span>
                  <span style={{ fontSize: 9, color: T.amber }}>★</span>
                  <div style={{ flex: 1 }}><ProgressBar v={r.p} max={100} h={5} /></div>
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
                {RATING_BREAKDOWN.map((r) => (
                  <div key={r.s} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 8, color: T.gray400, width: 8 }}>{r.s}</span>
                    <div style={{ flex: 1 }}><ProgressBar v={r.p} max={100} h={5} /></div>
                  </div>
                ))}
              </div>
            </div>
            {REVIEWS.map((r, i) => (
              <Card key={i} style={{ padding: "12px 14px", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Avatar init={r.name[0] + r.name.split(" ").slice(-1)[0][0]} size={30} bg={T.gray200} color={T.gray600} />
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
        {tab === "materials" && (
          <>
            {homework && (
              <div style={{ background: T.amberL, borderRadius: 14, padding: "12px 14px", marginBottom: 12, display: "flex", gap: 10 }}>
                <span style={{ fontSize: 18 }}>📝</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: T.amberD, marginBottom: 3 }}>Current Homework</div>
                  <div style={{ fontSize: 11, color: T.gray700, lineHeight: 1.5 }}>{homework}</div>
                </div>
              </div>
            )}
            {materials.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: T.gray400 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📂</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>No materials yet</div>
                <div style={{ fontSize: 11, marginTop: 4 }}>Your teacher will upload files here before sessions.</div>
              </div>
            ) : materials.map((f) => (
              <Card key={f.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", marginBottom: 8 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: f.type === "pdf" ? "#FEE2E2" : "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
                  {f.type === "pdf" ? "📄" : "🖼️"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: T.gray400 }}>{f.date}</div>
                </div>
                <button style={{ background: T.p50, border: `1px solid ${T.p200}`, borderRadius: 8, padding: "5px 10px", fontSize: 10, fontWeight: 700, color: T.p600, cursor: "pointer" }}>Save</button>
              </Card>
            ))}
            <div style={{ background: T.p50, borderRadius: 14, padding: "12px 14px", marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.p800, marginBottom: 3 }}>Teacher uploads files here</div>
              <div style={{ fontSize: 10, color: T.gray600 }}>Lesson sheets, notes, and resources stay attached to your booking.</div>
            </div>
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

export default TeacherProfile;
