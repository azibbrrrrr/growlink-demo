import { T } from "../../constants/tokens";

/**
 * Stars — renders a star rating with filled/empty stars and numeric label.
 * @param {number} rating - rating value (e.g. 4.9)
 * @param {number} size   - font size in px
 */
const Stars = ({ rating, size = 11 }) => (
  <span style={{ fontSize: size, color: T.amber }}>
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    <span style={{ color: T.gray400, marginLeft: 3, fontWeight: 500 }}>{rating}</span>
  </span>
);

export default Stars;
