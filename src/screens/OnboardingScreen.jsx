import { useEffect, useState } from "react";
import { T, GRAD } from "../constants/tokens";
import Icon from "../components/icons/Icon";

const subjects = ["Music", "Academic", "Language", "Sports", "Creative", "Tech"];

const tourFrames = [
  { title: "Home adapts to you", copy: "See the next lesson, recommended teachers, and posts from people you follow." },
  { title: "Discover by intent", copy: "Search by goal, skill, distance, budget, mode, and availability." },
  { title: "Bookings stay tidy", copy: "Track lessons, payments, safety prompts, materials, and progress in one place." },
];

const OnboardingScreen = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("EN");
  const [age, setAge] = useState("18-25");
  const [interests, setInterests] = useState(["Music"]);
  const [tour, setTour] = useState(0);
  const [form, setForm] = useState({ email: "", otp: "", name: "", contact: "", phone: "" });
  const [perms, setPerms] = useState({ location: true, notifications: true });

  useEffect(() => {
    if (step !== 0) return undefined;
    const t = setTimeout(() => setStep(1), 2000);
    return () => clearTimeout(t);
  }, [step]);

  const toggleInterest = (s) => setInterests((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const next = () => step === 9 ? onDone() : setStep((s) => Math.min(9, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const progress = ((step + 1) / 10) * 100;

  const cardStyle = {
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 16px 40px rgba(13,43,34,0.10)",
    animation: "slideDown .24s ease",
  };

  const renderField = (label, field, placeholder) => (
    <label style={{ display: "block", marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: T.gray500, marginBottom: 6 }}>{label}</div>
      <input
        value={form[field]}
        onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
        placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${T.border}`, background: T.surface, borderRadius: 12, padding: "11px 12px", outline: "none", fontFamily: "inherit", color: T.gray900, fontSize: 12 }}
      />
    </label>
  );

  const screens = [
    <div style={{ ...cardStyle, textAlign: "center", background: GRAD, color: "white" }}>
      <div style={{ width: 78, height: 78, borderRadius: 22, background: "rgba(255,255,255,0.18)", margin: "14px auto 18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900 }}>G</div>
      <div style={{ fontSize: 25, fontWeight: 900, letterSpacing: "-0.03em" }}>Growlink</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", marginTop: 7 }}>Malaysia's most trusted tutoring platform</div>
    </div>,
    <div style={cardStyle}>
      <div style={{ fontSize: 20, fontWeight: 900, color: T.gray900, marginBottom: 14 }}>Start with confidence</div>
      {[
        ["Find local teachers", "Compare verified tutors near Petaling Jaya."],
        ["Book in 3 taps", "Pick a package, choose a time, and pay a safe deposit."],
        ["Learn safely", "Physical lessons include location sharing and check-ins."],
      ].map(([title, copy], i) => (
        <div key={title} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 11, background: T.p100, color: T.p700, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{i + 1}</div>
          <div><div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>{title}</div><div style={{ fontSize: 11, color: T.gray500, lineHeight: 1.45 }}>{copy}</div></div>
        </div>
      ))}
    </div>,
    <div style={cardStyle}>
      <div style={{ fontSize: 18, fontWeight: 900, color: T.gray900, marginBottom: 6 }}>Choose your language</div>
      <div style={{ fontSize: 11, color: T.gray500, marginBottom: 18 }}>You can change this anytime in Profile.</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[["EN", "English"], ["BM", "Bahasa Melayu"], ["ZH", "中文"]].map(([k, l]) => (
          <button key={k} onClick={() => setLang(k)} style={{ flex: 1, padding: "12px 6px", borderRadius: 14, border: `1.5px solid ${lang === k ? T.p600 : T.border}`, background: lang === k ? T.p600 : T.surface, color: lang === k ? "white" : T.gray700, fontSize: 11, fontWeight: 800 }}>{l}</button>
        ))}
      </div>
    </div>,
    <div style={cardStyle}>
      <div style={{ fontSize: 18, fontWeight: 900, color: T.gray900, marginBottom: 14 }}>Create your account</div>
      {renderField("Email", "email", "you@email.com")}
      {renderField("OTP", "otp", "Enter any 6 digits")}
      <button style={{ width: "100%", border: "none", background: T.p100, color: T.p700, borderRadius: 12, padding: 11, fontWeight: 800 }}>Send mock OTP</button>
    </div>,
    <div style={cardStyle}>
      <div style={{ fontSize: 18, fontWeight: 900, color: T.gray900, marginBottom: 14 }}>Profile basics</div>
      {renderField("Preferred name", "name", "Ahmad")}
      <div style={{ fontSize: 10, fontWeight: 800, color: T.gray500, marginBottom: 8 }}>Age group</div>
      <div style={{ display: "flex", gap: 7 }}>
        {["Under 18", "18-25", "26+"].map((a) => <button key={a} onClick={() => setAge(a)} style={{ flex: 1, padding: "10px 4px", borderRadius: 11, border: `1.5px solid ${age === a ? T.p600 : T.border}`, background: age === a ? T.p50 : T.surface, color: age === a ? T.p700 : T.gray500, fontWeight: 800, fontSize: 10 }}>{a}</button>)}
      </div>
    </div>,
    <div style={cardStyle}>
      <div style={{ fontSize: 18, fontWeight: 900, color: T.gray900, marginBottom: 6 }}>What would you like to learn?</div>
      <div style={{ fontSize: 11, color: T.gray500, marginBottom: 14 }}>Pick as many as you like.</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {subjects.map((s) => <button key={s} onClick={() => toggleInterest(s)} style={{ padding: "9px 13px", borderRadius: 16, border: `1.5px solid ${interests.includes(s) ? T.p600 : T.border}`, background: interests.includes(s) ? T.p600 : T.surface, color: interests.includes(s) ? "white" : T.gray700, fontSize: 11, fontWeight: 800 }}>{s}</button>)}
      </div>
    </div>,
    <div style={cardStyle}>
      <div style={{ fontSize: 18, fontWeight: 900, color: T.gray900, marginBottom: 4 }}>Emergency contact</div>
      <div style={{ fontSize: 11, color: age === "Under 18" ? T.amberD : T.gray500, marginBottom: 14 }}>{age === "Under 18" ? "Required for under-18 learners" : "Recommended for safety check-ins"}</div>
      {renderField("Contact name", "contact", "Parent or trusted contact")}
      {renderField("Phone", "phone", "+60")}
      <button style={{ width: "100%", border: "none", background: T.amberL, color: T.amberD, borderRadius: 12, padding: 11, fontWeight: 800 }}>Verify by mock OTP</button>
    </div>,
    <div style={cardStyle}>
      <div style={{ fontSize: 18, fontWeight: 900, color: T.gray900, marginBottom: 14 }}>Helpful permissions</div>
      {[
        ["location", "Location", "Show nearby teachers and share during active physical lessons."],
        ["notifications", "Notifications", "Get booking reminders, messages, and safety check-ins."],
      ].map(([k, title, copy]) => (
        <button key={k} onClick={() => setPerms((p) => ({ ...p, [k]: !p[k] }))} style={{ width: "100%", display: "flex", gap: 12, alignItems: "center", textAlign: "left", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 13, marginBottom: 9 }}>
          <div style={{ width: 42, height: 24, borderRadius: 14, background: perms[k] ? T.p600 : T.gray200, padding: 3, boxSizing: "border-box" }}><div style={{ width: 18, height: 18, borderRadius: 9, background: "white", marginLeft: perms[k] ? 18 : 0, transition: "margin .15s" }} /></div>
          <div><div style={{ fontSize: 12, fontWeight: 900, color: T.gray900 }}>{title}</div><div style={{ fontSize: 10, color: T.gray500, lineHeight: 1.4 }}>{copy}</div></div>
        </button>
      ))}
    </div>,
    <div style={cardStyle}>
      <div style={{ fontSize: 18, fontWeight: 900, color: T.gray900, marginBottom: 14 }}>Quick tour</div>
      <div style={{ border: `1px solid ${T.border}`, background: T.surface, borderRadius: 16, padding: 16, minHeight: 138 }}>
        <div style={{ fontSize: 10, color: T.p600, fontWeight: 900, marginBottom: 10 }}>Frame {tour + 1} of 3</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: T.gray900, marginBottom: 8 }}>{tourFrames[tour].title}</div>
        <div style={{ fontSize: 12, color: T.gray500, lineHeight: 1.55 }}>{tourFrames[tour].copy}</div>
      </div>
      <div style={{ display: "flex", gap: 7, marginTop: 12 }}>{tourFrames.map((_, i) => <button key={i} onClick={() => setTour(i)} style={{ flex: 1, height: 5, borderRadius: 4, border: "none", background: tour === i ? T.p600 : T.border }} />)}</div>
    </div>,
    <div style={{ ...cardStyle, textAlign: "center" }}>
      <div style={{ width: 68, height: 68, borderRadius: 22, background: T.amberL, margin: "4px auto 16px", display: "flex", alignItems: "center", justifyContent: "center", color: T.amberD, fontSize: 24, fontWeight: 900 }}>RM</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: T.gray900, marginBottom: 8 }}>RM 10 off your first booking</div>
      <div style={{ fontSize: 12, color: T.gray500, lineHeight: 1.55 }}>Your learner profile is ready. Choose a demo state next and start exploring.</div>
    </div>,
  ];

  return (
    <div style={{ flex: 1, background: T.surface, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "42px 18px 8px", flexShrink: 0 }}>
        <div style={{ height: 5, borderRadius: 4, background: T.border, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ width: `${progress}%`, height: "100%", background: T.p600, transition: "width .25s" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={back} disabled={step === 0} style={{ background: "none", border: "none", color: step === 0 ? T.gray300 : T.gray500, fontWeight: 800, fontSize: 11 }}>Back</button>
          <div style={{ color: T.gray500, fontSize: 11, fontWeight: 800 }}>{step + 1}/10</div>
          <button onClick={() => setStep(9)} style={{ background: "none", border: "none", color: T.p600, fontWeight: 900, fontSize: 11 }}>Skip</button>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "10px 18px" }}>{screens[step]}</div>
      <div style={{ padding: "12px 18px 28px", flexShrink: 0 }}>
        <button onClick={next} style={{ width: "100%", border: "none", borderRadius: 15, background: GRAD, color: "white", padding: 14, fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {step === 9 ? "Claim Offer" : step === 0 ? "Start" : "Continue"} <Icon n="chev" s={14} c="white" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
