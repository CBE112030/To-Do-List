import type {TodoItem} from '../types/todo';

export const STORAGE_KEY = 'todo-list-items-v1';

function isValidTodoItem(value: unknown): value is TodoItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.text === 'string' &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'number'
  );
}

export function loadTodosFromStorage(): TodoItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isValidTodoItem);
  } catch {
    return [];
  }
}

export function saveTodosToStorage(todos: TodoItem[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Ignore storage quota or private mode write errors
  }
}
