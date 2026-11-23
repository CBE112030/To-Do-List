import {useEffect, useMemo, useState} from 'react';
import {EmptyState} from './components/EmptyState';
import {TodoFilterBar} from './components/TodoFilterBar';
import {TodoInput} from './components/TodoInput';
import {TodoRow} from './components/TodoRow';
import {TodoStats} from './components/TodoStats';
import type {FilterMode, TodoItem} from './types/todo';
import {loadTodosFromStorage, saveTodosToStorage, STORAGE_KEY} from './utils/storage';

function createTodoId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatTodayDate(): string {
  try {
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(new Date());
  } catch {
    return '';
  }
}

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>(() => loadTodosFromStorage());
  const [filter, setFilter] = useState<FilterMode>('all');

  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setTodos(loadTodosFromStorage());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAddTodo = (text: string) => {
    const newItem: TodoItem = {
      id: createTodoId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newItem, ...prev]);
    if (filter === 'completed') {
      setFilter('all');
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? {...item, completed: !item.completed} : item,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((item) => !item.completed));
  };

  const {totalCount, completedCount, activeCount} = useMemo(() => {
    const completed = todos.filter((item) => item.completed).length;
    return {
      totalCount: todos.length,
      completedCount: completed,
      activeCount: todos.length - completed,
    };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((item) => !item.completed);
    }
    if (filter === 'completed') {
      return todos.filter((item) => item.completed);
    }
    return todos;
  }, [todos, filter]);

  const todayLabel = useMemo(() => formatTodayDate(), []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            待辦事項清單
          </h1>
          {todayLabel && (
            <time
              dateTime={new Date().toISOString().slice(0, 10)}
              className="text-xs sm:text-sm text-slate-500 whitespace-nowrap truncate"
            >
              {todayLabel}
            </time>
          )}
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-8 py-6 sm:py-10">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-4 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">管理每日工作與待辦項目</h2>
              <p className="mt-1 text-sm text-slate-500">
                輸入任務後按 Enter 或點擊按鈕加入清單，點擊項目即可標記完成。
              </p>
            </div>

            <TodoInput onAdd={handleAddTodo} />

            <TodoStats
              totalCount={totalCount}
              completedCount={completedCount}
              activeCount={activeCount}
            />
          </div>

          <TodoFilterBar
            filter={filter}
            onFilterChange={setFilter}
            totalCount={totalCount}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={handleClearCompleted}
          />

          {filteredTodos.length > 0 ? (
            <ul aria-label="待辦事項列表" className="divide-y divide-slate-100">
              {filteredTodos.map((todo) => (
                <TodoRow
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </ul>
          ) : (
            <EmptyState
              filter={filter}
              totalCount={totalCount}
              onResetFilter={() => setFilter('all')}
            />
          )}
        </div>
      </main>

      <footer className="mx-auto w-full max-w-4xl px-4 sm:px-8 pb-8 text-center">
        <p className="text-xs text-slate-400">
          所有待辦事項皆自動儲存於本機瀏覽器（localStorage），重新整理頁面後資料仍會保留。
        </p>
      </footer>
    </div>
  );
}
