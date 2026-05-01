import Icon from "../icons/Icon";

/**
 * BackButton — back arrow button for gradient headers.
 * @param {Function} onBack - callback when pressed
 */
const BackButton = ({ onBack }) => (
  <button
    onClick={onBack}
    style={{
      width: 34, height: 34, borderRadius: 10,
      background: "rgba(255,255,255,0.18)",
      border: "none", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Icon n="back" s={17} c="white" />
  </button>
);

export default BackButton;
