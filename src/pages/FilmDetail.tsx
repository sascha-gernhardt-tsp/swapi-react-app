import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Film } from "../types/swapi";
import { LinkList } from "../components/LinkList";
import { DetailHeader } from "../components/DetailHeader";
import { DetailPageLayout } from "../components/DetailPageLayout";

export const FilmDetail = () => {
  const { id } = useParams<{ id: string }>();
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
    <DetailPageLayout>
      <DetailHeader
        title={film.title}
        fields={[
          { label: "Episode", value: film.episode_id },
          { label: "Release Date", value: film.release_date },
          { label: "Director", value: film.director },
          {
            label: "Producer",
            value: film.producer,
            className: "col-span-2 sm:col-span-3",
          },
        ]}
      />
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
    </DetailPageLayout>
  );
};
