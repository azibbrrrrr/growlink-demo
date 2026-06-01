import { useState } from "react";
import { T, GRAD } from "../constants/tokens";
import { PROGRESS, TEACHERS } from "../constants/data";
import Icon from "../components/icons/Icon";
import { Avatar, Card, ProgressBar, BackButton } from "../components/primitives";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const ProgressScreen = ({ booking, onBack }) => {
  const teacher = TEACHERS.find((t) => t.name === booking?.teacher) || TEACHERS[0];
  const data = PROGRESS[teacher.id] || PROGRESS[1];
  const [skills, setSkills] = useState(data.skills);
  const maxPractice = Math.max(...data.practice);
  const mastered = skills.filter((s) => s.done).length;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: T.surface }}>
      <div style={{ background: GRAD, padding: "36px 16px 18px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <BackButton onBack={onBack} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: "white" }}>Learning Progress</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.62)" }}>{data.skill} with {teacher.name.split(" ")[0]}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: 12 }}>
          <Avatar init={teacher.avatar} size={44} bg="rgba(255,255,255,0.25)" color="white" />
          <div style={{ flex: 1 }}>
            <div style={{ color: "white", fontSize: 13, fontWeight: 900 }}>{teacher.name}</div>
            <div style={{ color: "rgba(255,255,255,0.64)", fontSize: 10 }}>{data.goal}</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        <Card style={{ padding: 14, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: T.gray900 }}>Goal</div>
            <span style={{ fontSize: 11, color: T.p600, fontWeight: 900 }}>{data.goalProgress}%</span>
          </div>
          <div style={{ fontSize: 11, color: T.gray600, lineHeight: 1.45, marginBottom: 10 }}>{data.goal}</div>
          <ProgressBar v={data.goalProgress} max={100} h={8} />
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <Card style={{ padding: 14, background: T.amberL, border: `1px solid ${T.amber}30` }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.amberD }}>5-day</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>streak</div>
            <div style={{ fontSize: 9, color: T.gray500, marginTop: 3 }}>Longest: {data.streak.longest} days</div>
          </Card>
          <Card style={{ padding: 14 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.p600 }}>{mastered}/{skills.length}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>skills mastered</div>
            <div style={{ fontSize: 9, color: T.gray500, marginTop: 3 }}>Teacher checklist</div>
          </Card>
        </div>

        <Card style={{ padding: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: T.gray900, marginBottom: 10 }}>Skills Checklist</div>
          {skills.map((s, i) => (
            <button key={s.name} onClick={() => setSkills((prev) => prev.map((x, idx) => idx === i ? { ...x, done: !x.done } : x))} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", padding: "7px 0", textAlign: "left" }}>
              <div style={{ width: 20, height: 20, borderRadius: 7, background: s.done ? T.p600 : T.surface, border: `1.5px solid ${s.done ? T.p600 : T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.done && <Icon n="chk" s={12} c="white" sw={3} />}</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.done ? T.gray400 : T.gray900, textDecoration: s.done ? "line-through" : "none" }}>{s.name}</span>
            </button>
          ))}
        </Card>

        <Card style={{ padding: 14, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: T.gray900 }}>Practice Log</div>
            <div style={{ fontSize: 10, color: T.gray500 }}>{data.practice.reduce((s, v) => s + v, 0)} min this week</div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 92 }}>
            {data.practice.map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: 68, display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${Math.max(6, (m / maxPractice) * 68)}px`, borderRadius: "7px 7px 3px 3px", background: m ? T.p600 : T.gray100 }} />
                </div>
                <div style={{ fontSize: 8, color: T.gray400, marginTop: 6 }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: T.gray900, marginBottom: 8 }}>Monthly Report</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[[data.report.lessons, "lessons"], [data.report.hours, "hours"], [data.report.mastered, "skills mastered"]].map(([v, l]) => (
              <div key={l} style={{ background: T.surface, borderRadius: 11, padding: "9px 4px", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: T.p600 }}>{v}</div>
                <div style={{ fontSize: 8, color: T.gray500 }}>{l}</div>
              </div>
            ))}
          </div>
          <button style={{ width: "100%", background: T.p100, border: "none", borderRadius: 11, color: T.p700, padding: 10, fontSize: 11, fontWeight: 900 }}>Download PDF</button>
        </Card>
      </div>
    </div>
  );
};

export default ProgressScreen;
