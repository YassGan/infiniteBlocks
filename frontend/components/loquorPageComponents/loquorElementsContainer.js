// LoquorElementsContainer Component

import React, { useState } from "react";
import LoquorElement from "../../components/loquorPageComponents/loquorElement";

const LoquorElementsContainer = () => {
  const trackList = [
    {
      number: "1",
      title: "Smart Contracts",
      duration: "2:34",
      imageUrl: "/images/loquorImages/1.jpeg",
    },
    {
      number: "2",
      title: "Blockchain Governance",
      duration: "3:45",
      imageUrl: "/images/loquorImages/3.jpeg",
    },
    {
      number: "3",
      title: "Cryptocurrency Regulation",
      duration: "4:56",
      imageUrl: "/images/loquorImages/2.jpg",
    },
  ];

  const [visibleTracks, setVisibleTracks] = useState(2);

  const showMore = () => {
    setVisibleTracks((prev) => prev + 2);
  };

  const showLess = () => {
    setVisibleTracks(2);
  };

  return (
    <div className="pt-3 bg-[#181818] border border-gray-700 rounded-lg shadow-md ">
      <div className="px-8 py-4">
        <div class="w-16 h-16 mb-4 bg-[#ff3294] rounded-full flex items-center justify-center hover:bg-[#ff6db4] cursor-pointer">
          <img  src="/images/loquorImages/play2.png" alt="Play" class="w-1/2" />
        </div>

        <h2 className="text-xl font-bold mb-4 text-white">Popular</h2>
        <div>
          {trackList.slice(0, visibleTracks).map((track) => (
            <LoquorElement
              key={track.number}
              number={track.number}
              title={track.title}
              duration={track.duration}
              imageUrl={track.imageUrl}
            />
          ))}
        </div>
        {visibleTracks < trackList.length && (
          <button
            className="mt-4 ml-4 text-[#ff3294] hover:text-[#ed99c2]"
            onClick={showMore}
          >
            See More
          </button>
        )}
        {visibleTracks > 2 && (
          <button
            className="mt-4 ml-4 text-[#ff3294] hover:text-[#ed99c2]"
            onClick={showLess}
          >
            See Less
          </button>
        )}
      </div>
    </div>
  );
};

export default LoquorElementsContainer;
