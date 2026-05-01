import { T } from "../../constants/tokens";

/**
 * Divider — 1px horizontal rule.
 * @param {number} mx - horizontal margin in px (default 16)
 */
const Divider = ({ mx = 16 }) => (
  <div style={{ height: 1, background: T.border, margin: `0 ${mx}px` }} />
);

export default Divider;
