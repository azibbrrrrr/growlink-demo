import { T } from "../../constants/tokens";

/**
 * StepBar — 3-step progress bar for the booking flow.
 * @param {number} active - 0-indexed current step (0, 1, or 2)
 */
const StepBar = ({ active }) => (
  <div style={{ display: "flex", padding: "10px 16px", gap: 4, flexShrink: 0, background: T.card, borderBottom: `1px solid ${T.border}` }}>
    {["Package & Schedule", "Review & Pay", "Confirmation"].map((s, i) => (
      <div key={i} style={{ flex: 1 }}>
        <div style={{ height: 4, borderRadius: 2, background: i <= active ? T.p600 : T.border, marginBottom: 4, transition: "background .3s" }} />
        <div style={{ fontSize: 8, color: i <= active ? T.p600 : T.gray300, fontWeight: i <= active ? 700 : 400, textAlign: "center" }}>{s}</div>
      </div>
    ))}
  </div>
);

export default StepBar;
