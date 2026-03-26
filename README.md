# React & Frontend Interview Preparation

A comprehensive collection of JavaScript concepts and React practice code for frontend interview preparation.

---

## 📁 Project Structure

```
int_prep/
├── interview_preparation_javascript/   # Core JS concepts
├── quick_rev/                          # Quick revision notes
└── react_learning/                     # React concepts & components
```

---

## 📌 JavaScript Concepts (`interview_preparation_javascript/`)

| Topic | Description |
|-------|-------------|
| `arr Methods/` | Array method implementations |
| `call apply bind/` | Function borrowing methods |
| `closures/` | Closure concepts and examples |
| `debounce/` | Debounce and throttle implementations |
| `deepCopyShallowCopy/` | Deep vs shallow copy |
| `function chaining/` | Method chaining pattern |
| `function currying/` | Currying techniques |
| `HOC/` | Higher Order Functions |
| `map_weakmap_set_weakset/` | ES6 data structures |
| `polyfills/` | Custom polyfills for map, filter, call, includes, deepCopy |
| `primitive and non primitive/` | JS data types |
| `promisesInDepth/` | Promises and async/await |
| `promiseTraps/` | Common promise pitfalls |
| `prototype inheritance/` | Prototype chain |
| `this/` | `this` keyword behavior |
| `practice/` | Practice files |

### HTML Demos
- `index.html` - Main demo page
- `fetchJsAsyn.html` - Fetch API & async JS
- `lazyLoading.html` - Lazy loading images
- `preloadingPreFetchingPreConnect.html` - Resource hints
- `boxPractice.html` - CSS box model practice

---

## ⚛️ React Concepts (`react_learning/`)

| Topic | Files |
|-------|-------|
| Hooks | `useCallback`, `useMemo`, `useEffect`, `useLayoutEffect`, custom `useCounter` |
| HOC | `withCounter`, `CounterClick`, `HoverCounter` |
| Performance | Virtualization, Progressive Image loading, Animations |
| Components | Modal, ChatApp, TicTacToe game, Parent-Child patterns |
| Testing | `Button.test.jsx`, `setupTests.js` |

---

## 🚀 Getting Started

### JavaScript files
Open any `.html` file directly in the browser, or run `.js` files with Node.js:
```bash
node interview_preparation_javascript/closures/closures.js
```

### React app
```bash
cd react_learning
npm install
npm run dev
```

---

## 🛠 Tech Stack
- Vanilla JavaScript (ES6+)
- React 18
- Vite
- Vitest / Jest (testing)
