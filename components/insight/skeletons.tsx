export const TableSkeleton = ({ rows = 5, cols = 7 }: { rows?: number; cols?: number }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-secondary/60">
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i} className="px-3 sm:px-6 py-4">
              <div className="h-3 w-16 bg-muted rounded animate-pulse mx-auto" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border/40">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-card' : 'bg-secondary/10'}>
            {Array.from({ length: cols }).map((_, colIdx) => (
              <td key={colIdx} className="px-3 sm:px-6 py-4">
                <div
                  className={`h-4 bg-muted rounded animate-pulse mx-auto ${colIdx === 0 ? 'w-28' : colIdx === cols - 1 ? 'w-20' : 'w-16'}`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const FormSkeleton = () => (
  <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 p-4">
    {Array.from({ length: 3 }).map((_, sectionIdx) => (
      <div key={sectionIdx} className="space-y-5">
        <div className="border-b border-border pb-3">
          <div className="h-5 w-40 bg-muted rounded animate-pulse" />
          <div className="h-3 w-56 bg-muted rounded animate-pulse mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, fieldIdx) => (
            <div key={fieldIdx} className="flex flex-col gap-2">
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    ))}
    <div className="pt-5 mt-2 border-t border-border flex justify-end">
      <div className="h-12 w-48 bg-muted rounded-xl animate-pulse" />
    </div>
  </div>
);

export const CardSkeleton = ({ lines = 2 }: { lines?: number }) => (
  <div className="paper-card rounded-2xl p-6 space-y-4">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 bg-muted rounded animate-pulse w-full" style={{ width: `${70 - i * 15}%` }} />
    ))}
  </div>
);
