type PaginationProps = {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export const Pagination = ({
  currentPage,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: PaginationProps) => {
  return (
    <nav className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-8">
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
        disabled={!hasPrevious}
        onClick={onPrevious}
      >
        ← Previous
      </button>

      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Page{" "}
        <span className="text-zinc-900 dark:text-white">{currentPage}</span>
      </span>

      <button
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
        disabled={!hasNext}
        onClick={onNext}
      >
        Next →
      </button>
    </nav>
  );
};
