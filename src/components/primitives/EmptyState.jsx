import { T, GRAD } from "../../constants/tokens";
import Icon from "../icons/Icon";

/**
 * EmptyState — centered illustration with title, subtitle, and optional CTA.
 * @param {string}   icon    - Icon key
 * @param {string}   title   - bold heading
 * @param {string}   sub     - descriptive subtitle
 * @param {string}   cta     - CTA button label (optional)
 * @param {Function} onCta   - CTA click handler
 */
const EmptyState = ({ icon, title, sub, cta, onCta }) => (
  <div
    style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 28px", textAlign: "center",
    }}
  >
    <div
      style={{
        width: 64, height: 64, borderRadius: 32,
        background: T.p100, display: "flex",
        alignItems: "center", justifyContent: "center", marginBottom: 16,
      }}
    >
      <Icon n={icon} s={28} c={T.p400} />
    </div>
    <div style={{ fontSize: 15, fontWeight: 800, color: T.gray900, marginBottom: 6 }}>{title}</div>
    <div style={{ fontSize: 12, color: T.gray400, lineHeight: 1.6, marginBottom: 20 }}>{sub}</div>
    {cta && (
      <button
        onClick={onCta}
        style={{
          background: GRAD, border: "none", borderRadius: 12,
          padding: "10px 24px", fontSize: 12, fontWeight: 800,
          color: "white", cursor: "pointer",
          boxShadow: `0 4px 14px ${T.p600}40`,
        }}
      >
        {cta}
      </button>
    )}
  </div>
);

export default EmptyState;
