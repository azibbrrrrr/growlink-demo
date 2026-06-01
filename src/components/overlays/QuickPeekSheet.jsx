import { useState, useEffect } from "react";
import { T, GRAD } from "../../constants/tokens";
import Icon from "../icons/Icon";
import Avatar from "../primitives/Avatar";
import VerifiedBadge from "../primitives/VerifiedBadge";

/**
 * QuickPeekSheet — half-sheet overlay showing teacher summary with quick book/save actions.
 * @param {object}   teacher       - teacher data object
 * @param {Set}      saved         - set of saved teacher IDs
 * @param {Function} onToggleSave
 * @param {Function} onClose
 * @param {Function} onBook        - (teacher, pkg) => void
 * @param {Function} onFullProfile - (teacher) => void
 */
const QuickPeekSheet = ({ teacher: t, saved, onToggleSave, onClose, onBook, onFullProfile }) => {
  const [show, setShow] = useState(false);
  const isSaved = saved.has(t.id);

  useEffect(() => { setTimeout(() => setShow(true), 20); }, []);

  const close = () => { setShow(false); setTimeout(onClose, 280); };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 300 }}>
      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.35)",
          opacity: show ? 1 : 0, transition: "opacity .28s",
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: T.card, borderRadius: "22px 22px 0 0",
          padding: "0 18px 20px",
          boxShadow: "0 -12px 40px rgba(0,0,0,0.15)",
          transform: show ? "translateY(0)" : "translateY(100%)",
          transition: "transform .28s cubic-bezier(0.34,1.1,0.64,1)",
        }}
      >
        {/* Drag handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: T.border, margin: "10px auto 16px" }} />

        {/* Teacher hero row */}
        <div style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ position: "relative" }}>
            <Avatar init={t.avatar} size={54} bg={T.p600} color="white" />
            {t.top && (
              <div style={{ position: "absolute", bottom: -2, right: -2, background: T.amber, borderRadius: 6, padding: "1px 5px", fontSize: 7, fontWeight: 700, color: "white" }}>
                TOP
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: T.gray900, letterSpacing: "-0.02em" }}>{t.name}</div>
            <div style={{ fontSize: 11, color: T.gray500, marginBottom: 5 }}>{t.skill}</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {t.verified  && <VerifiedBadge type="verified" />}
              {t.certified && <VerifiedBadge type="certified" />}
            </div>
          </div>
          <button
            onClick={() => onToggleSave(t.id)}
            style={{
              width: 36, height: 36, borderRadius: 18,
              background: isSaved ? T.redL : T.gray50,
              border: `1px solid ${isSaved ? T.red + "40" : T.border}`,
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon n="heart" s={16} c={isSaved ? T.red : T.gray400} fill={isSaved ? T.red : "none"} />
          </button>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", background: T.surface, borderRadius: 12, padding: "10px 0", marginBottom: 14, border: `1px solid ${T.border}` }}>
          {[
            { v: `★ ${t.rating}`,    l: `${t.reviews} reviews` },
            { v: `RM ${t.price}/hr`, l: "Starting price"        },
            { v: `${t.dist} km`,     l: "Distance"              },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: T.gray400, marginTop: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Next available slots */}
        {t.slots?.length > 0 && (
          <div style={{ background: T.p50, borderRadius: 12, padding: "10px 13px", marginBottom: 14, border: `1px solid ${T.p200}` }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: T.p700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>
              Next Available Slots
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {t.slots.slice(0, 3).map((sl) => (
                <button
                  key={sl}
                  onClick={() => { close(); setTimeout(() => onBook(t, t.pkgs[1]), 320); }}
                  style={{ background: "white", border: `1px solid ${T.p300}`, borderRadius: 8, padding: "4px 9px", fontSize: 9, fontWeight: 600, color: T.p700, cursor: "pointer" }}
                >
                  {sl}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mode chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {t.mode.map((m) => (
            <span key={m} style={{ background: T.p100, color: T.p700, borderRadius: 7, padding: "3px 9px", fontSize: 9, fontWeight: 600 }}>
              {m}
            </span>
          ))}
          <span style={{ background: T.gray100, color: T.gray500, borderRadius: 7, padding: "3px 9px", fontSize: 9 }}>
            Responds {t.avgResponse}
          </span>
        </div>

        {t.mode.includes("Physical") && (
          <div style={{ background: T.amberL, border: `1px solid ${T.amber}35`, borderRadius: 12, padding: "9px 11px", marginBottom: 14, display: "flex", gap: 9 }}>
            <Icon n="shield" s={14} c={T.amberD} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, color: T.gray900 }}>First lesson tip</div>
              <div style={{ fontSize: 9, color: T.gray600, lineHeight: 1.4 }}>Consider a public venue for your first physical lesson.</div>
            </div>
          </div>
        )}

        {/* CTAs */}
        <button
          onClick={() => { close(); setTimeout(() => onBook(t, t.pkgs[1]), 320); }}
          style={{ width: "100%", background: GRAD, border: "none", borderRadius: 13, padding: "12px", fontSize: 13, fontWeight: 800, color: "white", cursor: "pointer", marginBottom: 8, boxShadow: `0 4px 14px ${T.p600}40` }}
        >
          Book Now
        </button>
        <button
          onClick={() => { close(); setTimeout(() => onFullProfile(t), 320); }}
          style={{ width: "100%", background: "none", border: `1.5px solid ${T.border}`, borderRadius: 13, padding: "11px", fontSize: 12, fontWeight: 700, color: T.p700, cursor: "pointer" }}
        >
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default QuickPeekSheet;
