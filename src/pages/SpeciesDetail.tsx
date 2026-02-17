import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Species } from "../types/swapi";
import { LinkList } from "../components/LinkList";
import { DetailHeader } from "../components/DetailHeader";
import { DetailPageLayout } from "../components/DetailPageLayout";

export const SpeciesDetail = () => {
  const { id } = useParams<{ id: string }>();
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
    <DetailPageLayout>
      <DetailHeader
        title={species.name}
        fields={[
          {
            label: "Classification",
            value: <span className="capitalize">{species.classification}</span>,
          },
          {
            label: "Designation",
            value: <span className="capitalize">{species.designation}</span>,
          },
          {
            label: "Language",
            value: <span className="capitalize">{species.language}</span>,
          },
          { label: "Avg Height", value: `${species.average_height} cm` },
          {
            label: "Avg Lifespan",
            value: `${species.average_lifespan} years`,
          },
          {
            label: "Eye Colors",
            value: <span className="capitalize">{species.eye_colors}</span>,
          },
        ]}
      />

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
    </DetailPageLayout>
  );
};
