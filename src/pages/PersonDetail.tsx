import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Person } from "../types/swapi";
import { LinkList } from "../components/LinkList";

export const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: person,
    loading,
    error,
  } = useFetch<Person>(id ? `https://swapi.dev/api/people/${id}/` : null);

  if (loading)
    return (
      <div className="text-center py-20 text-zinc-500">Loading details...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!person) return null;

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
            {person.name.charAt(0)}
          </div>

          <div className="flex-grow w-full">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
              {person.name}
            </h1>

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Birth Year</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {person.birth_year}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Height</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {person.height} cm
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Mass</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                  {person.mass} kg
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Gender</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {person.gender}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Hair Color</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {person.hair_color}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Eye Color</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                  {person.eye_color}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {person.films.length > 0 && (
            <LinkList urls={person.films} title="Films" displayKey="title" />
          )}
          {person.homeworld && (
            <LinkList
              urls={[person.homeworld]}
              title="Homeworld"
              displayKey="name"
            />
          )}
          {person.species.length > 0 && (
            <LinkList urls={person.species} title="Species" displayKey="name" />
          )}
          {person.vehicles.length > 0 && (
            <LinkList
              urls={person.vehicles}
              title="Vehicles"
              displayKey="name"
            />
          )}
          {person.starships.length > 0 && (
            <LinkList
              urls={person.starships}
              title="Starships"
              displayKey="name"
            />
          )}
        </section>
      </article>
    </div>
  );
};
