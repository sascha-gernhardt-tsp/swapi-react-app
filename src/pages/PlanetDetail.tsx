import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Planet } from "../types/swapi";
import { LinkList } from "../components/LinkList";

export const PlanetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: planet,
    loading,
    error,
  } = useFetch<Planet>(id ? `https://swapi.dev/api/planets/${id}/` : null);

  if (loading)
    return (
      <div className="text-center py-20 text-zinc-500">Loading details...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!planet) return null;

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
            {planet.name.charAt(0)}
          </div>

          <div className="flex-grow w-full">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
              {planet.name}
            </h1>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Climate</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {planet.climate}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Terrain</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {planet.terrain}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Diameter</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {planet.diameter} km
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Population</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {planet.population}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Gravity</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {planet.gravity}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Orbital Period
                </dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {planet.orbital_period} days
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {planet.residents.length > 0 && (
            <LinkList
              urls={planet.residents}
              title="Residents"
              displayKey="name"
            />
          )}
          {planet.films.length > 0 && (
            <LinkList urls={planet.films} title="Films" displayKey="title" />
          )}
        </section>
      </article>
    </div>
  );
};
