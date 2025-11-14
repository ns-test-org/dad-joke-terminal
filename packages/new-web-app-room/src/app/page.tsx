'use client';

import { useState, useEffect, useRef } from 'react';

const dadJokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I invented a new word: Plagiarism!",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "What do you call a fake noodle? An impasta!",
  "How does a penguin build its house? Igloos it together!",
  "Why don't skeletons fight each other? They don't have the guts!",
  "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!",
  "Why did the math book look so sad? Because it had too many problems!",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus!",
  "Why can't a bicycle stand up by itself? It's two tired!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why did the coffee file a police report? It got mugged!",
  "How do you organize a space party? You planet!",
  "What do you call a sleeping bull? A bulldozer!",
  "Why don't oysters donate? Because they are shellfish!",
  "What did the ocean say to the beach? Nothing, it just waved!",
  "Why did the cookie go to the doctor? Because it felt crumbly!",
  "What's orange and sounds like a parrot? A carrot!"
];

export default function DadJokesTerminal() {
  const [history, setHistory] = useState<string[]>([
    'Welcome to Dad Jokes Terminal v1.0',
    'Type "help" for available commands',
    ''
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getRandomJoke = () => {
    return dadJokes[Math.floor(Math.random() * dadJokes.length)];
  };

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    const newHistory = [...history, `$ ${command}`];

    switch (cmd) {
      case 'help':
        newHistory.push('Available commands:');
        newHistory.push('  joke     - Get a random dad joke');
        newHistory.push('  random   - Get a random dad joke');
        newHistory.push('  clear    - Clear the terminal');
        newHistory.push('  help     - Show this help message');
        newHistory.push('  about    - About this terminal');
        break;
      
      case 'joke':
      case 'random':
        newHistory.push(getRandomJoke());
        break;
      
      case 'clear':
        setHistory(['Welcome to Dad Jokes Terminal v1.0', 'Type "help" for available commands', '']);
        return;
      
      case 'about':
        newHistory.push('Dad Jokes Terminal v1.0');
        newHistory.push('A simple terminal for getting dad jokes!');
        newHistory.push('Built with love and terrible humor.');
        break;
      
      case '':
        // Empty command, just add a new line
        break;
      
      default:
        newHistory.push(`Command not found: ${command}`);
        newHistory.push('Type "help" for available commands');
        break;
    }

    newHistory.push('');
    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setCommandHistory(prev => [...prev, currentInput]);
      setHistoryIndex(-1);
      executeCommand(currentInput);
    } else {
      setHistory(prev => [...prev, '$ ', '']);
    }
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div 
        ref={terminalRef}
        className="h-screen overflow-y-auto cursor-text"
        onClick={handleTerminalClick}
      >
        <div className="mb-4">
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-green-400 flex-1 font-mono"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="animate-pulse">_</span>
        </form>
      </div>
    </div>
  );
}

