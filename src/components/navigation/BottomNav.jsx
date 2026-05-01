import { T } from "../../constants/tokens";
import { NAV } from "../../constants/navigation";
import Icon from "../icons/Icon";

/**
 * BottomNav — persistent 5-tab navigation bar.
 * @param {string}   active  - currently active tab id
 * @param {Function} onNav   - tab selection callback
 * @param {number}   unread  - unread message count for badge
 */
const BottomNav = ({ active, onNav, unread = 0 }) => (
  <div
    style={{
      display: "flex", background: T.white,
      borderTop: `1px solid ${T.border}`,
      boxShadow: "0 -4px 24px rgba(0,0,0,0.07)",
      flexShrink: 0, paddingBottom: 4,
    }}
  >
    {NAV.map((it) => (
      <button
        key={it.id}
        onClick={() => onNav(it.id)}
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 2, padding: "8px 0 4px",
          background: "none", border: "none", cursor: "pointer",
          color: active === it.id ? T.p600 : T.gray400,
          transition: "color .15s", position: "relative",
        }}
      >
        <div
          style={{
            width: 40, height: 26, borderRadius: 13,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: active === it.id ? T.p100 : "transparent",
            transition: "background .15s", position: "relative",
          }}
        >
          <Icon n={it.icon} s={18} c={active === it.id ? T.p600 : T.gray400} />
          {it.id === "msgs" && unread > 0 && (
            <div
              style={{
                position: "absolute", top: -2, right: -2,
                minWidth: 16, height: 16, borderRadius: 8,
                background: T.red, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 8, fontWeight: 800, color: "white",
                border: "1.5px solid white", padding: "0 3px",
                animation: "popIn .3s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {unread}
            </div>
          )}
        </div>
        <span style={{ fontSize: 9, fontWeight: active === it.id ? 700 : 400 }}>
          {it.label}
        </span>
      </button>
    ))}
  </div>
);

export default BottomNav;
