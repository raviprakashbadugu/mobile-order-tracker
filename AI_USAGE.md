# AI Usage Disclosure Statement

### 🤖 Where AI Was Used
AI (Antigravity Assistant powered by Gemini) was utilized as a pairing developer to accelerate boilerplate setup, generate realistic seed JSON order datasets (with timestamps, items, customer details, and multi-step timeline event histories), and brainstorm edge-case state handling patterns (such as localStorage offline fallback strategies).

### 🛠️ What Was Reviewed & Refined Manually
- **Architecture & Component Separation**: Ensured strict single-responsibility principles across `OrderList`, `OrderDetail`, `VerticalTimeline`, `StatusChip`, and `OfflineBanner`.
- **UI/UX Craft & Micro-Animations**: Refined CSS animation timing functions (`cubic-bezier`), staggered list entrance delays, status badge color harmonies, and device notch emulator aesthetics.
- **Offline & Resilience Handling**: Handled window network event listeners (`online`/`offline`) and constructed an interactive demo toolbar so reviewers can test edge cases with a single click.
- **Compliance**: Verified exact footer credit requirement `"Built for Digital Heroes Training Task"` linked to `https://digitalheroesco.com`.
