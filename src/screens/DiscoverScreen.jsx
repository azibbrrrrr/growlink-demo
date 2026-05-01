import { useState } from "react";
import { T, GRAD } from "../constants/tokens";
import { TEACHERS, MSGS } from "../constants/data";
import { CATEGORIES } from "../constants/navigation";
import Icon from "../components/icons/Icon";
import { Avatar, Card, Pill, Stars, GradientHeader, EmptyState } from "../components/primitives";
import BottomNav from "../components/navigation/BottomNav";

const DiscoverScreen = ({ onNav, onQuickPeek, saved, onToggleSave }) => {
  const [view, setView] = useState("map");
  const [sel, setSel] = useState(null);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ cat: "All", priceMax: 200, minRating: 0, mode: "all", dist: 10 });

  const filtered = TEACHERS.filter((t) => {
    const matchCat = filters.cat === "All" || t.skill.toLowerCase().includes(filters.cat.toLowerCase());
    const matchSearch = search === "" || t.name.toLowerCase().includes(search.toLowerCase()) || t.skill.toLowerCase().includes(search.toLowerCase());
    const matchPrice = t.price <= filters.priceMax;
    const matchRating = t.rating >= filters.minRating;
    const matchMode = filters.mode === "all" || (filters.mode === "online" && t.mode.includes("Online")) || (filters.mode === "physical" && t.mode.includes("Physical"));
    const matchDist = t.dist <= filters.dist;
    return matchCat && matchSearch && matchPrice && matchRating && matchMode && matchDist;
  });

  const activeFilters =
    (filters.priceMax < 200 ? 1 : 0) + (filters.minRating > 0 ? 1 : 0) +
    (filters.mode !== "all" ? 1 : 0) + (filters.dist < 10 ? 1 : 0);
  const resetFilters = () => setFilters({ cat: "All", priceMax: 200, minRating: 0, mode: "all", dist: 10 });
  const unread = MSGS.reduce((s, m) => s + m.unread, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <GradientHeader>
        <div style={{ fontSize: 17, fontWeight: 800, color: "white", marginBottom: 10 }}>Discover</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.18)", borderRadius: 12, padding: "9px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
            <Icon n="srch" s={13} c="rgba(255,255,255,0.6)" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Teacher, subject, skill…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "white", fontFamily: "'DM Sans',sans-serif" }} />
            {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}><Icon n="x" s={13} c="rgba(255,255,255,0.6)" /></button>}
          </div>
          <button onClick={() => setShowFilter((v) => !v)} style={{ position: "relative", width: 40, height: 40, borderRadius: 10, background: showFilter ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon n="sliders" s={16} c={showFilter ? T.p700 : "white"} />
            {activeFilters > 0 && <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: 8, background: T.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "white" }}>{activeFilters}</div>}
          </button>
        </div>
      </GradientHeader>

      {showFilter && (
        <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "14px 16px", flexShrink: 0, animation: "slideDown .2s ease" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 12 }}>Filters</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: T.gray500, fontWeight: 600, marginBottom: 6 }}>Max Price: RM {filters.priceMax}/hr</div>
              <input type="range" min={20} max={200} value={filters.priceMax} onChange={(e) => setFilters((f) => ({ ...f, priceMax: +e.target.value }))} style={{ width: "100%", accentColor: T.p600 }} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: T.gray500, fontWeight: 600, marginBottom: 6 }}>Min Distance: {filters.dist} km</div>
              <input type="range" min={1} max={20} value={filters.dist} onChange={(e) => setFilters((f) => ({ ...f, dist: +e.target.value }))} style={{ width: "100%", accentColor: T.p600 }} />
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: T.gray500, fontWeight: 600, marginBottom: 6 }}>Min Rating</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 4, 4.5, 4.8].map((r) => (
                <button key={r} onClick={() => setFilters((f) => ({ ...f, minRating: r }))} style={{ padding: "4px 10px", borderRadius: 8, border: `1px solid ${filters.minRating === r ? T.p600 : T.border}`, background: filters.minRating === r ? T.p100 : "none", cursor: "pointer", fontSize: 9, fontWeight: 600, color: filters.minRating === r ? T.p700 : T.gray500 }}>
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: T.gray500, fontWeight: 600, marginBottom: 6 }}>Lesson Mode</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["all", "All"], ["online", "Online"], ["physical", "Physical"]].map(([k, l]) => (
                <button key={k} onClick={() => setFilters((f) => ({ ...f, mode: k }))} style={{ padding: "4px 10px", borderRadius: 8, border: `1px solid ${filters.mode === k ? T.p600 : T.border}`, background: filters.mode === k ? T.p100 : "none", cursor: "pointer", fontSize: 9, fontWeight: 600, color: filters.mode === k ? T.p700 : T.gray500 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={resetFilters} style={{ flex: 1, padding: "8px", background: "none", border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 11, fontWeight: 700, color: T.gray500, cursor: "pointer" }}>Reset</button>
            <button onClick={() => setShowFilter(false)} style={{ flex: 2, padding: "8px", background: GRAD, border: "none", borderRadius: 10, fontSize: 11, fontWeight: 800, color: "white", cursor: "pointer" }}>Show {filtered.length} Teachers</button>
          </div>
        </div>
      )}

      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 7, padding: "10px 16px 8px", overflowX: "auto" }}>
          {CATEGORIES.map((c) => <Pill key={c} text={c} active={filters.cat === c} onClick={() => setFilters((f) => ({ ...f, cat: c }))} />)}
        </div>
        <div style={{ display: "flex", padding: "0 16px 10px", gap: 8 }}>
          {[{ id: "map", icon: "map", label: "Map View" }, { id: "list", icon: "list", label: "List View" }].map((v) => (
            <button key={v.id} onClick={() => setView(v.id)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "7px", borderRadius: 10, cursor: "pointer", background: v.id === view ? T.p600 : T.surface, color: v.id === view ? "white" : T.gray500, fontSize: 11, fontWeight: 700, border: v.id === view ? "none" : `1px solid ${T.border}` }}>
              <Icon n={v.icon} s={14} c={v.id === view ? "white" : T.gray400} />{v.label}
            </button>
          ))}
        </div>
      </div>

      {view === "map" && (
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "#E4EFE8" }}>
            {[...Array(8)].map((_, i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 13}%`, height: 1, background: "rgba(0,0,0,0.04)" }} />)}
            {[...Array(7)].map((_, i) => <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 16}%`, width: 1, background: "rgba(0,0,0,0.04)" }} />)}
            <div style={{ position: "absolute", top: "40%", left: 0, right: 0, height: 9, background: "rgba(255,255,255,0.8)", borderRadius: 2 }} />
            <div style={{ position: "absolute", top: "65%", left: 0, right: 0, height: 6, background: "rgba(255,255,255,0.65)", borderRadius: 2 }} />
            <div style={{ position: "absolute", left: "33%", top: 0, bottom: 0, width: 8, background: "rgba(255,255,255,0.7)" }} />
            <div style={{ position: "absolute", left: "60%", top: 0, bottom: 0, width: 6, background: "rgba(255,255,255,0.55)" }} />
            <div style={{ position: "absolute", top: "50%", left: "43%", transform: "translate(-50%,-50%)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, border: "2px solid rgba(59,130,246,0.2)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3B82F6", border: "3px solid white", boxShadow: "0 2px 8px rgba(59,130,246,0.5)" }} />
            </div>
            {filtered.map((t) => (
              <div key={t.id} onClick={() => setSel(sel?.id === t.id ? null : t)} style={{ position: "absolute", top: t.y, left: t.x, transform: "translate(-50%,-100%)", zIndex: sel?.id === t.id ? 10 : 5, cursor: "pointer" }}>
                {sel?.id === t.id && <div style={{ background: T.white, borderRadius: 10, padding: "5px 9px", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", marginBottom: 4, whiteSpace: "nowrap", border: `2px solid ${T.p600}`, fontSize: 10, fontWeight: 800, color: T.p800 }}>{t.name.split(" ")[0]} · RM {t.price}/hr</div>}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ background: sel?.id === t.id ? T.p600 : T.p500, color: "white", borderRadius: "50% 50% 50% 0", width: sel?.id === t.id ? 34 : 26, height: sel?.id === t.id ? 34 : 26, transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", flexShrink: 0 }}>
                    <span style={{ transform: "rotate(45deg)", fontSize: sel?.id === t.id ? 11 : 9, fontWeight: 800 }}>{t.avatar[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: T.card, borderRadius: "20px 20px 0 0", boxShadow: "0 -8px 30px rgba(0,0,0,0.10)", padding: "10px 16px 0" }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: T.border, margin: "0 auto 12px" }} />
            {sel ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <Avatar init={sel.avatar} size={48} bg={T.p600} color="white" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: T.gray900 }}>{sel.name}</div>
                      {sel.verified && <Icon n="chk" s={11} c={T.blue} sw={2.5} />}
                    </div>
                    <div style={{ fontSize: 11, color: T.gray500, marginBottom: 3 }}>{sel.skill}</div>
                    <div style={{ display: "flex", gap: 8 }}><Stars rating={sel.rating} /><span style={{ fontSize: 10, color: T.gray400 }}>({sel.reviews})</span></div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: T.p600 }}>RM {sel.price}</div>
                    <div style={{ fontSize: 9, color: T.gray400 }}>/ hour</div>
                  </div>
                </div>
                <button onClick={() => onQuickPeek(sel)} style={{ width: "100%", background: GRAD, border: "none", borderRadius: 12, padding: "12px", fontSize: 12, fontWeight: 800, color: "white", cursor: "pointer", marginBottom: 14, boxShadow: `0 4px 14px ${T.p600}40` }}>View & Book</button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900, marginBottom: 10 }}>{filtered.length} teachers nearby</div>
                <div style={{ display: "flex", gap: 10, paddingBottom: 14 }}>
                  {filtered.slice(0, 3).map((t) => (
                    <div key={t.id} onClick={() => setSel(t)} style={{ flex: 1, background: T.surface, borderRadius: 12, padding: "10px", border: `1px solid ${T.border}`, cursor: "pointer" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: T.gray900 }}>{t.name.split(" ")[0]}</div>
                      <div style={{ fontSize: 9, color: T.gray400, margin: "2px 0 5px" }}>{t.skill.split(" · ")[0]}</div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: T.p600 }}>RM {t.price}</span>
                        <span style={{ fontSize: 9, color: T.gray400 }}>★{t.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {view === "list" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
          <div style={{ fontSize: 11, color: T.gray400, marginBottom: 10 }}>{filtered.length} teachers found</div>
          {filtered.length === 0 ? (
            <EmptyState icon="srch" title="No teachers found" sub="Try adjusting your filters or search a different subject." cta="Clear Filters" onCta={resetFilters} />
          ) : filtered.map((t) => (
            <Card key={t.id} onClick={() => onQuickPeek(t)} style={{ display: "flex", gap: 12, padding: "13px 14px", marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ position: "relative" }}>
                <Avatar init={t.avatar} size={48} bg={T.p600} color="white" />
                {t.top && <div style={{ position: "absolute", top: -4, right: -4, background: T.amber, borderRadius: 5, padding: "1px 4px", fontSize: 7, fontWeight: 700, color: "white" }}>TOP</div>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: T.gray900 }}>{t.name}</div>
                  {t.verified && <Icon n="chk" s={10} c={T.blue} sw={2.5} />}
                  {t.certified && <Icon n="award" s={10} c={T.green} sw={2} />}
                </div>
                <div style={{ fontSize: 10, color: T.gray500, marginBottom: 4 }}>{t.skill}</div>
                <Stars rating={t.rating} size={10} /><span style={{ fontSize: 9, color: T.gray400, marginLeft: 4 }}>({t.reviews})</span>
                <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                  {t.mode.map((m) => <span key={m} style={{ fontSize: 8, background: T.p100, color: T.p700, borderRadius: 5, padding: "2px 6px", fontWeight: 600 }}>{m}</span>)}
                  <span style={{ fontSize: 8, background: T.gray100, color: T.gray500, borderRadius: 5, padding: "2px 6px" }}>{t.dist} km</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: T.p600 }}>RM {t.price}</div>
                <div style={{ fontSize: 9, color: T.gray400 }}>/hour</div>
                <div style={{ marginTop: 5 }}>
                  <button onClick={(e) => { e.stopPropagation(); onToggleSave(t.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                    <Icon n="heart" s={14} c={saved.has(t.id) ? T.red : T.gray300} fill={saved.has(t.id) ? T.red : "none"} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
          <div style={{ height: 16 }} />
        </div>
      )}
      {view === "list" && <BottomNav active="disc" onNav={onNav} unread={unread} />}
    </div>
  );
};

export default DiscoverScreen;
