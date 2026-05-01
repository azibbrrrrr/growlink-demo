import { T } from "../../constants/tokens";

/**
 * ProgressBar — horizontal progress bar.
 * @param {number} v     - current value
 * @param {number} max   - maximum value (default 100)
 * @param {number} h     - height in px (default 5)
 * @param {string} color - fill color
 * @param {string} bg    - track background color
 */
const ProgressBar = ({ v, max = 100, h = 5, color = T.p500, bg = T.p100 }) => (
  <div style={{ height: h, background: bg, borderRadius: h / 2, overflow: "hidden" }}>
    <div
      style={{
        height: "100%",
        width: `${(v / max) * 100}%`,
        background: color,
        borderRadius: h / 2,
        transition: "width .5s ease",
      }}
    />
  </div>
);

export default ProgressBar;
