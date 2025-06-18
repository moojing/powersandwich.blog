import React from "react";
import { PROJECTS } from "../../config";
import Button from "./Button";

interface Project {
  id: string;
  title: string;
  description: string;
  image: any;
  externalLink?: string;
  externalLabel?: string;
  link: string;
  details: string[];
}

interface PortfolioGridProps {
  variant?: "grid" | "list";
  showTitle?: boolean;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ variant = "grid", showTitle = true }) => {
  const handleCardClick = (project: Project) => {
    window.open(project.link, "_blank");
  };

  const handleExternalClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  if (variant === "list") {
    return (
      <div className="flex flex-col flex-1">
        {showTitle && (
          <h3 className="text-white text-2xl font-logo mb-6 scroll-mt-40" id="projects">
            My Projects
          </h3>
        )}
        <ul className="flex flex-col gap-8 text-slate-400 m-0">
          {PROJECTS.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer flex gap-4 md:flex-row flex-col rounded-lg p-4 hover:bg-white/10 transition-colors relative"
              onClick={() => handleCardClick(item)}
            >
              <div className="max-w-full md:max-w-40 w-full aspect-[4/3] overflow-hidden rounded-lg bg-white">
                <img
                  src={typeof item.image === "string" ? item.image : item.image.src}
                  alt={item.title}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg text-slate-200">{item.title}</h4>
                  {item.externalLink && (
                    <Button onClick={(e) => handleExternalClick(e, item.externalLink!)} variant="outline">
                      {item.externalLabel ?? "Explore ↗"}
                    </Button>
                  )}
                </div>
                <p className="text-sm mb-4">{item.description}</p>
                <ul className="flex-col gap-1">
                  {item.details.map((detail, index) => (
                    <li key={index} className="text-sm flex items-start gap-1">
                      <span className="text-blue-400 mt-0.5">→</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {showTitle && <h2 className="text-white text-2xl font-logo mb-12">My Projects</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-800/60 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative flex flex-col h-full cursor-pointer"
            onClick={() => handleCardClick(item)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={typeof item.image === "string" ? item.image : item.image.src}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="cursor-pointer p-4 flex flex-col gap-2 z-20 relative flex-grow">
              <h4 className="text-lg font-semibold text-slate-200">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.description}</p>
              <ul className="flex-col gap-1 flex-grow ml-1">
                {item.details.map((detail, index) => (
                  <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">→</span>
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 w-full">
                {item.externalLink && (
                  <Button
                    onClick={(e) => handleExternalClick(e, item.externalLink!)}
                    variant="outline"
                    className="mt-auto flex-1"
                  >
                    {item.externalLabel ?? "Explore ↗"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGrid;
