import type { ReactNode } from "react";

export interface UspItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface UspComponentProps {
  title?: string;
  subtitle?: string;
  items: UspItem[];
}

const UspComponent = ({ title, subtitle, items }: UspComponentProps) => {
  return (
    <section className="relative w-full bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl font-bold md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 max-w-xl md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col items-center rounded-2xl bg-secondary px-8 py-10 text-center"
            >
              <div
                className="mb-5 flex h-14 w-14 [&_svg]:h-7 [&_svg]:w-7 items-center justify-center rounded-full bg-greenAccent text-primary"
                aria-hidden
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-black md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-base text-gray-500">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UspComponent;
