import { T } from "../../constants/tokens";

/**
 * Pill — toggle-style filter/category button.
 * @param {string}   text   - button label
 * @param {boolean}  active - whether this pill is selected
 * @param {Function} onClick
 * @param {boolean}  small  - smaller padding/font variant
 */
const Pill = ({ text, active, onClick, small = false }) => (
  <button
    onClick={onClick}
    style={{
      padding:    small ? "4px 10px" : "5px 13px",
      borderRadius: 20,
      border:     active ? "none" : `1px solid ${T.border}`,
      cursor:     "pointer",
      flexShrink: 0,
      background: active ? T.p600 : T.surface,
      color:      active ? "white" : T.gray500,
      fontSize:   small ? 9 : 10,
      fontWeight: active ? 700 : 500,
      transition: "all .15s",
    }}
  >
    {text}
  </button>
);

export default Pill;
