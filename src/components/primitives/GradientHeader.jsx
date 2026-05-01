import { GRAD } from "../../constants/tokens";

/**
 * GradientHeader — standard green gradient header bar.
 * @param {ReactNode} children
 * @param {string}    pad    - padding shorthand (default "36px 18px 18px")
 */
const GradientHeader = ({ children, pad = "36px 18px 18px" }) => (
  <div style={{ background: GRAD, padding: pad, flexShrink: 0 }}>
    {children}
  </div>
);

export default GradientHeader;
