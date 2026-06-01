import { useState } from "react";
import { STUDENT, TEACHERS } from "../constants/data";
import { useTheme } from "../contexts/ThemeContext";
import Icon from "../components/icons/Icon";
import { Avatar, Stars, Divider, BackButton } from "../components/primitives";

const LOYALTY_TIERS = [
  { name: "Explorer",  min: 1,  icon: "🌱" },
  { name: "Learner",   min: 5,  icon: "📚" },
  { name: "Achiever",  min: 15, icon: "🏆" },
  { name: "Champion",  min: 30, icon: "🥇" },
];

const Field = ({ icon, label, field, editing, setEditing, data, setData, setSaved, T }) => {
  const isEditing = editing === field;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px" }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: T.gray50, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon n={icon} s={15} c={T.gray400} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, color: T.gray400, fontWeight: 600, marginBottom: 2 }}>{label}</div>
          {isEditing ? (
            <input value={data[field]} onChange={(e) => setData((d) => ({ ...d, [field]: e.target.value }))} autoFocus style={{ width: "100%", border: "none", borderBottom: `2px solid ${T.p500}`, outline: "none", fontSize: 12, fontWeight: 600, color: T.gray900, background: "transparent", padding: "1px 0", fontFamily: "'DM Sans',sans-serif" }} />
          ) : (
            <div style={{ fontSize: 12, fontWeight: 600, color: T.gray900 }}>{data[field]}</div>
          )}
        </div>
        <button onClick={() => { if (isEditing) { setEditing(null); setSaved(true); setTimeout(() => setSaved(false), 2000); } else setEditing(field); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          {isEditing ? <Icon n="chk" s={16} c={T.p600} sw={2.5} /> : <Icon n="edit" s={14} c={T.gray300} />}
        </button>
      </div>
    </div>
  );
};

const ProfileScreen = ({ onBack, savedSearches: savedSearchesProp, onDeleteSearch, onToggleSearchAlert }) => {
  const { T, GRAD } = useTheme();
  const [editing, setEditing] = useState(null);
  const [data,    setData]    = useState({ ...STUDENT });
  const [saved,   setSaved]   = useState(false);
  const [savedSearches, setSavedSearches] = useState(STUDENT.savedSearches || []);
  const displayedSearches = savedSearchesProp ?? savedSearches;

  const fieldProps = { editing, setEditing, data, setData, setSaved, T };

  const loyalty = STUDENT.loyalty;
  const tierIdx = LOYALTY_TIERS.findIndex((t) => t.name === loyalty.tier);
  const nextTier = LOYALTY_TIERS[tierIdx + 1];
  const lessonsForCurrent = LOYALTY_TIERS[tierIdx]?.min || 0;
  const lessonsForNext    = nextTier?.min || 30;
  const tierProgress      = Math.min(100, ((loyalty.lessons - lessonsForCurrent) / (lessonsForNext - lessonsForCurrent)) * 100);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: T.surface }}>
      <div style={{ background: GRAD, padding: "36px 16px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <BackButton onBack={onBack} />
          <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: "white" }}>My Profile</div>
          {saved && (
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}>
              <Icon n="chk" s={12} c="white" sw={2.5} />
              <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>Saved</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 20 }}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <div style={{ width: 76, height: 76, borderRadius: 38, background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "white", border: "3px solid rgba(255,255,255,0.4)" }}>AR</div>
            <button style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, background: T.amber, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white", cursor: "pointer" }}>
              <Icon n="edit" s={12} c="white" />
            </button>
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "white", letterSpacing: "-0.02em" }}>{data.fullName}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>{data.email}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Member since {data.memberSince}</div>
          <div style={{ display: "flex", gap: 0, background: "rgba(0,0,0,0.18)", borderRadius: 14, marginTop: 16, overflow: "hidden", width: "100%" }}>
            {[{ v: STUDENT.bookings, l: "Lessons" }, { v: `RM ${STUDENT.spent}`, l: "Spent" }, { v: STUDENT.following, l: "Following" }].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: "10px 4px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <div style={{ color: "white", fontSize: 13, fontWeight: 900 }}>{s.v}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 8, marginTop: 1 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "10px 16px 6px", fontSize: 10, color: T.gray400 }}>Tap the edit icon on any field to update it.</div>

        {/* ── Loyalty Program ── */}
        <div style={{ background: T.card, marginBottom: 8, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 18 }}>{LOYALTY_TIERS[tierIdx].icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>{loyalty.tier}</div>
              <div style={{ fontSize: 10, color: T.gray500 }}>{loyalty.points} pts · {loyalty.lessons} lessons</div>
            </div>
            <div style={{ background: T.p100, borderRadius: 8, padding: "4px 10px" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: T.p700 }}>Growlink Loyalty</span>
            </div>
          </div>
          {/* Progress to next tier */}
          {nextTier && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: T.gray600 }}>Progress to {nextTier.icon} {nextTier.name}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: T.p600 }}>{loyalty.lessonsToNext} lessons to go</span>
              </div>
              <div style={{ height: 6, background: T.gray100, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${tierProgress}%`, background: GRAD, borderRadius: 3, transition: "width .6s ease" }} />
              </div>
            </div>
          )}
          {/* Perks */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {loyalty.perks.map((perk, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, background: T.p50, borderRadius: 8, padding: "4px 9px" }}>
                <Icon n="chk" s={10} c={T.p600} sw={2.5} />
                <span style={{ fontSize: 10, color: T.p700, fontWeight: 600 }}>{perk}</span>
              </div>
            ))}
          </div>
          {/* Tier strip */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
            {LOYALTY_TIERS.map((tier, i) => (
              <div key={tier.name} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{tier.icon}</div>
                <div style={{ fontSize: 8, fontWeight: i <= tierIdx ? 700 : 400, color: i <= tierIdx ? T.p600 : T.gray300 }}>{tier.name}</div>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: i <= tierIdx ? T.p600 : T.gray200, margin: "3px auto 0" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div style={{ background: T.card, marginBottom: 8 }}>
          <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900, letterSpacing: "0.03em" }}>Personal Information</div></div>
          <Divider />
          <Field icon="usr"   label="Full Name"     field="fullName" {...fieldProps} /><Divider />
          <Field icon="mail"  label="Email"         field="email"    {...fieldProps} /><Divider />
          <Field icon="phone" label="Phone"         field="phone"    {...fieldProps} /><Divider />
          <Field icon="cal"   label="Date of Birth" field="dob"      {...fieldProps} /><Divider />
          <Field icon="usr"   label="Gender"        field="gender"   {...fieldProps} /><Divider />
          <Field icon="pin"   label="Location"      field="location" {...fieldProps} />
        </div>

        {/* About Me */}
        <div style={{ background: T.card, marginBottom: 8 }}>
          <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>About Me</div></div>
          <Divider />
          <div style={{ padding: "12px 16px" }}>
            {editing === "bio" ? (
              <div>
                <textarea value={data.bio} onChange={(e) => setData((d) => ({ ...d, bio: e.target.value }))} autoFocus style={{ width: "100%", minHeight: 80, border: `1.5px solid ${T.p400}`, borderRadius: 10, padding: 10, fontSize: 11, color: T.gray900, background: T.surface, fontFamily: "'DM Sans',sans-serif", outline: "none", resize: "none", lineHeight: 1.5, boxSizing: "border-box" }} />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button onClick={() => setEditing(null)} style={{ flex: 1, background: T.gray100, border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 700, color: T.gray600, cursor: "pointer" }}>Cancel</button>
                  <button onClick={() => { setEditing(null); setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{ flex: 2, background: GRAD, border: "none", borderRadius: 8, padding: "7px", fontSize: 10, fontWeight: 700, color: "white", cursor: "pointer" }}>Save Bio</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ flex: 1, fontSize: 11, color: T.gray700, lineHeight: 1.6 }}>{data.bio}</div>
                <button onClick={() => setEditing("bio")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}><Icon n="edit" s={14} c={T.gray300} /></button>
              </div>
            )}
          </div>
          <Divider />
          <div style={{ padding: "12px 16px 14px" }}>
            <div style={{ fontSize: 10, color: T.gray400, fontWeight: 600, marginBottom: 8 }}>Learning Interests</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {data.interests.map((tag) => (
                <span key={tag} style={{ background: T.p100, color: T.p700, borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 600 }}>{tag}</span>
              ))}
              <button style={{ background: "none", border: `1px dashed ${T.border}`, borderRadius: 8, padding: "4px 10px", fontSize: 10, color: T.gray400, cursor: "pointer" }}>+ Add</button>
            </div>
          </div>
        </div>

        {/* Saved Searches */}
        <div style={{ background: T.card, marginBottom: 8 }}>
          <div style={{ padding: "14px 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Saved Searches</div>
            <span style={{ fontSize: 10, color: T.gray400 }}>{displayedSearches.length} saved</span>
          </div>
          <Divider />
          {displayedSearches.length === 0 ? (
            <div style={{ padding: "14px 16px", fontSize: 11, color: T.gray400 }}>No saved searches yet. Save a search from the filter panel.</div>
          ) : displayedSearches.map((ss, i) => (
            <div key={ss.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: T.p50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon n="srch" s={14} c={T.p600} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>{ss.name}</div>
                  <div style={{ fontSize: 10, color: T.gray500 }}>{ss.summary}</div>
                </div>
                <button
                  onClick={() => onToggleSearchAlert ? onToggleSearchAlert(ss.id) : setSavedSearches((prev) => prev.map((s) => s.id === ss.id ? { ...s, alerts: !s.alerts } : s))}
                  style={{ background: ss.alerts ? T.p50 : T.gray50, border: `1px solid ${ss.alerts ? T.p200 : T.border}`, borderRadius: 8, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}
                >
                  <Icon n="bell" s={11} c={ss.alerts ? T.p600 : T.gray400} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: ss.alerts ? T.p600 : T.gray400 }}>Alert {ss.alerts ? "on" : "off"}</span>
                </button>
                <button onClick={() => onDeleteSearch ? onDeleteSearch(ss.id) : setSavedSearches((prev) => prev.filter((s) => s.id !== ss.id))} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <Icon n="x" s={13} c={T.gray300} />
                </button>
              </div>
              {i < displayedSearches.length - 1 && <Divider />}
            </div>
          ))}
        </div>

        {/* Following */}
        <div style={{ background: T.card, marginBottom: 8 }}>
          <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Following ({STUDENT.following})</div></div>
          <Divider />
          {TEACHERS.slice(0, 3).map((t, i) => (
            <div key={t.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px" }}>
                <Avatar init={t.avatar} size={38} bg={T.p600} color="white" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>{t.name}</div>
                  <div style={{ fontSize: 10, color: T.gray500 }}>{t.skill}</div>
                </div>
                <Stars rating={t.rating} size={10} />
              </div>
              {i < 2 && <Divider />}
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div style={{ background: T.card, marginBottom: 8 }}>
          <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Preferences</div></div>
          <Divider />
          {[
            { icon: "globe",  label: "Language",      value: data.language },
            { icon: "bell",   label: "Notifications", value: "All on"      },
            { icon: "shield", label: "Privacy",       value: "Visible to teachers" },
          ].map((r, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: T.gray50, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n={r.icon} s={15} c={T.gray400} /></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: T.gray900 }}>{r.label}</div><div style={{ fontSize: 10, color: T.gray400 }}>{r.value}</div></div>
                <Icon n="chev" s={14} c={T.gray300} />
              </div>
              {i < 2 && <Divider />}
            </div>
          ))}
        </div>

        {/* Account */}
        <div style={{ background: T.card, marginBottom: 8 }}>
          <div style={{ padding: "14px 16px 10px" }}><div style={{ fontSize: 11, fontWeight: 800, color: T.gray900 }}>Account</div></div>
          <Divider />
          {[{ icon: "help", label: "Help & Support", sub: "FAQs, contact us" }, { icon: "shield", label: "Terms & Privacy", sub: "View our policies" }].map((r, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", cursor: "pointer" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: T.gray50, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n={r.icon} s={15} c={T.gray400} /></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: T.gray900 }}>{r.label}</div><div style={{ fontSize: 10, color: T.gray400 }}>{r.sub}</div></div>
                <Icon n="chev" s={14} c={T.gray300} />
              </div>
              <Divider />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: T.redL, border: `1px solid ${T.red}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon n="log" s={15} c={T.red} /></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: T.red }}>Sign Out</div></div>
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
};

export default ProfileScreen;
