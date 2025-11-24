import { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const theme = {
  plain: {
    color: '#e2e8f0',
    backgroundColor: '#1e293b',
  },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#64748b' } },
    { types: ['punctuation'], style: { color: '#94a3b8' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'], style: { color: '#f472b6' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'], style: { color: '#a5f3fc' } },
    { types: ['operator', 'entity', 'url'], style: { color: '#fde68a' } },
    { types: ['atrule', 'attr-value', 'keyword'], style: { color: '#c4b5fd' } },
    { types: ['function', 'class-name'], style: { color: '#7dd3fc' } },
    { types: ['regex', 'important', 'variable'], style: { color: '#fca5a5' } },
  ],
};

export default function Exercise({
  exercise,
  onUpdateCode,
  onCheckSolution,
  onReset,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  isFirst,
  isLast
}) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheck = () => {
    const isCorrect = onCheckSolution(exercise.id);
    if (isCorrect) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleReset = () => {
    if (confirm('Reset this exercise to starter code?')) {
      onReset(exercise.id);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Exercise Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">{exercise.title}</h2>
            {exercise.isCorrect === true && <span className="text-2xl">✅</span>}
            {exercise.isCorrect === false && <span className="text-2xl">❌</span>}
          </div>
          <div className="text-sm text-slate-400">{exercise.category}</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
          <div className="text-cyan-400 text-sm font-semibold mb-1">Objective</div>
          <p className="text-slate-200">{exercise.objective}</p>
        </div>

        <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-4">
          <div className="text-blue-400 text-sm font-semibold mb-1">Task</div>
          <p className="text-slate-300">{exercise.question}</p>
        </div>
      </div>

      {/* Code Editor and Preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        <LiveProvider
          code={exercise.code}
          noInline={true}
          theme={theme}
        >
          {/* Editor Panel */}
          <div className="flex flex-col bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-700 px-4 py-2 border-b border-slate-600 flex justify-between items-center">
              <span className="text-sm font-semibold text-cyan-400">Code Editor</span>
              <button
                onClick={handleReset}
                className="text-xs px-2 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded transition-all"
              >
                Reset
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <LiveEditor
                onChange={(newCode) => onUpdateCode(exercise.id, newCode)}
                style={{
                  fontFamily: '"Fira Code", "Fira Mono", monospace',
                  fontSize: 14,
                  minHeight: '100%',
                  padding: '16px',
                }}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex flex-col bg-white rounded-xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-700 px-4 py-2 border-b border-slate-600">
              <span className="text-sm font-semibold text-emerald-400">Live Preview</span>
            </div>
            <div className="flex-1 p-4 overflow-auto bg-white text-black">
              <LivePreview />
            </div>
            <LiveError className="px-4 py-2 bg-red-100 text-red-700 text-sm border-t border-red-200" />
          </div>
        </LiveProvider>
      </div>

      {/* Navigation Footer */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            canGoPrev
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          ← Previous
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleCheck}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-medium transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Check Solution
          </button>
        </div>

        <button
          onClick={onNext}
          disabled={!canGoNext && !exercise.isCorrect}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            canGoNext || exercise.isCorrect
              ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          {isLast ? 'Complete!' : 'Next →'}
        </button>
      </div>

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}
    </div>
  );
}
