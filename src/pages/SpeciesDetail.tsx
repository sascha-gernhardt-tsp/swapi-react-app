import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Species } from "../types/swapi";
import { LinkList } from "../components/LinkList";

export const SpeciesDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: species,
    loading,
    error,
  } = useFetch<Species>(id ? `https://swapi.dev/api/species/${id}/` : null);

  if (loading)
    return (
      <div className="text-center py-20 text-zinc-500">Loading details...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!species) return null;

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
            {species.name.charAt(0)}
          </div>

          <div className="flex-grow w-full">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
              {species.name}
            </h1>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Classification
                </dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {species.classification}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Designation
                </dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {species.designation}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Language</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {species.language}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Avg Height</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {species.average_height} cm
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Avg Lifespan
                </dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {species.average_lifespan} years
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Eye Colors</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {species.eye_colors}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {species.homeworld && (
            <LinkList
              urls={[species.homeworld]}
              title="Homeworld"
              displayKey="name"
            />
          )}
          {species.people.length > 0 && (
            <LinkList
              urls={species.people}
              title="Known People"
              displayKey="name"
            />
          )}
          {species.films.length > 0 && (
            <LinkList urls={species.films} title="Films" displayKey="title" />
          )}
        </section>
      </article>
    </div>
  );
};
