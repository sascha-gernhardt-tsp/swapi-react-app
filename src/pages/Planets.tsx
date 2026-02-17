import type { Planet } from "../types/swapi";
import { ResourceList } from "../components/ResourceList";
import { Link } from "react-router-dom";

export const Planets = () => {
  return (
    <ResourceList<Planet>
      resourceName="planets"
      title="Planets"
      renderItem={(planet) => {
        const id = planet.url.split("/").filter(Boolean).pop();
        return (
          <Link
            to={`/planets/${id}`}
            key={planet.name}
            className="block h-full group"
          >
            <article className="h-full relative overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 p-5 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80 flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity dark:from-sky-500/10 dark:to-indigo-500/10 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors mb-4">
                  {planet.name}
                </h2>

                <div className="grid gap-y-2 gap-x-4 text-sm">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wider block">
                      Climate
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium capitalize">
                      {planet.climate}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wider block">
                      Terrain
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium capitalize truncate block">
                      {planet.terrain}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                <span className="text-xs font-medium text-indigo-600 dark:text-sky-500 group-hover:underline">
                  View Details →
                </span>
              </div>
            </article>
          </Link>
        );
      }}
    />
  );
};
