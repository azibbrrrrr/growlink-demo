import { useRef, useState } from "react";
import { T } from "../../constants/tokens";
import Icon from "../icons/Icon";

const SafetyBar = ({ contactName = "your emergency contact", onCheckIn }) => {
  const [alerting, setAlerting] = useState(false);
  const timer = useRef(null);

  const startHold = () => {
    timer.current = setTimeout(() => setAlerting(true), 3000);
  };
  const stopHold = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  if (alerting) {
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 420, background: "#220708", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <div style={{ width: 84, height: 84, borderRadius: 42, background: T.red, color: "white", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}><Icon n="shield" s={38} c="white" /></div>
        <div style={{ color: "white", fontSize: 21, fontWeight: 900, marginBottom: 8 }}>Alerting emergency contacts...</div>
        <div style={{ color: "rgba(255,255,255,0.68)", fontSize: 12, lineHeight: 1.5, marginBottom: 22 }}>We are sharing your lesson details and current location with {contactName}.</div>
        <button onClick={() => setAlerting(false)} style={{ background: "white", color: T.red, border: "none", borderRadius: 14, padding: "12px 24px", fontSize: 12, fontWeight: 900 }}>Cancel Alert</button>
      </div>
    );
  }

  return (
    <div style={{ background: T.redL, border: `1px solid ${T.red}35`, borderRadius: 14, padding: "10px 11px", marginBottom: 10, display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: 28, height: 28, borderRadius: 10, background: T.red, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon n="shield" s={14} c="white" /></div>
      <button onClick={onCheckIn} style={{ flex: 1, textAlign: "left", background: "none", border: "none", padding: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: T.gray900 }}>Lesson active</div>
        <div style={{ fontSize: 9, color: T.gray500, lineHeight: 1.35 }}>Location shared with {contactName}. Tap for check-in.</div>
      </button>
      <button
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
        style={{ border: "none", borderRadius: 10, background: T.red, color: "white", padding: "8px 9px", fontSize: 9, fontWeight: 900 }}
      >
        Hold SOS
      </button>
    </div>
  );
};

export default SafetyBar;
