import { Link } from "react-router-dom";
import { useFetchAll } from "../hooks/useFetch";

interface LinkListProps {
  urls: string[];
  title: string;
  displayKey: string;
}

const getAppLink = (apiUrl: string) => {
  const parts = apiUrl.split("/").filter(Boolean);
  const id = parts.pop();
  const resource = parts.pop();

  if (!id || !resource) return null;

  switch (resource) {
    case "people":
      return `/people/${id}`;
    case "films":
      return `/films/${id}`;
    case "planets":
      return `/planets/${id}`;
    case "starships":
      return `/starships/${id}`;
    case "vehicles":
      return `/vehicles/${id}`;
    case "species":
      return `/species/${id}`;
    default:
      return null;
  }
};

interface GenericResource {
  [key: string]: unknown;
}

export const LinkList = ({ urls, title, displayKey }: LinkListProps) => {
  const { data, loading, error } = useFetchAll<GenericResource>(urls);

  if (!urls || urls.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 pb-2">
        {title}
      </h3>

      {loading && (
        <div className="text-zinc-500 text-xs animate-pulse">Loading...</div>
      )}
      {error && (
        <div className="text-red-500 text-xs">Error loading links.</div>
      )}

      {!loading && !error && data && (
        <ul className="space-y-2">
          {data.map((item, index) => {
            const value = item[displayKey];
            const displayValue = typeof value === "string" ? value : "Unknown";

            const itemUrl = (item.url as string) || "";
            const appLink = getAppLink(itemUrl);

            return (
              <li
                key={index}
                className="text-sm text-zinc-600 dark:text-zinc-400 truncate"
              >
                {appLink ? (
                  <Link
                    to={appLink}
                    className="hover:text-zinc-900 dark:hover:text-zinc-50 hover:underline transition-colors block py-1"
                  >
                    {displayValue}
                  </Link>
                ) : (
                  <span>{displayValue}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
