import type { ReactNode } from "react";
import { BackButton } from "./BackButton";

type DetailPageLayoutProps = {
  children: ReactNode;
  showBackButton?: boolean;
  backButtonLabel?: string;
};

export const DetailPageLayout = ({
  children,
  showBackButton = true,
  backButtonLabel = "← Back to list",
}: DetailPageLayoutProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      {showBackButton && <BackButton label={backButtonLabel} />}

      <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 shadow-sm">
        {children}
      </article>
    </div>
  );
};
