import { useState } from "react";
import { T, GRAD } from "../../constants/tokens";
import Icon from "../../components/icons/Icon";
import { Card, GradientHeader, BackButton } from "../../components/primitives";
import StepBar from "./StepBar";

const PAYMENT_METHODS = [
  { id: "fpx",     label: "Online Banking (FPX)", sub: "Maybank, CIMB, RHB & more",   icon: "globe"  },
  { id: "ewallet", label: "e-Wallet",             sub: "Touch 'n Go, Boost, GrabPay", icon: "phone"  },
  { id: "card",    label: "Credit / Debit Card",  sub: "Visa, Mastercard, Amex",       icon: "card"   },
];

const TRUST_SIGNALS = [
  { icon: "lock",   txt: "256-bit SSL"    },
  { icon: "shield", txt: "PCI Compliant"  },
  { icon: "chk",    txt: "Secure via Stripe" },
];

const BookStep2 = ({ teacher: t, booking, onNext, onBack }) => {
  const [remarks, setRemarks] = useState("");
  const [method,  setMethod]  = useState("fpx");
  const [paying,  setPaying]  = useState(false);
  const [feeOpen, setFeeOpen] = useState(false);

  const MAX       = 200;
  const lessonSubtotal = booking.pkg.price * (booking.recurring ? booking.recurWeeks : 1);
  const recurringDiscount = booking.recurring ? Math.round(lessonSubtotal * 0.05) : 0;
  const discountedLessons = lessonSubtotal - recurringDiscount;
  const deposit   = Math.round((discountedLessons + (booking.mode?.includes("Student") ? 10 : 0)) * 0.25);
  const platFee   = Math.round(discountedLessons * 0.05);
  const transport = booking.mode?.includes("Student") ? 10 : 0;
  const total     = discountedLessons + platFee + transport;

  const pay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); onNext({ ...booking, remarks, method }); }, 2000);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <GradientHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <BackButton onBack={onBack} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Review & Pay</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>Step 2 of 3</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon n="lock" s={12} c="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>SSL Secured</span>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.13)", borderRadius: 14, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.2)" }}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, marginBottom: 1 }}>Deposit Due Now</div>
          <div style={{ color: "white", fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em" }}>RM {deposit}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 }}>{booking.pkg.name} · {t.name}</div>
        </div>
      </GradientHeader>
      <StepBar active={1} />

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {/* Booking summary */}
        <button onClick={() => setFeeOpen((v) => !v)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", marginBottom: 8 }}>
          <Card style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>Booking Summary</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: T.p600 }}>RM {total}</span>
                <Icon n="chev" s={14} c={T.gray400} sw={2} />
              </div>
            </div>
            {feeOpen && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                {[["Teacher", t.name], ["Package", booking.pkg.name], booking.recurring ? ["Repeat", `Weekly for ${booking.recurWeeks} weeks`] : null, ["Mode", booking.mode], ["Date", `${booking.date?.d}, Mar ${booking.date?.n}`], ["Time", booking.time]].filter(Boolean).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 10, color: T.gray500 }}>{k}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: T.gray900 }}>{v}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 8, marginTop: 8 }}>
                  {[["Lesson Fee", `RM ${lessonSubtotal}`], booking.recurring ? ["Recurring Discount (5%)", `-RM ${recurringDiscount}`] : null, ["Platform Fee (5%)", `RM ${platFee}`], transport ? ["Transport Fee", `RM ${transport}`] : null, ["Total Amount", `RM ${total}`]].filter(Boolean).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 10, color: T.gray500 }}>{k}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: T.gray900 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Deposit (25%)</span>
                    <span style={{ fontSize: 13, fontWeight: 900, color: T.p600 }}>RM {deposit}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 9, color: T.gray400 }}>Remaining (due before class)</span>
                    <span style={{ fontSize: 9, color: T.gray400 }}>RM {total - deposit}</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </button>

        {/* Remarks */}
        <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 6 }}>
          Remarks <span style={{ fontSize: 10, color: T.gray400, fontWeight: 400 }}>(optional)</span>
        </div>
        <div style={{ background: T.card, borderRadius: 13, border: `1.5px solid ${remarks.length > 0 ? T.p400 : T.border}`, padding: "11px 13px", marginBottom: 8, transition: "border-color .2s" }}>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value.slice(0, MAX))} placeholder="Any notes for the teacher, learning goals, or special requests…" style={{ width: "100%", minHeight: 60, border: "none", outline: "none", resize: "none", fontSize: 11, color: T.gray900, background: "transparent", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.5, boxSizing: "border-box" }} />
          <div style={{ textAlign: "right", fontSize: 9, color: remarks.length > 180 ? T.red : T.gray300 }}>{remarks.length}/{MAX}</div>
        </div>

        {/* Payment methods */}
        <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 8 }}>Payment Method</div>
        {PAYMENT_METHODS.map((m) => (
          <button key={m.id} onClick={() => setMethod(m.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: method === m.id ? T.p50 : T.card, borderRadius: 12, padding: "10px 13px", marginBottom: 7, border: `2px solid ${method === m.id ? T.p500 : T.border}`, cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, border: `2px solid ${method === m.id ? T.p600 : T.gray300}`, background: method === m.id ? T.p600 : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {method === m.id && <Icon n="chk" s={10} c="white" sw={3} />}
            </div>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: method === m.id ? T.p100 : T.gray50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon n={m.icon} s={14} c={method === m.id ? T.p600 : T.gray400} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{m.label}</div>
              <div style={{ fontSize: 9, color: T.gray400 }}>{m.sub}</div>
            </div>
          </button>
        ))}

        {/* Trust signals */}
        <div style={{ display: "flex", gap: 8, marginTop: 10, marginBottom: 4 }}>
          {TRUST_SIGNALS.map(({ icon, txt }) => (
            <div key={txt} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: T.surface, borderRadius: 9, padding: "8px 4px", border: `1px solid ${T.border}` }}>
              <Icon n={icon} s={12} c={T.green} sw={2} />
              <span style={{ fontSize: 7, fontWeight: 700, color: T.gray500, textAlign: "center" }}>{txt}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 16 }} />
      </div>

      <div style={{ padding: "10px 16px 14px" }}>
        <button onClick={pay} disabled={paying} style={{ width: "100%", background: paying ? "rgba(0,0,0,0.08)" : GRAD, border: "none", borderRadius: 14, padding: 14, fontSize: 14, fontWeight: 800, color: paying ? T.gray400 : "white", cursor: paying ? "not-allowed" : "pointer", boxShadow: paying ? "none" : `0 6px 20px ${T.p600}45`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .2s" }}>
          {paying
            ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: 8, animation: "spin .8s linear infinite" }} />Processing…</>
            : `Pay RM ${deposit} Deposit`}
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

export default BookStep2;
