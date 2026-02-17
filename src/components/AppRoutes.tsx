import { Routes, Route } from "react-router-dom";
import { Persons } from "../pages/Persons";
import { Films } from "../pages/Films";
import { Planets } from "../pages/Planets";
import { Starships } from "../pages/Starships";
import { Vehicles } from "../pages/Vehicles";
import { Species } from "../pages/Species";
import { PersonDetail } from "../pages/PersonDetail";
import { FilmDetail } from "../pages/FilmDetail";
import { PlanetDetail } from "../pages/PlanetDetail";
import { StarshipDetail } from "../pages/StarshipDetail";
import { VehicleDetail } from "../pages/VehicleDetail";
import { SpeciesDetail } from "../pages/SpeciesDetail";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Persons />} />
      <Route path="/people/:id" element={<PersonDetail />} />
      <Route path="/films" element={<Films />} />
      <Route path="/films/:id" element={<FilmDetail />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="/planets/:id" element={<PlanetDetail />} />
      <Route path="/starships" element={<Starships />} />
      <Route path="/starships/:id" element={<StarshipDetail />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/vehicles/:id" element={<VehicleDetail />} />
      <Route path="/species" element={<Species />} />
      <Route path="/species/:id" element={<SpeciesDetail />} />

      <Route
        path="*"
        element={
          <div className="text-center p-20 text-zinc-500">
            404 - Page not found
          </div>
        }
      />
    </Routes>
  );
};
