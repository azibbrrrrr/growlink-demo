import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Icon from "../../components/icons/Icon";
import { Avatar, GradientHeader, BackButton } from "../../components/primitives";
import StepBar from "./StepBar";

const DAYS  = [{ d: "Mon", n: 3 }, { d: "Tue", n: 4 }, { d: "Wed", n: 5 }, { d: "Thu", n: 6 }, { d: "Fri", n: 7 }, { d: "Sat", n: 8 }, { d: "Sun", n: 9 }];
const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "7:00 PM"];
const BLOCKED = ["11:00 AM", "3:00 PM"];

const BookStep1 = ({ teacher: t, initPkg, onNext, onBack }) => {
  const { T, GRAD } = useTheme();
  const [pkg,       setPkg]       = useState(initPkg || t.pkgs[1]);
  const [mode,      setMode]      = useState("Online");
  const [date,      setDate]      = useState(null);
  const [time,      setTime]      = useState(null);
  const [recurring, setRecurring] = useState(false);
  const [recurWeeks, setRecurWeeks] = useState(4);

  const modes = t.mode.includes("Physical")
    ? ["Online", "Physical – Teacher's", "Physical – Student's"]
    : ["Online"];
  const ready = date && time;

  const packageTotal = pkg.price * (recurring ? recurWeeks : 1);
  const discount = recurring ? Math.round(packageTotal * 0.05) : 0;
  const finalPrice = packageTotal - discount;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: T.surface }}>
      <GradientHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <BackButton onBack={onBack} />
          <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Book a Lesson</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 12px" }}>
          <Avatar init={t.avatar} size={34} bg="rgba(255,255,255,0.3)" color="white" />
          <div>
            <div style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{t.name}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>{t.skill}</div>
          </div>
        </div>
      </GradientHeader>
      <StepBar active={0} />

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {/* Package */}
        <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Package</div>
        {t.pkgs.map((p, i) => (
          <button key={p.id} onClick={() => setPkg(p)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: pkg.id === p.id ? T.p50 : T.card, borderRadius: 12, padding: "10px 12px", marginBottom: 7, border: `2px solid ${pkg.id === p.id ? T.p500 : T.border}`, cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, border: `2px solid ${pkg.id === p.id ? T.p600 : T.gray300}`, background: pkg.id === p.id ? T.p600 : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {pkg.id === p.id && <Icon n="chk" s={10} c="white" sw={3} />}
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
          {modes.map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "9px 4px", borderRadius: 11, border: `1.5px solid ${mode === m ? T.p500 : T.border}`, background: mode === m ? T.p50 : T.surface, cursor: "pointer", transition: "all .15s" }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: mode === m ? T.p600 : T.gray100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon n={m === "Online" ? "globe" : "pin"} s={13} c={mode === m ? "white" : T.gray400} />
              </div>
              <span style={{ fontSize: 8, fontWeight: mode === m ? 700 : 500, color: mode === m ? T.p700 : T.gray500, textAlign: "center", lineHeight: 1.2 }}>{m.replace("Physical – ", "")}</span>
            </button>
          ))}
        </div>

        {/* Date */}
        <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Date — March 2026</div>
        <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
          {DAYS.map((d) => (
            <button key={d.n} onClick={() => setDate(d)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 2px", borderRadius: 11, cursor: "pointer", background: date?.n === d.n ? T.p600 : T.surface, border: date?.n === d.n ? "none" : `1px solid ${T.border}`, transition: "all .15s" }}>
              <span style={{ fontSize: 8, color: date?.n === d.n ? "rgba(255,255,255,0.7)" : T.gray400 }}>{d.d}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: date?.n === d.n ? "white" : T.gray900 }}>{d.n}</span>
            </button>
          ))}
        </div>

        {/* Time */}
        <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Time Slot</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginBottom: 16 }}>
          {TIMES.map((tm) => {
            const isBlocked = BLOCKED.includes(tm);
            const isSel = time === tm;
            return (
              <button key={tm} onClick={() => !isBlocked && setTime(tm)} style={{ padding: "8px 4px", borderRadius: 10, border: isSel ? "none" : isBlocked ? `1px solid ${T.gray100}` : `1px solid ${T.border}`, cursor: isBlocked ? "not-allowed" : "pointer", textAlign: "center", background: isSel ? T.p600 : isBlocked ? T.gray50 : T.surface, color: isSel ? "white" : isBlocked ? T.gray300 : T.gray900, fontSize: 10, fontWeight: isSel ? 800 : 500, opacity: isBlocked ? 0.5 : 1, transition: "all .15s" }}>
                {tm}
                {isBlocked && <div style={{ fontSize: 7, color: T.gray300, marginTop: 1 }}>Booked</div>}
              </button>
            );
          })}
        </div>

        {/* ── Recurring booking toggle ── */}
        <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: recurring ? T.p100 : T.gray50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 16 }}>📅</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>Recurring booking</div>
              <div style={{ fontSize: 10, color: T.gray500 }}>Book every week — 5% discount</div>
            </div>
            <button onClick={() => setRecurring((r) => !r)} style={{ width: 44, height: 24, borderRadius: 12, background: recurring ? T.p600 : T.gray200, border: "none", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 2, left: recurring ? 22 : 2, width: 20, height: 20, borderRadius: 10, background: "white", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
          {recurring && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 11, color: T.gray600, marginBottom: 8 }}>Repeat every week for:</div>
              <div style={{ display: "flex", gap: 7 }}>
                {[4, 8].map((w) => (
                  <button key={w} onClick={() => setRecurWeeks(w)} style={{ flex: 1, padding: "7px", borderRadius: 9, border: `1.5px solid ${recurWeeks === w ? T.p600 : T.border}`, background: recurWeeks === w ? T.p50 : T.surface, cursor: "pointer" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: recurWeeks === w ? T.p600 : T.gray900 }}>{w} weeks</div>
                    <div style={{ fontSize: 9, color: T.gray400 }}>{w} sessions</div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 10, background: T.p50, borderRadius: 9, padding: "8px 12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: T.p700 }}>Total with 5% discount</span>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 14, fontWeight: 900, color: T.p600 }}>RM {finalPrice}</span>
                  <div style={{ fontSize: 9, color: T.gray400 }}>Save RM {discount}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ height: 8 }} />
      </div>

      <div style={{ padding: "10px 16px 14px" }}>
        <button disabled={!ready} onClick={() => onNext({ pkg, mode, date, time, recurring, recurWeeks })} style={{ width: "100%", background: ready ? GRAD : "rgba(0,0,0,0.08)", border: "none", borderRadius: 14, padding: 13, fontSize: 13, fontWeight: 800, color: ready ? "white" : T.gray300, cursor: ready ? "pointer" : "not-allowed", transition: "all .2s", boxShadow: ready ? `0 6px 20px ${T.p600}45` : "none" }}>
          {ready ? `Next: Review & Pay${recurring ? ` · RM ${finalPrice}` : ""}` : "Select date and time to continue"}
        </button>
      </div>
    </div>
  );
};

export default BookStep1;
