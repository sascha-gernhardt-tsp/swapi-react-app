import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Starship } from "../types/swapi";
import { LinkList } from "../components/LinkList";

export const StarshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: ship,
    loading,
    error,
  } = useFetch<Starship>(id ? `https://swapi.dev/api/starships/${id}/` : null);

  if (loading)
    return (
      <div className="text-center py-20 text-zinc-500">Loading details...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!ship) return null;

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
            {ship.name.charAt(0)}
          </div>

          <div className="flex-grow w-full">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
              {ship.name}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
              {ship.model} ({ship.starship_class})
            </p>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Manufacturer
                </dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {ship.manufacturer}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Cost</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {ship.cost_in_credits} Credits
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Length</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {ship.length} m
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Max Speed</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {ship.max_atmosphering_speed}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Crew</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {ship.crew}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Passengers</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {ship.passengers}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Hyperdrive Rating
                </dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {ship.hyperdrive_rating}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ship.pilots.length > 0 && (
            <LinkList urls={ship.pilots} title="Pilots" displayKey="name" />
          )}
          {ship.films.length > 0 && (
            <LinkList urls={ship.films} title="Films" displayKey="title" />
          )}
        </section>
      </article>
    </div>
  );
};
