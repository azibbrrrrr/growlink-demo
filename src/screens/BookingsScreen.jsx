import { useState } from "react";
import { T, GRAD } from "../constants/tokens";
import { BOOKINGS, MSGS, STUDENT } from "../constants/data";
import Icon from "../components/icons/Icon";
import { Avatar, Card, StatusPill, GradientHeader, EmptyState } from "../components/primitives";
import BottomNav from "../components/navigation/BottomNav";

const BOOKED_DATES = { 3: "confirmed", 5: "pending", 1: "completed" };
const MONTH = Array.from({ length: 31 }, (_, i) => i + 1);

const CtaForBooking = ({ b }) => {
  if (b.action === "upcoming") return (
    <div style={{ display: "flex", gap: 7, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
      <button style={{ flex: 1, background: T.p100,   border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.p700,   cursor: "pointer" }}>Message Teacher</button>
      <button style={{ flex: 1, background: T.amberL, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.amberD, cursor: "pointer" }}>Set Reminder</button>
    </div>
  );
  if (b.action === "pending") return (
    <div style={{ display: "flex", gap: 7, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
      <button style={{ flex: 1, background: T.gray100, border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.gray600, cursor: "pointer" }}>Cancel Request</button>
      <button style={{ flex: 1, background: T.blueL,   border: "none", borderRadius: 8, padding: "6px", fontSize: 10, fontWeight: 700, color: T.blue,   cursor: "pointer" }}>Message Teacher</button>
    </div>
  );
  if (b.action === "review") return (
    <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
      <button style={{ width: "100%", background: T.amberL, border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 800, color: T.amberD, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <Icon n="star" s={12} c={T.amberD} fill={T.amberD} />Leave a Review
      </button>
    </div>
  );
  return null;
};

const BookingsScreen = ({ onNav }) => {
  const [filter,  setFilter]  = useState("all");
  const [bkgView, setBkgView] = useState("list");
  const filters  = ["all", "confirmed", "pending", "completed"];
  const filtered = filter === "all" ? BOOKINGS : BOOKINGS.filter((b) => b.status === filter);
  const unread   = MSGS.reduce((s, m) => s + m.unread, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <GradientHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "white" }}>My Bookings</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ id: "list", icon: "list" }, { id: "cal", icon: "cal" }].map((v) => (
              <button key={v.id} onClick={() => setBkgView(v.id)} style={{ width: 32, height: 32, borderRadius: 9, background: bkgView === v.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon n={v.icon} s={15} c={bkgView === v.id ? T.p700 : "rgba(255,255,255,0.8)"} />
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", background: filter === f ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)", color: filter === f ? T.p800 : "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, textTransform: "capitalize", flexShrink: 0 }}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </GradientHeader>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[{ v: STUDENT.bookings, l: "Total Booked" }, { v: `RM ${STUDENT.spent}`, l: "Total Spent" }, { v: "2", l: "Upcoming" }].map((s, i) => (
            <div key={i} style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "11px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: T.p600, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: T.gray400, marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Calendar view */}
        {bkgView === "cal" && (
          <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>March 2026</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 10 }}>
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: T.gray400, padding: "2px 0" }}>{d}</div>
              ))}
              {[...Array(5)].map((_, i) => <div key={`e${i}`} />)}
              {MONTH.map((d) => {
                const status = BOOKED_DATES[d];
                const dotColor = status === "confirmed" ? T.p400 : status === "pending" ? T.amber : status === "completed" ? T.blue : null;
                return (
                  <div key={d} style={{ textAlign: "center", padding: "4px 1px", borderRadius: 7, background: status ? T.p50 : "none", position: "relative" }}>
                    <span style={{ fontSize: 10, fontWeight: status ? 700 : 400, color: status ? T.p700 : T.gray500 }}>{d}</span>
                    {dotColor && <div style={{ width: 5, height: 5, borderRadius: 3, background: dotColor, margin: "1px auto 0" }} />}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[["confirmed", T.p400, "Confirmed"], ["pending", T.amber, "Pending"], ["completed", T.blue, "Completed"]].map(([k, c, l]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 4, background: c }} />
                  <span style={{ fontSize: 9, color: T.gray500 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking list */}
        {filtered.length === 0 ? (
          <EmptyState icon="book" title="No bookings yet" sub="Discover teachers near you and book your first lesson." cta="Explore Teachers" onCta={() => onNav("disc")} />
        ) : filtered.map((b) => (
          <Card key={b.id} style={{ marginBottom: 10, overflow: "hidden" }}>
            <div style={{ height: 4, background: b.status === "confirmed" ? T.p400 : b.status === "pending" ? T.amber : b.status === "completed" ? T.blue : T.red, transition: "background .2s" }} />
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Avatar init={b.avatar} size={40} bg={T.p600} color="white" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>{b.teacher}</div>
                  <div style={{ fontSize: 10, color: T.gray500 }}>{b.skill} · {b.pkg}</div>
                </div>
                <StatusPill status={b.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                {[{ i: "cal", v: b.date }, { i: "clk", v: b.time }, { i: "pin", v: b.mode.replace("Physical – ", "") }, { i: "book", v: `Session ${b.session}` }].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <Icon n={r.i} s={10} c={T.gray400} />
                    <span style={{ fontSize: 10, color: T.gray600 }}>{r.v}</span>
                  </div>
                ))}
              </div>
              {b.countdown && (
                <div style={{ marginTop: 7, display: "inline-flex", alignItems: "center", gap: 4, background: b.action === "upcoming" ? T.greenL : T.amberL, borderRadius: 7, padding: "3px 8px" }}>
                  <Icon n="clk" s={10} c={b.action === "upcoming" ? T.green : T.amberD} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: b.action === "upcoming" ? T.green : T.amberD }}>{b.countdown}</span>
                </div>
              )}
              <CtaForBooking b={b} />
            </div>
          </Card>
        ))}
        <div style={{ height: 16 }} />
      </div>
      <BottomNav active="bkgs" onNav={onNav} unread={unread} />
    </div>
  );
};

export default BookingsScreen;
