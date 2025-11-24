import { useState, useEffect } from 'react';
import Exercise from './Exercise';

const EXERCISES = [
  // ===== REACT INTRODUCTION =====
  {
    id: 'jsx-basics',
    title: 'JSX Basics',
    category: 'React Introduction',
    objective: 'Understand how JSX combines JavaScript and HTML-like syntax',
    question: 'Create a greeting message using JSX. Store JSX in a variable and log its type to see that JSX is just JavaScript objects!',
    starterCode: `// JSX is syntactic sugar for React.createElement()
// When compiled, JSX becomes regular JavaScript objects

// TODO: Create a variable that holds JSX (without React, we'll simulate)
// const element = <h1>Hello, World!</h1>;
// In plain JS, this compiles to:
const element = {
  type: 'h1',
  props: {
    children: 'Hello, World!'
  }
};

// TODO: Log the element to see its structure
// console.log(element);

// TODO: Create a more complex element with nested children
// const nested = { type: 'div', props: { children: [...] } };

// TODO: Log the type of element (should be 'object')`,
    validation: (output) => {
      const hasElement = output.some(item =>
        item.type === 'log' && item.message.includes('h1') && item.message.includes('Hello')
      );
      const hasType = output.some(item =>
        item.type === 'log' && item.message.includes('object')
      );
      return hasElement && hasType;
    },
  },
  {
    id: 'component-basics',
    title: 'Function Components',
    category: 'React Introduction',
    objective: 'Learn how React components are just functions that return elements',
    question: 'Create a simple function component that returns a greeting. Components are functions that return UI descriptions!',
    starterCode: `// React components are functions that return elements
// They can accept props as parameters

// TODO: Create a Greeting component function
// function Greeting(props) {
//   return { type: 'h1', props: { children: 'Hello, ' + props.name } };
// }

// TODO: Call your component with props
// const result = Greeting({ name: 'React' });

// TODO: Log the result

// TODO: Create a component that uses multiple props
// function UserCard(props) { ... }

// TODO: Log UserCard with name and age props`,
    validation: (output) => {
      const hasGreeting = output.some(item =>
        item.type === 'log' && item.message.includes('Hello') && item.message.includes('React')
      );
      return hasGreeting;
    },
  },
  {
    id: 'props-deep-dive',
    title: 'Props & Data Flow',
    category: 'React Introduction',
    objective: 'Master props for passing data between components',
    question: 'Create components that receive and display props. Use destructuring to extract props cleanly!',
    starterCode: `// Props flow DOWN from parent to child (one-way data flow)
// This makes React apps predictable and easy to debug

// TODO: Create a Product component using destructuring
// function Product({ name, price, inStock }) {
//   return {
//     type: 'div',
//     props: {
//       children: name + ' - $' + price + (inStock ? ' (Available)' : ' (Sold Out)')
//     }
//   };
// }

// TODO: Create multiple products and log them
const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Phone', price: 699, inStock: false },
  { name: 'Tablet', price: 449, inStock: true }
];

// TODO: Map over products and create Product elements
// const productElements = products.map(p => Product(p));

// TODO: Log each product element`,
    validation: (output) => {
      const hasLaptop = output.some(item =>
        item.type === 'log' && item.message.includes('Laptop') && item.message.includes('999')
      );
      const hasAvailable = output.some(item =>
        item.type === 'log' && item.message.includes('Available')
      );
      return hasLaptop && hasAvailable;
    },
  },
  {
    id: 'state-concept',
    title: 'Understanding State',
    category: 'React Introduction',
    objective: 'Learn how state enables interactive components',
    question: 'Simulate React state by creating a state object and update functions. State is data that changes over time!',
    starterCode: `// State is data that can change and trigger re-renders
// useState returns [currentValue, setterFunction]

// TODO: Simulate a simple state system
function createState(initialValue) {
  let state = initialValue;

  function getState() {
    return state;
  }

  function setState(newValue) {
    state = newValue;
    console.log('State updated to:', state);
  }

  return [getState, setState];
}

// TODO: Create a counter state
// const [getCount, setCount] = createState(0);

// TODO: Log initial state
// console.log('Initial count:', getCount());

// TODO: Update state and log
// setCount(getCount() + 1);
// setCount(getCount() + 1);

// TODO: Create a user state with an object
// const [getUser, setUser] = createState({ name: 'Guest', loggedIn: false });`,
    validation: (output) => {
      const hasInitial = output.some(item =>
        item.type === 'log' && item.message.includes('0')
      );
      const hasUpdate = output.some(item =>
        item.type === 'log' && item.message.includes('updated')
      );
      return hasInitial && hasUpdate;
    },
  },
  {
    id: 'event-handling',
    title: 'Event Handling',
    category: 'React Introduction',
    objective: 'Learn how React handles events with function callbacks',
    question: 'Create event handler functions and simulate click events. Events in React are camelCase and receive event objects!',
    starterCode: `// React events are camelCase: onClick, onChange, onSubmit
// Event handlers are functions passed as props

// TODO: Create a button click handler
function handleClick(event) {
  console.log('Button clicked!');
  console.log('Event type:', event.type);
}

// TODO: Create an input change handler
function handleChange(event) {
  console.log('Input value:', event.target.value);
}

// TODO: Simulate events by calling handlers
const clickEvent = { type: 'click', target: { id: 'myButton' } };
const changeEvent = { type: 'change', target: { value: 'Hello React!' } };

// TODO: Call the handlers with simulated events

// TODO: Create a form submit handler that prevents default
function handleSubmit(event) {
  event.preventDefault();
  console.log('Form submitted!');
}

const submitEvent = {
  type: 'submit',
  preventDefault: () => console.log('Default prevented')
};`,
    validation: (output) => {
      const hasClick = output.some(item =>
        item.type === 'log' && item.message.includes('clicked')
      );
      const hasInput = output.some(item =>
        item.type === 'log' && item.message.includes('Hello React')
      );
      return hasClick && hasInput;
    },
  },
  {
    id: 'conditional-rendering',
    title: 'Conditional Rendering',
    category: 'React Introduction',
    objective: 'Render different UI based on conditions using JavaScript',
    question: 'Use ternary operators and && for conditional rendering. React uses plain JavaScript for conditionals!',
    starterCode: `// React uses JavaScript expressions for conditional rendering
// Common patterns: ternary (?:), && operator, early returns

// TODO: Create a component that shows different content based on login status
function AuthStatus({ isLoggedIn, username }) {
  // Use ternary for either/or rendering
  const message = isLoggedIn
    ? 'Welcome back, ' + username + '!'
    : 'Please log in';

  return { type: 'div', props: { children: message } };
}

// TODO: Test with logged in user
// console.log(AuthStatus({ isLoggedIn: true, username: 'Alice' }));

// TODO: Test with logged out user
// console.log(AuthStatus({ isLoggedIn: false, username: '' }));

// TODO: Create a component using && for optional rendering
function Notification({ message, showIcon }) {
  // && renders right side only if left side is true
  const icon = showIcon && '🔔 ';
  return { type: 'span', props: { children: icon + message } };
}

// TODO: Test notifications with and without icons`,
    validation: (output) => {
      const hasWelcome = output.some(item =>
        item.type === 'log' && item.message.includes('Welcome') && item.message.includes('Alice')
      );
      const hasLogin = output.some(item =>
        item.type === 'log' && item.message.includes('log in')
      );
      return hasWelcome && hasLogin;
    },
  },
  {
    id: 'list-rendering',
    title: 'Rendering Lists',
    category: 'React Introduction',
    objective: 'Render arrays of data using map() and understand keys',
    question: 'Use map() to transform data into elements. Keys help React identify which items changed!',
    starterCode: `// Use array.map() to render lists of elements
// Each element needs a unique 'key' prop for React's diffing algorithm

const todos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build an app', completed: false },
  { id: 3, text: 'Deploy to production', completed: false }
];

// TODO: Create a TodoItem component
function TodoItem({ id, text, completed }) {
  const status = completed ? '✅' : '⬜';
  return {
    type: 'li',
    key: id, // Keys help React track items
    props: {
      children: status + ' ' + text
    }
  };
}

// TODO: Map todos to TodoItem elements
// const todoElements = todos.map(todo => TodoItem(todo));

// TODO: Log each todo element

// TODO: Filter and render only incomplete todos
// const incompleteTodos = todos
//   .filter(t => !t.completed)
//   .map(t => TodoItem(t));`,
    validation: (output) => {
      const hasLearn = output.some(item =>
        item.type === 'log' && item.message.includes('Learn React')
      );
      const hasCheck = output.some(item =>
        item.type === 'log' && item.message.includes('✅')
      );
      return hasLearn && hasCheck;
    },
  },
  {
    id: 'hooks-preview',
    title: 'React Hooks Preview',
    category: 'React Introduction',
    objective: 'Understand the concept of hooks and how they add functionality to components',
    question: 'Simulate useState and useEffect patterns. Hooks let you use state and lifecycle in function components!',
    starterCode: `// Hooks are functions that let you "hook into" React features
// useState - for state management
// useEffect - for side effects (API calls, subscriptions, etc.)

// TODO: Simulate useState behavior
function simulateUseState(initial) {
  let state = initial;
  const setState = (newVal) => {
    const oldState = state;
    state = typeof newVal === 'function' ? newVal(oldState) : newVal;
    console.log('State changed:', oldState, '->', state);
    return state;
  };
  return [() => state, setState];
}

// TODO: Create and use a counter
// const [getCount, setCount] = simulateUseState(0);
// console.log('Count:', getCount());
// setCount(1);
// setCount(prev => prev + 1); // Functional update

// TODO: Simulate useEffect (runs after render)
function simulateUseEffect(effect, deps) {
  console.log('Effect running with deps:', deps);
  const cleanup = effect();
  if (cleanup) cleanup();
}

// TODO: Run an effect
// simulateUseEffect(() => {
//   console.log('Component mounted!');
//   return () => console.log('Cleanup!');
// }, []);`,
    validation: (output) => {
      const hasCount = output.some(item =>
        item.type === 'log' && item.message.includes('Count')
      );
      const hasChanged = output.some(item =>
        item.type === 'log' && item.message.includes('changed')
      );
      return hasCount && hasChanged;
    },
  },

  // ===== JAVASCRIPT ARRAY METHODS =====
  {
    id: 'final-boss',
    title: 'Array Filter & Map',
    category: 'JavaScript Array Methods',
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
    category: 'JavaScript Array Methods',
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
    category: 'JavaScript Array Methods',
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
    category: 'JavaScript Array Methods',
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
    category: 'Advanced JavaScript',
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
    category: 'Advanced JavaScript',
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
    category: 'Advanced JavaScript',
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
    category: 'Final Challenge',
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
      const saved = JSON.parse(savedExercises);
      // Merge saved data with current EXERCISES to handle new/removed exercises
      const merged = EXERCISES.map(ex => {
        const savedEx = saved.find(s => s.id === ex.id);
        if (savedEx) {
          // Preserve user's code and progress, but update exercise definition
          return {
            ...ex,
            code: savedEx.code || ex.starterCode,
            output: savedEx.output || [],
            isCorrect: savedEx.isCorrect ?? null
          };
        }
        // New exercise not in saved data
        return { ...ex, code: ex.starterCode, output: [], isCorrect: null };
      });
      setExercises(merged);
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

    // Clear output first
    setExercises(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, output: [], isCorrect: null } : ex))
    );

    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn
    };

    // Collect output during execution for validation
    const collectedOutput = [];

    console.log = (...args) => {
      const message = args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      collectedOutput.push({ message, type: 'log', timestamp: Date.now() });
      addOutput(id, message, 'log');
    };

    console.error = (...args) => {
      const message = args.join(' ');
      collectedOutput.push({ message, type: 'error', timestamp: Date.now() });
      addOutput(id, message, 'error');
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      collectedOutput.push({ message, type: 'warn', timestamp: Date.now() });
      addOutput(id, message, 'warn');
    };

    try {
      eval(exercise.code);
      addOutput(id, '✓ Code executed successfully', 'success');

      const originalEx = EXERCISES.find(ex => ex.id === id);
      if (originalEx && originalEx.validation) {
        // Use collected output directly instead of stale state
        const isCorrect = originalEx.validation(collectedOutput);

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

  // Calculate progress
  const completedCount = exercises.filter(ex => ex.isCorrect === true).length;
  const totalCount = exercises.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Group exercises by category
  const categories = exercises.reduce((acc, exercise) => {
    const category = exercise.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(exercise);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6 border-b border-slate-700 sticky top-0 z-50 shadow-2xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                React & JavaScript Code Editor
              </h1>
              <p className="text-slate-400 text-sm mt-1">Junior Engineers Class</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">Progress</div>
                <div className="text-lg font-bold text-emerald-400">{completedCount}/{totalCount} Complete</div>
              </div>
              <button
                onClick={resetAll}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-900/50"
              >
                🔥 Reset All
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Keyboard Shortcuts */}
          <div className="flex gap-4 text-xs text-slate-500">
            <span><kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">Enter</kbd> Run Code</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">Tab</kbd> Insert 4 spaces</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-12">
        {Object.entries(categories).map(([categoryName, categoryExercises]) => (
          <div key={categoryName}>
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-200 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                {categoryName}
                <span className="text-sm font-normal text-slate-500">
                  ({categoryExercises.filter(ex => ex.isCorrect).length}/{categoryExercises.length} completed)
                </span>
              </h2>
            </div>

            {/* Exercises in Category */}
            <div className="space-y-8">
              {categoryExercises.map((exercise) => (
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
        ))}
      </div>
    </div>
  );
}

export default App;
