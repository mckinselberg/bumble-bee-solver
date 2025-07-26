export function getAllCombinationsWithRepetition(str: string, maxLength: number): string[] {
  const results: string[] = [];

  function helper(prefix: string, remainingLength: number) {
    if (remainingLength === 0) {
      return;
    }
    for (let i = 0; i < str.length; i++) {
      const newPrefix = prefix + str[i];
      results.push(newPrefix);
      helper(newPrefix, remainingLength - 1);
    }
  }

  for (let length = 1; length <= maxLength; length++) {
    helper("", length);
  }

  return results;
}

export function getPermutations(str: string): string[] {
  if (str.length <= 1) {
    return [str];
  }
  const permutations: string[] = [];
  const smallerPerms = getPermutations(str.slice(1));
  const firstChar = str[0];
  for (const perm of smallerPerms) {
    for (let i = 0; i <= perm.length; i++) {
      const newPerm = perm.slice(0, i) + firstChar + perm.slice(i);
      permutations.push(newPerm);
    }
  }
  return permutations;
}

export function getAllPermutationsOfCombinationsWithRepetition(str: string, maxLength: number): string[] {
  const combinations = getAllCombinationsWithRepetition(str, maxLength);
  const allPermutations = new Set<string>();
  for (const combination of combinations) {
    const permutations = getPermutations(combination);
    permutations.forEach((perm) => allPermutations.add(perm));
  }
  return Array.from(allPermutations);
}

export function filterValidWords(permutations: string[], letters: string, dictionary: Set<string>): string[] {
  return permutations.filter(
    (word) =>
      word.length >= 4 &&
      word.includes(letters[letters.length - 1]) &&
      dictionary.has(word),
  );
}

export function getAllValidWords(letters: string, dictionary: Set<string>): string[] {
  const permutations = getAllPermutationsOfCombinationsWithRepetition(letters, 4);
  const validWords = filterValidWords(permutations, letters, dictionary);
  return Array.from(new Set(validWords));
}
