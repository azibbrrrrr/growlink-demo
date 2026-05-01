import { T, GRAD } from "../constants/tokens";
import Icon from "../components/icons/Icon";

const PERSONAS = [
  {
    id: "A",
    label: "New User",
    name: "Zara Ahmad",
    sub: "0 bookings · Just signed up",
    color: T.blue,
    colorLight: "#EFF6FF",
    features: [
      "Guided discovery — intent cards + popular skills",
      "AI suggestion banner to find the right teacher",
      "No booking history or saved teachers",
    ],
    icon: "person",
  },
  {
    id: "B",
    label: "Active User",
    name: "Hafiz Roslan",
    sub: "3 bookings · Regular learner",
    color: T.amber,
    colorLight: "#FFFBEB",
    features: [
      "Continue Learning card for upcoming lesson",
      "Book Again shortcut for recent teachers",
      "1 saved teacher in favourites",
    ],
    icon: "person",
  },
  {
    id: "C",
    label: "Power User",
    name: "Ahmad Rizky",
    sub: "6 bookings · Weekly learner",
    color: T.p600,
    colorLight: T.p50,
    features: [
      "🔥 Streak badge + lesson countdown timer",
      "Book Again with 2 most recent teachers",
      "Saved teachers + recommended feed",
    ],
    icon: "person",
  },
];

export default function UserSelectScreen({ onSelect }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: GRAD,
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div style={{ padding: "48px 24px 20px", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 20,
            padding: "6px 14px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: T.amber,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon n="star" s={10} c="white" fill="white" />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>
            GROWLINK
          </span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: 6 }}>
          Student Workspace
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
          Choose a user state to preview the homepage
        </div>
      </div>

      {/* Persona cards */}
      <div style={{ padding: "8px 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {PERSONAS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            style={{
              background: "white",
              border: "none",
              borderRadius: 18,
              padding: "16px",
              cursor: "pointer",
              textAlign: "left",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              animation: `fadeIn .35s ease ${i * 0.08}s both`,
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.01)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"; }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              {/* State badge */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: p.color,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 900, color: "white", lineHeight: 1 }}>{p.id}</span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.gray900 }}>{p.label}</span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: p.color,
                      background: p.colorLight,
                      borderRadius: 5,
                      padding: "2px 7px",
                    }}
                  >
                    State {p.id}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: T.gray500, fontWeight: 500, marginBottom: 10 }}>
                  {p.name} · {p.sub}
                </div>

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {p.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 7,
                          background: p.colorLight,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        <Icon n="chk" s={8} c={p.color} sw={2.5} />
                      </div>
                      <span style={{ fontSize: 11, color: T.gray600, lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div style={{ flexShrink: 0, paddingTop: 10 }}>
                <Icon n="chev" s={14} c={T.gray300} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "8px 24px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 500, letterSpacing: "0.04em" }}>
          UX prototype · Growlink design review · v2.0
        </div>
      </div>
    </div>
  );
}
