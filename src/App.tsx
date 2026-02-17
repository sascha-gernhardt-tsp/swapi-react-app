import { Header } from "./components/Header";
import { AppRoutes } from "./components/AppRoutes";
import { useAxe } from "./hooks/useAxe";

function App() {
  useAxe();

  return (
    <div className="min-h-screen font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
