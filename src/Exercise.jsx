import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Exercise({ exercise, onUpdateCode, onRunCode, onClearOutput, onReset }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = exercise.code.substring(0, start) + '    ' + exercise.code.substring(end);
      onUpdateCode(exercise.id, newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRunCode(exercise.id);
    }
  };

  const customStyle = {
    margin: 0,
    padding: '1.5rem',
    background: 'transparent',
    fontSize: '1rem',
    lineHeight: 1.7,
    tabSize: 4,
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl hover:shadow-slate-700/50 transition-all duration-300">
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-6 py-6 border-b border-slate-600">
        <div className="flex justify-between items-start gap-6 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {exercise.title}
              </h2>
              {exercise.isCorrect === true && (
                <span className="text-2xl">✅</span>
              )}
              {exercise.isCorrect === false && (
                <span className="text-2xl">❌</span>
              )}
            </div>
            
            {exercise.objective && (
              <div className="mb-4 p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">📋 Objective</div>
                <p className="text-slate-200 leading-relaxed text-base">{exercise.objective}</p>
              </div>
            )}
            
            <div className="p-4 bg-blue-950/30 border border-blue-800/50 rounded-lg">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">💡 Task</div>
              <p className="text-slate-300 leading-relaxed text-base">{exercise.question}</p>
            </div>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => onReset(exercise.id)}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              🔄 Reset
            </button>
            <button
              onClick={() => onRunCode(exercise.id)}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-900/50"
            >
              ▶ Run Code
            </button>
            <button
              onClick={() => onClearOutput(exercise.id)}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 min-h-[400px]">
        <div className="flex flex-col border-r border-slate-700 relative">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 border-b border-slate-600">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">📝 Your Code</span>
          </div>
          
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-slate-900 overflow-auto pointer-events-none">
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={customStyle}
              >
                {exercise.code}
              </SyntaxHighlighter>
            </div>
            <textarea
              className="absolute inset-0 bg-transparent text-transparent caret-white font-mono text-base p-6 border-none outline-none resize-none focus:bg-slate-900/5 transition-colors selection:bg-blue-500/30"
              value={exercise.code}
              onChange={(e) => onUpdateCode(exercise.id, e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              style={{ tabSize: 4, lineHeight: 1.7 }}
            />
          </div>
        </div>

        <div className="flex flex-col bg-slate-900">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-4 py-3 border-b border-slate-600">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">💻 Console Output</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm min-h-[400px] space-y-2">
            {exercise.output.length === 0 ? (
              <div className="text-slate-500 italic text-center mt-8">
                <div className="text-4xl mb-3">🚀</div>
                <div>Run your code to see output here...</div>
              </div>
            ) : (
              exercise.output.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 border-l-4 rounded-r-lg shadow-sm ${
                    item.type === 'log'
                      ? 'text-slate-100 bg-slate-800 border-l-blue-500'
                      : item.type === 'error'
                      ? 'text-red-300 bg-red-950/30 border-l-red-500'
                      : item.type === 'success'
                      ? 'text-emerald-300 bg-emerald-950/30 border-l-emerald-500'
                      : 'text-yellow-300 bg-yellow-950/30 border-l-yellow-500'
                  }`}
                >
                  {item.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
