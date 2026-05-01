import { useState, useEffect } from "react";
import { T, GRAD } from "../../constants/tokens";
import Icon from "../../components/icons/Icon";
import { ProgressBar } from "../../components/primitives";

const BookStep3 = ({ teacher: t, booking, onDone }) => {
  const [show,   setShow]   = useState(false);
  const [checks, setChecks] = useState({});

  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  const deposit = Math.round(booking.pkg.price * 0.25);
  const ref     = `GRW-2026-${Math.floor(Math.random() * 90000 + 10000)}`;
  const isOnline = booking.mode === "Online";

  const checkItems = isOnline
    ? ["Ensure a stable internet connection", "Test your camera and microphone", "Set a reminder 5 minutes before", "Prepare your notebook or materials"]
    : ["Save the teacher's address to your maps", "Allow extra time for travel", "Set a reminder 15 minutes before", "Bring any required materials or notes"];

  const doneCount = Object.values(checks).filter(Boolean).length;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: GRAD, overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Success hero */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 24px", textAlign: "center" }}>
          <div style={{ width: 88, height: 88, borderRadius: 44, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transform: show ? "scale(1)" : "scale(0.5)", opacity: show ? 1 : 0, transition: "all .5s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon n="tick" s={34} c={T.p600} sw={2.5} />
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
              <ProgressBar v={doneCount} max={checkItems.length} h={4} color="rgba(255,255,255,0.9)" bg="rgba(255,255,255,0.2)" />
            </div>
            {checkItems.map((item, i) => (
              <button key={i} onClick={() => setChecks((c) => ({ ...c, [i]: !c[i] }))} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: "6px 0", textAlign: "left" }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checks[i] ? "transparent" : "rgba(255,255,255,0.4)"}`, background: checks[i] ? "rgba(255,255,255,0.9)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>
                  {checks[i] && <Icon n="chk" s={11} c={T.p600} sw={3} />}
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

export default BookStep3;
