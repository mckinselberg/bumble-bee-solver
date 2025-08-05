import React, { FormEvent, useState } from "react";
import words from "./words";
import "./App.css";

const dictionary = new Set(words);

function getAllCombinationsWithRepetition(str, maxLength) {
  const results = [];

  function helper(prefix, remainingLength) {
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

function getPermutations(str) {
  if (str.length <= 1) {
    return [str];
  }
  const permutations = [];
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

function getAllPermutationsOfCombinationsWithRepetition(str, maxLength) {
  const combinations = getAllCombinationsWithRepetition(str, maxLength);
  const allPermutations = new Set();

  for (const combination of combinations) {
    const permutations = getPermutations(combination);
    permutations.forEach((perm) => allPermutations.add(perm));
  }

  return Array.from(allPermutations);
}

function filterValidWords(permutations, center) {
  return permutations.filter(
    (word) => word.length >= 4 && word.includes(center) && dictionary.has(word),
  );
}

function getAllValidWords(letters, center) {
  const permutations = getAllPermutationsOfCombinationsWithRepetition(
    letters,
    4,
  );
  const validWords = filterValidWords(permutations, center);
  return Array.from(new Set(validWords)); // Removing duplicates
}

function App() {
  const [lettersValue, setLettersValue] = useState("");
  const [centerValue, setCenterValue] = useState("");
  const [words, setWords] = useState<string[]>([]);

  const handleLettersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLettersValue(event.target.value);
  };

  const handleCenterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCenterValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setWords(getAllValidWords(lettersValue, centerValue));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="letters"
          value={lettersValue}
          onChange={handleLettersChange}
        />
        <input
          placeholder="center"
          value={centerValue}
          onChange={handleCenterChange}
          maxLength={1}
        />
        <button>submit</button>
        {words.map((word) => (
          <p id={word}>{word}</p>
        ))}
      </form>
    </>
  );
}

export default App;
