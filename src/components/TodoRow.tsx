import {Check, Trash2} from 'lucide-react';
import type {TodoItem} from '../types/todo';

interface TodoRowProps {
  todo: TodoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatCreatedTime(timestamp: number): string {
  try {
    return new Intl.DateTimeFormat('zh-TW', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  } catch {
    return '';
  }
}

export function TodoRow({todo, onToggle, onDelete}: TodoRowProps) {
  const timeLabel = formatCreatedTime(todo.createdAt);

  return (
    <li className="group flex items-center justify-between gap-2 px-3 sm:px-5 py-2.5 hover:bg-slate-50/80 transition-colors duration-150">
      <div className="flex items-start sm:items-center gap-1 flex-1 min-w-0">
        <button
          type="button"
          role="checkbox"
          aria-checked={todo.completed}
          aria-label={todo.completed ? `取消勾選「${todo.text}」` : `勾選完成「${todo.text}」`}
          onClick={() => onToggle(todo.id)}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] -ml-1 rounded-lg cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <span
            className={`flex items-center justify-center w-5 h-5 rounded border transition-colors duration-150 ${
              todo.completed
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-slate-300 group-hover:border-blue-500'
            }`}
          >
            {todo.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className="flex-1 min-w-0 py-2 text-left cursor-pointer focus:outline-none focus-visible:underline"
        >
          <span
            className={`block text-[15px] leading-relaxed break-words transition-colors duration-150 ${
              todo.completed ? 'line-through text-slate-400' : 'text-slate-900'
            }`}
          >
            {todo.text}
          </span>
          {timeLabel && (
            <span className="mt-0.5 block text-xs text-slate-400 tabular-nums">
              {todo.completed ? '已完成' : '待完成'}
              <span aria-hidden="true"> · </span>
              建立於 {timeLabel}
            </span>
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`刪除「${todo.text}」`}
        className="inline-flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] px-2.5 text-xs font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
      >
        <Trash2 className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">刪除</span>
      </button>
    </li>
  );
}
