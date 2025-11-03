import { useState, useEffect } from 'react';
import Exercise from './Exercise';

const EXERCISES = [
  {
    id: 'arrays',
    title: 'Arrays',
    question: 'Access the last element of the numbers array using array.length',
    starterCode: `const numbers = [1, 2, 3, 4, 5];
console.log('Array:', numbers);
console.log('First element:', numbers[0]);
// TODO: Log the last element using array.length`,
  },
  {
    id: 'objects',
    title: 'Objects',
    question: 'Create an object with at least 2 properties and access them using dot notation',
    starterCode: `// TODO: Create an object with { key: value, key: value }

// TODO: Log the object and access properties with dot notation`,
  },
  {
    id: 'map',
    title: 'Array Map',
    question: 'Use array.map() to double the numbers, then use it again to square them',
    starterCode: `const numbers = [1, 2, 3, 4, 5];
// TODO: Use array.map(item => ...)
// const doubled = ...

// TODO: Use array.map(item => ...)
// const squared = ...`,
  },
  {
    id: 'filter',
    title: 'Array Filter',
    question: 'Use array.filter() to get only even numbers, then filter numbers greater than 2',
    starterCode: `const numbers = [1, 2, 3, 4, 5];
// TODO: Use array.filter(item => condition)
// const evens = ...

// TODO: Use array.filter(item => condition)
// const greaterThanTwo = ...`,
  },
  {
    id: 'array-objects',
    title: 'Array of Objects',
    question: 'Create an array of student objects, filter by grade, and map to extract names',
    starterCode: `// TODO: Create array with objects inside [ { }, { } ]
// const students = [...]

// TODO: Use array.filter() to check a property
// const highGrades = ...

// TODO: Use array.map() to extract one property
// const names = ...`,
  },
  {
    id: 'final-boss',
    title: 'Final Boss',
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
  },
];

function App() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const savedExercises = localStorage.getItem('studentExercises');
    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    } else {
      setExercises(EXERCISES.map(ex => ({ ...ex, code: ex.starterCode, output: [] })));
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
      prev.map(ex => (ex.id === id ? { ...ex, output: [] } : ex))
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
    } catch (error) {
      addOutput(id, `✗ Error: ${error.message}`, 'error');
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
          ex.id === id ? { ...ex, code: originalExercise.starterCode, output: [] } : ex
        )
      );
    }
  };

  const resetAll = () => {
    if (confirm('Reset ALL exercises? This will delete all your code.')) {
      setExercises(EXERCISES.map(ex => ({ ...ex, code: ex.starterCode, output: [] })));
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
