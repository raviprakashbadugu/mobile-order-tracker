# Loom Walkthrough & Video Recording Script (India Edition 🇮🇳)

> **Role 06**: Mobile App Developer  
> **Target Duration**: 2 - 3 Minutes  
> **Speaker Role**: Mobile Developer Applicant  

---

## 🎬 Video Recording Script & Timeline

### ⏱️ 0:00 - 0:35 | Introduction & Task Overview
- **Visual**: Camera on speaker + screen sharing the Order Tracker app inside the device emulator frame.
- **Script**:
  > *"Hi Digital Heroes team! I'm presenting my submission for the Mobile App Developer qualification task. I've built a 2-screen Order Tracker application tailored for the Indian e-commerce market—complete with Indian Rupee (INR ₹) currency formatting, UPI payment tracking, BlueDart/Delhivery AWB integration, offline resilience, and edge case state management."*

---

### ⏱️ 0:35 - 1:20 | Task A: List & Detail Architecture
- **Visual**: Interacting with Screen 1 (Order List).
- **Script**:
  > *"Here on Screen 1, we have our orders list fetched dynamically from our mock JSON API in Indian Rupees (INR). Each card displays colored status chips matching the order state—Amber for Pending, Blue for Processing, Purple for Dispatched, Emerald for Delivered, and Red for Cancelled.*  
  > *We can pull-to-refresh or tap the Refresh button to fetch live data with spinner feedback. We also have instant search by customer, order ID, or Indian cities like Bengaluru or Mumbai."*
- **Visual**: Tapping an order to open Screen 2 (Order Detail).
- **Script**:
  > *"Tapping any order transitions smoothly to Screen 2. Here we see the full order breakdown in INR, customer delivery address in Bengaluru/Mumbai/Delhi NCR, 18% GST tax breakdown, UPI payment verification, and a vertical status timeline with animated step completion and pulsing current status markers."*

---

### ⏱️ 1:20 - 2:20 | Task B: Offline Mode & Error State Handling
- **Visual**: Clicking the "Offline Mode" button on the top demo bar.
- **Script**:
  > *"For Task B, I focused on making the application feel like a production release. To test edge cases, I built an interactive demo toolbar at the top.*  
  > *When network connection is lost or simulated offline mode is toggled, the app instantly displays an Offline Banner and falls back seamlessly to a cached snapshot stored in LocalStorage, allowing the user to view their orders without internet connection."*
- **Visual**: Clicking "Trigger Error" button.
- **Script**:
  > *"If the API fails with a 500 error or network failure, instead of crashing, the app presents a clean, user-friendly Error Recovery Card with a dedicated retry button to gracefully fetch again."*

---

### ⏱️ 2:20 - 3:00 | Code Quality & Footer Verification
- **Visual**: Showing `README.md` and footer credit.
- **Script**:
  > *"The project is fully modular, documented in the README, and includes the required footer credit: 'Built for Digital Heroes Training Task' linked to digitalheroesco.com.*  
  > *Thank you for reviewing my work, and I look forward to discussing the code in detail during the interview!"*
