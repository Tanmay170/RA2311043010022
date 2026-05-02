# Stage 1 - Notification System Design

## Objective
Display top N priority notifications based on:
- Type priority
- Recency

## Priority Logic
Placement > Result > Event

Score Formula:
score = weight * 1e12 + timestamp

## Approach
1. Assign weights:
   - Placement = 3
   - Result = 2
   - Event = 1

2. Convert timestamp to milliseconds

3. Calculate score and sort descending

4. Return top N notifications

## Optimization
- Use Min Heap (size N)
- Time Complexity: O(n log n)

## Real-Time Handling
- Maintain heap dynamically
- Replace smallest element when new notification arrives

## Edge Cases
- Empty list
- Duplicate timestamps
- Large data volume

## Logging Strategy
- Log API calls
- Log priority calculations
- Log user interactions
