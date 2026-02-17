import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Planet } from "../types/swapi";
import { LinkList } from "../components/LinkList";
import { DetailHeader } from "../components/DetailHeader";
import { DetailPageLayout } from "../components/DetailPageLayout";

export const PlanetDetail = () => {
  const { id } = useParams<{ id: string }>();
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
    <DetailPageLayout>
      <DetailHeader
        title={planet.name}
        fields={[
          {
            label: "Climate",
            value: <span className="capitalize">{planet.climate}</span>,
          },
          {
            label: "Terrain",
            value: <span className="capitalize">{planet.terrain}</span>,
          },
          { label: "Diameter", value: `${planet.diameter} km` },
          { label: "Population", value: planet.population },
          { label: "Gravity", value: planet.gravity },
          { label: "Orbital Period", value: `${planet.orbital_period} days` },
        ]}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {planet.residents.length > 0 && (
          <LinkList urls={planet.residents} title="Residents" displayKey="name" />
        )}
        {planet.films.length > 0 && (
          <LinkList urls={planet.films} title="Films" displayKey="title" />
        )}
      </section>
    </DetailPageLayout>
  );
};
