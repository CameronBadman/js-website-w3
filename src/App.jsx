import { useState, useEffect } from 'react';
import Exercise from './Exercise';

const EXERCISES = [
  {
    id: 'final-boss',
    title: 'Final Boss',
    objective: 'Learn to chain array methods together to transform data',
    question: 'Chain filter() and map() to find Peter Griffin from Family Guy and get just his name',
    starterCode: `const characters = [
  { name: 'Peter Griffin', show: 'Family Guy', age: 42 },
  { name: 'Lois Griffin', show: 'Family Guy', age: 40 },
  { name: 'Peter Griffin', show: 'American Dad', age: 55 },
  { name: 'Stewie Griffin', show: 'Family Guy', age: 1 },
  { name: 'Glenn Quagmire', show: 'Family Guy', age: 61 }
];
// TODO: Chain filter() and map(), then get first element with [0]
// const peterGriffin = ...

// TODO: Log the result`,
    validation: (output) => {
      return output.some(item => 
        item.type === 'log' && item.message === 'Peter Griffin'
      );
    },
  },
  {
    id: 'reduce',
    title: 'Array Reduce',
    objective: 'Master the reduce method for aggregating data',
    question: 'Use array.reduce() to sum all numbers, then calculate the product of all numbers',
    starterCode: `const numbers = [1, 2, 3, 4, 5];
// TODO: Use array.reduce((accumulator, current) => ..., initialValue)
// const sum = ...

// TODO: Use array.reduce() to multiply all numbers
// const product = ...

// TODO: Log both results`,
    validation: (output) => {
      const hasSum = output.some(item => 
        item.type === 'log' && item.message.includes('15')
      );
      const hasProduct = output.some(item => 
        item.type === 'log' && item.message.includes('120')
      );
      return hasSum && hasProduct;
    },
  },
  {
    id: 'find',
    title: 'Array Find',
    objective: 'Learn to search arrays for specific items',
    question: 'Use array.find() to get the first person over 30, then use findIndex() to get their position',
    starterCode: `const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
  { name: 'Charlie', age: 40 },
  { name: 'Diana', age: 28 }
];
// TODO: Use array.find(item => condition)
// const firstOver30 = ...

// TODO: Use array.findIndex(item => condition)
// const indexOver30 = ...

// TODO: Log both results`,
    validation: (output) => {
      const hasBob = output.some(item => 
        item.type === 'log' && item.message.includes('Bob')
      );
      const hasIndex = output.some(item => 
        item.type === 'log' && item.message.includes('1')
      );
      return hasBob && hasIndex;
    },
  },
  {
    id: 'some-every',
    title: 'Array Some & Every',
    objective: 'Test array conditions with some() and every()',
    question: 'Use array.some() to check if any number is even, then use every() to check if all are positive',
    starterCode: `const numbers = [1, 3, 5, 7, 8];
// TODO: Use array.some(item => condition)
// const hasEven = ...

// TODO: Use array.every(item => condition)
// const allPositive = ...

// TODO: Log both results`,
    validation: (output) => {
      const hasTrue = output.some(item => 
        item.type === 'log' && item.message.includes('true')
      );
      return hasTrue;
    },
  },
  {
    id: 'destructuring',
    title: 'Object Destructuring',
    objective: 'Extract values from objects and arrays efficiently',
    question: 'Use destructuring to extract properties from objects and arrays',
    starterCode: `const user = { name: 'John', age: 30, city: 'New York', country: 'USA' };
const colors = ['red', 'green', 'blue', 'yellow'];

// TODO: Destructure name and age from user
// const { name, age } = ...

// TODO: Destructure first two colors with custom names
// const [primary, secondary] = ...

// TODO: Log all extracted values`,
    validation: (output) => {
      const hasJohn = output.some(item => 
        item.type === 'log' && item.message.includes('John')
      );
      const hasAge = output.some(item => 
        item.type === 'log' && item.message.includes('30')
      );
      const hasRed = output.some(item => 
        item.type === 'log' && item.message.includes('red')
      );
      const hasGreen = output.some(item => 
        item.type === 'log' && item.message.includes('green')
      );
      return hasJohn && hasAge && hasRed && hasGreen;
    },
  },
  {
    id: 'spread-rest',
    title: 'Spread & Rest Operators',
    objective: 'Master the ... operator for combining and collecting data',
    question: 'Use spread operator to combine arrays and objects, then use rest operator in a function',
    starterCode: `const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// TODO: Combine arrays using spread [...arr1, ...arr2]
// const combined = ...

// TODO: Combine objects using spread
// const merged = ...

// TODO: Create a function that takes unlimited arguments using rest
// function sum(...numbers) { ... }

// TODO: Log combined array, merged object, and sum(1, 2, 3, 4, 5)`,
    validation: (output) => {
      const hasCombined = output.some(item => 
        item.type === 'log' && item.message.includes('[1,2,3,4,5,6]')
      );
      const hasMerged = output.some(item => 
        item.type === 'log' && item.message.includes('"a":1') && item.message.includes('"c":3')
      );
      const hasSum = output.some(item => 
        item.type === 'log' && item.message.includes('15')
      );
      return hasCombined && hasMerged && hasSum;
    },
  },
  {
    id: 'chaining',
    title: 'Method Chaining Master',
    objective: 'Combine multiple array methods in powerful chains',
    question: 'Chain filter(), map(), and reduce() to process product data',
    starterCode: `const products = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: true },
  { name: 'Keyboard', price: 75, inStock: false },
  { name: 'Monitor', price: 300, inStock: true },
  { name: 'Webcam', price: 50, inStock: true }
];

// TODO: Chain filter (inStock), map (prices), reduce (sum)
// const totalValue = products
//   .filter(...)
//   .map(...)
//   .reduce(...);

// TODO: Get array of in-stock product names
// const availableNames = ...

// TODO: Log both results`,
    validation: (output) => {
      const hasTotal = output.some(item => 
        item.type === 'log' && item.message.includes('1375')
      );
      const hasNames = output.some(item => 
        item.type === 'log' && item.message.includes('Laptop') && 
        item.message.includes('Mouse') && !item.message.includes('Keyboard')
      );
      return hasTotal && hasNames;
    },
  },
  {
    id: 'ultimate-challenge',
    title: 'Ultimate Challenge',
    objective: 'Combine everything you learned into one complex solution',
    question: 'Combine everything: filter, map, reduce, destructuring, and spread operators',
    starterCode: `const students = [
  { name: 'Alice', grades: [85, 90, 92], active: true },
  { name: 'Bob', grades: [70, 65, 60], active: false },
  { name: 'Charlie', grades: [95, 98, 100], active: true },
  { name: 'Diana', grades: [80, 85, 88], active: true }
];

// TODO: Filter active students, calculate their average grade, 
// return objects with { name, average }, sort by average desc

// TODO: Find the top student with highest average

// TODO: Calculate class average for active students only

// TODO: Log top student and class average`,
    validation: (output) => {
      const hasCharlie = output.some(item => 
        item.type === 'log' && item.message.includes('Charlie')
      );
      return hasCharlie;
    },
  },
];

function App() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const savedExercises = localStorage.getItem('studentExercises');
    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    } else {
      setExercises(EXERCISES.map(ex => ({ ...ex, code: ex.starterCode, output: [], isCorrect: null })));
    }
  }, []);

  useEffect(() => {
    if (exercises.length > 0) {
      localStorage.setItem('studentExercises', JSON.stringify(exercises));
    }
  }, [exercises]);

  const updateCode = (id, newCode) => {
    setExercises(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, code: newCode } : ex))
    );
  };

  const addOutput = (id, message, type = 'log') => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === id
          ? { ...ex, output: [...ex.output, { message, type, timestamp: Date.now() }] }
          : ex
      )
    );
  };

  const clearOutput = (id) => {
    setExercises(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, output: [], isCorrect: null } : ex))
    );
  };

  const runCode = (id) => {
    const exercise = exercises.find(ex => ex.id === id);
    if (!exercise) return;

    clearOutput(id);

    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn
    };

    console.log = (...args) => {
      addOutput(
        id,
        args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '),
        'log'
      );
    };

    console.error = (...args) => {
      addOutput(id, args.join(' '), 'error');
    };

    console.warn = (...args) => {
      addOutput(id, args.join(' '), 'warn');
    };

    try {
      eval(exercise.code);
      addOutput(id, '✓ Code executed successfully', 'success');
      
      const originalEx = EXERCISES.find(ex => ex.id === id);
      if (originalEx && originalEx.validation) {
        setTimeout(() => {
          const currentEx = exercises.find(ex => ex.id === id);
          const isCorrect = originalEx.validation(currentEx.output);
          
          setExercises(prev =>
            prev.map(ex =>
              ex.id === id ? { ...ex, isCorrect } : ex
            )
          );
          
          if (isCorrect) {
            addOutput(id, '🎉 Correct! Well done!', 'success');
          } else {
            addOutput(id, '❌ Not quite right. Keep trying!', 'error');
          }
        }, 100);
      }
    } catch (error) {
      addOutput(id, `✗ Error: ${error.message}`, 'error');
      setExercises(prev =>
        prev.map(ex =>
          ex.id === id ? { ...ex, isCorrect: false } : ex
        )
      );
    } finally {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
    }
  };

  const resetExercise = (id) => {
    const originalExercise = EXERCISES.find(ex => ex.id === id);
    if (originalExercise && confirm('Reset this exercise to starter code?')) {
      setExercises(prev =>
        prev.map(ex =>
          ex.id === id ? { ...ex, code: originalExercise.starterCode, output: [], isCorrect: null } : ex
        )
      );
    }
  };

  const resetAll = () => {
    if (confirm('Reset ALL exercises? This will delete all your code.')) {
      setExercises(EXERCISES.map(ex => ({ ...ex, code: ex.starterCode, output: [], isCorrect: null })));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6 border-b border-slate-700 sticky top-0 z-50 shadow-2xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              JavaScript Code Editor
            </h1>
            <p className="text-slate-400 text-sm mt-1">Junior Engineers Class</p>
          </div>
          <button
            onClick={resetAll}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-900/50"
          >
            🔥 Reset All Exercises
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {exercises.map((exercise) => (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            onUpdateCode={updateCode}
            onRunCode={runCode}
            onClearOutput={clearOutput}
            onReset={resetExercise}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
