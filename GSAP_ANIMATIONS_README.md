# 🎬 GSAP Animations Utility

Ye ek **reusable GSAP animations library** hai jo aapke portfolio ke saray pages mein use ho sakti hai.

## 📁 File Structure

```
src/
├── utils/
│   ├── gsapAnimations.js          # Main utility file (sare animations yahan hain)
│   └── GSAP_USAGE_GUIDE.md        # Detailed usage guide with examples
│
├── components/
│   ├── Hero_REFACTORED_EXAMPLE.jsx       # Hero component refactored example
│   └── Services_REFACTORED_EXAMPLE.jsx   # Services component refactored example
```

---

## 🚀 Quick Start

### 1. Import Animation Functions

```javascript
import {
  fadeInFromBottom,
  fadeInFromLeft,
  fadeInFromRight,
  staggerFadeIn,
  hoverRotate,
  hoverRotateReset,
} from "../utils/gsapAnimations";
```

### 2. Use in Your Component

```javascript
import React, { useEffect, useRef } from "react";
import { fadeInFromBottom } from "../utils/gsapAnimations";

const MyComponent = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    fadeInFromBottom(elementRef.current, {
      y: 50,
      duration: 1.5,
      scrollTrigger: true,
    });
  }, []);

  return <div ref={elementRef}>Hello World!</div>;
};
```

---

## 📚 Available Animations

### Fade Animations

| Function            | Description                              |
| ------------------- | ---------------------------------------- |
| `fadeInFromBottom`  | Element neeche se fade in hota hai       |
| `fadeInFromLeft`    | Element left se fade in hota hai         |
| `fadeInFromRight`   | Element right se fade in hota hai        |
| `staggerFadeIn`     | Multiple elements ek ek kar ke fade in   |

### Hover Animations

| Function             | Description                        |
| -------------------- | ---------------------------------- |
| `hoverRotate`        | Element rotate hota hai on hover   |
| `hoverRotateReset`   | Rotation reset karta hai           |
| `hoverScaleUp`       | Element scale up hota hai          |
| `hoverScaleReset`    | Scale reset karta hai              |

### Continuous Animations

| Function            | Description                              |
| ------------------- | ---------------------------------------- |
| `swingAnimation`    | Pendulum jaise swing motion              |
| `marqueeAnimation`  | Infinite horizontal scrolling            |
| `pulseAnimation`    | Breathing effect (scale in/out)          |

### Scroll Animations

| Function           | Description                                |
| ------------------ | ------------------------------------------ |
| `revealOnScroll`   | Element scroll pe reveal hota hai          |
| `parallaxScroll`   | Parallax scrolling effect                  |
| `pinOnScroll`      | Element scroll pe pin hota hai             |

### Utility Functions

| Function                   | Description                          |
| -------------------------- | ------------------------------------ |
| `createTimeline`           | Complex animations ke liye timeline  |
| `killAllScrollTriggers`    | Sare scroll triggers ko kill karo    |
| `refreshScrollTrigger`     | ScrollTrigger ko refresh karo        |

---

## 💡 Common Use Cases

### Use Case 1: Hero Section

```javascript
// Hero section main element ko fade in from bottom
fadeInFromBottom(heroRef.current, {
  y: 50,
  duration: 1.5,
});
```

### Use Case 2: Service Cards

```javascript
// Multiple cards ko stagger se fade in
staggerFadeIn(cardsRef.current, {
  y: 10,
  duration: 0.4,
  scrollTrigger: true,
});
```

### Use Case 3: Icon Hover

```javascript
// Icon ko hover pe rotate karo
const handleMouseEnter = () => {
  hoverRotate(iconRef.current, 20);
};

const handleMouseLeave = () => {
  hoverRotateReset(iconRef.current);
};
```

### Use Case 4: Infinite Marquee

```javascript
// Technology icons ko infinite scroll
marqueeAnimation(trackRef.current, {
  duration: 30,
  xPercent: -50,
});
```

---

## 📖 Documentation

**Detailed guide:** `src/utils/GSAP_USAGE_GUIDE.md`

Is file mein:

- ✅ Step-by-step examples
- ✅ 10+ practical use cases
- ✅ Before/After code comparisons
- ✅ Common patterns
- ✅ Migration guide

---

## 🎯 Benefits

| Benefit          | Description                                         |
| ---------------- | --------------------------------------------------- |
| **Reusable**     | Ek baar likho, har jagah use karo                   |
| **Consistent**   | Sare pages pe same animation style                  |
| **Maintainable** | Ek jagah change karo, sab jagah update ho jayega    |
| **Clean Code**   | Component code short aur readable                   |
| **Type Safe**    | Proper JSDoc comments with parameter descriptions   |

---

## 🔄 Migration Guide

### Before (Old Code)

```javascript
const fadeOut = React.useRef(null);
React.useEffect(() => {
  gsap.fromTo(
    fadeOut.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
  );
}, []);
```

### After (New Code)

```javascript
import { fadeInFromBottom } from "../utils/gsapAnimations";

const fadeOut = useRef(null);
useEffect(() => {
  fadeInFromBottom(fadeOut.current, {
    y: 50,
    duration: 1.5,
  });
}, []);
```

**Result:** Cleaner, shorter, aur reusable! 🎉

---

## 🛠️ Advanced Usage

### Timeline for Sequential Animations

```javascript
import { createTimeline } from "../utils/gsapAnimations";

const tl = createTimeline();
tl.fromTo(el1, { opacity: 0 }, { opacity: 1, duration: 1 })
  .fromTo(el2, { opacity: 0 }, { opacity: 1, duration: 0.8 })
  .fromTo(el3, { opacity: 0 }, { opacity: 1, duration: 0.6 });
```

### Custom Animation

```javascript
import { customAnimation } from "../utils/gsapAnimations";

customAnimation(
  element,
  { opacity: 0, scale: 0.5, rotation: -180 },
  { opacity: 1, scale: 1, rotation: 0, duration: 2 }
);
```

---

## 📋 Example Components

Dekho in refactored components ko real examples ke liye:

1. **Hero Component:** `src/components/Hero_REFACTORED_EXAMPLE.jsx`
2. **Services Component:** `src/components/Services_REFACTORED_EXAMPLE.jsx`

---

## 🎨 Animation Options

Har animation function ke options:

```javascript
{
  y: 50,              // Y-axis movement
  x: 40,              // X-axis movement
  duration: 1.5,      // Animation duration (seconds)
  delay: 0,           // Delay before animation starts
  ease: "power2.out", // Easing function
  scrollTrigger: true, // Enable scroll trigger
  start: "top 80%",   // When to trigger
}
```

---

## ⚡ Performance Tips

1. **Use `useLayoutEffect`** for animations that need to run before paint
2. **Cleanup animations** on component unmount
3. **Use ScrollTrigger** only when needed
4. **Batch similar animations** for better performance

```javascript
useEffect(() => {
  const animation = fadeInFromBottom(ref.current);

  return () => {
    animation.kill(); // Cleanup
  };
}, []);
```

---

## 🤝 Contributing

Agar aap naye animations add karna chahte ho:

1. `src/utils/gsapAnimations.js` mein function add karo
2. Proper JSDoc comments add karo
3. Export karo
4. Usage guide mein example add karo

---

## 📞 Support

Questions? Check:

1. **Usage Guide:** `src/utils/GSAP_USAGE_GUIDE.md`
2. **Example Components:** Check refactored examples
3. **GSAP Docs:** [https://greensock.com/docs/](https://greensock.com/docs/)

---

## ✅ Checklist for New Components

Jab aap naye component mein animations add karo:

- [ ] Import required animation functions
- [ ] Create refs for animated elements
- [ ] Call animation functions in useEffect
- [ ] Set scrollTrigger if needed
- [ ] Add cleanup on unmount
- [ ] Test on different screen sizes

---

Happy Animating! 🚀✨
