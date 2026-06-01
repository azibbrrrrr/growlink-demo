import { useState } from "react";
import { STUDENT, TEACHERS } from "./constants/data";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

// Screens
import OnboardingScreen from "./screens/OnboardingScreen";
import UserSelectScreen from "./screens/UserSelectScreen";
import HomeScreen       from "./screens/HomeScreen";
import DiscoverScreen   from "./screens/DiscoverScreen";
import BookingsScreen   from "./screens/BookingsScreen";
import ActivityScreen   from "./screens/ActivityScreen";
import MessagesScreen   from "./screens/MessagesScreen";
import ChatScreen       from "./screens/ChatScreen";
import TeacherProfile   from "./screens/TeacherProfile";
import ProfileScreen    from "./screens/ProfileScreen";
import ProgressScreen   from "./screens/ProgressScreen";
import CompareScreen    from "./screens/CompareScreen";
import BookStep1        from "./screens/booking/BookStep1";
import BookStep2        from "./screens/booking/BookStep2";
import BookStep3        from "./screens/booking/BookStep3";

// Overlays
import QuickPeekSheet   from "./components/overlays/QuickPeekSheet";
import CompareBar       from "./components/overlays/CompareBar";

function AppInner() {
  const { T } = useTheme();

  // Onboarding
  const [onboarded,  setOnboarded]  = useState(false);

  // User state selector (null = show selector screen)
  const [userState,  setUserState]  = useState(null);

  // Navigation state
  const [screen,     setScreen]     = useState("home");

  // Saved teachers
  const [saved,      setSaved]      = useState(new Set());

  // Compare list (max 3 teachers)
  const [compareList, setCompareList] = useState([]);
  const [savedSearches, setSavedSearches] = useState(STUDENT.savedSearches || []);

  // Teacher & booking flow state
  const [selT,       setSelT]       = useState(null);
  const [bookT,      setBookT]      = useState(null);
  const [bookStep,   setBookStep]   = useState(1);
  const [bookData,   setBookData]   = useState({});
  const [initPkg,    setInitPkg]    = useState(null);
  const [teacherTab, setTeacherTab]  = useState("about");

  // Progress screen
  const [progressBooking, setProgressBooking] = useState(null);

  // Overlays
  const [quickPeek,  setQuickPeek]  = useState(null);
  const [chatC,      setChatC]      = useState(null);

  // ── Actions ─────────────────────────────────────────────────
  const toggleSave = (id) => setSaved((s) => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  const toggleCompare = (teacher) => {
    setCompareList((prev) => {
      if (prev.includes(teacher.id)) return prev.filter((id) => id !== teacher.id);
      if (prev.length >= 3) return prev;
      return [...prev, teacher.id];
    });
  };

  const openTeacher = (t) => { setSelT(t); setTeacherTab("about"); setQuickPeek(null); setScreen("teacher"); };
  const openPeek    = (t) => setQuickPeek(t);

  const startBook = (t, pkg) => {
    setBookT(t); setInitPkg(pkg); setBookData({}); setBookStep(1);
    setQuickPeek(null); setScreen("booking");
  };

  const goHome = (dest = "bkgs") => {
    setScreen(dest); setSelT(null); setBookT(null); setBookStep(1); setBookData({});
  };

  const openProgress = (booking) => { setProgressBooking(booking); setScreen("prog"); };
  const openMaterials = (booking) => {
    const teacher = TEACHERS.find((t) => t.name === booking.teacher) || TEACHERS[0];
    setSelT(teacher);
    setTeacherTab("materials");
    setScreen("teacher");
  };
  const addSavedSearch = (name) => {
    setSavedSearches((items) => [{ id: Date.now(), name, summary: "Custom filters · alerts on", alerts: true }, ...items]);
  };
  const deleteSavedSearch = (id) => setSavedSearches((items) => items.filter((s) => s.id !== id));
  const toggleSearchAlert = (id) => setSavedSearches((items) => items.map((s) => s.id === id ? { ...s, alerts: !s.alerts } : s));

  // ── Render ───────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080F0B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 375, height: 812,
          borderRadius: 48,
          border: "10px solid #1A2E24",
          boxShadow: "0 0 0 2px #0D1F17, 0 32px 80px rgba(0,0,0,0.7)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          background: T.surface,
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 120, height: 28,
            background: "#1A2E24",
            borderRadius: "0 0 20px 20px",
            zIndex: 500,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <div style={{ width: 8,  height: 8, borderRadius: 4, background: "#0D1F17" }} />
          <div style={{ width: 40, height: 5, borderRadius: 3, background: "#0D1F17" }} />
        </div>

        {/* App viewport */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

          {/* ── Full-screen overlays ── */}
          {chatC && <ChatScreen contact={chatC} onClose={() => setChatC(null)} />}

          {quickPeek && (
            <QuickPeekSheet
              teacher={quickPeek}
              saved={saved}
              onToggleSave={toggleSave}
              onClose={() => setQuickPeek(null)}
              onBook={startBook}
              onFullProfile={openTeacher}
            />
          )}

          {/* ── Onboarding ── */}
          {!onboarded && (
            <OnboardingScreen onDone={() => setOnboarded(true)} />
          )}

          {/* ── Post-onboarding screens ── */}
          {onboarded && (
            <>
              {/* ── Profile ── */}
              {screen === "profile" && (
                <ProfileScreen
                  onBack={() => setScreen("home")}
                  savedSearches={savedSearches}
                  onDeleteSearch={deleteSavedSearch}
                  onToggleSearchAlert={toggleSearchAlert}
                />
              )}

              {/* ── Progress ── */}
              {screen === "prog" && (
                <ProgressScreen booking={progressBooking} onBack={() => setScreen("bkgs")} />
              )}

              {/* ── Compare ── */}
              {screen === "compare" && (
                <CompareScreen
                  compareList={compareList}
                  onBack={() => setScreen("disc")}
                  onBook={(t) => startBook(t, t.pkgs[0])}
                  onRemove={(id) => setCompareList((list) => list.filter((x) => x !== id))}
                />
              )}

              {/* ── Booking flow (3 steps) ── */}
              {screen === "booking" && bookStep === 1 && (
                <BookStep1
                  teacher={bookT}
                  initPkg={initPkg}
                  onBack={() => setScreen(selT ? "teacher" : "home")}
                  onNext={(d) => { setBookData(d); setBookStep(2); }}
                />
              )}
              {screen === "booking" && bookStep === 2 && (
                <BookStep2
                  teacher={bookT}
                  booking={bookData}
                  onBack={() => setBookStep(1)}
                  onNext={(d) => { setBookData(d); setBookStep(3); }}
                />
              )}
              {screen === "booking" && bookStep === 3 && (
                <BookStep3 teacher={bookT} booking={bookData} onDone={goHome} />
              )}

              {/* ── Teacher profile ── */}
              {screen === "teacher" && selT && (
                <TeacherProfile
                  teacher={selT}
                  onBack={() => setScreen("disc")}
                  onBook={startBook}
                  saved={saved}
                  onToggleSave={toggleSave}
                  initialTab={teacherTab}
                  onCompare={toggleCompare}
                  compareList={compareList}
                />
              )}

              {/* ── Main screens ── */}
              {screen === "home" && !userState && (
                <UserSelectScreen onSelect={(s) => { setUserState(s); setScreen("home"); }} />
              )}
              {screen === "home" && userState && (
                <HomeScreen
                  userState={userState}
                  onNav={setScreen}
                  onProfile={() => setScreen("profile")}
                  onChangeUser={() => { setUserState(null); setScreen("home"); }}
                  saved={saved}
                  onToggleSave={toggleSave}
                  onQuickPeek={openPeek}
                  onQuickBook={(t) => startBook(t, t.pkgs[1])}
                  onCompare={toggleCompare}
                  compareList={compareList}
                  onSaveSearch={addSavedSearch}
                />
              )}
              {screen === "disc" && (
                <DiscoverScreen
                  onNav={setScreen}
                  onQuickPeek={openPeek}
                  saved={saved}
                  onToggleSave={toggleSave}
                  compareList={compareList}
                  onToggleCompare={toggleCompare}
                />
              )}
              {screen === "bkgs" && (
                <BookingsScreen onNav={setScreen} onProgress={openProgress} onOpenMaterials={openMaterials} />
              )}
              {screen === "act"  && <ActivityScreen onNav={setScreen} />}
              {screen === "msgs" && <MessagesScreen onNav={setScreen} onChat={(c) => setChatC(c)} />}

              {/* Compare bar — floats above bottom nav when comparing */}
              {compareList.length > 0 && screen !== "compare" && (
                <CompareBar
                  compareList={compareList}
                  onCompare={() => setScreen("compare")}
                  onClear={() => setCompareList([])}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Watermark */}
      <div
        style={{
          position: "fixed", right: 24, top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.12)",
          textTransform: "uppercase", userSelect: "none",
        }}
      >
        Growlink · Student Workspace · v2.0
      </div>
    </div>
  );
}

export default function GrowlinkStudentApp() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
