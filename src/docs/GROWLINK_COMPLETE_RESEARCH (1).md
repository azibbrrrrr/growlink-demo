# Growlink — Complete Product Research & Improvement Report

**Date:** February 2026  
**Scope:** Teacher Posts · Student Safety · UI/UX · Features · Security  
**Audience:** Growlink Founding Team (Wes, Azri, Azib, Jasmine, Ikhwan)

---

## Table of Contents

1. [Teacher Posts Feature — Pros, Cons & Recommendation](#1-teacher-posts)
2. [Student Safety](#2-student-safety)
3. [UI/UX Improvements](#3-uiux-improvements)
4. [Feature Improvements](#4-feature-improvements)
5. [App & Internet Security](#5-security)
6. [Priority Matrix & Roadmap](#6-priority-matrix)

---

# 1. TEACHER POSTS

## 1.1 What It Is

A social feed where teachers publish content visible to their followers and to students browsing their profile. Content types: short text updates, lesson tips, schedule announcements, student progress highlights (with consent), teaching philosophy, and promotional content.

---

## 1.2 Pros

### Engagement & Discovery
- **Keeps the app alive between bookings.** Students who aren't ready to book still have a reason to open the app, browse posts, and stay familiar with teachers.
- **Organic discovery.** A teacher who posts regularly gets surfaced more, reducing reliance on paid visibility.
- **Social proof at a glance.** A teacher with 12 posts showing lesson snippets, tips, and student milestones communicates expertise before you even read their bio.
- **Algorithm-friendly content.** Posts provide ranking signals — saves, likes, dwell time — that can feed smarter teacher recommendations.

### Conversion & Trust
- **Students book teachers they feel they know.** Posts let teaching style, personality, and communication come through. This is difficult to convey through a bio alone.
- **Reduces booking hesitation.** Seeing a teacher consistently post over 3 months signals reliability, reducing abandonment.
- **Free sales funnel.** A helpful post ("5 mistakes beginner guitarists make") builds credibility without feeling like an advertisement.

### Retention & Marketplace Value
- **Differentiation.** Most booking platforms (Wyzant, Superprof, GetTutored) are purely transactional. A content layer is a meaningful moat.
- **Teacher investment.** Teachers who create content feel more invested in the platform and are less likely to churn.
- **Platform network effect.** More teachers posting → more students opening the app → more bookings → more teachers joining.

### Business Metrics
- **Longer session time** (students scroll, discover new teachers)
- **Higher follow counts** (teachers build audiences)
- **Improved SEO** if posts are indexed
- **Richer data** for recommendation engine

---

## 1.3 Cons

### Moderation Burden (Biggest Risk)
- **Inappropriate content.** Even without bad intent, teachers can post photos involving minors, culturally sensitive content, or misuse images.
- **Spam.** Teachers post 5 times a day to game the algorithm, flooding the feed.
- **Plagiarism.** Teachers copy content from YouTube educators, competitor platforms, or published textbooks.
- **Misinformation.** Incorrect academic content, harmful health advice, culturally offensive views.
- **You need a moderation system before you post a single public piece of content.** This is a real operational cost.

### Off-Platform Recruitment (Existential Risk)
- Teachers share phone numbers, WhatsApp links, Telegram channels, or personal emails in posts to bypass Growlink fees.
- Subtler: "DM me for special rates" or "Visit my website for free resources."
- This is the #1 marketplace-killer. Airbnb, Fiverr, Upwork all fight this continuously.
- **One undetected pattern of this at scale and your GMV collapses.**

### Content Quality
- Most teachers won't post consistently. A feed with 1 post from 8 months ago looks worse than no feed.
- Low-quality posts (blurry photos, grammar errors, generic tips) actively damage brand perception.
- Forcing teachers to be content creators alienates excellent teachers who aren't social media-savvy.

### Privacy & Legal
- Photos of minor students in posts (even with consent) carry significant liability.
- Defamatory posts about other teachers or rival platforms.
- Copyright infringement (copyrighted music, textbook excerpts, YouTube videos).
- Malaysian CMA (Communications and Multimedia Act) implications for user-generated content.

### Operational Cost
- Storage and CDN costs for images/videos scale quickly.
- Moderation staff or AI moderation pipeline needs setup and ongoing tuning.
- Engineering time for feed algorithms, ranking, spam detection.

---

## 1.4 Verdict

**Build it — but Phase 1 must be heavily constrained.**

The opportunity outweighs the risk IF the guardrails are in place from day one. Retrofitting safety into a content system after bad behavior has already happened is far more costly (in reputation and engineering) than designing it in correctly from the start.

---

## 1.5 Phase 1 Implementation (Recommended at Launch)

### Allowed
- Text (max 300 characters)
- 1 image per post
- Maximum 3 posts per teacher per week
- Posts visible on: teacher's own profile tab, followers' home feed

### Not Allowed (Hard-blocked)
- External URLs (auto-rejected)
- Phone numbers (regex detection)
- Email addresses (regex detection)
- Social media handles (@name patterns)
- Video (Phase 2)
- Comments (Phase 2) — likes and saves only

### Process
- First 10 posts from any teacher go to a manual review queue before publishing
- After 10 approved posts, move to automated moderation with spot-checks
- 3 reports from different users = auto-hidden + manual review
- Violations: warning → 7-day post suspension → permanent ban from posting

### Anti-Recruitment Technical Measures
- Regex filters: phone number patterns, email patterns, social handle patterns
- Link detection: any URL blocked (with user-facing message)
- AI text classifier for indirect solicitation ("WhatsApp me", "contact me outside")
- Image OCR scanning for embedded contact info in photos

### Phase 2 (3–6 months post-launch)
- Video posts (15-second maximum)
- Comments (with pre-moderation for first 30 days)
- Public community discovery feed
- Post analytics for teachers (views, saves, profile visits from post)

### Phase 3 (6–12 months)
- Teacher "Stories" (24-hour disappearing content)
- Lesson preview clips
- Student achievement posts (with parental consent flow)
- Sponsored/boosted posts (teacher pays for visibility)

---

# 2. STUDENT SAFETY

> **This is the most important section in this document.** Growlink facilitates physical meetings between students — many of whom are minors — and adult strangers. No amount of good UI compensates for insufficient safety infrastructure. A single serious incident can end a company. The platforms that survive (Uber, Airbnb, Care.com) are the ones that built safety into the core product, not as an afterthought.

---

## 2.1 The Risk Profile

Growlink occupies a uniquely sensitive intersection:

- **Students are often minors.** Malaysian tutoring context skews heavily toward ages 8–18 (piano, math, language, exam prep).
- **Lessons happen in private settings.** Teacher's home, student's home — no public witnesses.
- **Recurring contact.** Weekly lessons build trust over time, creating conditions that can be exploited (grooming).
- **Power imbalance.** Adult professional authority over a minor student.
- **Parents often not present.** Especially for university students or older teens booking independently.

---

## 2.2 Safety Framework: 5 Layers

### Layer 1 — Teacher Vetting

**Verification Tiers:**

| Tier | Requirements | Badge | Who Sees It |
|---|---|---|---|
| Verified Identity | Government ID + selfie liveness match | Blue checkmark | All students |
| Certified Credentials | Education cert / professional qualification | Green badge | Profile + search |
| Background Checked | PDRM (Royal Malaysia Police) clearance cert | Amber badge | Profile + search |
| Trusted Teacher | All above + 50 completed lessons + interview | Gold badge | Featured placement |

**Implementation notes:**
- ID verification via third-party (Onfido, Jumio, or local Malaysian provider)
- Selfie liveness check (prevents static photo upload)
- Annual re-verification for all active teachers
- Auto-suspend if ID or cert expires
- "Verified Identity" is mandatory before any teacher can publish a profile. No exceptions.

**For teachers accepting under-18 students:**
- Background check (or PDRM clearance) becomes mandatory, not optional.
- Teacher explicitly acknowledges "Teaching Minors Policy" during onboarding.
- More frequent re-vetting (annual vs every 2 years).

---

### Layer 2 — Pre-Booking Setup

**Emergency Contacts**

Every student account must have at minimum:
- 1 emergency contact (full name, phone number, relationship)
- Contact verified via OTP sent to that number — prevents fake entries
- For under-18 accounts: parent/guardian contact is mandatory, not optional

Parent/guardian receives:
- Notification when any booking is confirmed (teacher name, subject, time, location type)
- Optional "booking approval" mode — parent must approve before booking is confirmed
- Link to view teacher's full profile including verification badges and reviews
- Summary of teacher's background check status

**Parents can:**
- View the booking calendar for their child
- See the chat thread between student and teacher (read-only, opt-in)
- Revoke any booking with one tap
- Block any teacher permanently

---

### Layer 3 — During-Lesson Safety

**Live Location Sharing (Physical lessons only)**

- Auto-enabled 30 minutes before any physical lesson start time
- Shared with verified emergency contacts only (never with teacher)
- Map shows student's current location vs expected lesson location
- Geofence alert: if student travels >300m from expected location during lesson window, emergency contacts are notified silently
- Auto-disabled 60 minutes after lesson scheduled end time
- Student can disable per-lesson but sees a clear warning: "Your emergency contact will not be able to see your location during this lesson."
- Location data encrypted in transit and at rest
- Auto-deleted 7 days after lesson

**Lesson Check-In**

15 minutes into any lesson (physical or online), app sends a gentle background prompt:
> "Quick check — how's the lesson going?"  
> [All good] [I want to leave] [I need help]

- **All good** → logged silently, no action
- **I want to leave** → offers: "No problem. We'll send you a message script to politely end early. Need help arranging transport?"
- **I need help** → SILENTLY alerts all emergency contacts with location and teacher info. Does NOT display anything on screen (in case another person is watching the phone). Sends auto-SMS to contacts: "Ahmad may need assistance. Location: [GPS link]. Lesson with: [Teacher name]. Call them now."

**SOS Button**

- Always visible during active lesson period — small persistent button, top-right corner
- Long-press 3 seconds to activate (prevents accidental trigger)
- On activation:
  1. Calls 999 (Malaysia emergency services) with speaker on
  2. Sends location + teacher details to all emergency contacts via SMS
  3. Notifies Growlink safety team (live person during business hours, queue otherwise)
  4. Starts encrypted audio recording stored locally on device
  5. Covers screen with a decoy UI (so activating it isn't obvious to someone nearby)

**Optional Lesson Audio Recording**

- Student can opt in per booking in the booking confirmation screen
- Fully local — stored encrypted on the student's device, never uploaded to Growlink servers
- Auto-deleted after 30 days unless student manually saves
- Teacher is informed at the time of booking that the student has opted to record (legal protection for both parties)
- For under-18 students: parent can enable mandatory recording from parent settings

---

### Layer 4 — Communication Safety

**In-App Only (Before first lesson)**

- No external links, phone numbers, or emails can be sent through chat
- Teacher cannot request to move communication outside the platform
- AI monitors chat in real time for:
  - Contact info sharing attempts ("my number is...", "message me on...")
  - Requests to meet outside lesson context ("want to grab coffee after?")
  - Grooming language patterns (excessive personal questions, gift offers, secrecy language)
  - Romantic or sexual language
- Flagged conversations go to human safety reviewer within 4 hours
- Auto-block if pattern is clear (e.g., phone number detected)

**After First Completed Lesson**

- Photo sharing allowed (for lesson materials — whiteboard photos, music sheets)
- AI continues to monitor
- Video calling only through in-app (no external meeting links for paid lessons)

**Media Content Policy**

- Images scanned via AI before delivery (CSAM detection, nudity, violent content)
- Any flagged image: blocked, logged, reviewed by safety team within 1 hour
- Zero tolerance: immediate account ban + report to MCMC (Malaysia's communications regulator)

---

### Layer 5 — Post-Lesson & Incident Handling

**Anonymous Reviews**

- Students can choose to post reviews anonymously
- Teacher sees the review content but not the reviewer's identity
- Prevents retaliation and encourages honest feedback
- Anonymous reviews still visible publicly and affect teacher rating

**Block & Report**

- One-tap block from any teacher screen, post, or message thread
- Blocking auto-refunds any upcoming paid bookings with that teacher
- Report categories (with appropriate escalation path):

| Category | Response Time | Action |
|---|---|---|
| Inappropriate communication | 24 hours | Investigation, possible suspension |
| Physical safety concern | 1 hour | Immediate teacher suspension, safety team contact |
| Sexual harassment or assault | Immediate | Account ban, police referral, student support |
| Fraud / payment issue | 48 hours | Refund initiated, account review |
| Teacher no-show | Automated | Immediate full refund |
| Quality issue | 72 hours | Standard review |

**All reports:**
- Confidential (teacher never sees who reported)
- Acknowledged within 1 hour ("We've received your report and are reviewing it.")
- Case number provided for follow-up
- Status updates until resolved

**Post-Incident Support**

- Links to Malaysia's hotlines (e.g., Talian Kasih 15999, PDRM)
- Offer to connect student with Growlink's welfare officer
- Counseling resources (Befrienders Malaysia, mental health links)
- Guided documentation support if police report is needed

---

## 2.3 Safety UX Patterns

**Make safety feel empowering, not scary.** The UI language should be "We've got your back" not "Danger everywhere."

### During Onboarding
```
Step 1: Your details
Step 2: Add an emergency contact
   └─ Framing: "We'll check in during your first few lessons 
                and share your location with them. 
                You can update this anytime."
Step 3: Safety preferences
   ├─ Share location during physical lessons? (Default: Yes)
   ├─ Send check-in prompts? (Default: Yes)  
   └─ Parent/guardian notifications? (Required if under 18)
Step 4: Read safety guidelines
   └─ Must scroll to bottom before proceeding
```

### During Booking
For physical lessons at teacher's or student's location:
> 🛡️ Location will be shared with your emergency contact during this lesson.

For first-time lesson with a new teacher:
> **First lesson tip:** Many students prefer a public location (cafe, library) for their very first session with a new teacher. You can ask your teacher to arrange this.

### During Active Lesson
- Subtle persistent bar at top: "Lesson active · Location shared with [Name]"
- SOS button top-right (always visible, not obtrusive)
- "End lesson" button always available

### Post-Lesson
```
How was your lesson with Sarah?
[Great] [OK] [Not OK]

If "Not OK":
→ "What happened?" with dropdown:
  [Teacher didn't show up]
  [Teacher made me uncomfortable]
  [Something happened during the lesson]
  [Other]
→ Each leads to appropriate resolution flow
```

---

## 2.4 Teacher Safety (Often Overlooked)

Students can also be problematic. Teachers deserve protection too.

**For teachers:**
- Rate students after each lesson (visible to other teachers, not to students)
- Block student — removes from search, prevents future bookings, refunds any upcoming
- Report student for: no-show, abuse, payment fraud, inappropriate behavior
- Auto-flag if student has 3+ reports from different teachers

**Physical safety for home-based teachers:**
- Safety check-in (teacher's emergency contact notified when lesson starts at their home)
- Option to require students to verify identity before home lessons (especially new students)
- "Only verified students" filter (teacher restricts bookings to verified accounts only)

---

## 2.5 For Parents: Parent Dashboard

A dedicated lightweight view (separate login or linked account) for parents of under-18 students:

- View all upcoming and past bookings for their child
- View teacher profiles (including verification badges)
- See lesson location and timing
- Read-only access to chat thread (opt-in)
- Receive SMS/push for booking confirmations, lesson start, lesson end
- Approve or reject booking requests before confirmation
- Emergency contact controls (receive location during lessons)
- Monthly report: "Ahmad had 4 lessons this month with 2 teachers"

---

# 3. UI/UX IMPROVEMENTS

Beyond the 35+ improvements already applied in v2.0, here are deeper UX considerations not yet addressed.

---

## 3.1 Missing: Onboarding Flow

The app currently launches directly into the Home screen. New users have no orientation.

**Required onboarding sequence:**

1. **Splash screen** — Logo + tagline, 2s
2. **Value prop carousel** — 3 swipeable screens ("Find local teachers", "Book in 3 taps", "Learn safely")
3. **Language selection** — EN / BM / ZH (persists for full UI)
4. **Account creation** — Email + OTP, or Google/Apple Sign-In
5. **Profile basics** — Name, age group (important for safety tier)
6. **Interest survey** — Subject categories (feeds recommendations)
7. **Emergency contact** — Required for under-18, encouraged for all
8. **Permissions** — Location (explain why), Notifications (with value framing)
9. **Quick tour** — 3-step interactive walkthrough of key screens
10. **First lesson incentive** — "RM 10 off your first booking" CTA to Home

**Why it matters:** First-session completion rate drops 60–80% without an onboarding flow. Users who don't understand the app within 60 seconds don't come back.

---

## 3.2 Adaptive Home Feed

Currently the Home screen is static for all users. It should adapt based on user state.

| User State | Home Adjustment |
|---|---|
| New user (0 bookings) | Show "Getting Started" guide, trial lesson CTAs |
| After first booking | Show "Upcoming lesson" card prominently |
| Returning after 2+ weeks | Show re-engagement: "Welcome back! Sarah has 2 slots this week." |
| Has 3+ bookings | Show progress summary, "Continue learning" section |
| Parent account | Show children's lesson cards at top |

---

## 3.3 Search Intelligence

Current search is basic text match. Improvements:

- **Spell correction** — "panio" finds "Piano"
- **Synonyms** — "math" finds "Mathematics", "maths", "calculus"
- **Intent matching** — "cheap guitar teacher" filters by price automatically
- **Recent searches** — saved and shown in empty search state
- **Trending near you** — "Popular in Petaling Jaya this week: Piano, IGCSE Math"
- **Voice search** — tap microphone, speak subject

---

## 3.4 Microcopy Overhaul

Every piece of text in the app should feel warm, specific, and human. Current state is functional but generic.

| Context | Current | Improved |
|---|---|---|
| Booking confirmed | "Booking Confirmed" | "You're in! Sarah will see you Monday at 10 AM." |
| No bookings | "No bookings yet" | "Your first lesson is one tap away." |
| Loading | "Loading..." | "Finding the best teachers near you…" |
| Payment success | "Payment processed" | "RM 50 held safely. You're confirmed." |
| Network error | "Error: Network failed" | "Can't connect right now. Check your wifi and try again." |
| Empty messages | "No messages" | "Book a lesson to start a conversation with your teacher." |
| Wrong password | "Incorrect password" | "That password doesn't match. Try again, or reset it below." |

---

## 3.5 Dark Mode

Critical for evening browsing. Most tutoring browsing happens 7–11 PM.

- Auto-switch based on system preference
- Manual override in settings
- Carful dark palette — not just inverted (green on dark green = illegible)
- Every screen audited: text contrast, icon legibility, image overlay
- OLED-optimized: true blacks save battery

---

## 3.6 Accessibility (WCAG 2.2 AA Required)

**Visual:**
- Minimum 4.5:1 contrast ratio for body text
- 3:1 for large text (headings)
- Color-blind safe: never use color as sole indicator — always add icon or label
- Large text mode (1.5× scale) in settings
- No flashing content

**Motor:**
- Minimum 44×44pt touch targets on all interactive elements
- Swipe alternatives for all gesture-based actions
- One-handed mode (key actions reachable with thumb)
- Voice control compatibility (iOS Voice Control, Android Voice Access)

**Cognitive:**
- Plain language — Grade 6 reading level for instructions
- Consistent patterns — same back button position, same modal style everywhere
- Undo for destructive actions ("Booking cancelled. Undo?")
- Progress bars for all multi-step flows
- No time-limited inputs without warning

**Screen reader:**
- All images have alt text
- All icons have accessible labels
- Focus order is logical (top-to-bottom, left-to-right)
- Form fields have visible labels (not just placeholder text)

---

## 3.7 Offline Mode

Currently the app fails entirely with no connection. Minimum offline support:

| Feature | Offline Behavior |
|---|---|
| Home screen | Show cached teacher list with "Last updated X ago" |
| My Bookings | Show all bookings (cached) |
| Teacher profiles | Show cached profile (viewed in last 7 days) |
| Messages | Show message history, queue outgoing messages |
| Lesson notes | Fully available (local storage) |
| New bookings | Not available — clear error with "You need internet to book" |
| Payments | Not available |

**Offline indicator:** Subtle banner: "No internet — showing saved content."

---

## 3.8 Notification System Redesign

Notifications are currently undifferentiated. They should be:

**Priority tiers:**
1. **Critical (always delivered, sound + vibration):** SOS, safety alerts, lesson starting in 15 minutes
2. **High (sound):** Booking confirmed, payment received, teacher replied
3. **Normal (silent badge):** New teacher post, recommendation, promotional
4. **Low (digest):** Weekly summary, platform news

**Grouping:**
- Group notifications by teacher (not by type)
- "3 updates from Sarah Lim" → expand to see all
- Do Not Disturb: block non-critical notifications during user-set hours

**User control:**
- Granular toggle per category in settings
- "Pause all notifications for 1 hour / 8 hours / 1 day"
- Never remove safety notifications from user control (legal and ethical reasons)

---

# 4. FEATURE IMPROVEMENTS

## 4.1 Learning Progress Tracking

**The problem:** Students can't see improvement. Teachers can't demonstrate value beyond repeat bookings.

**Feature set:**
- Per-teacher progress dashboard (accessible from each booking record)
- Skills checklist (teacher creates, student checks off as mastered)
- Practice log (student self-reports daily practice time, with optional note)
- Streaks: "7-day practice streak" — gamified consistency
- Monthly progress report (auto-generated, shareable as PDF)
- Goals: "Goal: Pass ABRSM Grade 5 by June" with milestone checkpoints
- Parent view of child's progress (read-only, summary level)

---

## 4.2 Recurring / Scheduled Bookings

**The problem:** Booking one lesson at a time every week is friction that causes drop-off.

**Feature set:**
- "Book every week" toggle on Step 1 of booking flow
- Choose day + time → recurring slot locked for 4 or 8 weeks
- 5–10% discount for committing to a recurring schedule
- Auto-payment enabled (with explicit consent, easy cancel)
- Pause option: "Skip next week" without cancelling the series
- Cancellation: Growlink-enforced notice period (e.g., 24 hours for single, 1 week to cancel series)

---

## 4.3 Lesson Materials Hub

**The problem:** Teachers currently send materials via WhatsApp / email, which is off-platform and hard to track.

**Feature set:**
- Teacher uploads files to a booking (PDF, JPG, audio)
- Student downloads from within the app (no external storage)
- Materials organized per teacher, per session
- Student annotation on uploaded PDFs (highlight, note)
- Materials persist after lesson (archived, searchable)
- Teacher homework assignment: "Practice this before our next session"
- Optional: shared whiteboard for online lessons

---

## 4.4 Group Lessons

**Why:** Lower price point attracts new users. Viral social mechanics grow the platform.

**Feature set:**
- Teacher creates group lesson slot (2–4 students)
- Discounted per-student price (teacher earns more per slot)
- Student can invite friends from contacts ("Bring a friend, both save 20%")
- Group chat thread per lesson session
- Shared notes/materials for all group participants
- Payment split: each student pays their own deposit

---

## 4.5 Family Accounts

**Why:** Malaysian tutoring context is heavily parent-driven. One parent books for multiple children.

**Feature set:**
- One parent account linked to multiple child profiles
- Per-child settings (age, interests, parental controls)
- Shared payment method across the family
- Parent dashboard: all children's upcoming lessons at a glance
- Consolidated invoicing (single statement for tax / accounting purposes)
- Age-based restriction: under-13 profiles require full parent control

---

## 4.6 Wallet & Credits System

**Why:** Reduces payment friction for repeat users. Enables promotions and referrals.

**Feature set:**
- Pre-load wallet credits (e.g., RM 100 load → RM 110 credit with 10% bonus)
- Auto-deduct for bookings (faster checkout: no card entry required)
- Refunds returned as credits (faster than original payment reversal)
- Gift cards: send RM 50 credit to a friend ("Buy someone a lesson")
- Referral rewards paid as wallet credits
- Credits expiry: 12 months (with 30-day warning)

---

## 4.7 Teacher Comparison Tool

**Why:** Students who browse multiple teachers often get decision paralysis. Side-by-side helps.

**Feature set:**
- "Compare" button on teacher cards (add up to 3)
- Floating comparison bar at bottom: "Comparing 2 teachers"
- Side-by-side view: rating, price, distance, lesson modes, languages, verification badges, availability, response time
- Highlight key differences in green/red
- Shareable link (for parent input: "Mum, which of these two?")

---

## 4.8 Smart Calendar Integration

**Why:** 40–60% of no-shows happen because students forget. Calendar integration directly prevents this.

**Feature set:**
- Connect Google Calendar or Apple Calendar during setup (one-tap OAuth)
- All confirmed bookings auto-added to calendar
- Calendar event includes: teacher name, subject, location/link, contact
- Lesson cancelled on Growlink → calendar event removed automatically
- Pre-lesson reminder block: 30 minutes before, calendar blocks time
- Estimated travel time added to event (for physical lessons, via Maps API)

---

## 4.9 Loyalty Program

**Why:** Increases booking frequency, rewards commitment, drives referrals.

**Tiers:**

| Tier | Requirement | Perks |
|---|---|---|
| Explorer | First booking | 10% off first lesson |
| Learner | 5 lessons | Priority booking (see slots 24h earlier) |
| Achiever | 15 lessons | 5% discount on all bookings |
| Champion | 30 lessons | Dedicated support, 10% discount, featured in "Top Learners" |

**Earn credits by:**
- Completing a lesson (+5 points)
- Leaving a review (+10 points)
- Referring a friend who books (+50 points each)
- 7-day practice streak (+15 points)

---

## 4.10 Saved Searches & Alerts

**Why:** Students who don't find what they need on first visit don't come back without a reason.

**Feature set:**
- Save any search configuration (subject + filters)
- Named: "Piano teachers under RM 60"
- Alert: "New teacher matching your search joined today"
- Alert: "Sarah Lim now has Saturday slots available"
- Manage alerts in notification settings (on/off per saved search)

---

# 5. SECURITY

## 5.1 Authentication

### Multi-Factor Authentication
- **Mandatory for teachers** (they handle money and access to student information)
- **Strongly recommended for students** with clear onboarding prompt
- Supported methods (in order of security): Authenticator app (Google/Authy), SMS OTP, Email OTP

### Biometric Authentication
- Face ID (iOS), Fingerprint (Android) for app unlock after initial login
- Re-authenticate with biometrics for sensitive actions: payout requests, payment method changes, account deletion
- Falls back to PIN / password after 3 failed biometric attempts

### Password Policy
- Minimum 12 characters (NIST SP 800-63B guidance)
- No mandatory regular rotation — research shows this backfires (users pick worse passwords)
- Block top 10,000 most common passwords
- Password strength meter during signup
- Allow paste (for password manager compatibility)
- Breach detection: check against HaveIBeenPwned API on signup and login

### Session Security
- JWT access tokens: 15-minute expiry
- Refresh tokens: 30-day expiry, rotated on every use
- Device fingerprinting: flag login from unrecognized device
- Active session management: user can view and revoke all active sessions
- Auto-logout after 30 days inactivity
- Force re-authentication for: password change, payout setup, emergency contact modification

### Account Recovery
- Multi-step verification (email + phone, not just one)
- 24-hour security hold on account changes after password reset (email user can cancel)
- Alert on ALL contact methods for any recovery attempt
- Security review queue for unusual recovery patterns (e.g., email + phone both "lost")

---

## 5.2 Data Protection

### Encryption

**At rest:**
- AES-256 for all databases
- AES-256 for all file storage (photos, documents, audio recordings)
- Hardware Security Module (HSM) for encryption key management
- Key rotation every 90 days

**In transit:**
- TLS 1.3 minimum — no TLS 1.0 or 1.1
- HSTS (HTTP Strict Transport Security) with preload
- Certificate pinning in mobile apps (prevents MITM with rogue certificate authorities)

**Chat messages:**
- End-to-end encrypted (Signal Protocol or equivalent)
- Server cannot read message content
- Forward secrecy (compromise of one key doesn't expose past messages)
- Keys stored on device, never on server

### Data Minimization
- Collect only what is strictly necessary for the feature
- Exact address: never stored for browsing (only neighborhood)
- Precise GPS: deleted after 7 days (only retained longer if safety incident)
- Chat logs: retained 2 years (for safety investigations), then deleted
- Payment card data: never stored on Growlink servers (tokenized via payment provider)

### User Data Rights (Malaysia PDPA Requirements)
- **Access**: User can download all data we hold about them
- **Correction**: User can correct incorrect data at any time
- **Deletion**: "Delete my account" permanently removes data within 30 days (some exceptions for legal holds)
- **Portability**: Export in machine-readable format (JSON or CSV)
- **Objection**: User can object to specific processing (e.g., marketing)
- **Consent withdrawal**: User can withdraw consent for optional data processing

### Privacy Defaults
| Data Type | Default Visibility |
|---|---|
| Last name | Initial only (Ahmad R.) |
| Profile photo | Hidden until first booking confirmed |
| Exact address | Never shown |
| Date of birth | Age range only (e.g., "20s") |
| Phone number | Hidden until lesson day |
| Email | Never shown to other users |
| Location history | Private to user + emergency contacts only |

---

## 5.3 Payment Security

### PCI-DSS Compliance
- **Never store card numbers on Growlink servers** — this is non-negotiable
- All card processing via Stripe (or local equivalent: iPay88, Razer Merchant Services)
- Tokenization: Stripe stores the card, Growlink only stores the token
- 3D Secure 2 (3DS2): additional authentication layer for card payments
- Strong Customer Authentication (SCA) for transactions above RM 200

### Fraud Prevention
- Velocity checks: flag multiple bookings or payment attempts in short time
- New account + high-value booking = manual review queue
- Card BIN validation: country of card vs IP address country
- Device fingerprinting for repeat fraudsters (even after account deletion)
- Machine learning fraud scoring: every transaction scored, auto-decline above threshold

### Escrow Model (Strongly Recommended)
The safest model for both students and teachers:
1. Student pays deposit → held by Growlink (not released to teacher yet)
2. Lesson occurs → student confirms (or 24-hour auto-confirm if no dispute)
3. Funds released to teacher 24 hours post-confirmation
4. Dispute filed → funds held during review (max 7 days)
5. Refund for valid reasons → returned to original payment method within 5 business days

**Why this matters:**
- Teachers can't run with money before delivering
- Students have a window to dispute
- Chargeback risk is greatly reduced

### Refund Policy (Clear Terms)
| Scenario | Refund Amount | Timeline |
|---|---|---|
| Teacher no-show | 100% | Automatic, immediate |
| Cancelled by teacher with <24h notice | 100% | Within 48 hours |
| Student cancels >48h before | 100% (minus platform fee) | Within 5 days |
| Student cancels 24–48h before | 50% | Within 5 days |
| Student cancels <24h before | 0% | — |
| Lesson quality dispute | Case-by-case | Within 7 days |

---

## 5.4 Mobile App Security

### Code Protection
- Code obfuscation (ProGuard for Android, equivalent for iOS builds)
- Anti-debugging: detect attached debugger and refuse to run
- Root/jailbreak detection: restrict sensitive features (payments, location) on compromised devices — warn user clearly
- Anti-tampering: verify app signature on launch; terminate if modified APK detected

### Secure Local Storage
| Data Type | Storage |
|---|---|
| Auth tokens | iOS Keychain / Android Keystore |
| Biometric credentials | Secure Enclave (iOS) / StrongBox (Android) |
| Sensitive preferences | Encrypted SharedPreferences |
| Cached lesson data | Encrypted SQLite |
| Chat messages | Encrypted local database |
| Never in: | Logs, crash reports, plain SharedPreferences, plain SQLite |

### Certificate Pinning
- Pin the TLS certificate for all Growlink API calls
- On pin mismatch: refuse to connect, alert user ("Security check failed. Please update the app.")
- Allows for certificate rotation (backup pins) without breaking app

### Memory Management
- Clear sensitive data from memory after use (passwords, tokens, location)
- Prevent screenshot in sensitive screens (payment, location sharing, SOS)
- Disable copy-paste for card number fields

---

## 5.5 Backend & API Security

### API Design
- **Authentication on every endpoint** — no public read endpoints except approved public teacher profiles
- **Rate limiting** per user, per IP, per endpoint (e.g., login: max 5 attempts per 15 minutes)
- **Input validation** on all fields — whitelist valid values, reject everything else
- **Output encoding** — prevent stored XSS
- **Parameterized queries** — prevent SQL injection (use ORM with parameterized queries, never string concat)
- **CORS** — strict whitelist (only approved domains)
- **CSRF tokens** for all state-changing operations (web versions)

### Infrastructure
- **Web Application Firewall** (Cloudflare WAF or AWS WAF)
- **DDoS protection** at DNS level (Cloudflare)
- **Rate limiting** at network level (separate from app-level)
- **IP blocking** for known bad actors (regularly updated threat feeds)
- **Private VPC** for all backend services — database not directly internet-accessible
- **Bastion host** — only entry point to production systems for engineering team
- **VPN required** for any admin panel access

### Supabase-Specific Security (Growlink's chosen backend)
- **Row Level Security (RLS)** enforced on all tables — no exceptions
- **Anon key** never shipped in mobile builds for sensitive operations (use service role via Edge Functions only)
- **Edge Functions** for all sensitive business logic (payments, safety actions, moderation)
- **Supabase Vault** for secrets storage (never hardcoded in code)
- **Audit logs** enabled on all tables containing sensitive data
- **Database backup** daily, automated, tested monthly

### Logging & Monitoring
- All admin actions logged (who, what, when, from where)
- Security events logged (failed logins, rate limit triggers, flagged content)
- Real-time alerting for: >100 failed logins/minute, unusual payout requests, mass data access
- Log retention: 1 year minimum
- Logs are immutable (write-once, no delete)
- Sentry for error tracking (already in stack)
- PostHog for analytics — ensure PII is not sent to PostHog

---

## 5.6 PDPA & Compliance (Malaysia-Specific)

### Personal Data Protection Act 2010 Requirements
Growlink processes personal data (names, contacts, location, payment info) and must comply with PDPA.

**7 Principles:**
1. **General principle** — Only process data with consent or for a legal purpose
2. **Notice & choice** — Inform users of what you collect and why, in their language
3. **Disclosure principle** — Don't share data with third parties without consent
4. **Security principle** — Reasonable security measures (encryption, access control)
5. **Retention principle** — Delete data when no longer needed
6. **Data integrity** — Keep data accurate and up-to-date
7. **Access principle** — Allow users to access and correct their data

**Practical steps:**
- Privacy Policy in EN, BM, and ZH
- Consent checkboxes during registration (not pre-ticked)
- Data retention schedule documented
- DPO (Data Protection Officer) nominated (for larger organizations)
- Incident response procedure for breaches: notify JPDP (Personal Data Protection Department) without undue delay

### Children's Data (Under 18)
- Parental consent required for account creation
- Limited data collection (no marketing profiling)
- No behavioral tracking for advertising
- Shorter data retention periods

### Cross-Border Data Transfer
- Supabase region: confirm Malaysian data stays in Southeast Asia region (Singapore is acceptable under PDPA)
- Any US-based service (e.g., Stripe, Sentry, PostHog): ensure PDPA-compliant data transfer agreement

---

## 5.7 Vulnerability Management

### Secure Development Lifecycle
- Security review in every code PR (checklist: OWASP Top 10 considerations)
- Dependency scanning: automated (Dependabot, Snyk, or npm audit in CI/CD)
- Secrets scanning: prevent API keys / passwords from being committed to Git
- Static analysis (SAST): automated code analysis for known patterns
- No hard-coded credentials anywhere — use environment variables and Supabase Vault

### Penetration Testing
- **External pen test**: quarterly (hire a Malaysian security firm or use a platform like HackerOne/Bugcrowd)
- **Internal review**: before every major release
- **Scope**: API, mobile app, admin panel, infrastructure

### Bug Bounty Program (Phase 2)
- Public program for researchers to report vulnerabilities
- Clear scope, rules of engagement, and reward structure
- Responsible disclosure policy published on website
- Typically: low severity = RM 100–500, medium = RM 500–2,000, high/critical = RM 2,000–10,000+

### Patching SLA
| Severity | Patch Timeline |
|---|---|
| Critical (CVSS 9+) | 48 hours |
| High (CVSS 7–9) | 1 week |
| Medium (CVSS 4–7) | 1 month |
| Low (CVSS < 4) | 3 months |

---

## 5.8 Incident Response

### Preparation
- Incident response playbook documented and accessible to team
- Roles defined: incident lead, communications, technical, legal
- Emergency contact list (Supabase support, legal counsel, insurer, MCMC)
- Communication templates pre-written (user notification, public statement)
- Cyber insurance in place

### Response Steps
1. **Detect** — Automated alert or user report
2. **Triage** — Confirm severity; is it still ongoing?
3. **Contain** — Suspend affected accounts, rotate compromised keys, block attack vector
4. **Eradicate** — Remove malware, patch vulnerability, revoke unauthorized access
5. **Recover** — Restore from clean backup, verify integrity
6. **Notify** — Inform affected users, regulators if required
7. **Review** — Post-mortem, update playbook

### User Notification Template (PDPA-Compliant)
> "We're writing to inform you of a security incident affecting your Growlink account. On [date], we discovered [what happened]. The information involved may include [specific data]. We have [actions taken]. We recommend you [actions for user: change password, etc.]. If you have questions, contact [contact]."

---

# 6. PRIORITY MATRIX

## 6.1 What to Build and When

### Phase 0 — Before Any Beta Launch (Non-Negotiable)

| Item | Category | Why Now |
|---|---|---|
| ID verification for all teachers | Safety | Legal liability |
| Emergency contact system | Safety | Duty of care |
| Anti-recruitment filters in chat | Safety + Business | Existential to revenue model |
| PDPA-compliant Privacy Policy + consent | Legal | Regulatory requirement |
| MFA for teacher accounts | Security | Financial and data protection |
| PCI-compliant payment processing | Security | Legal requirement |
| Escrow payment model | Safety + Trust | Prevents fraud |
| Teacher posts (Phase 1, restricted) | Feature | Engagement from day 1 |
| Onboarding flow | UX | Activation rate depends on it |

---

### Phase 1 — Month 1–2 Post-Launch

| Item | Category |
|---|---|
| Parental controls for under-18 | Safety |
| Safety check-in during lessons | Safety |
| SOS button | Safety |
| Live location sharing (physical lessons) | Safety |
| Block and report system | Safety |
| AI chat monitoring (basic patterns) | Safety |
| Recurring bookings | Feature |
| Wallet and credits | Feature |
| Dark mode | UX |
| Calendar integration | Feature |
| Multilingual UI (BM, ZH) | UX |

---

### Phase 2 — Month 3–6

| Item | Category |
|---|---|
| Parent dashboard | Safety + Feature |
| Audio recording option | Safety |
| AI safety monitoring (advanced) | Safety |
| Lesson materials hub | Feature |
| Group lessons | Feature |
| Family accounts | Feature |
| Learning progress tracking | Feature |
| Recommendation engine | UX |
| Teacher comparison tool | Feature |
| Saved searches + alerts | Feature |

---

### Phase 3 — Month 6–12

| Item | Category |
|---|---|
| Teacher posts Phase 2 (video, comments) | Feature |
| Loyalty program | Feature |
| Async video lessons | Feature |
| Subject-specific tools | Feature |
| Pen testing program | Security |
| Bug bounty program | Security |
| Accessibility audit (WCAG AA) | UX |
| Offline mode (full) | UX |

---

## 6.2 Budget Reality Check

The original RM 25,000 quotation covered a functional MVP. A production-ready, safe, and secure application realistically requires:

| Scope | Estimated Cost |
|---|---|
| Original quoted scope | RM 25,000 |
| Safety infrastructure (verification, location, SOS) | +RM 20,000–40,000 |
| Security hardening (MFA, encryption, pen test) | +RM 15,000–25,000 |
| Teacher posts + moderation pipeline | +RM 10,000–15,000 |
| Parental controls + family accounts | +RM 8,000–12,000 |
| **Realistic total for production-ready** | **RM 75,000–115,000** |

**Recommended approach:**
1. Launch Phase 0 + Phase 1 at expanded budget (RM 50,000–60,000)
2. Use early revenue and user validation to fund Phase 2+
3. Treat safety and security as a competitive advantage and marketing angle: *"Malaysia's most trusted tutoring platform"*

---

## 6.3 Key Risks If Safety Is Skipped

| Risk | Likelihood | Impact |
|---|---|---|
| Physical incident involving minor student | Medium | **Catastrophic** — legal, regulatory, reputational |
| Teacher recruits students off-platform | Very High | **Severe** — direct revenue loss, platform collapse |
| Data breach (student personal data) | Medium | **High** — PDPA fine, user trust loss |
| Payment fraud at scale | High | **High** — financial loss, payment processor suspension |
| Fake teacher scams | Medium | **High** — refund liability, reputational damage |
| Regulatory shutdown (MCMC) | Low if PDPA compliant | **Catastrophic** — business-ending |

---

# CONCLUSION

This report identifies three tiers of improvement for Growlink:

**Non-negotiable (Safety + Security):**
Teacher ID verification, emergency contacts, live location, SOS button, encrypted chat, anti-recruitment measures, parental controls, and PCI/PDPA compliance are not optional features. They are table stakes for any platform connecting minors with adult strangers. These must be built before commercial launch.

**High-value features (Engagement + Retention):**
Teacher posts (Phase 1), recurring bookings, lesson materials, wallet credits, progress tracking, and smart notifications will drive meaningful improvements in LTV, booking frequency, and platform stickiness. These can be phased over the first 6 months.

**Quality of experience (UX + Security polish):**
Onboarding flow, dark mode, accessibility, offline mode, calendar integration, and advanced threat monitoring raise the product to world-class standard. These compound over time.

The opportunity Growlink is pursuing is real and underserved in Malaysia. The path to being the category winner runs through safety — not as a cost center but as the single most powerful differentiator in a market where parents are the primary decision-makers and trust is the primary purchase criterion.

**Build safe. Build trusted. The market will follow.**

---

*Document prepared for Growlink founding team internal use only.*  
*Financial estimates are indicative and subject to detailed scoping.*
