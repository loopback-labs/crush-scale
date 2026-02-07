

# Fix Love Calculator: Correct Algorithm for 71%

## The Problem

The current implementation has **two bugs**:

1. **Wrong initial sequence**: Currently creates a number for *every character position* in the phrase, but the traditional method uses **one number per unique letter**

2. **Wrong sum handling**: Currently uses `sum % 10` which loses the tens digit. The traditional method **splits double-digit sums into two separate digits** (e.g., 11 → 1, 1)

---

## How The Calculation Should Work

**For "chetanloveschetna":**

### Step 1: Count unique letters (in order of appearance)
```
c=2, h=2, e=3, t=2, a=2, n=2, l=1, o=1, v=1, s=1
```

**Starting row:** `2 2 3 2 2 2 1 1 1 1`

### Step 2: Add adjacent pairs, splitting sums ≥ 10
```
Row 1:  2  2  3  2  2  2  1  1  1  1
Row 2:  4  5  5  4  4  3  2  2  2
Row 3:  9  1  0  9  8  7  5  4  4      ← (5+5=10 → splits to 1,0)
Row 4:  1  0  1  9  1  7  1  5  9  8   ← continues splitting
...continues until 2 digits remain...
```

This produces **71%**

---

## Changes Required

### 1. Update `countLetters` function
Change the sequence to use **one count per unique letter** instead of one per character position.

### 2. Update `reduceSequence` function  
When sum ≥ 10, **push both digits separately** instead of using modulo:
```typescript
if (sum >= 10) {
  newNumbers.push(Math.floor(sum / 10)); // tens digit
  newNumbers.push(sum % 10);              // ones digit
} else {
  newNumbers.push(sum);
}
```

### 3. Update `LetterTally` component
Display the unique letters with their counts (already works correctly).

---

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/loveCalculator.ts` | Fix sequence generation + sum splitting logic |

The animation and UI components remain unchanged - only the core math logic needs fixing.

