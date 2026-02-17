import { Link, NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/people", label: "Persons" },
  { to: "/films", label: "Films" },
  { to: "/planets", label: "Planets" },
  { to: "/starships", label: "Starships" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/species", label: "Species" },
];

export const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-md ${
      isActive
        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="container flex h-16 max-w-screen-2xl items-center mx-auto px-4 justify-between">
        <Link
          to="/people"
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900 dark:text-white"
        >
          SWAPIexplorer
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={linkClass}
                  end={item.to === "/people"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
