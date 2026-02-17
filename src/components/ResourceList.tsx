import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import type { SwapiResponse } from "../types/swapi";
import { Pagination } from "./Pagination";

interface ResourceListProps<T> {
  resourceName: string;
  title: string;
  renderItem: (item: T) => React.ReactNode;
}

const SkeletonCard = () => (
  <div className="h-full min-h-[200px] rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 p-5 animate-pulse flex flex-col justify-between">
    <div className="w-2/3 h-7 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
      <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
    </div>
    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
      <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
    </div>
  </div>
);

export const ResourceList = <T extends { name?: string; title?: string }>({
  resourceName,
  title,
  renderItem,
}: ResourceListProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageKey = `${resourceName}-page`;
  const searchKey = `${resourceName}-search`;

  const currentPage = parseInt(searchParams.get(pageKey) || "1");
  const currentSearch = searchParams.get(searchKey) || "";

  const [inputValue, setInputValue] = useState(currentSearch);
  const debouncedInput = useDebounce(inputValue, 200);

  useEffect(() => {
    if (debouncedInput !== currentSearch) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (debouncedInput && debouncedInput.length >= 2) {
          newParams.set(searchKey, debouncedInput);
        } else {
          newParams.delete(searchKey);
        }
        newParams.set(pageKey, "1");
        return newParams;
      });
    }
  }, [debouncedInput, currentSearch, setSearchParams, pageKey, searchKey]);

  const apiUrl = currentSearch
    ? `https://swapi.dev/api/${resourceName}/?search=${currentSearch}&page=${currentPage}`
    : `https://swapi.dev/api/${resourceName}/?page=${currentPage}`;

  const { data, loading, error } = useFetch<SwapiResponse<T>>(apiUrl);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(pageKey, newPage.toString());
      return newParams;
    });
  };

  return (
    <div className="p-6 md:p-12 font-sans">
      <section className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Browse and search through the Star Wars database.
            </p>
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-sky-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm dark:bg-zinc-900 dark:border-zinc-700 dark:text-white dark:placeholder-zinc-500 dark:focus:ring-sky-500/20 dark:focus:border-sky-500"
            />
            {inputValue !== currentSearch && (
              <div className="absolute right-3 top-3 h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent dark:border-sky-500"></div>
            )}
          </div>
        </header>

        {error && (
          <div className="text-center py-20 text-red-500">Error: {error}</div>
        )}

        {loading ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index}>
                <SkeletonCard />
              </li>
            ))}
          </ul>
        ) : (
          data && (
            <>
              {data.results.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">
                  No results found.
                </div>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.results.map((item, index) => (
                    <li key={index} className="h-full">
                      {renderItem(item)}
                    </li>
                  ))}
                </ul>
              )}
              <Pagination
                currentPage={currentPage}
                hasPrevious={Boolean(data.previous)}
                hasNext={Boolean(data.next)}
                onPrevious={() => handlePageChange(currentPage - 1)}
                onNext={() => handlePageChange(currentPage + 1)}
              />
            </>
          )
        )}
      </section>
    </div>
  );
};
