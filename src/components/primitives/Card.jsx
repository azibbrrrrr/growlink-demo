import { T } from "../../constants/tokens";

/**
 * Card — base surface component with border, shadow, and optional click handler.
 * @param {ReactNode} children
 * @param {object}    style    - additional inline styles
 * @param {Function}  onClick  - makes the card interactive (pointer cursor)
 */
const Card = ({ children, style = {}, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background:  T.card,
      borderRadius: 14,
      border:      `1px solid ${T.border}`,
      boxShadow:   "0 2px 10px rgba(0,0,0,0.05)",
      cursor:      onClick ? "pointer" : "default",
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;
