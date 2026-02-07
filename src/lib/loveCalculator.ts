// Love Calculator Logic
// Combines Name1 + "loves" + Name2, counts letter frequencies,
// then performs "first + last" reduction until 2 digits remain

export interface LetterCount {
  letter: string;
  count: number;
}

export interface CalculationStep {
  numbers: number[];
  isFirstRow?: boolean;
}

export function countLetters(name1: string, name2: string): { phrase: string; counts: LetterCount[]; sequence: number[] } {
  const phrase = `${name1.toLowerCase()}loves${name2.toLowerCase()}`.replace(/[^a-z]/g, '');
  
  // Count frequency of each letter in order of first appearance
  const letterMap = new Map<string, number>();
  const orderedLetters: string[] = [];
  
  for (const char of phrase) {
    if (letterMap.has(char)) {
      letterMap.set(char, letterMap.get(char)! + 1);
    } else {
      letterMap.set(char, 1);
      orderedLetters.push(char);
    }
  }
  
  const counts: LetterCount[] = orderedLetters.map(letter => ({
    letter,
    count: letterMap.get(letter)!
  }));
  
  // Create the initial sequence: one count per unique letter (in order of appearance)
  const sequence: number[] = orderedLetters.map(letter => letterMap.get(letter)!);
  
  return { phrase, counts, sequence };
}

export function reduceSequence(numbers: number[]): number[] {
  if (numbers.length <= 2) return numbers;
  
  const newNumbers: number[] = [];
  
  // Add first + last, then move inward
  let left = 0;
  let right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    // If sum is 10 or more, split into two separate digits
    if (sum >= 10) {
      newNumbers.push(Math.floor(sum / 10)); // tens digit
      newNumbers.push(sum % 10);              // ones digit
    } else {
      newNumbers.push(sum);
    }
    left++;
    right--;
  }
  
  // If odd length, include the middle number
  if (left === right) {
    newNumbers.push(numbers[left]);
  }
  
  return newNumbers;
}

export function buildPyramid(initialSequence: number[]): CalculationStep[] {
  const steps: CalculationStep[] = [{ numbers: initialSequence, isFirstRow: true }];
  let current = initialSequence;
  
  while (current.length > 2) {
    current = reduceSequence(current);
    steps.push({ numbers: current });
  }
  
  return steps;
}

export function getFinalPercentage(steps: CalculationStep[]): number {
  const lastStep = steps[steps.length - 1];
  if (lastStep.numbers.length === 2) {
    return lastStep.numbers[0] * 10 + lastStep.numbers[1];
  } else if (lastStep.numbers.length === 1) {
    return lastStep.numbers[0];
  }
  return 0;
}

export function getRelationshipMessage(percentage: number): { message: string; emoji: string } {
  if (percentage >= 90) {
    return { message: "Destined!", emoji: "💘" };
  } else if (percentage >= 70) {
    return { message: "True Love!", emoji: "💕" };
  } else if (percentage >= 50) {
    return { message: "Friends... for now", emoji: "😉" };
  } else if (percentage >= 30) {
    return { message: "Keep dreaming!", emoji: "💭" };
  } else {
    return { message: "Maybe next crush?", emoji: "🌸" };
  }
}
