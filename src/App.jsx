import { useState, useEffect } from 'react';
import Exercise from './Exercise';

const EXERCISES = [
  // ===== REACT INTRODUCTION =====
  {
    id: 'jsx-basics',
    title: 'JSX Basics',
    category: 'React Introduction',
    objective: 'Create your first React element using JSX',
    question: 'Render a heading that says "Hello, React!" - JSX lets you write HTML-like syntax in JavaScript!',
    starterCode: `// Your first React component!
// JSX looks like HTML but it's actually JavaScript

function App() {
  // TODO: Return a heading element
  // Hint: Use <h1>Your text here</h1>
  return (
    <div>
      <p>Replace this with an h1 element</p>
    </div>
  );
}

render(<App />);`,
    solution: 'h1',
    isReact: true,
    validation: (code) => {
      return code.includes('<h1') && code.toLowerCase().includes('hello');
    },
  },
  {
    id: 'jsx-expressions',
    title: 'JSX Expressions',
    category: 'React Introduction',
    objective: 'Use JavaScript expressions inside JSX with curly braces',
    question: 'Display a variable inside JSX. Create a variable `name` and show "Hello, {name}!" using curly braces.',
    starterCode: `function App() {
  // TODO: Create a name variable
  const name = "Student";

  // TODO: Use {name} inside the JSX to display it
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>My name is: replace this</p>
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('{name}') || code.includes('{ name }');
    },
  },
  {
    id: 'multiple-elements',
    title: 'Multiple Elements',
    category: 'React Introduction',
    objective: 'Render multiple elements inside a container',
    question: 'Create a card with a title, description, and a button. All elements must be wrapped in a single parent.',
    starterCode: `function App() {
  return (
    // TODO: Add more elements inside this div
    // - An h2 for the title
    // - A p for the description
    // - A button
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Card Title</h2>
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('<h2') && code.includes('<p') && code.includes('<button');
    },
  },
  {
    id: 'props-basics',
    title: 'Component Props',
    category: 'React Introduction',
    objective: 'Pass data to components using props',
    question: 'Create a Greeting component that accepts a "name" prop and displays "Hello, {name}!"',
    starterCode: `// TODO: Create a Greeting component that accepts props
function Greeting(props) {
  // Access props.name to get the name
  return (
    <h2>Hello, Guest!</h2>
  );
}

function App() {
  return (
    <div>
      {/* TODO: Pass different names to Greeting */}
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('props.name') || code.includes('{ name }');
    },
  },
  {
    id: 'props-destructuring',
    title: 'Props Destructuring',
    category: 'React Introduction',
    objective: 'Use destructuring to extract props cleanly',
    question: 'Create a UserCard component that destructures name, age, and role from props.',
    starterCode: `// TODO: Use destructuring in the function parameters
// Instead of (props), use ({ name, age, role })
function UserCard(props) {
  return (
    <div style={{ padding: '16px', margin: '8px', background: '#f0f0f0', borderRadius: '8px' }}>
      <h3>{props.name}</h3>
      <p>Age: {props.age}</p>
      <p>Role: {props.role}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard name="Alice" age={28} role="Developer" />
      <UserCard name="Bob" age={35} role="Designer" />
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('{ name') && code.includes('age') && code.includes('role }');
    },
  },
  {
    id: 'conditional-rendering',
    title: 'Conditional Rendering',
    category: 'React Introduction',
    objective: 'Show different content based on conditions',
    question: 'Create a component that shows "Welcome back!" if isLoggedIn is true, otherwise "Please sign in".',
    starterCode: `function AuthMessage({ isLoggedIn }) {
  // TODO: Use a ternary operator to show different messages
  // condition ? valueIfTrue : valueIfFalse
  return (
    <div style={{ padding: '20px', background: '#e8f4f8', borderRadius: '8px' }}>
      <h2>Status: Unknown</h2>
    </div>
  );
}

function App() {
  return (
    <div>
      <AuthMessage isLoggedIn={true} />
      <br />
      <AuthMessage isLoggedIn={false} />
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('isLoggedIn') && (code.includes('?') || code.includes('&&'));
    },
  },
  {
    id: 'list-rendering',
    title: 'Rendering Lists',
    category: 'React Introduction',
    objective: 'Render arrays of data using map()',
    question: 'Use map() to render a list of items. Each item needs a unique "key" prop.',
    starterCode: `function App() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grape'];

  return (
    <div>
      <h2>Fruit List</h2>
      <ul>
        {/* TODO: Use fruits.map() to render each fruit as an <li> */}
        {/* Remember to add a key prop! */}
        <li>Replace with map()</li>
      </ul>
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('.map(') && code.includes('key=');
    },
  },
  {
    id: 'list-objects',
    title: 'Rendering Object Lists',
    category: 'React Introduction',
    objective: 'Render lists of objects with multiple properties',
    question: 'Render a list of users showing their name and email. Use the id as the key.',
    starterCode: `function App() {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  return (
    <div>
      <h2>User Directory</h2>
      {/* TODO: Map over users and render each one */}
      {/* Show name and email for each user */}
      <div style={{ padding: '10px', background: '#f5f5f5', margin: '5px', borderRadius: '4px' }}>
        Replace with mapped users
      </div>
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('.map(') && code.includes('key=') && (code.includes('.name') || code.includes('.email'));
    },
  },
  {
    id: 'usestate-intro',
    title: 'useState Hook',
    category: 'React Introduction',
    objective: 'Add state to your component with useState',
    question: 'Create a counter that increases when you click a button. Use useState to track the count.',
    starterCode: `function App() {
  // TODO: Add state for the counter
  // const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Counter: 0</h2>
      <button
        onClick={() => {
          // TODO: Update the count
          console.log('Button clicked!');
        }}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Increment
      </button>
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('useState') && code.includes('setCount');
    },
  },
  {
    id: 'usestate-objects',
    title: 'State with Objects',
    category: 'React Introduction',
    objective: 'Manage object state properly in React',
    question: 'Create a form that updates a user object. Remember to spread the previous state when updating!',
    starterCode: `function App() {
  // TODO: Create state for user object
  // const [user, setUser] = useState({ name: '', email: '' });

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Form</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Name"
          // TODO: Add value and onChange
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          // TODO: Add value and onChange
          style={{ padding: '8px' }}
        />
      </div>
      <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
        <p>Name: </p>
        <p>Email: </p>
      </div>
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('useState') && code.includes('...user') || code.includes('setUser');
    },
  },
  {
    id: 'event-handling',
    title: 'Event Handling',
    category: 'React Introduction',
    objective: 'Handle user events in React',
    question: 'Create buttons with different event handlers: onClick, onMouseEnter, and onMouseLeave.',
    starterCode: `function App() {
  const [message, setMessage] = useState('Hover or click the buttons!');

  // TODO: Create event handler functions
  const handleClick = () => {
    setMessage('Button was clicked!');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>{message}</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={handleClick}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Click Me
        </button>
        <button
          // TODO: Add onMouseEnter handler
          // TODO: Add onMouseLeave handler
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Hover Me
        </button>
      </div>
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('onMouseEnter') && code.includes('onMouseLeave');
    },
  },
  {
    id: 'todo-app',
    title: 'Build a Todo App',
    category: 'React Introduction',
    objective: 'Combine everything you learned to build a todo app',
    question: 'Create a todo app where you can add items and mark them as complete. This combines state, events, and list rendering!',
    starterCode: `function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false }
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      // TODO: Add new todo to the list
      // Don't forget to generate a unique id!
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    // TODO: Toggle the completed status of a todo
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>My Todos</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px', marginLeft: '8px' }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              padding: '10px',
              margin: '5px 0',
              background: '#f5f5f5',
              borderRadius: '4px',
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);`,
    isReact: true,
    validation: (code) => {
      return code.includes('setTodos') && code.includes('...todos') && code.includes('completed');
    },
  },
];

function App() {
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem('reactExercises');
    if (savedData) {
      const saved = JSON.parse(savedData);
      const merged = EXERCISES.map(ex => {
        const savedEx = saved.exercises?.find(s => s.id === ex.id);
        if (savedEx) {
          return {
            ...ex,
            code: savedEx.code || ex.starterCode,
            isCorrect: savedEx.isCorrect ?? null
          };
        }
        return { ...ex, code: ex.starterCode, isCorrect: null };
      });
      setExercises(merged);
      setCurrentIndex(saved.currentIndex || 0);
    } else {
      setExercises(EXERCISES.map(ex => ({ ...ex, code: ex.starterCode, isCorrect: null })));
    }
  }, []);

  useEffect(() => {
    if (exercises.length > 0) {
      localStorage.setItem('reactExercises', JSON.stringify({
        exercises: exercises.map(ex => ({ id: ex.id, code: ex.code, isCorrect: ex.isCorrect })),
        currentIndex
      }));
    }
  }, [exercises, currentIndex]);

  const updateCode = (id, newCode) => {
    setExercises(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, code: newCode } : ex))
    );
  };

  const checkSolution = (id) => {
    const exercise = exercises.find(ex => ex.id === id);
    const originalEx = EXERCISES.find(ex => ex.id === id);
    if (exercise && originalEx && originalEx.validation) {
      const isCorrect = originalEx.validation(exercise.code);
      setExercises(prev =>
        prev.map(ex => (ex.id === id ? { ...ex, isCorrect } : ex))
      );
      return isCorrect;
    }
    return false;
  };

  const goToNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const resetExercise = (id) => {
    const originalExercise = EXERCISES.find(ex => ex.id === id);
    if (originalExercise) {
      setExercises(prev =>
        prev.map(ex =>
          ex.id === id ? { ...ex, code: originalExercise.starterCode, isCorrect: null } : ex
        )
      );
    }
  };

  const resetAll = () => {
    if (confirm('Reset ALL progress? This will delete all your code.')) {
      setExercises(EXERCISES.map(ex => ({ ...ex, code: ex.starterCode, isCorrect: null })));
      setCurrentIndex(0);
    }
  };

  const completedCount = exercises.filter(ex => ex.isCorrect === true).length;
  const currentExercise = exercises[currentIndex];
  const canGoNext = currentIndex < exercises.length - 1 && (currentExercise?.isCorrect || currentIndex === 0);

  if (!currentExercise) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              React Learning Path
            </h1>
            <p className="text-slate-400 text-sm">
              Exercise {currentIndex + 1} of {exercises.length} • {completedCount} completed
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Progress dots */}
            <div className="hidden md:flex gap-1">
              {exercises.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    if (i <= currentIndex || exercises[i - 1]?.isCorrect || i === 0) {
                      setCurrentIndex(i);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentIndex
                      ? 'bg-cyan-400 scale-125'
                      : ex.isCorrect
                      ? 'bg-emerald-500'
                      : i <= currentIndex || exercises[i - 1]?.isCorrect || i === 0
                      ? 'bg-slate-600 hover:bg-slate-500'
                      : 'bg-slate-700 cursor-not-allowed'
                  }`}
                  title={ex.title}
                />
              ))}
            </div>
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-all"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          <Exercise
            exercise={currentExercise}
            onUpdateCode={updateCode}
            onCheckSolution={checkSolution}
            onReset={resetExercise}
            onNext={goToNext}
            onPrev={goToPrev}
            canGoNext={canGoNext}
            canGoPrev={currentIndex > 0}
            isFirst={currentIndex === 0}
            isLast={currentIndex === exercises.length - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
