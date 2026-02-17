import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Starship } from "../types/swapi";
import { LinkList } from "../components/LinkList";
import { DetailHeader } from "../components/DetailHeader";
import { DetailPageLayout } from "../components/DetailPageLayout";

export const StarshipDetail = () => {
  const { id } = useParams<{ id: string }>();
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
    <DetailPageLayout>
      <DetailHeader
        title={ship.name}
        subtitle={`${ship.model} (${ship.starship_class})`}
        fields={[
          { label: "Manufacturer", value: ship.manufacturer },
          { label: "Cost", value: `${ship.cost_in_credits} Credits` },
          { label: "Length", value: `${ship.length} m` },
          { label: "Max Speed", value: ship.max_atmosphering_speed },
          { label: "Crew", value: ship.crew },
          { label: "Passengers", value: ship.passengers },
          { label: "Hyperdrive Rating", value: ship.hyperdrive_rating },
        ]}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ship.pilots.length > 0 && (
          <LinkList urls={ship.pilots} title="Pilots" displayKey="name" />
        )}
        {ship.films.length > 0 && (
          <LinkList urls={ship.films} title="Films" displayKey="title" />
        )}
      </section>
    </DetailPageLayout>
  );
};
