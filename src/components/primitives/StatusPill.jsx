import { T } from "../../constants/tokens";

const STATUS_MAP = {
  confirmed: { bg: "#D1FAE5", c: "#065F46", l: "Confirmed" },
  pending:   { bg: T.amberL,  c: "#92400E", l: "Pending"   },
  completed: { bg: T.blueL,   c: "#0369A1", l: "Completed" },
  cancelled: { bg: T.redL,    c: "#991B1B", l: "Cancelled" },
};

/**
 * StatusPill — colored badge for booking status.
 * @param {string} status - one of: confirmed | pending | completed | cancelled
 */
const StatusPill = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP.confirmed;
  return (
    <span
      style={{
        background: s.bg, color: s.c,
        borderRadius: 6, padding: "2px 8px",
        fontSize: 9, fontWeight: 700,
      }}
    >
      {s.l}
    </span>
  );
};

export default StatusPill;
