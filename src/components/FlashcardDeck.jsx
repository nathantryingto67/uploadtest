import React, { useState } from 'react';

export default function FlashcardDeck() {
  const cards = [
    { question: 'What is the time complexity of QuickSort in the average case?', answer: 'O(n log n)' },
    { question: 'In React, what hook is used to persist mutable values without triggering re-render?', answer: 'useRef()' },
    { question: 'What does ACID stand for in database transactions?', answer: 'Atomicity, Consistency, Isolation, Durability' },
  ];

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setIndex((index + 1) % cards.length);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4 text-xs text-slate-400">
        <span>CS Review Flashcards</span>
        <span>Card {index + 1} of {cards.length}</span>
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="min-h-48 p-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition"
      >
        <p className="text-base font-medium text-slate-100">
          {flipped ? cards[index].answer : cards[index].question}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-slate-500">Click card to reveal answer</span>
        <button
          onClick={nextCard}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
        >
          Next Card &rarr;
        </button>
      </div>
    </div>
  );
}