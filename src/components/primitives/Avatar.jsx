import { T } from "../../constants/tokens";

/**
 * Avatar — circular avatar with optional online indicator dot.
 * @param {string} init   - initials to display
 * @param {number} size   - diameter in px
 * @param {string} bg     - background color
 * @param {string} color  - text color
 * @param {boolean} online - show green online dot
 */
const Avatar = ({ init, size = 36, bg = T.p600, color = "white", online = false }) => (
  <div style={{ position: "relative", flexShrink: 0 }}>
    <div
      style={{
        width: size, height: size, borderRadius: size / 2,
        background: bg, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: size * 0.33,
        fontWeight: 800, color, letterSpacing: "-0.02em",
      }}
    >
      {init}
    </div>
    {online && (
      <div
        style={{
          position: "absolute", bottom: 1, right: 1,
          width: 9, height: 9, borderRadius: 5,
          background: T.green, border: "2px solid white",
        }}
      />
    )}
  </div>
);

export default Avatar;
