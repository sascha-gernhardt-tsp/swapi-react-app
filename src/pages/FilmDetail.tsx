import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Film } from "../types/swapi";
import { LinkList } from "../components/LinkList";

export const FilmDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: film,
    loading,
    error,
  } = useFetch<Film>(id ? `https://swapi.dev/api/films/${id}/` : null);

  if (loading)
    return (
      <div className="text-center py-20 text-zinc-500">Loading details...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!film) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors flex items-center gap-2"
      >
        ← Back to list
      </button>

      <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 shadow-sm">
        <header className="flex flex-col md:flex-row gap-8 items-start mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-8">
          <div className="h-24 w-24 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-4xl font-bold text-zinc-400 dark:text-zinc-500 shrink-0">
            {film.title.charAt(0)}
          </div>

          <div className="flex-grow w-full">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
              {film.title}
            </h1>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Episode</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {film.episode_id}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Release Date
                </dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {film.release_date}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Director</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {film.director}
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <dt className="text-zinc-500 dark:text-zinc-400">Producer</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {film.producer}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Opening Crawl
          </h3>
          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-r-lg">
            {film.opening_crawl}
          </blockquote>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LinkList urls={film.characters} title="Persons" displayKey="name" />
          <LinkList urls={film.planets} title="Planets" displayKey="name" />
          <LinkList urls={film.starships} title="Starships" displayKey="name" />
          <LinkList urls={film.vehicles} title="Vehicles" displayKey="name" />
          <LinkList urls={film.species} title="Species" displayKey="name" />
        </section>
      </article>
    </div>
  );
};
