import type {FilterMode} from '../types/todo';

interface TodoFilterBarProps {
  filter: FilterMode;
  onFilterChange: (filter: FilterMode) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export function TodoFilterBar({
  filter,
  onFilterChange,
  totalCount,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFilterBarProps) {
  const options: {id: FilterMode; label: string; count: number}[] = [
    {id: 'all', label: '全部', count: totalCount},
    {id: 'active', label: '待完成', count: activeCount},
    {id: 'completed', label: '已完成', count: completedCount},
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-200 bg-slate-50/70">
      <div
        role="tablist"
        aria-label="篩選待辦事項狀態"
        className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
      >
        {options.map((option) => {
          const isActive = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilterChange(option.id)}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{option.label}</span>
              <span className="ml-1.5 text-slate-400 tabular-nums">{option.count}</span>
            </button>
          );
        })}
      </div>

      {completedCount > 0 && (
        <button
          type="button"
          onClick={onClearCompleted}
          className="min-h-[36px] px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        >
          清除已完成 ({completedCount})
        </button>
      )}
    </div>
  );
}
