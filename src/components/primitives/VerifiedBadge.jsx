import { T } from "../../constants/tokens";
import Icon from "../icons/Icon";

const BADGE_CFG = {
  verified:  { label: "Verified ID",       bg: "#EFF6FF",  c: "#1D4ED8" },
  certified: { label: "Certified",         bg: T.greenL,   c: "#166534" },
  bgCheck:   { label: "Background Check",  bg: T.amberL,   c: "#92400E" },
  top:       { label: "Top Rated",         bg: T.p100,     c: T.p800    },
};

/**
 * VerifiedBadge — trust signal badge for teacher profiles.
 * @param {string} type - one of: verified | certified | bgCheck | top
 */
const VerifiedBadge = ({ type }) => {
  const s = BADGE_CFG[type] || BADGE_CFG.verified;
  return (
    <span
      style={{
        background: s.bg, color: s.c, borderRadius: 6,
        padding: "2px 7px", fontSize: 8, fontWeight: 700,
        letterSpacing: "0.02em", display: "inline-flex",
        alignItems: "center", gap: 3,
      }}
    >
      <Icon n="chk" s={8} c={s.c} sw={3} />
      {s.label}
    </span>
  );
};

export default VerifiedBadge;
