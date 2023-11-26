
1-
Stream abstraction is like treating data as a flow. It's about dealing with data piece by piece over time.

Streams and the observer pattern are closely linked. In the observer pattern, some objects watch and react to changes in other objects. Streams use this idea by letting objects respond to data flowing through the stream, one item at a time.

Streams are great for handling tasks that happen over time, like user clicks or loading files, especially in web development. They help make web apps responsive and good at managing ongoing data, like live updates or user interactions.


2-

Using RxJS in a Rich Web App for handling API responses involves:

- Creating Observables: Wrap API calls in observables. Unlike promises, observables can emit multiple values over time.
- Subscribing to Observables: Handle responses, errors, and completions by subscribing to these observables.
- Transforming and Combining: Use RxJS operators to manipulate and combine data streams, useful for complex tasks involving multiple API calls.

Benefits of RxJS over Promises:
Multiple Values: Can handle multiple values over time, useful for real-time updates.
Advanced Operations: Offers powerful operators for data manipulation.
Cancellation: Allows unsubscribing from observables, providing better control over resources.
Downsides:
Complexity: Has a steeper learning curve and can be complex for simple tasks.
Debugging: Can be harder to debug due to asynchronous nature and chaining.
Size: The library's size might impact performance and load times.

3- 
Sharing global state among asynchronous tasks A, B, and C can lead to issues like:

Race Conditions: These tasks might overwrite each other's changes, causing inconsistent results.
Hard to Debug: With shared global state, it’s tough to track which task caused a problem.
Unintended Side Effects: A change in the state by one task can unexpectedly affect the others.
Good Practices to Reduce Problems:

Limit Global State: Try to avoid or minimize the use of global state. Use local state within tasks when possible.
Immutable State: Use immutable data structures to prevent tasks from directly altering shared state.
Functional Programming: Apply functional programming principles, like pure functions, to make behavior more predictable.
State Management Tools: Utilize state management libraries or patterns for structured and safer state updates.