import { useState } from "react";
import { T } from "../constants/tokens";
import { ACTIVITY, MSGS } from "../constants/data";
import { ACT_CFG } from "../constants/navigation";
import Icon from "../components/icons/Icon";
import { GradientHeader, EmptyState } from "../components/primitives";
import BottomNav from "../components/navigation/BottomNav";

const InlineActions = ({ a, onNav, rating, setRating }) => {
  if (a.type === "booking") return (
    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
      <button style={{ flex: 1, background: T.p100, border: "none", borderRadius: 8, padding: "5px 8px", fontSize: 9, fontWeight: 700, color: T.p700, cursor: "pointer" }}>Message Teacher</button>
      <button style={{ flex: 1, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "5px 8px", fontSize: 9, fontWeight: 700, color: T.gray700, cursor: "pointer" }}>View Booking</button>
    </div>
  );
  if (a.type === "message") return (
    <button onClick={() => onNav("msgs")} style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 5, background: T.blueL, border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 9, fontWeight: 700, color: T.blue, cursor: "pointer" }}>
      <Icon n="msg" s={10} c={T.blue} /> Reply
    </button>
  );
  if (a.type === "review") return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 10, color: T.gray500, marginBottom: 4 }}>Rate your experience:</div>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setRating(s)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
            <span style={{ fontSize: 22, color: s <= rating ? T.amber : T.gray200 }}>★</span>
          </button>
        ))}
        {rating > 0 && <button style={{ background: T.amberL, border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 9, fontWeight: 700, color: T.amberD, cursor: "pointer", marginLeft: 4 }}>Submit</button>}
      </div>
    </div>
  );
  if (a.type === "reminder") return (
    <button style={{ marginTop: 8, background: T.gray100, border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 9, fontWeight: 700, color: T.gray600, cursor: "pointer" }}>View Lesson Details</button>
  );
  return null;
};

const ActivityScreen = ({ onNav }) => {
  const [activity, setActivity] = useState(ACTIVITY);
  const [rating,   setRating]   = useState(0);
  const unread   = MSGS.reduce((s, m) => s + m.unread, 0);

  const markRead = (id) => setActivity((a) => a.map((x) => (x.id === id ? { ...x, read: true } : x)));
  const grouped  = { today: activity.slice(0, 3), earlier: activity.slice(3) };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <GradientHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "white" }}>Activity</div>
          <button onClick={() => setActivity((a) => a.map((x) => ({ ...x, read: true })))} style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}>Mark all read</button>
        </div>
      </GradientHeader>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {activity.every((a) => a.read) && activity.length === 0 ? (
          <EmptyState icon="bell" title="All caught up" sub="No new activity. Explore and book a teacher to get started." cta="Discover Teachers" onCta={() => onNav("disc")} />
        ) : Object.entries(grouped).map(([group, items]) => (
          <div key={group}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.gray400, letterSpacing: "0.06em", marginBottom: 8, marginTop: group === "earlier" ? 16 : 0, textTransform: "uppercase" }}>
              {group === "today" ? "Today" : "Earlier"}
            </div>
            {items.map((a) => {
              const cfg = ACT_CFG[a.type] || ACT_CFG.reminder;
              return (
                <div key={a.id} onClick={() => markRead(a.id)} style={{ background: a.read ? T.card : T.p50, borderRadius: 13, padding: "12px 13px", marginBottom: 7, border: `1px solid ${a.read ? T.border : T.p200}`, transition: "background .2s" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 9, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 8, fontWeight: 800, color: cfg.color, letterSpacing: "0.03em" }}>{cfg.label.slice(0, 3).toUpperCase()}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: a.read ? 400 : 700, color: T.gray900, lineHeight: 1.4 }}>{a.text}</div>
                      <div style={{ fontSize: 9, color: T.gray400, marginTop: 3 }}>{a.time}</div>
                      <InlineActions a={a} onNav={onNav} rating={rating} setRating={setRating} />
                    </div>
                    {!a.read && <div style={{ width: 8, height: 8, borderRadius: 4, background: T.p600, flexShrink: 0, marginTop: 4 }} />}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div style={{ height: 16 }} />
      </div>
      <BottomNav active="act" onNav={onNav} unread={unread} />
    </div>
  );
};

export default ActivityScreen;
