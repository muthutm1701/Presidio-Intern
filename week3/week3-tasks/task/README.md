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

