import { useState, useRef, useEffect } from "react";
import { T, GRAD } from "../constants/tokens";
import { CHAT_HISTORY } from "../constants/data";
import Icon from "../components/icons/Icon";
import { Avatar, BackButton } from "../components/primitives";

const ReadReceipt = ({ msg }) => {
  if (msg.from !== "me") return null;
  return (
    <div style={{ textAlign: "right", marginTop: 2, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3 }}>
      <span style={{ fontSize: 8, color: "rgba(255,255,255,0.55)" }}>{msg.time}</span>
      <span style={{ fontSize: 8, color: msg.read ? T.p300 : "rgba(255,255,255,0.4)" }}>{msg.read ? "✓✓" : "✓"}</span>
    </div>
  );
};

const ChatScreen = ({ contact, onClose }) => {
  const [msgs,   setMsgs]   = useState(CHAT_HISTORY);
  const [input,  setInput]  = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs((p) => [...p, { from: "me", text: input.trim(), time: "Now", read: false }]);
    setInput("");
    setTimeout(() => setTyping(true), 800);
    setTimeout(() => {
      setTyping(false);
      setMsgs((p) => [...p, { from: "them", text: "Got it! See you then.", time: "Now", read: true }]);
    }, 3000);
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 200, display: "flex", flexDirection: "column", background: T.gray50 }}>
      {/* Header */}
      <div style={{ background: GRAD, padding: "36px 16px 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton onBack={onClose} />
          <Avatar init={contact.avatar} size={36} bg="rgba(255,255,255,0.25)" color="white" online={contact.online} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "white" }}>{contact.name}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>
              {typing ? (
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  Typing
                  <span style={{ display: "flex", gap: 2, marginLeft: 2 }}>
                    {[0, 1, 2].map((i) => <span key={i} style={{ width: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.7)", animation: `typingDot .8s ease-in-out ${i * 0.2}s infinite` }} />)}
                  </span>
                </span>
              ) : contact.online ? "Online" : "Recently active"}
            </div>
          </div>
          <Icon n="more" s={18} c="rgba(255,255,255,0.7)" />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {msgs.map((m, i) => {
          const showDate = i === 0 || msgs[i - 1]?.from !== m.from;
          return (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start", marginBottom: showDate ? 10 : 4 }}>
              <div style={{ maxWidth: "78%" }}>
                <div style={{ background: m.from === "me" ? T.p600 : "white", color: m.from === "me" ? "white" : T.gray900, borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 13px", boxShadow: m.from === "me" ? `0 3px 12px ${T.p600}40` : "0 2px 8px rgba(0,0,0,0.06)", border: m.from !== "me" ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ fontSize: 12, lineHeight: 1.5 }}>{m.text}</div>
                  {m.from !== "me" && <div style={{ fontSize: 8, color: T.gray300, marginTop: 3, textAlign: "right" }}>{m.time}</div>}
                </div>
                <ReadReceipt msg={m} />
              </div>
            </div>
          );
        })}
        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
            <div style={{ background: "white", borderRadius: "18px 18px 18px 4px", padding: "10px 14px", border: `1px solid ${T.border}`, display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 1, 2].map((i) => <div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: T.gray300, animation: `typingDot .8s ease-in-out ${i * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8, padding: "10px 14px 14px", background: "white", borderTop: `1px solid ${T.border}`, alignItems: "flex-end" }}>
        <div style={{ flex: 1, background: T.surface, borderRadius: 20, padding: "9px 14px", border: `1px solid ${T.border}` }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message…" style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 12, color: T.gray900, fontFamily: "'DM Sans',sans-serif" }} />
        </div>
        <button onClick={send} style={{ width: 40, height: 40, borderRadius: 20, background: T.p600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 3px 10px ${T.p600}50` }}>
          <Icon n="send" s={15} c="white" />
        </button>
      </div>
      <style>{`@keyframes typingDot{0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-5px);opacity:1}}`}</style>
    </div>
  );
};

export default ChatScreen;
