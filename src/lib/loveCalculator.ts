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
  
  // Create the initial sequence from the phrase (count of each letter as it appears)
  const sequence: number[] = [];
  for (const char of phrase) {
    sequence.push(letterMap.get(char)!);
  }
  
  return { phrase, counts, sequence };
}

export function reduceSequence(numbers: number[]): number[] {
  if (numbers.length <= 2) return numbers;
  
  const newNumbers: number[] = [];
  const halfLength = Math.floor(numbers.length / 2);
  
  for (let i = 0; i < halfLength; i++) {
    const sum = numbers[i] + numbers[numbers.length - 1 - i];
    // If sum is 10 or more, split into two digits
    if (sum >= 10) {
      const tens = Math.floor(sum / 10);
      const ones = sum % 10;
      newNumbers.push(tens, ones);
    } else {
      newNumbers.push(sum);
    }
  }
  
  // If odd number of elements, include the middle one
  if (numbers.length % 2 === 1) {
    // Insert middle element in the middle of new array
    const middleIndex = Math.floor(numbers.length / 2);
    const insertPos = Math.floor(newNumbers.length / 2);
    newNumbers.splice(insertPos, 0, numbers[middleIndex]);
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
