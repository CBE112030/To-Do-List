import {ClipboardList} from 'lucide-react';
import type {FilterMode} from '../types/todo';

interface EmptyStateProps {
  filter: FilterMode;
  totalCount: number;
  onResetFilter: () => void;
}

export function EmptyState({filter, totalCount, onResetFilter}: EmptyStateProps) {
  const isCompletelyEmpty = totalCount === 0;

  let title = '目前沒有待辦事項';
  let description = '在上方輸入框新增您的第一項待辦事項，資料會自動儲存在瀏覽器中。';

  if (!isCompletelyEmpty && filter === 'active') {
    title = '目前沒有待完成的事項';
    description = '所有待辦事項皆已完成，做得很好！';
  } else if (!isCompletelyEmpty && filter === 'completed') {
    title = '尚未有已完成的事項';
    description = '勾選清單中的項目後，完成的項目會顯示在這裡。';
  }

  return (
    <div className="px-6 py-14 sm:py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400">
        <ClipboardList className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-slate-900">{title}</h2>
      <p className="mt-1.5 mx-auto max-w-sm text-sm leading-relaxed text-slate-500">
        {description}
      </p>
      {!isCompletelyEmpty && filter !== 'all' && (
        <button
          type="button"
          onClick={onResetFilter}
          className="mt-5 inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          查看全部事項
        </button>
      )}
    </div>
  );
}
