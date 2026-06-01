import { T, GRAD } from "../constants/tokens";
import { TEACHERS } from "../constants/data";
import Icon from "../components/icons/Icon";
import { Avatar, BackButton } from "../components/primitives";

const rows = [
  ["Rating", (t) => `★ ${t.rating} (${t.reviews})`, "rating"],
  ["Price", (t) => `from RM ${Math.min(...t.pkgs.map((p) => p.price))}`, "price"],
  ["Distance", (t) => `${t.dist} km`, "dist"],
  ["Mode", (t) => t.mode.join(" + "), null],
  ["Languages", (t) => t.lang.map((l) => l === "English" ? "EN" : l === "Mandarin" ? "ZH" : l === "Malay" ? "BM" : l).join(", "), null],
  ["Response", (t) => t.avgResponse, null],
  ["Verified", (t) => [t.verified, t.certified, t.bgCheck].filter(Boolean).map(() => "✓").join(" "), "verified"],
  ["Availability", (t) => t.avail, null],
];

const bestValue = (teachers, key) => {
  if (key === "rating") return Math.max(...teachers.map((t) => t.rating));
  if (key === "price") return Math.min(...teachers.map((t) => Math.min(...t.pkgs.map((p) => p.price))));
  if (key === "dist") return Math.min(...teachers.map((t) => t.dist));
  if (key === "verified") return Math.max(...teachers.map((t) => [t.verified, t.certified, t.bgCheck].filter(Boolean).length));
  return null;
};

const valueFor = (t, key) => {
  if (key === "rating") return t.rating;
  if (key === "price") return Math.min(...t.pkgs.map((p) => p.price));
  if (key === "dist") return t.dist;
  if (key === "verified") return [t.verified, t.certified, t.bgCheck].filter(Boolean).length;
  return null;
};

const CompareScreen = ({ compareList, onBack, onBook, onRemove }) => {
  const teachers = compareList.map((id) => TEACHERS.find((t) => t.id === id)).filter(Boolean);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: T.surface }}>
      <div style={{ background: GRAD, padding: "36px 16px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton onBack={onBack} />
          <div>
            <div style={{ color: "white", fontSize: 16, fontWeight: 900 }}>Compare Teachers</div>
            <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 10 }}>Best values are highlighted in green</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px 12px 18px" }}>
        <div style={{ minWidth: 330, background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: `84px repeat(${teachers.length}, minmax(92px,1fr))`, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ padding: 10, fontSize: 10, color: T.gray400, fontWeight: 900 }}>Field</div>
            {teachers.map((t) => (
              <div key={t.id} style={{ padding: 10, borderLeft: `1px solid ${T.border}`, textAlign: "center", position: "relative" }}>
                <button onClick={() => onRemove(t.id)} style={{ position: "absolute", top: 5, right: 5, background: "none", border: "none", padding: 0 }}><Icon n="x" s={10} c={T.gray400} /></button>
                <Avatar init={t.avatar} size={34} bg={T.p600} color="white" />
                <div style={{ fontSize: 10, color: T.gray900, fontWeight: 900, lineHeight: 1.15, marginTop: 6 }}>{t.name.split(" ").slice(0, 2).join(" ")}</div>
              </div>
            ))}
          </div>
          {rows.map(([label, render, key]) => {
            const best = bestValue(teachers, key);
            return (
              <div key={label} style={{ display: "grid", gridTemplateColumns: `84px repeat(${teachers.length}, minmax(92px,1fr))`, borderBottom: `1px solid ${T.border}` }}>
                <div style={{ padding: "10px 9px", fontSize: 10, color: T.gray500, fontWeight: 800 }}>{label}</div>
                {teachers.map((t) => {
                  const hi = key && valueFor(t, key) === best;
                  return (
                    <div key={t.id} style={{ padding: "10px 8px", borderLeft: `1px solid ${T.border}`, fontSize: 10, color: hi ? T.green : T.gray700, fontWeight: hi ? 900 : 700, background: hi ? T.greenL : "transparent", textAlign: "center", lineHeight: 1.35 }}>
                      {render(t)}
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div style={{ display: "grid", gridTemplateColumns: `84px repeat(${teachers.length}, minmax(92px,1fr))` }}>
            <div />
            {teachers.map((t) => (
              <div key={t.id} style={{ padding: 10, borderLeft: `1px solid ${T.border}` }}>
                <button onClick={() => onBook(t, t.pkgs[1])} style={{ width: "100%", border: "none", borderRadius: 10, background: T.p600, color: "white", padding: "9px 4px", fontSize: 10, fontWeight: 900 }}>Book</button>
              </div>
            ))}
          </div>
        </div>
        {teachers.length < 2 && <div style={{ marginTop: 12, fontSize: 11, color: T.gray500, lineHeight: 1.5, textAlign: "center" }}>Add another teacher from Home or Discover to unlock a richer comparison.</div>}
      </div>
    </div>
  );
};

export default CompareScreen;
