import {Plus} from 'lucide-react';
import {useRef, useState, type FormEvent, type KeyboardEvent} from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({onAdd}: TodoInputProps) {
  const [value, setValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [showEmptyHint, setShowEmptyHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitTodo = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setShowEmptyHint(true);
      inputRef.current?.focus();
      return;
    }
    onAdd(trimmed);
    setValue('');
    setShowEmptyHint(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isComposing) {
      return;
    }
    submitTodo();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && (isComposing || event.nativeEvent.isComposing)) {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="new-todo-input" className="sr-only">
          新增待辦事項
        </label>
        <input
          ref={inputRef}
          id="new-todo-input"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (showEmptyHint && event.target.value.trim()) {
              setShowEmptyHint(false);
            }
          }}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={handleKeyDown}
          placeholder="輸入待辦事項內容，按 Enter 或點擊新增..."
          maxLength={200}
          aria-invalid={showEmptyHint}
          aria-describedby={showEmptyHint ? 'todo-input-error' : undefined}
          className={`flex-1 min-h-[46px] px-4 py-2.5 text-[15px] bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20 ${
            showEmptyHint
              ? 'border-red-500 focus:border-red-600'
              : 'border-slate-200 hover:border-slate-300 focus:border-blue-600'
          }`}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>新增待辦</span>
        </button>
      </div>
      {showEmptyHint && (
        <p id="todo-input-error" role="alert" className="text-xs font-medium text-red-600">
          請先輸入待辦事項內容再新增。
        </p>
      )}
    </form>
  );
}
