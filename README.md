# Order Tracker Mobile Application (India Edition 🇮🇳)

> Built for **Digital Heroes Internship Qualification Task Kit** (Role 06: Mobile App Developer).
> Live Build Credit: Built for Digital Heroes Training Task - [digitalheroesco.com](https://digitalheroesco.com)

---

## 📱 Project Overview
**Order Tracker (India Edition)** is a 2-screen mobile app tailored to mock Indian e-commerce / quick-commerce logistics applications (such as Zomato, Swiggy Instamart, Flipkart, Myntra, or Blinkit). It features Indian Rupee (INR `₹`) formatting, UPI payment tracking, Indian courier AWB tracking (Blue Dart, Delhivery, Ekart, Shadowfax, Xpressbees), and major Indian city hub routes.

### 🌟 Key Features
- **Indian Localization**:
  - Currency formatted in Indian Rupee (`₹3,499.00`, `₹14,999.00`, etc.).
  - Payment modes: PhonePe UPI, Paytm UPI, Google Pay UPI, CRED Pay, HDFC Card, COD.
  - Indian Logistics AWBs (BlueDart, Delhivery, Ekart, Xpressbees).
  - Indian tech product catalog & hub locations (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, Ahmedabad).
- **Screen 1 (Orders List)**:
  - Fetched live from custom mock JSON API.
  - Pull-to-refresh pull gesture / manual refresh button with spinner animation.
  - Dynamic status chips with color coding (`Pending`: Amber, `Processing`: Blue, `Dispatched`: Purple, `Delivered`: Emerald, `Cancelled`: Red).
  - Search filter (by Order ID, customer name, item name, or Indian city) and status tab filtering.
  - Shimmer skeleton loading state, empty state with reset filters, and API error recovery card.
- **Screen 2 (Order Detail)**:
  - Tapping any order opens Screen 2 with smooth transition animation.
  - Vertical shipment status timeline with step progress indicators, current step pulsing badge, completed checkmarks, and timestamps.
  - Itemized items breakdown with GST 18% tax calculation, free express shipping badge, and payment details.
  - Copyable AWB tracking number with toast feedback.
- **Offline & Edge Case Engineering**:
  - Live network status listener (`online` / `offline`).
  - Automatic `localStorage` caching layer that instantly serves cached orders when offline.
  - Interactive "Demo Edge Case Tester (India)" toolbar to simulate Offline Mode, 500 API Error, and Empty state on demand.
- **Live Footer Credit**:
  - Contains visible text: `"Built for Digital Heroes Training Task"` linked to `https://digitalheroesco.com`.

---

## 🛠️ Architecture & Tech Stack
- **Framework**: React 18 / Vite
- **Styling**: TailwindCSS v4 + Custom Mobile Device Emulator Frame
- **Icons**: Lucide React
- **Mock API**: Local JSON dataset hosted at `/api/orders.json`
- **State Management**: React Hooks (`useState`, `useEffect`) with modular data layer service (`mockOrders.js`).

---

## 🚀 Setup & Execution Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Execution
```bash
# Clone repository
git clone <your-repo-link>
cd mobile-order-tracker

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open your browser at **`http://localhost:5173/`**.
