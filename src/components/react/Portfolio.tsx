import React from "react";
import PortfolioGrid from "./PortfolioGrid";

const Portfolio: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto pb-24">
      <div className="bg-neutral-900/60 rounded-lg p-4 mt-[60px] md:mt-[80px] mb-6">
        <PortfolioGrid variant="grid" showTitle={true} />
      </div>
    </div>
  );
};

export default Portfolio;
