interface TodoStatsProps {
  totalCount: number;
  completedCount: number;
  activeCount: number;
}

export function TodoStats({totalCount, completedCount, activeCount}: TodoStatsProps) {
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <section aria-label="待辦事項統計" className="py-4 border-y border-slate-200">
      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">待辦總數</p>
          <p className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {totalCount}
            <span className="ml-1 text-xs font-normal text-slate-500">項</span>
          </p>
        </div>

        <div className="space-y-1 border-l border-slate-200 pl-4 sm:pl-6">
          <p className="text-xs font-medium text-slate-500">已完成</p>
          <p className="text-2xl font-semibold tracking-tight text-blue-600 tabular-nums">
            {completedCount}
            <span className="ml-1 text-xs font-normal text-slate-500">項</span>
          </p>
        </div>

        <div className="space-y-1 border-l border-slate-200 pl-4 sm:pl-6">
          <p className="text-xs font-medium text-slate-500">待完成</p>
          <p className="text-2xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {activeCount}
            <span className="ml-1 text-xs font-normal text-slate-500">項</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="完成進度"
        >
          <div
            className="h-full bg-blue-600 rounded-full transition-[width] duration-200 ease-out"
            style={{width: `${completionRate}%`}}
          />
        </div>
        <span className="text-xs font-medium text-slate-500 tabular-nums whitespace-nowrap shrink-0">
          完成進度 {completionRate}%
        </span>
      </div>
    </section>
  );
}
