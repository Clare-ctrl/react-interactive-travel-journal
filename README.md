# 🎌 Interactive Travel Journal & Portfolio: "My Trip to Japan"

An elegant, highly interactive, and responsive single-page web application built to showcase multimedia travel experiences. This project seamlessly integrates fluid UI/UX designs, asynchronous user interactions, dynamic scroll-spying navigation, and video/photo gallery components.

> **Engineering Update In Progress:** I am currently refactoring this production-ready vanilla stack (HTML5/SCSS/JavaScript ES6) into a modular component-based architecture using **React.js** and **Tailwind CSS**.

---

## 🚀 Live Demo & Interface Highlights
- **Interactive Multi-City Carousel:** Smooth, index-tracked slideshow featuring high-resolution photography from Tokyo, Kyoto, and Osaka.
- **Scrollspy Dynamic Navigation:** Adaptive top navigation bar that morphs background padding based on scroll thresholds and automatically highlights menu items using real-time viewport collision calculations.
- **Dynamic Lightbox Photo Gallery:** Interactive modal view utilizing event delegation to open high-definition imagery with descriptive captions on-click.
- **Context-Aware Media Control:** Event-driven HTML5 video player that automatically plays on cursor container entry and pauses/resets upon mouse leave to optimize client-side resource management.

---

## 🛠️ Architecture & Tech Stack

### Current Implementation (Vanilla Stack)
- **Frontend Core:** Semantic HTML5, CSS3, Modern JavaScript (ES6+)
- **Styling Architecture:** SCSS (Sassy CSS) modular sheets compiled into unified layout stylesheets.
- **Typography & Assets:** Google Fonts Integration (Lato), FontAwesome v4.7 Icon Package.

### Target Migration (React Refactoring Blueprint)
- **Framework:** React 18+ (Functional Components with Hooks)
- **State Management:** 
  - `useState` for explicit slideshow pagination indices and Modal visualization toggles.
  - `useEffect` paired with `IntersectionObserver API` to replace heavy window scroll event listeners for premium viewport monitoring.
- **Styling Framework:** Tailwind CSS for robust, utility-first layout responsiveness.

---

## 💻 Core Engineering & Algorithm Insights

### 1. Viewport-Aware Scrollspy System
Instead of simple styling toggles, the scroll handler dynamically reads DOM node coordinates (`getBoundingClientRect()`) relative to the viewport's middle threshold to update navigation states with micro-interactions.

```javascript
// Highlighting active section based on real-time scroll telemetry
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("div[id], section[id]");
  const middle = window.innerHeight / 2;
  
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= middle && rect.bottom >= middle) {
      current = section.getAttribute("id");
    }
  });
  // State propagation to UI navbar elements...
});
```

### 2. State-Driven Image Carousel
Maintains index tracking boundaries through cyclic wrapping algorithms, ensuring seamless transitions between slide nodes with a fallback layer preventing script crashes if DOM components are unmounted.

---

## 📂 Project Structure

```text
├── index.html          # Semantic layout core and DOM nodes
├── css/
│   └── main.scss       # SCSS nesting rules, variables, and responsive mixins
├── js/
│   └── main.js         # ES6 interaction scripts and DOM mutation handlers
└── assets/
    ├── img/            # Optimized travel photography assets (Tokyo, Kyoto, Hakone)
    └── food.MP4        # Compressed high-definition HTML5 video loop
```

---

## 👩‍💻 About the Author
I am a Master’s student in **Computer Science at the University of Illinois Urbana-Champaign (UIUC)**, maintaining a **4.0/4.0 GPA** in advanced software tracks. My passion lies at the intersection of robust backend/frontend engineering and empathetic UI/UX design. Outside of writing clean code, I am an avid travel photographer and an atmospheric visual storyteller.
