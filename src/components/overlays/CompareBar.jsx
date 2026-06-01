import { T, GRAD } from "../../constants/tokens";
import { TEACHERS } from "../../constants/data";
import Icon from "../icons/Icon";
import Avatar from "../primitives/Avatar";

const CompareBar = ({ compareList, onCompare, onClear }) => {
  if (!compareList.length) return null;
  const teachers = compareList.map((id) => TEACHERS.find((t) => t.id === id)).filter(Boolean);

  return (
    <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, zIndex: 250, background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "10px 12px", boxShadow: "0 12px 30px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", marginRight: 2 }}>
        {teachers.map((t, i) => <div key={t.id} style={{ marginLeft: i ? -7 : 0 }}><Avatar init={t.avatar} size={30} bg={T.p600} color="white" /></div>)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: T.gray900 }}>Comparing {teachers.length} teacher{teachers.length > 1 ? "s" : ""}</div>
        <div style={{ fontSize: 9, color: T.gray500 }}>Add up to 3</div>
      </div>
      <button onClick={onClear} style={{ width: 30, height: 30, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n="x" s={13} c={T.gray500} /></button>
      <button onClick={onCompare} style={{ border: "none", borderRadius: 11, background: GRAD, color: "white", padding: "9px 11px", fontSize: 10, fontWeight: 900 }}>Compare</button>
    </div>
  );
};

export default CompareBar;
