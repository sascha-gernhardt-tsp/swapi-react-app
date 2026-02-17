import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Vehicle } from "../types/swapi";
import { LinkList } from "../components/LinkList";
import { DetailHeader } from "../components/DetailHeader";
import { DetailPageLayout } from "../components/DetailPageLayout";

export const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: vehicle,
    loading,
    error,
  } = useFetch<Vehicle>(id ? `https://swapi.dev/api/vehicles/${id}/` : null);

  if (loading)
    return (
      <div className="text-center py-20 text-zinc-500">Loading details...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!vehicle) return null;

  return (
    <DetailPageLayout>
      <DetailHeader
        title={vehicle.name}
        subtitle={`${vehicle.model} (${vehicle.vehicle_class})`}
        fields={[
          { label: "Manufacturer", value: vehicle.manufacturer },
          { label: "Cost", value: `${vehicle.cost_in_credits} Credits` },
          { label: "Length", value: `${vehicle.length} m` },
          { label: "Max Speed", value: vehicle.max_atmosphering_speed },
          { label: "Crew", value: vehicle.crew },
          { label: "Passengers", value: vehicle.passengers },
        ]}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vehicle.pilots.length > 0 && (
          <LinkList urls={vehicle.pilots} title="Pilots" displayKey="name" />
        )}
        {vehicle.films.length > 0 && (
          <LinkList urls={vehicle.films} title="Films" displayKey="title" />
        )}
      </section>
    </DetailPageLayout>
  );
};
