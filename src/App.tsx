import React, { FormEvent, useState } from "react";
import words from "./words";
import "./App.css";

const dictionary = new Set(words);

function getAllValidWords(letters: string, center: string) {
  const allowed = new Set(letters.split(""));
  const validWords = new Set<string>();

  for (const word of dictionary) {
    if (word.length < 4 || !word.includes(center)) {
      continue;
    }

    let isValid = true;
    for (const char of word) {
      if (!allowed.has(char)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      validWords.add(word);
    }
  }

  return Array.from(validWords);
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const letters = inputValue;
    const center = letters.charAt(letters.length - 1);
    setWords(getAllValidWords(letters, center));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleChange}></input>
        <button>submit</button>
        {words.map((word) => (
          <p id={word}>{word}</p>
        ))}
      </form>
    </>
  );
}

export default App;
