import { useState } from "react";
import { T } from "../constants/tokens";
import Icon from "../components/icons/Icon";

const SafetyCheckInScreen = ({ onClose }) => {
  const [state, setState] = useState("ask");

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 410, display: "flex", alignItems: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.44)" }} />
      <div style={{ position: "relative", width: "100%", background: T.card, borderRadius: "22px 22px 0 0", padding: "18px 18px 28px", boxShadow: "0 -16px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ width: 38, height: 4, borderRadius: 2, background: T.border, margin: "0 auto 16px" }} />
        {state === "ask" && (
          <>
            <div style={{ fontSize: 17, fontWeight: 900, color: T.gray900, marginBottom: 6 }}>Quick check</div>
            <div style={{ fontSize: 12, color: T.gray500, lineHeight: 1.5, marginBottom: 16 }}>How's the lesson going?</div>
            <button onClick={onClose} style={{ width: "100%", background: T.greenL, color: T.green, border: "none", borderRadius: 13, padding: 12, fontSize: 12, fontWeight: 900, marginBottom: 8 }}>All good</button>
            <button onClick={() => setState("leave")} style={{ width: "100%", background: T.amberL, color: T.amberD, border: "none", borderRadius: 13, padding: 12, fontSize: 12, fontWeight: 900, marginBottom: 8 }}>I want to leave</button>
            <button onClick={() => setState("help")} style={{ width: "100%", background: T.redL, color: T.red, border: "none", borderRadius: 13, padding: 12, fontSize: 12, fontWeight: 900 }}>I need help</button>
          </>
        )}
        {state === "leave" && (
          <>
            <div style={{ fontSize: 17, fontWeight: 900, color: T.gray900, marginBottom: 8 }}>A calm exit script</div>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 14, color: T.gray700, fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>
              "Thank you for today. I am not feeling well and need to head home now. I'll follow up in the app."
            </div>
            <button onClick={onClose} style={{ width: "100%", background: T.p600, color: "white", border: "none", borderRadius: 13, padding: 12, fontSize: 12, fontWeight: 900 }}>Close</button>
          </>
        )}
        {state === "help" && (
          <>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: T.redL, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><Icon n="shield" s={24} c={T.red} /></div>
            <div style={{ fontSize: 17, fontWeight: 900, color: T.gray900, marginBottom: 8 }}>Alerting contacts silently</div>
            <div style={{ fontSize: 12, color: T.gray500, lineHeight: 1.5, marginBottom: 16 }}>Your emergency contact receives your lesson details without notifying the teacher.</div>
            <button onClick={onClose} style={{ width: "100%", background: T.red, color: "white", border: "none", borderRadius: 13, padding: 12, fontSize: 12, fontWeight: 900 }}>Cancel silent alert</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SafetyCheckInScreen;
