import React, { FormEvent, useState } from "react";
import words from "./words";
import "./App.css";

interface TrieNode {
  children: Record<string, TrieNode>;
  isWord: boolean;
}

function buildTrie(wordList: string[]): TrieNode {
  const root: TrieNode = { children: {}, isWord: false };
  for (const word of wordList) {
    let node = root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = { children: {}, isWord: false };
      }
      node = node.children[char];
    }
    node.isWord = true;
  }
  return root;
}

const trie = buildTrie(words);

function searchTrie(
  letters: string,
  center: string,
  maxLength: number,
): string[] {
  const result = new Set<string>();

  function dfs(prefix: string, node: TrieNode, containsCenter: boolean) {
    if (prefix.length > maxLength) return;
    if (prefix.length >= 4 && containsCenter && node.isWord) {
      result.add(prefix);
    }

    for (const ch of letters) {
      const child = node.children[ch];
      if (child) {
        dfs(prefix + ch, child, containsCenter || ch === center);
      }
    }
  }

  dfs("", trie, false);
  return Array.from(result);
}

function getAllValidWords(letters: string) {
  const center = letters[letters.length - 1];
  return searchTrie(letters, center, 10);
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
