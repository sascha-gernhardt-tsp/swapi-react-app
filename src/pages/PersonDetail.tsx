import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Person } from "../types/swapi";
import { LinkList } from "../components/LinkList";
import { DetailHeader } from "../components/DetailHeader";
import { DetailPageLayout } from "../components/DetailPageLayout";

export const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
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
    <DetailPageLayout>
      <DetailHeader
        title={person.name}
        fields={[
          { label: "Birth Year", value: person.birth_year },
          { label: "Height", value: `${person.height} cm` },
          { label: "Mass", value: `${person.mass} kg` },
          {
            label: "Gender",
            value: <span className="capitalize">{person.gender}</span>,
          },
          {
            label: "Hair Color",
            value: <span className="capitalize">{person.hair_color}</span>,
          },
          {
            label: "Eye Color",
            value: <span className="capitalize">{person.eye_color}</span>,
          },
        ]}
      />

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
          <LinkList urls={person.vehicles} title="Vehicles" displayKey="name" />
        )}
        {person.starships.length > 0 && (
          <LinkList urls={person.starships} title="Starships" displayKey="name" />
        )}
      </section>
    </DetailPageLayout>
  );
};
