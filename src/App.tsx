import { FormEvent, useState } from "react";
import words from "./words.js";
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

function filterValidWords(permutations, letters) {
  // letters && console.log(letters[letters.length - 1]);
  return permutations.filter(
    (word) =>
      word.length >= 4 &&
      word.includes(letters[letters.length - 1]) &&
      dictionary.has(word),
  );
}

function getAllValidWords(letters) {
  const permutations = getAllPermutationsOfCombinationsWithRepetition(
    letters,
    4,
  );
  const validWords = filterValidWords(permutations, letters);
  return Array.from(new Set(validWords)); // Removing duplicates
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState([]);

  const handleChange = (event: Event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const letterArr = inputValue;
    setWords(getAllValidWords(letterArr));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={"" || inputValue} onChange={handleChange}></input>
        <button>submit</button>
        {words.map((word) => (
          <p id={word}>{word}</p>
        ))}
      </form>
    </>
  );
}

export default App;
