import { T } from "../constants/tokens";
import { MSGS } from "../constants/data";
import Icon from "../components/icons/Icon";
import { Avatar, Card, GradientHeader, EmptyState } from "../components/primitives";
import BottomNav from "../components/navigation/BottomNav";

const MessagesScreen = ({ onNav, onChat }) => {
  const unread = MSGS.reduce((s, m) => s + m.unread, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <GradientHeader>
        <div style={{ fontSize: 17, fontWeight: 800, color: "white", marginBottom: 12 }}>Messages</div>
        <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "9px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
          <Icon n="srch" s={14} c="rgba(255,255,255,0.6)" />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Search conversations…</span>
        </div>
      </GradientHeader>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {MSGS.length === 0 ? (
          <EmptyState icon="msg" title="No messages yet" sub="Book a lesson and start a conversation with your teacher." cta="Book a Lesson" onCta={() => onNav("disc")} />
        ) : MSGS.map((m) => (
          <Card
            key={m.id}
            onClick={() => onChat(m)}
            style={{ display: "flex", gap: 12, padding: "13px 14px", marginBottom: 8, cursor: "pointer", background: m.unread > 0 ? T.p50 : T.card, border: `1px solid ${m.unread > 0 ? T.p200 : T.border}` }}
          >
            <Avatar init={m.avatar} size={44} bg={T.p600} color="white" online={m.online} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <div style={{ fontSize: 13, fontWeight: m.unread > 0 ? 800 : 700, color: T.gray900 }}>{m.name}</div>
                <div style={{ fontSize: 9, color: T.gray300 }}>{m.time}</div>
              </div>
              <div style={{ fontSize: 11, color: m.unread > 0 ? T.gray700 : T.gray400, fontWeight: m.unread > 0 ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {m.last}
              </div>
            </div>
            {m.unread > 0 && (
              <div style={{ width: 20, height: 20, borderRadius: 10, background: T.p600, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "white", flexShrink: 0 }}>
                {m.unread}
              </div>
            )}
          </Card>
        ))}
      </div>
      <BottomNav active="msgs" onNav={onNav} unread={unread} />
    </div>
  );
};

export default MessagesScreen;
