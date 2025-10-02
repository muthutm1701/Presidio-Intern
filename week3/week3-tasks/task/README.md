# Week-3 takeaways:

## Re-Rendering
A component Re-Renders when:

1. Its internal state changes. (e.g., you call useState's setter function).
2. Its props change. (The data passed from its parent is different).
3. Its parent component re-renders.

## Using Fetch API

## Using Error Handling 
 Place a general ErrorBoundary at the top level of your application to catch unexpected errors and prevent a full crash.

Be Specific: Add more ErrorBoundary components around specific, complex, or third-party widgets that you don't fully trust.

Use try...catch: Always use try...catch inside event handlers and asynchronous functions for predictable error handling.

## React life cycle 
- MOUNTING

    Constructor (dummy)
    Render (dummy)
    Component Did Mount
    this.setState -> State variable is updated

- UPDATE

    render(API data)
    componentDidUpdate

- UNMOUNT
    ComponentWillUnmount

# Responsive Design Checklist

-  Use **relative units** (`%`, `rem`, `vw`, `vh`) instead of fixed pixels.  
- Add **media queries** for breakpoints (mobile → tablet → desktop).  
-  Make **images & videos flexible** (`max-width: 100%`, `height: auto`).  
-  Use **responsive typography** (scale font-size with `clamp()`, `em`, `rem`).  
-  Ensure **touch-friendly buttons** (minimum `44x44px`, enough spacing).  
-  Build **responsive navigation** (hamburger menu or collapsible nav).  
-  Use **CSS Grid / Flexbox** for fluid layouts.  
-  Make **forms adapt** (stack inputs, use 100% width on mobile).  
-  Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.  
  


