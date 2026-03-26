function throttle(fn, delay) { 
    let lastTime = 0; 
    return function (...args) 
    { const now = Date.now(); 
        if (now - lastTime >= delay) { //We call the function only if the time passed since last call is greater than or equal to the delay.
            lastTime = now; 
            fn.apply(this, args); 
        } 
    }; 
}

//it refers to slowing down a process such that an operation can only be performed at a certain rate.

// When to use throttle (quick gut check)

// Use throttle when:

// You want continuous feedback

// But not every single event

// Examples:

// Scroll position tracking

// Mouse movement

// Window resize calculations

// Button spam protection