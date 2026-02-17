import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  label?: string;
};

export const BackButton = ({ label = "← Back to list" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-8 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors flex items-center gap-2"
    >
      {label}
    </button>
  );
};
