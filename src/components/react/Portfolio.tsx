import React from "react";
import { PROJECTS } from "../../config";

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

const Portfolio: React.FC = () => {
  const handleCardClick = (project: Project) => {
    window.open(project.link, "_blank");
  };

  const handleExternalClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-screen-lg mx-auto pb-24">
      <div className="bg-neutral-900/60 rounded-lg p-4 mt-[60px] md:mt-[80px] mb-6">
        <h2 className="text-white text-2xl font-logo mb-12">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-800/60 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative flex flex-col h-full cursor-pointer"
              onClick={() => handleCardClick(item)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={typeof item.image === "string" ? item.image : item.image.src}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 z-20 relative flex-grow">
                <h4 className="text-lg font-semibold text-slate-200">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.description}</p>
                <p className="text-sm text-slate-400 flex-grow">{item.details.join(". ")}.</p>
                <div className="flex gap-2 w-full">
                  {item.externalLink && (
                    <button
                      onClick={(e) => handleExternalClick(e, item.externalLink!)}
                      className="mt-auto rounded-md flex-1 px-4 py-2 text-sm transition-colors duration-200 text-center border border-white text-white hover:bg-white hover:text-neutral-900"
                    >
                      {item.externalLabel ?? "Explore ↗"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
