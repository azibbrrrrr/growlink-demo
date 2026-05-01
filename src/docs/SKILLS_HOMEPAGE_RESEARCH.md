# Growlink Skills Taxonomy — Homepage Placement Research

**Context:** Growlink has 4 main categories, ~25 subcategories, 100+ individual skills across 3 user intents (Get Help / Learn-Create / Work-Earn). This is not a tutoring app — it is a full-service marketplace. That fundamentally changes the homepage design.

---

## The Core UX Problem

If you dump all 100+ skills on the home screen:
- Users scan for 4 seconds and leave (cognitive overload research: Miller's Law, 7±2 chunks)
- Search bar gets ignored when too many visual options compete for attention
- New users have no mental model of what Growlink is

If you hide all skills behind search only:
- Users who don't know the exact skill name can't find it
- Discovery fails (you can't search for something you don't know exists)
- Teachers in less-searched categories get zero visibility

**The solution is progressive disclosure — 3 levels, each one click deeper.**

---

## The 3-Level Information Architecture

### Level 1 — Intent (Home Screen, visible without scroll)
3 main paths. User chooses intent first.
- Get Help (Services)
- Learn / Create (Creatives + Professional + some Services)
- Work / Earn (Opportunities + Talent + Freelance)

### Level 2 — Category (After tapping intent, or via horizontal chips)
7–10 category chips relevant to chosen intent.
- E.g. "Learn" → Music, Academic, Language, Sports, Creative, Professional, Spiritual

### Level 3 — Subcategory + Skills (Discover/Search result level)
Individual skills within a category.
- E.g. "Music" → Violin, Piano, Guitar, Drums, Vocal Coaching, DJ, Production

---

## WHERE EACH LEVEL BELONGS

### HOME SCREEN — What to show

Level 1: Intent cards (3 tiles — this IS the category grid, and for Growlink's full scope it IS justified)
Level 2: Skill chips (top 6–8 from MOST popular across all categories based on user location)
Quick wins: Continue Learning, Nearby teachers, Recommended

### DISCOVER SCREEN — What to show

Full hierarchical browser:
- Tab bar or segmented control: Services | Learn/Create | Work/Earn
- Under each tab: main category chips
- Below chips: subcategory grid (icon + label)
- Below grid: provider cards

### SEARCH — What to autocomplete

All 3 levels indexed for search:
- "piano" → finds Piano teachers (skill level)
- "music" → finds all music teachers (subcategory level)
- "creative" → finds all creative providers (category level)
- "learn" → shows Learn/Create pathway (intent level)

### FILTER PANEL — What to show

Full hierarchical filter tree:
- Category (checkbox group)
  - Subcategory (nested checkboxes, expand on click)
    - Skill (shown when subcategory expanded)
- Price range slider
- Distance radius slider
- Mode (Online / Physical / Both)
- Rating minimum
- Availability

---

## REVISED HOME SCREEN RECOMMENDATION

### Section order (updated for full marketplace):

**State A — New user**
1. Greeting + location
2. Search bar ("Find skills, services, or jobs near you...")
3. Intent cards: [Get Help] [Learn / Create] [Work / Earn]
4. Popular near you (horizontal chips — top skills in user's area)
5. Top providers near you (mixed from all categories)
6. AI suggestions banner

**State B — Active user (knows their intent)**
1. Continue Learning / Active booking card
2. Greeting + streak
3. Search bar
4. Intent chips (their preferred intent highlighted)
5. Skill chips for their preferred category
6. Recommended for you
7. Book again

**State C — Power user**
1. Active booking countdown
2. Book again (recent providers)
3. Quick search
4. Feed from followed providers

---

## SKILL CHIP STRATEGY (The "F-05 Revised" Analysis)

### Problem with current approach
Current designs show generic chips: Music, Academic, Language, Fitness, Art

### Better approach: Context-aware chips
The chips shown should change based on:
1. User's chosen intent (if Learn → show Music, Academic, Language, etc.)
2. User's history (if they've booked Piano 3x → "Piano" chip persists in top position)
3. Location (if in Petaling Jaya → show what's abundant nearby)

### Technical implementation
```sql
-- Chips are populated from DB, not hardcoded
-- For new users: top 8 skills by booking count in radius
-- For returning users: user's history first, then fill remaining with popular

select skill, count(*) as bookings_nearby
from bookings b
join providers p on b.provider_id = p.id
where ST_Distance(p.location, ST_MakePoint(user_lng, user_lat)::geography) < 10000
group by skill
order by bookings_nearby desc
limit 8;
```

---

## SKILLS LIST WITH COUNTS — REVISED (F-15 Revised)

### Original recommendation: Show on home
### Revised: Show differently based on user intent

**If user has selected "Learn / Create" intent:**
Show: Skills within Learn/Create with nearby teacher count
→ "Piano (24 teachers near you) · Guitar (18) · Mandarin (9)..."

**If user has selected "Services" intent:**
Show: Service categories with nearby provider count
→ "House Cleaning (31 near you) · Dog Walking (12) · Handyman (8)..."

**If user has NOT selected intent yet (new user):**
Show: Top skills across ALL categories by distance
→ "Piano, House Cleaning, Math Tutor, Dog Walking, Mobile Mechanic..."

### Why this matters
If you show Piano teachers to someone who wants a plumber, they leave.
Intent-first navigation prevents this mismatch.

---

## THE INTENT CARD DEBATE (F-04 Revised)

### Previous recommendation: Remove
### Revised: Keep for Growlink, but redesign

The category grid (Get Help / Learn/Create / Work/Earn) was flagged for removal in the initial research because "90% of users want Learn." But that was based on Growlink being a tutoring app.

**With the full marketplace scope revealed:**
- The 3-intent model is Growlink's core navigation architecture
- Removing it removes the product's identity
- It should stay — but it should be redesigned

### How to redesign intent cards for home screen

Bad design (current Design 1):
→ Large tiles with icon + long description + arrow
→ Takes 40% of viewport
→ Feels like a tutorial

Better design:
→ 3 compact icon + label buttons in one row
→ Or segmented control
→ Takes 10% of viewport
→ Can be scrolled past by returning users
→ Auto-highlights last used intent

Even better (Design pattern from Grab / Gojek):
→ Use as persistent tab bar in Discover, not home
→ Home shows shortcut chips that ARE intent-aware
→ Returning users never see the intent picker (it remembers their last path)

---

## UPDATED FUNCTION LIST (F-04 and F-05 revised)

### F-04 (was: Remove) → REVISED: Keep but compress

For a single-vertical tutoring app: Remove
For Growlink's full 3-intent marketplace: Keep, but redesign as compact row

New design: One row of 3 pill buttons (not 3 large tiles)
[Get Help] [Learn / Create] [Work / Earn]
Height: 36px row, not a 40% viewport card

### F-05 (was: Skill chips) → REVISED: Intent-aware chips

Chips must be context-aware, not static.
3 chip modes:
- Mode A (no intent selected): Top 6 skills near user across all categories
- Mode B (intent selected): Top 6 categories within that intent
- Mode C (category selected): Top 6 subcategories/skills within category

### F-23 (NEW): Intent Navigation
Usage: 70% of first-time users engage with it
Priority: Critical (for full marketplace)
What it does: 3-path entry (Get Help / Learn/Create / Work/Earn)
Pros: Solves the "100 categories" problem, gives Growlink clear identity, scalable
Cons: Adds a tap before content, returning users may find it slow
Recommendation: Keep on home as compact pill row. Auto-skip to last used path for returning users.

### F-24 (NEW): Hierarchical Category Browser
Usage: 45% per session in Discover
Priority: High (for Discover screen)
What it does: Main category → subcategory → skills drill-down
Pros: Handles the full depth of 100+ skills without overwhelming
Cons: 3-level navigation can feel deep, needs good back navigation
Recommendation: Lives in Discover tab, not home. Home shows chips only.

### F-25 (NEW): "Popular near you" skill tiles with counts
Usage: 50% new users, 30% returning
Priority: High
What it does: Shows top 6 skills (with teacher/provider count) near user's location
Pros: Discovery for users who don't know what Growlink offers, supply signal
Cons: Needs real-time PostGIS query, counts can mislead if low
Recommendation: Show on home for all user states. Update based on selected intent.

---

## SEARCH BAR: EXPANDED FOR FULL TAXONOMY

The search bar in the full marketplace needs to handle all 3 levels:

### Autocomplete behaviour
User types "p":
→ Piano (Music · 24 teachers near you)
→ Pest Control (Services · 8 providers near you)
→ Photography (Creative · 11 providers near you)
→ Personal Trainer (Fitness · 6 trainers near you)
→ Pool Cleaning (Outdoor · 3 providers near you)

Each result shows: skill name, parent category, count near user
User taps → goes directly to filtered provider list

### Category-level search
User types "music":
→ Music (Learn/Create · 67 providers near you) [ALL]
→ Piano (Music · 24 near you)
→ Guitar (Music · 18 near you)
→ Violin (Music · 19 near you)
→ Vocal Coaching (Music · 8 near you)

### Intent-level search
User types "help" or "fix":
→ Autocomplete shows Services intent card

---

## FILTER PANEL: FULL TAXONOMY DESIGN

### Structure (Discover screen filter panel)

Intent selector (top of filter panel):
○ All  ● Learn/Create  ○ Services  ○ Work/Earn

Category accordion (shows categories for selected intent):
▶ Music (collapsed, shows count)
▼ Academic (expanded)
   ☑ Mathematics
   ☑ Science
   ☐ English
   ☐ Humanities
▶ Language
▶ Sports & Fitness

Other filters below:
Price: RM20 ─────●──── RM500
Distance: ─────●──── 15km
Rating: ★★★★☆ and above
Mode: ○ All  ○ Online only  ○ Physical only
Availability: ○ Any  ○ Today  ○ This week

Apply button (sticky bottom)

---

## FINAL VERDICT: WHERE DOES THE SKILLS LIST GO?

| Skills Level | Home Screen | Discover Screen | Search | Filter |
|---|---|---|---|---|
| Intent (3 paths) | ✅ Compact pill row | ✅ Tab bar | Auto-routes | — |
| Main categories (Music, Academic…) | ✅ As chips (intent-aware) | ✅ Icon grid | ✅ Autocomplete | ✅ Accordion |
| Subcategories (Piano, Violin…) | ⚡ In chip overflow only | ✅ Within category | ✅ Autocomplete | ✅ Nested checkboxes |
| Individual skills | ❌ Too granular for home | ✅ Provider cards | ✅ Autocomplete | ✅ Nested checkboxes |

**Key rule:** Each screen shows one level of the hierarchy. Home shows intents + popular categories. Discover shows categories + subcategories. Provider list shows individual skills. Search spans all levels simultaneously.

