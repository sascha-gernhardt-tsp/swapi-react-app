import type { ReactNode } from "react";

type DetailHeaderField = {
  label: string;
  value: ReactNode;
  className?: string;
};

type DetailHeaderProps = {
  title: string;
  subtitle?: string;
  fields: DetailHeaderField[];
};

export const DetailHeader = ({
  title,
  subtitle,
  fields,
}: DetailHeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row gap-8 items-start mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-8">
      <div className="flex-grow w-full">
        <h1
          className={`text-3xl font-bold tracking-tight text-zinc-900 dark:text-white ${subtitle ? "mb-2" : "mb-6"}`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">{subtitle}</p>
        )}

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
          {fields.map((field, index) => (
            <div key={`${field.label}-${index}`} className={field.className}>
              <dt className="text-zinc-500 dark:text-zinc-400">
                {field.label}
              </dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
};
